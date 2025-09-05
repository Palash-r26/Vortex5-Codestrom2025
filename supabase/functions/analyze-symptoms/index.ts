import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { analysisId } = await req.json();
    console.log('Processing analysis for ID:', analysisId);

    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured');
    }

    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // Get the analysis data
    const { data: analysis, error: fetchError } = await supabase
      .from('symptom_analyses')
      .select('*')
      .eq('id', analysisId)
      .single();

    if (fetchError || !analysis) {
      throw new Error('Analysis not found');
    }

    // Prepare the prompt for OpenAI
    const prompt = `You are an experienced medical AI assistant. Analyze the following patient information and symptoms:

Patient Information:
- Age: ${analysis.patient_age || 'Not provided'}
- Gender: ${analysis.patient_gender || 'Not provided'}
- Weight: ${analysis.patient_weight || 'Not provided'}
- Known Allergies: ${analysis.patient_allergies || 'None provided'}
- Current Medications: ${analysis.patient_medications || 'None provided'}

Symptoms: ${analysis.symptoms.join(', ')}
Additional Description: ${analysis.description || 'None provided'}

Please provide a comprehensive medical analysis including:
1. Top 3 most likely conditions with confidence percentages
2. Recommended medications with dosage, duration, and precautions
3. Severity assessment (mild, moderate, severe)
4. When to seek immediate medical attention
5. General care recommendations

Format the response as JSON with the following structure:
{
  "conditions": [
    {
      "name": "condition name",
      "confidence": 85,
      "severity": "mild|moderate|severe",
      "description": "detailed description",
      "matching_symptoms": ["symptom1", "symptom2"]
    }
  ],
  "medications": [
    {
      "name": "medication name",
      "dosage": "dosage instructions",
      "duration": "treatment duration",
      "route": "oral|topical|injection",
      "side_effects": ["side effect 1", "side effect 2"],
      "purpose": "what it treats",
      "precautions": "important warnings"
    }
  ],
  "severity_overall": "mild|moderate|severe",
  "seek_immediate_care": false,
  "care_recommendations": [
    "recommendation 1",
    "recommendation 2"
  ],
  "follow_up": "when to follow up with healthcare provider",
  "disclaimer": "This is AI-generated medical guidance. Always consult with healthcare professionals for proper medical advice."
}

IMPORTANT: This is for educational purposes only. Always recommend consulting with healthcare professionals for proper diagnosis and treatment.`;

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          { role: 'system', content: 'You are a medical AI assistant providing educational health information. Always emphasize the importance of consulting healthcare professionals.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 2000,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const aiResponse = await response.json();
    const analysisResult = JSON.parse(aiResponse.choices[0].message.content);

    // Calculate overall confidence score
    const averageConfidence = analysisResult.conditions.reduce((sum: number, condition: any) => sum + condition.confidence, 0) / analysisResult.conditions.length;

    // Update the analysis in the database
    const { error: updateError } = await supabase
      .from('symptom_analyses')
      .update({
        analysis_result: analysisResult,
        confidence_score: averageConfidence,
        updated_at: new Date().toISOString()
      })
      .eq('id', analysisId);

    if (updateError) {
      throw new Error('Failed to update analysis');
    }

    console.log('Analysis completed successfully for ID:', analysisId);

    return new Response(JSON.stringify({ 
      success: true, 
      analysis: analysisResult,
      confidence_score: averageConfidence 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-symptoms function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to analyze symptoms' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});