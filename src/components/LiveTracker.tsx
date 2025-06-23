
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, Mail, FileText, Users, Brain, AlertCircle } from "lucide-react";

interface LiveTrackerProps {
  jdId: string;
  userEmail: string;
}

const LiveTracker = ({ jdId, userEmail }: LiveTrackerProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [matches, setMatches] = useState<any[]>([]);
  const [agentActivity, setAgentActivity] = useState<any[]>([]);

  const steps = [
    { 
      name: "JD Processing", 
      icon: FileText, 
      status: "completed",
      description: "Extracting skills and requirements"
    },
    { 
      name: "Profile Comparison", 
      icon: Brain, 
      status: "in-progress",
      description: "AI agents comparing consultant profiles"
    },
    { 
      name: "Ranking & Selection", 
      icon: Users, 
      status: "pending",
      description: "Ranking top matching profiles"
    },
    { 
      name: "Email Notification", 
      icon: Mail, 
      status: "pending",
      description: `Sending results to ${userEmail}`
    }
  ];

  // Simulate real-time progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 3;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Update current step based on progress
  useEffect(() => {
    if (progress >= 25 && currentStep < 1) setCurrentStep(1);
    if (progress >= 50 && currentStep < 2) setCurrentStep(2);
    if (progress >= 75 && currentStep < 3) setCurrentStep(3);
    if (progress >= 100 && currentStep < 4) setCurrentStep(4);
  }, [progress, currentStep]);

  // Simulate agent activity logs
  useEffect(() => {
    const activities = [
      "Comparison Agent: Processing JD requirements...",
      "Comparison Agent: Analyzed 156 consultant profiles",
      "Ranking Agent: Calculating similarity scores...",
      "Ranking Agent: Found 12 potential matches",
      "Communication Agent: Preparing email notification...",
    ];

    let activityIndex = 0;
    const activityInterval = setInterval(() => {
      if (activityIndex < activities.length) {
        setAgentActivity(prev => [...prev, {
          id: Date.now(),
          message: activities[activityIndex],
          timestamp: new Date().toLocaleTimeString()
        }]);
        activityIndex++;
      }
    }, 2000);

    return () => clearInterval(activityInterval);
  }, []);

  // Simulate finding matches
  useEffect(() => {
    if (progress >= 60) {
      setMatches([
        {
          name: "Sarah Johnson",
          similarity: 94,
          skills: ["React", "TypeScript", "Node.js"],
          experience: "5 years"
        },
        {
          name: "Mike Chen", 
          similarity: 89,
          skills: ["Python", "Machine Learning", "AWS"],
          experience: "7 years"
        },
        {
          name: "Emily Rodriguez",
          similarity: 85,
          skills: ["Java", "Spring Boot", "Microservices"],
          experience: "6 years"
        }
      ]);
    }
  }, [progress]);

  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < currentStep) return "completed";
    if (stepIndex === currentStep) return "in-progress";
    return "pending";
  };

  const getStepIcon = (stepIndex: number) => {
    const status = getStepStatus(stepIndex);
    const IconComponent = steps[stepIndex].icon;
    
    if (status === "completed") {
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    } else if (status === "in-progress") {
      return <IconComponent className="w-5 h-5 text-blue-600 animate-pulse" />;
    } else {
      return <IconComponent className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Live Processing Status</CardTitle>
          <CardDescription>Job Description ID: {jdId}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Overall Progress</span>
              <span className="text-gray-600">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {steps.map((step, index) => (
                <div key={step.name} className="flex items-start space-x-3 p-3 rounded-lg bg-white border">
                  <div className="mt-0.5">
                    {getStepIcon(index)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-900">{step.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{step.description}</p>
                    <Badge 
                      variant="outline" 
                      className={`mt-2 text-xs ${
                        getStepStatus(index) === "completed" ? "bg-green-50 text-green-700" :
                        getStepStatus(index) === "in-progress" ? "bg-blue-50 text-blue-700" :
                        "bg-gray-50 text-gray-600"
                      }`}
                    >
                      {getStepStatus(index) === "completed" ? "Completed" :
                       getStepStatus(index) === "in-progress" ? "Processing" :
                       "Pending"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Agent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-purple-600" />
            <span>AI Agent Activity</span>
          </CardTitle>
          <CardDescription>Real-time updates from the multi-agent framework</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {agentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-2 rounded bg-gray-50">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 animate-pulse"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.timestamp}</p>
                </div>
              </div>
            ))}
            {agentActivity.length === 0 && (
              <p className="text-gray-500 text-center py-4">Waiting for agent activity...</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Live Matches */}
      {matches.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-green-600" />
              <span>Top Matches Found</span>
            </CardTitle>
            <CardDescription>Real-time matching results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {matches.map((match, index) => (
                <div key={match.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{match.name}</p>
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
                    <div className="flex flex-wrap gap-1 mt-1">
                      {match.skills.slice(0, 2).map((skill: string) => (
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
      )}
    </div>
  );
};

export default LiveTracker;
