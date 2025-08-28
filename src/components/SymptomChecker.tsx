import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  Plus, 
  User, 
  Calendar, 
  Weight, 
  AlertTriangle,
  MessageSquare 
} from "lucide-react";

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [currentSymptom, setCurrentSymptom] = useState("");
  const [patientData, setPatientData] = useState({
    age: "",
    weight: "",
    gender: "",
    allergies: "",
    medications: ""
  });

  const addSymptom = () => {
    if (currentSymptom.trim() && !symptoms.includes(currentSymptom.trim())) {
      setSymptoms([...symptoms, currentSymptom.trim()]);
      setCurrentSymptom("");
    }
  };

  const removeSymptom = (symptom: string) => {
    setSymptoms(symptoms.filter(s => s !== symptom));
  };

  const commonSymptoms = [
    "Headache", "Fever", "Cough", "Fatigue", "Nausea", 
    "Chest pain", "Shortness of breath", "Dizziness", "Sore throat"
  ];

  return (
    <section className="py-20 bg-gradient-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            AI Symptom Checker
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Describe your symptoms and get AI-powered analysis with treatment recommendations
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Symptom Input */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5 text-primary" />
                Symptom Input
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Text Input */}
              <div className="space-y-3">
                <Label htmlFor="symptom-input">Describe your symptoms</Label>
                <div className="flex gap-2">
                  <Input
                    id="symptom-input"
                    placeholder="e.g., headache, fever, nausea..."
                    value={currentSymptom}
                    onChange={(e) => setCurrentSymptom(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSymptom()}
                  />
                  <Button onClick={addSymptom} size="icon" variant="medical">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Common Symptoms */}
              <div className="space-y-3">
                <Label>Quick select common symptoms</Label>
                <div className="flex flex-wrap gap-2">
                  {commonSymptoms.map((symptom) => (
                    <Badge
                      key={symptom}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      onClick={() => {
                        if (!symptoms.includes(symptom)) {
                          setSymptoms([...symptoms, symptom]);
                        }
                      }}
                    >
                      {symptom}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Selected Symptoms */}
              {symptoms.length > 0 && (
                <div className="space-y-3">
                  <Label>Selected symptoms</Label>
                  <div className="flex flex-wrap gap-2">
                    {symptoms.map((symptom) => (
                      <Badge
                        key={symptom}
                        className="bg-primary text-primary-foreground"
                      >
                        {symptom}
                        <button
                          onClick={() => removeSymptom(symptom)}
                          className="ml-2 hover:text-destructive"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Detailed Description */}
              <div className="space-y-3">
                <Label htmlFor="description">Additional details (optional)</Label>
                <Textarea
                  id="description"
                  placeholder="When did symptoms start? How severe are they? Any triggers you've noticed?"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Patient Information */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Patient Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="age"
                      placeholder="Age"
                      className="pl-10"
                      value={patientData.age}
                      onChange={(e) => setPatientData({...patientData, age: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <div className="relative">
                    <Weight className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="weight"
                      placeholder="Weight"
                      className="pl-10"
                      value={patientData.weight}
                      onChange={(e) => setPatientData({...patientData, weight: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select onValueChange={(value) => setPatientData({...patientData, gender: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="allergies">Known allergies</Label>
                <Input
                  id="allergies"
                  placeholder="e.g., penicillin, peanuts, shellfish..."
                  value={patientData.allergies}
                  onChange={(e) => setPatientData({...patientData, allergies: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="medications">Current medications</Label>
                <Input
                  id="medications"
                  placeholder="List any medications you're taking..."
                  value={patientData.medications}
                  onChange={(e) => setPatientData({...patientData, medications: e.target.value})}
                />
              </div>

              <Separator />

              <div className="flex items-start gap-3 p-4 bg-warning/10 rounded-lg border border-warning/20">
                <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-warning mb-1">Important Notice</p>
                  <p className="text-muted-foreground">
                    This AI tool provides general health information only. Always consult healthcare professionals for medical advice.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto mt-8 text-center">
          <Button 
            variant="medical" 
            size="lg" 
            className="text-lg px-12 py-4"
            disabled={symptoms.length === 0}
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Analyze Symptoms
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SymptomChecker;