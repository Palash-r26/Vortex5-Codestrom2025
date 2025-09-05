import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    const { message, conversationHistory } = await req.json();
    console.log('Processing medical chat message:', message);

    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured');
    }

    // Prepare conversation history for OpenAI
    const messages = [
      {
        role: 'system',
        content: `You are a helpful medical AI assistant. You provide educational health information and guidance, but always emphasize that your advice should not replace professional medical consultation.

Key guidelines:
- Be empathetic and supportive
- Ask clarifying questions when needed
- Provide confidence scores (1-100) for your responses
- Always recommend consulting healthcare professionals for serious symptoms
- Explain your reasoning briefly
- Focus on symptom assessment, general health advice, and when to seek care
- Never provide specific diagnoses or prescribe medications

For each response, include:
1. A helpful, empathetic response to the user's query
2. A confidence score for your assessment
3. Brief reasoning for your response
4. When appropriate, recommend seeking professional medical care

Format your response as JSON:
{
  "response": "your helpful response here",
  "confidence": 85,
  "reasoning": "brief explanation of your assessment",
  "recommend_medical_care": false,
  "care_urgency": "routine|urgent|emergency"
}`
      },
      ...conversationHistory.map((msg: any) => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.type === 'user' ? msg.content : msg.content
      })),
      { role: 'user', content: message }
    ];

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: messages,
        max_tokens: 800,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const aiResponse = await response.json();
    let parsedResponse;
    
    try {
      parsedResponse = JSON.parse(aiResponse.choices[0].message.content);
    } catch (parseError) {
      // Fallback if JSON parsing fails
      parsedResponse = {
        response: aiResponse.choices[0].message.content,
        confidence: 75,
        reasoning: "General medical guidance provided",
        recommend_medical_care: false,
        care_urgency: "routine"
      };
    }

    console.log('Medical chat response generated successfully');

    return new Response(JSON.stringify(parsedResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in medical-chat function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to process chat message',
      response: "I'm sorry, I'm experiencing technical difficulties. Please try again later or consult with a healthcare professional if you have urgent medical concerns.",
      confidence: 0,
      reasoning: "System error occurred",
      recommend_medical_care: true,
      care_urgency: "routine"
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});