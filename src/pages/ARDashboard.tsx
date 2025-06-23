
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, FileText, Users, CheckCircle, Clock, Mail, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ARDashboard = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { name: "JD Compared", icon: FileText, status: "completed" },
    { name: "Profiles Ranked", icon: Users, status: "in-progress" },
    { name: "Email Sent", icon: Mail, status: "pending" }
  ];

  const topMatches = [
    {
      name: "Sarah Johnson",
      similarity: 94,
      skills: ["React", "TypeScript", "Node.js", "AWS"],
      experience: "5 years",
      status: "Available"
    },
    {
      name: "Mike Chen",
      similarity: 89,
      skills: ["Python", "Machine Learning", "Docker", "Kubernetes"],
      experience: "7 years",
      status: "Available"
    },
    {
      name: "Emily Rodriguez",
      similarity: 85,
      skills: ["Java", "Spring Boot", "Microservices", "Azure"],
      experience: "6 years",
      status: "Available"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 33 && currentStep < 1) setCurrentStep(1);
    if (progress >= 66 && currentStep < 2) setCurrentStep(2);
    if (progress >= 100 && currentStep < 3) setCurrentStep(3);
  }, [progress, currentStep]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-gray-900">AR Requestor Dashboard</h1>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              JD-2024-001
            </Badge>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Current Job Description */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span>Current Job Description</span>
            </CardTitle>
            <CardDescription>Senior Full Stack Developer - Remote</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Required Skills</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {["React", "Node.js", "TypeScript", "AWS", "PostgreSQL"].map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Experience Required</p>
                <p className="text-sm text-gray-900 mt-1">5+ years</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Location</p>
                <p className="text-sm text-gray-900 mt-1">Remote (US Timezone)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Real-Time Workflow Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Real-Time Workflow Progress</CardTitle>
            <CardDescription>AI agents are processing your job description</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Overall Progress</span>
                  <span className="text-gray-600">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-3" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {steps.map((step, index) => (
                  <div key={step.name} className="flex items-center space-x-3 p-4 rounded-lg bg-white border">
                    <div className={`p-2 rounded-full ${
                      index < currentStep ? 'bg-green-100' :
                      index === currentStep ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      {index < currentStep ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : index === currentStep ? (
                        <Clock className="w-5 h-5 text-blue-600 animate-spin" />
                      ) : (
                        <step.icon className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{step.name}</p>
                      <p className="text-sm text-gray-600">
                        {index < currentStep ? 'Completed' :
                         index === currentStep ? 'In Progress' : 'Pending'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Matching Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">JD Comparison Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-700">Completed</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                156 consultant profiles analyzed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Top Matches Found</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-700">3 Matches</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Similarity scores: 94%, 89%, 85%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Email Notification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                {progress >= 100 ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-700">Sent</span>
                  </>
                ) : (
                  <>
                    <Clock className="w-5 h-5 text-orange-600" />
                    <span className="font-medium text-orange-700">Pending</span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {progress >= 100 ? 'Email sent to your inbox' : 'Preparing email notification'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Top 3 Matches */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-green-600" />
              <span>Top 3 Consultant Matches</span>
            </CardTitle>
            <CardDescription>
              AI-ranked profiles based on skills, experience, and contextual relevance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topMatches.map((match, index) => (
                <div key={match.name} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{match.name}</h3>
                        <p className="text-sm text-gray-600">{match.experience} experience</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant="secondary" 
                        className={`${
                          match.similarity >= 90 ? 'bg-green-100 text-green-800' :
                          match.similarity >= 80 ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {match.similarity}% Match
                      </Badge>
                      <p className="text-sm text-gray-600 mt-1">{match.status}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Key Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {match.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ARDashboard;
