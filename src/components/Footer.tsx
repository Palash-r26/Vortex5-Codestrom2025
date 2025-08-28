import { Heart, Github, Mail, Shield, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-medical rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-xl">MediAI</span>
                <span className="block text-xs text-muted">by Vortex 5</span>
              </div>
            </div>
            <p className="text-muted text-sm">
              Advanced AI-powered medical diagnosis and prescription assistant for safer, 
              more accessible healthcare worldwide.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="border-muted text-muted hover:bg-white hover:text-foreground">
                <Github className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="border-muted text-muted hover:bg-white hover:text-foreground">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li>AI Symptom Analysis</li>
              <li>Disease Prediction</li>
              <li>Medication Recommendations</li>
              <li>Multilingual Support</li>
              <li>Explainable AI</li>
              <li>Safety Monitoring</li>
            </ul>
          </div>

          {/* Safety & Compliance */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Safety & Privacy
            </h3>
            <ul className="space-y-2 text-sm text-muted">
              <li>HIPAA Compliant</li>
              <li>End-to-End Encryption</li>
              <li>Medical Oversight</li>
              <li>Evidence-Based</li>
              <li>Regular Audits</li>
              <li>Data Protection</li>
            </ul>
          </div>

          {/* Hackathon Info */}
          <div>
            <h3 className="font-semibold mb-4">Hackathon Project</h3>
            <div className="space-y-3 text-sm text-muted">
              <p>
                <strong>Team:</strong> Vortex 5<br />
                <strong>Event:</strong> CodeStorm 2025<br />
                <strong>Problem:</strong> AI Diagnostic Assistant
              </p>
              <div className="flex items-center gap-2 text-xs">
                <Globe className="w-3 h-3" />
                <span>Available in 5+ languages</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-muted/20" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            © 2025 Vortex 5 Team. Built for CodeStorm Hackathon 2025. 
            This is a prototype for educational purposes.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted">
            <a href="#" className="hover:text-white transition-smooth">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-smooth">Terms of Service</a>
            <a href="#" className="hover:text-white transition-smooth">Medical Disclaimer</a>
          </div>
        </div>

        <div className="mt-8 p-4 bg-warning/20 rounded-lg border border-warning/30">
          <div className="flex items-start gap-2">
            <Shield className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-warning mb-1">Important Medical Disclaimer</p>
              <p className="text-muted">
                This AI system is for educational and informational purposes only. It does not replace 
                professional medical advice, diagnosis, or treatment. Always seek the advice of qualified 
                healthcare providers with any questions regarding medical conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;