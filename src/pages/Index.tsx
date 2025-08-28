import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import SymptomChecker from "@/components/SymptomChecker";
import ChatInterface from "@/components/ChatInterface";
import Dashboard from "@/components/Dashboard";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <div id="symptoms">
          <SymptomChecker />
        </div>
        <div id="chat">
          <ChatInterface />
        </div>
        <div id="dashboard">
          <Dashboard />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
