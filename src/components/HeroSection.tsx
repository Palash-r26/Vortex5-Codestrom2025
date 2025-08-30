import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Activity, Brain, Shield, Users } from "lucide-react";
import heroImage from "@/assets/hero-medical-ai.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Content */}
      <div className="relative container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-6">
            <Brain className="w-5 h-5 text-white" />
            <span className="text-white font-medium">AI-Powered Healthcare</span>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Smart Medical
            <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Diagnosis & Care
            </span>
          </h1>
          
          <p className="text-xl text-white/90 mb-8 max-w-2xl">
            Advanced AI assistant for symptom analysis, disease prediction, and personalized treatment recommendations. 
            Safe, explainable, and multilingual healthcare support.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="hero" 
              size="lg" 
              className="text-xl px-8 py-4"
              onClick={() => document.getElementById('symptoms')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Diagnosis
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg bg-white/10 border-white/30 text-white hover:bg-white/20"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </Button>
          </div>
        </div>
        
        <div className="flex-1 grid grid-cols-2 gap-6">
          <FeatureCard 
            icon={<Activity className="w-8 h-8 text-medical-blue" />}
            title="Symptom Analysis"
            description="Advanced NLP for accurate symptom interpretation"
          />
          <FeatureCard 
            icon={<Brain className="w-8 h-8 text-medical-green" />}
            title="AI Predictions"
            description="Machine learning models for reliable diagnosis"
          />
          <FeatureCard 
            icon={<Shield className="w-8 h-8 text-medical-critical" />}
            title="Safety First"
            description="Built-in safeguards and medical oversight"
          />
          <FeatureCard 
            icon={<Users className="w-8 h-8 text-medical-warning" />}
            title="Multilingual"
            description="Support for multiple languages and regions"
          />
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
  <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-smooth">
    <div className="mb-4">{icon}</div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-white/80 text-sm">{description}</p>
  </Card>
);

export default HeroSection;