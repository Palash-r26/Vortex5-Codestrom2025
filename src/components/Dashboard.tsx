import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
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
  Star,
  Download,
  RefreshCw
} from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const [analyses, setAnalyses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [generatingReport, setGeneratingReport] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalyses();
  }, [user]);

  const fetchAnalyses = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('symptom_analyses')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error("Error fetching analyses:", error);
        toast.error("Failed to load analyses");
        return;
      }

      setAnalyses(data || []);
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const generateReport = async (analysisId: string) => {
    setGeneratingReport(analysisId);
    try {
      const { data, error } = await supabase.functions.invoke('generate-report', {
        body: { analysisId }
      });

      if (error) {
        console.error("Report generation error:", error);
        toast.error("Failed to generate report");
        return;
      }

      // Download the report as JSON
      const blob = new Blob([JSON.stringify(data.report, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `medical-report-${data.report.reportId}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success("Report downloaded successfully!");
    } catch (error) {
      console.error("Error generating report:", error);
      toast.error("Failed to generate report");
    } finally {
      setGeneratingReport(null);
    }
  };

  if (!user) {
    return (
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            AI Diagnosis Dashboard
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Please log in to view your analysis results and medical history
          </p>
          <Button variant="medical">
            <a href="/auth">Log In</a>
          </Button>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4 text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading your medical data...</p>
        </div>
      </section>
    );
  }

  if (analyses.length === 0) {
    return (
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4 text-center">
          <Brain className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            No Analyses Yet
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Start by using the symptom checker to get your first AI analysis
          </p>
          <Button variant="medical" onClick={() => document.getElementById('symptoms')?.scrollIntoView()}>
            Analyze Symptoms
          </Button>
        </div>
      </section>
    );
  }

  const completedAnalyses = analyses.filter(a => a.analysis_result && a.analysis_result.conditions);
  const mostRecentAnalysis = completedAnalyses[0];

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
                {mostRecentAnalysis?.analysis_result?.conditions?.map((prediction: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{prediction.name}</h3>
                        <p className="text-muted-foreground text-sm">{prediction.description}</p>
                      </div>
                      <Badge 
                        variant={prediction.severity === 'mild' ? 'secondary' : prediction.severity === 'moderate' ? 'outline' : 'destructive'}
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
                        {prediction.matching_symptoms?.map((symptom: string, i: number) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {symptom}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )) || (
                  <div className="text-center py-8 text-muted-foreground">
                    <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No completed analyses available</p>
                  </div>
                )}
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
                {mostRecentAnalysis?.analysis_result?.medications?.map((med: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{med.name}</h3>
                        <p className="text-muted-foreground text-sm">{med.purpose}</p>
                      </div>
                      <Badge variant="outline">Recommended</Badge>
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
                        <p className="text-muted-foreground">{med.side_effects?.join(", ")}</p>
                      </div>
                    </div>
                    {med.precautions && (
                      <div className="mt-3 p-3 bg-warning/10 rounded border border-warning/20">
                        <p className="text-sm font-medium text-warning">Precautions:</p>
                        <p className="text-sm text-muted-foreground">{med.precautions}</p>
                      </div>
                    )}
                  </div>
                )) || (
                  <div className="text-center py-8 text-muted-foreground">
                    <Pill className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No medication recommendations available</p>
                  </div>
                )}
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
                  <span className="text-sm">Total Analyses</span>
                  <Badge>{analyses.length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Completed Analyses</span>
                  <Badge>{completedAnalyses.length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Average Confidence</span>
                  <Badge variant="outline">
                    {completedAnalyses.length > 0 
                      ? Math.round(completedAnalyses.reduce((sum, a) => sum + (a.confidence_score || 0), 0) / completedAnalyses.length)
                      : 0
                    }%
                  </Badge>
                </div>
                <Separator />
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-medical-success" />
                  <span className="text-sm">Dashboard Updated</span>
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
                {completedAnalyses.length > 0 && (
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => generateReport(completedAnalyses[0].id)}
                    disabled={generatingReport === completedAnalyses[0].id}
                  >
                    {generatingReport === completedAnalyses[0].id ? (
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4 mr-2" />
                    )}
                    Download Report
                  </Button>
                )}
                <Button variant="outline" className="w-full justify-start">
                  <Star className="w-4 h-4 mr-2" />
                  Save to Favorites
                </Button>
                <Button variant="medical" className="w-full" onClick={() => document.getElementById('symptoms')?.scrollIntoView()}>
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