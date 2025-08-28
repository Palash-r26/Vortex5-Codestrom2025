import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Menu, 
  X, 
  Brain, 
  MessageSquare, 
  BarChart3, 
  Shield,
  Globe
} from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Symptom Checker", href: "#symptoms", icon: Brain },
    { name: "AI Chat", href: "#chat", icon: MessageSquare },
    { name: "Dashboard", href: "#dashboard", icon: BarChart3 },
    { name: "About", href: "#about", icon: Shield },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-medical rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-xl text-foreground">MediAI</span>
              <span className="block text-xs text-muted-foreground">by Vortex 5</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 text-foreground hover:text-primary transition-smooth font-medium"
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Globe className="w-4 h-4 mr-2" />
              EN
            </Button>
            <Button variant="medical" size="sm">
              Emergency
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white/95 backdrop-blur-sm">
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 text-foreground hover:bg-accent rounded-lg transition-smooth"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </a>
              ))}
              <div className="px-4 pt-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Globe className="w-4 h-4 mr-2" />
                  Language
                </Button>
                <Button variant="medical" size="sm" className="flex-1">
                  Emergency
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;