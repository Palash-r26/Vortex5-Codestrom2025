import { Card } from "@/components/ui/card";
import { Shield, Brain, Globe, Users, Stethoscope, CheckCircle } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            About MediAI
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Advanced AI-powered healthcare assistant designed to provide reliable symptom analysis, 
            disease prediction, and personalized treatment recommendations with safety at its core.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <FeatureCard 
            icon={<Brain className="w-8 h-8 text-medical-blue" />}
            title="Advanced AI Models"
            description="Powered by state-of-the-art machine learning algorithms trained on vast medical datasets for accurate diagnosis support."
          />
          <FeatureCard 
            icon={<Shield className="w-8 h-8 text-medical-critical" />}
            title="Safety First"
            description="Built-in safeguards, medical oversight, and clear disclaimers ensure responsible healthcare guidance."
          />
          <FeatureCard 
            icon={<Globe className="w-8 h-8 text-medical-green" />}
            title="Multilingual Support"
            description="Available in multiple languages with culturally sensitive healthcare recommendations."
          />
          <FeatureCard 
            icon={<Users className="w-8 h-8 text-medical-warning" />}
            title="Expert Validated"
            description="All AI models and recommendations are validated by certified medical professionals."
          />
          <FeatureCard 
            icon={<Stethoscope className="w-8 h-8 text-medical-blue" />}
            title="Comprehensive Analysis"
            description="Analyzes symptoms, medical history, and risk factors for holistic health assessment."
          />
          <FeatureCard 
            icon={<CheckCircle className="w-8 h-8 text-medical-green" />}
            title="Evidence-Based"
            description="All recommendations are based on peer-reviewed medical literature and clinical guidelines."
          />
        </div>

        <div className="bg-card rounded-2xl p-8 border">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
            Important Medical Disclaimer
          </h3>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="mb-4">
              MediAI is designed to assist with preliminary health assessments and provide educational information. 
              This platform is <strong>not a substitute for professional medical advice, diagnosis, or treatment</strong>.
            </p>
            <p className="mb-4">
              Always consult with qualified healthcare professionals for any medical concerns. In case of emergency, 
              contact your local emergency services immediately.
            </p>
            <p className="text-sm italic">
              By using MediAI, you acknowledge that you understand these limitations and agree to use the service 
              responsibly as a supplementary tool to professional healthcare.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
}) => (
  <Card className="p-6 hover:shadow-lg transition-smooth">
    <div className="mb-4">{icon}</div>
    <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </Card>
);

export default AboutSection;