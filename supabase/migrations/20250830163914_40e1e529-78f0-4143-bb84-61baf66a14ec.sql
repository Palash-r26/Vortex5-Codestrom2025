-- Create a table for storing symptom analyses
CREATE TABLE public.symptom_analyses (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  symptoms text[] NOT NULL,
  description text,
  patient_age text,
  patient_weight text, 
  patient_gender text,
  patient_allergies text,
  patient_medications text,
  analysis_result jsonb,
  confidence_score decimal(3,2),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.symptom_analyses ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user access
CREATE POLICY "Users can view their own symptom analyses" 
ON public.symptom_analyses 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own symptom analyses" 
ON public.symptom_analyses 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own symptom analyses" 
ON public.symptom_analyses 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own symptom analyses" 
ON public.symptom_analyses 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_symptom_analyses_updated_at
BEFORE UPDATE ON public.symptom_analyses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better query performance
CREATE INDEX idx_symptom_analyses_user_id ON public.symptom_analyses(user_id);
CREATE INDEX idx_symptom_analyses_created_at ON public.symptom_analyses(created_at DESC);