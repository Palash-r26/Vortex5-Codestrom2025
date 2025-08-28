import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Activity, 
  Brain, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Pill, 
  FileText,
  BarChart3,
  Calendar,
  Star
} from "lucide-react";

const Dashboard = () => {
  const mockPredictions = [
    {
      disease: "Common Cold",
      confidence: 85,
      severity: "mild",
      description: "Viral upper respiratory infection",
      symptoms: ["runny nose", "sore throat", "mild headache"]
    },
    {
      disease: "Seasonal Allergies",
      confidence: 72,
      severity: "mild",
      description: "Allergic rhinitis due to pollen exposure",
      symptoms: ["sneezing", "watery eyes", "nasal congestion"]
    },
    {
      disease: "Tension Headache",
      confidence: 68,
      severity: "mild",
      description: "Stress-related cephalgia",
      symptoms: ["headache", "neck tension", "fatigue"]
    }
  ];

  const mockMedications = [
    {
      name: "Acetaminophen",
      dosage: "500mg every 6 hours",
      duration: "3-5 days",
      route: "Oral",
      sideEffects: ["nausea", "dizziness"],
      purpose: "Pain relief and fever reduction"
    },
    {
      name: "Cetirizine",
      dosage: "10mg once daily",
      duration: "As needed",
      route: "Oral",
      sideEffects: ["drowsiness", "dry mouth"],
      purpose: "Allergy symptom relief"
    }
  ];

  return (
    <section className="py-20 bg-gradient-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            AI Diagnosis Dashboard
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive analysis results with explainable AI and safety recommendations
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Main Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Predictions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  AI Diagnosis Predictions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockPredictions.map((prediction, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{prediction.disease}</h3>
                        <p className="text-muted-foreground text-sm">{prediction.description}</p>
                      </div>
                      <Badge 
                        variant={prediction.severity === 'mild' ? 'secondary' : 'destructive'}
                        className="ml-2"
                      >
                        {prediction.severity}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Confidence Score</span>
                        <span className="font-medium">{prediction.confidence}%</span>
                      </div>
                      <Progress value={prediction.confidence} className="h-2" />
                    </div>
                    
                    <div className="mt-3">
                      <p className="text-sm text-muted-foreground mb-2">Matching Symptoms:</p>
                      <div className="flex flex-wrap gap-1">
                        {prediction.symptoms.map((symptom, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {symptom}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Medication Recommendations */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="w-5 h-5 text-primary" />
                  Recommended Medications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockMedications.map((med, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{med.name}</h3>
                        <p className="text-muted-foreground text-sm">{med.purpose}</p>
                      </div>
                      <Badge variant="outline">First-line</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Dosage:</span>
                        <p className="text-muted-foreground">{med.dosage}</p>
                      </div>
                      <div>
                        <span className="font-medium">Duration:</span>
                        <p className="text-muted-foreground">{med.duration}</p>
                      </div>
                      <div>
                        <span className="font-medium">Route:</span>
                        <p className="text-muted-foreground">{med.route}</p>
                      </div>
                      <div>
                        <span className="font-medium">Side Effects:</span>
                        <p className="text-muted-foreground">{med.sideEffects.join(", ")}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Safety Alert */}
            <Card className="shadow-card border-warning">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-warning">
                  <AlertTriangle className="w-5 h-5" />
                  Safety Notice
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <p>• AI predictions are for guidance only</p>
                  <p>• Consult healthcare provider for severe symptoms</p>
                  <p>• Follow medication instructions carefully</p>
                  <p>• Monitor for adverse reactions</p>
                </div>
                <Button variant="warning" className="w-full mt-4">
                  <FileText className="w-4 h-4 mr-2" />
                  Full Disclaimer
                </Button>
              </CardContent>
            </Card>

            {/* Analysis Summary */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Analysis Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Symptoms Analyzed</span>
                  <Badge>5</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Conditions Evaluated</span>
                  <Badge>12</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Processing Time</span>
                  <Badge variant="outline">2.3s</Badge>
                </div>
                <Separator />
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-medical-success" />
                  <span className="text-sm">Analysis Complete</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Set Medication Reminders
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Star className="w-4 h-4 mr-2" />
                  Save to Favorites
                </Button>
                <Button variant="medical" className="w-full">
                  <Clock className="w-4 h-4 mr-2" />
                  New Analysis
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;