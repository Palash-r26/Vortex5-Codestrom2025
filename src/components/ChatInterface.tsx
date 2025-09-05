import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  Bot, 
  User, 
  Send, 
  Mic, 
  Languages, 
  Clock,
  Brain,
  Shield,
  AlertCircle
} from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  confidence?: number;
  reasoning?: string;
  recommend_medical_care?: boolean;
  care_urgency?: 'routine' | 'urgent' | 'emergency';
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hello! I'm your AI medical assistant. I can help analyze your symptoms and provide health guidance. Please describe how you're feeling today.",
      timestamp: new Date(),
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const sendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const messageToSend = currentMessage;
    setCurrentMessage("");
    setIsTyping(true);

    try {
      // Call the medical chat AI function
      const { data: aiResponse, error } = await supabase.functions.invoke('medical-chat', {
        body: { 
          message: messageToSend,
          conversationHistory: messages.slice(-10) // Send last 10 messages for context
        }
      });

      if (error) {
        console.error("Chat AI error:", error);
        throw error;
      }

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: aiResponse.response,
        timestamp: new Date(),
        confidence: aiResponse.confidence,
        reasoning: aiResponse.reasoning,
        recommend_medical_care: aiResponse.recommend_medical_care,
        care_urgency: aiResponse.care_urgency
      };

      setMessages(prev => [...prev, botResponse]);

      // Show urgent care notification if needed
      if (aiResponse.recommend_medical_care && aiResponse.care_urgency === 'emergency') {
        toast.error("Emergency: Seek immediate medical attention!", { duration: 10000 });
      } else if (aiResponse.recommend_medical_care && aiResponse.care_urgency === 'urgent') {
        toast.warning("Consider seeking medical care soon.", { duration: 5000 });
      }

    } catch (error) {
      console.error("Error sending message:", error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: "I'm sorry, I'm experiencing technical difficulties. Please try again later or consult with a healthcare professional if you have urgent medical concerns.",
        timestamp: new Date(),
        confidence: 0,
        reasoning: "System error occurred",
        recommend_medical_care: true,
        care_urgency: 'routine'
      };
      setMessages(prev => [...prev, errorResponse]);
      toast.error("Failed to get AI response. Please try again.");
    } finally {
      setIsTyping(false);
    }
  };

  const languages = ["English", "Hindi", "Spanish", "French", "German"];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            AI Medical Chatbot
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Conversational interface for detailed symptom analysis and medical guidance
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-medical">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-6 h-6 text-primary" />
                  Medical AI Assistant
                  <Badge variant="outline" className="ml-2">
                    <Shield className="w-3 h-3 mr-1" />
                    Secure
                  </Badge>
                </CardTitle>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Languages className="w-4 h-4 text-muted-foreground" />
                    <select 
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      className="border border-input rounded px-2 py-1 text-sm bg-background"
                    >
                      {languages.map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              {/* Chat Messages */}
              <ScrollArea className="h-96 p-6">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start gap-3 ${
                        message.type === 'user' ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className={message.type === 'user' ? 'bg-secondary' : 'bg-primary'}>
                          {message.type === 'user' ? (
                            <User className="w-4 h-4" />
                          ) : (
                            <Bot className="w-4 h-4" />
                          )}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className={`flex-1 max-w-[80%] ${message.type === 'user' ? 'text-right' : ''}`}>
                        <div
                          className={`rounded-lg p-3 ${
                            message.type === 'user'
                              ? 'bg-primary text-primary-foreground ml-auto'
                              : 'bg-muted'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          {message.confidence && (
                            <div className="mt-2 pt-2 border-t border-white/20">
                              <div className="flex items-center gap-2 text-xs opacity-80">
                                <Brain className="w-3 h-3" />
                                Confidence: {message.confidence}%
                              </div>
                              {message.reasoning && (
                                <p className="text-xs mt-1 opacity-70">{message.reasoning}</p>
                              )}
                              {message.recommend_medical_care && (
                                <div className={`flex items-center gap-1 mt-2 text-xs ${
                                  message.care_urgency === 'emergency' 
                                    ? 'text-red-400' 
                                    : message.care_urgency === 'urgent'
                                    ? 'text-yellow-400'
                                    : 'text-blue-400'
                                }`}>
                                  <AlertCircle className="w-3 h-3" />
                                  {message.care_urgency === 'emergency' 
                                    ? 'Seek immediate medical care'
                                    : message.care_urgency === 'urgent'
                                    ? 'Consider medical consultation'
                                    : 'Routine medical care recommended'
                                  }
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex items-start gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-primary">
                          <Bot className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-100"></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-200"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Describe your symptoms or ask a medical question..."
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="pr-12"
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute right-1 top-1 h-8 w-8"
                    >
                      <Mic className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button 
                    onClick={sendMessage} 
                    variant="medical" 
                    size="icon"
                    disabled={!currentMessage.trim() || isTyping}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ChatInterface;