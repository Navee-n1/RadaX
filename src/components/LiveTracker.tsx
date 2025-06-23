
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, Mail, FileText, Users, Brain, Star, Trophy, Target, Send, Plus, Minus, Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface LiveTrackerProps {
  jdId: string;
  userEmail: string;
  jdData: any;
}

const LiveTracker = ({ jdId, userEmail, jdData }: LiveTrackerProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [matches, setMatches] = useState<any[]>([]);
  const [agentActivity, setAgentActivity] = useState<any[]>([]);
  const [showEmailPreview, setShowEmailPreview] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [ccEmails, setCcEmails] = useState<string[]>([]);
  const [newCcEmail, setNewCcEmail] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [emailHistory, setEmailHistory] = useState<any[]>([]);

  const steps = [
    { 
      name: "JD Analysis", 
      icon: FileText, 
      status: "completed",
      description: "Extracting skills and requirements using AI",
      details: "✓ Skills extracted ✓ Requirements parsed ✓ Context analyzed"
    },
    { 
      name: "Profile Comparison", 
      icon: Brain, 
      status: "completed",
      description: "SBERT semantic analysis in progress",
      details: "✓ 156 profiles analyzed ✓ Similarity scores calculated"
    },
    { 
      name: "Intelligent Ranking", 
      icon: Trophy, 
      status: "completed",
      description: "AI ranking top matching profiles",
      details: "✓ Top 3 profiles identified ✓ Scores validated"
    },
    { 
      name: "Email Preparation", 
      icon: Mail, 
      status: emailSent ? "completed" : "in-progress",
      description: `Ready to send results to ${userEmail}`,
      details: emailSent ? "✓ Email sent successfully" : "⏳ Awaiting send confirmation"
    }
  ];

  // Simulate real-time progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 75) return 75; // Stop at 75% until email is sent
        return prev + Math.random() * 8;
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  // Update current step based on progress
  useEffect(() => {
    if (progress >= 25 && currentStep < 1) setCurrentStep(1);
    if (progress >= 50 && currentStep < 2) setCurrentStep(2);
    if (progress >= 75 && currentStep < 3) setCurrentStep(3);
    if (emailSent && currentStep < 4) {
      setCurrentStep(4);
      setProgress(100);
    }
  }, [progress, currentStep, emailSent]);

  // Simulate agent activity logs
  useEffect(() => {
    const activities = [
      { message: "🧠 SBERT Engine: Analyzing job requirements...", timestamp: new Date().toLocaleTimeString(), type: "analysis" },
      { message: "🔍 Comparison Agent: Processing 156 consultant profiles", timestamp: new Date().toLocaleTimeString(), type: "processing" },
      { message: "📊 Ranking System: Calculating semantic similarity scores", timestamp: new Date().toLocaleTimeString(), type: "ranking" },
      { message: "🎯 Smart Filter: Identifying top 3 matches with 85%+ scores", timestamp: new Date().toLocaleTimeString(), type: "filtering" },
      { message: "✨ AI Insight: Generated detailed explanations for each match", timestamp: new Date().toLocaleTimeString(), type: "insights" },
      { message: "📧 Communication Hub: Email template prepared and ready", timestamp: new Date().toLocaleTimeString(), type: "communication" }
    ];

    let activityIndex = 0;
    const activityInterval = setInterval(() => {
      if (activityIndex < activities.length) {
        setAgentActivity(prev => [...prev, {
          ...activities[activityIndex],
          id: Date.now() + activityIndex
        }]);
        activityIndex++;
      }
    }, 2500);

    return () => clearInterval(activityInterval);
  }, []);

  // Simulate finding matches
  useEffect(() => {
    if (progress >= 60) {
      setMatches([
        {
          id: "EMP-2024-001",
          name: "Sarah Johnson",
          similarity: 94,
          label: "Highly Recommended",
          skills: ["React", "TypeScript", "Node.js", "AWS", "GraphQL"],
          experience: "5 years",
          vertical: "Full Stack Development",
          highlights: ["Expert React developer", "Strong TypeScript skills", "AWS certified"],
          missing: ["Docker experience"],
          explanation: "Exceptional match with 94% similarity. Strong alignment in core technologies including React, TypeScript, and Node.js. AWS certification adds significant value."
        },
        {
          id: "EMP-2024-002",
          name: "Mike Chen", 
          similarity: 89,
          label: "Recommended",
          skills: ["Python", "Machine Learning", "TensorFlow", "AWS", "Docker"],
          experience: "7 years",
          vertical: "AI/ML Engineering",
          highlights: ["ML expertise", "TensorFlow specialist", "DevOps skills"],
          missing: ["Frontend experience"],
          explanation: "Strong technical match with excellent ML background. Python expertise and AWS knowledge align well with requirements. Docker skills are a bonus."
        },
        {
          id: "EMP-2024-003",
          name: "Emily Rodriguez",
          similarity: 85,
          label: "Explore",
          skills: ["Java", "Spring Boot", "Microservices", "Kubernetes", "PostgreSQL"],
          experience: "6 years",
          vertical: "Backend Engineering",
          highlights: ["Microservices expert", "Kubernetes certified", "Database optimization"],
          missing: ["React knowledge", "TypeScript"],
          explanation: "Solid backend match with microservices expertise. Java and Spring Boot skills are valuable, though frontend skills need development."
        }
      ]);

      // Prepare email content
      setEmailSubject(`Top 3 Consultant Matches for ${jdData.title} - JD ${jdId}`);
      setEmailBody(`Hi there,

Our AI matching system has identified the top 3 consultant matches for your job requisition "${jdData.title}".

Here are the results:

🏆 **Sarah Johnson** (94% match - Highly Recommended)
- Skills: React, TypeScript, Node.js, AWS, GraphQL
- Experience: 5 years in Full Stack Development
- Why: Exceptional alignment with core technologies

🥈 **Mike Chen** (89% match - Recommended) 
- Skills: Python, Machine Learning, TensorFlow, AWS, Docker
- Experience: 7 years in AI/ML Engineering
- Why: Strong technical background with ML expertise

🥉 **Emily Rodriguez** (85% match - Explore)
- Skills: Java, Spring Boot, Microservices, Kubernetes
- Experience: 6 years in Backend Engineering
- Why: Solid backend skills with microservices expertise

Detailed profiles and recommendations are attached.

Best regards,
RadarX AI Matching System`);
    }
  }, [progress, jdData.title, jdId]);

  const addCcEmail = () => {
    if (newCcEmail && !ccEmails.includes(newCcEmail)) {
      setCcEmails([...ccEmails, newCcEmail]);
      setNewCcEmail("");
    }
  };

  const removeCcEmail = (email: string) => {
    setCcEmails(ccEmails.filter(e => e !== email));
  };

  const sendEmail = () => {
    setEmailSent(true);
    setShowEmailPreview(false);
    setEmailHistory([
      {
        id: Date.now(),
        to: userEmail,
        cc: ccEmails,
        subject: emailSubject,
        sentAt: new Date().toLocaleString(),
        status: "delivered"
      },
      ...emailHistory
    ]);
  };

  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < currentStep) return "completed";
    if (stepIndex === currentStep) return "in-progress";
    return "pending";
  };

  const getStepIcon = (stepIndex: number) => {
    const status = getStepStatus(stepIndex);
    const IconComponent = steps[stepIndex].icon;
    
    if (status === "completed") {
      return <CheckCircle className="w-6 h-6 text-green-500" />;
    } else if (status === "in-progress") {
      return <IconComponent className="w-6 h-6 text-blue-500 animate-pulse" />;
    } else {
      return <IconComponent className="w-6 h-6 text-gray-400" />;
    }
  };

  const getLabelColor = (label: string) => {
    switch (label) {
      case "Highly Recommended":
        return "bg-green-500/20 text-green-700 dark:text-green-300 border-green-300/30";
      case "Recommended":
        return "bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-300/30";
      case "Explore":
        return "bg-orange-500/20 text-orange-700 dark:text-orange-300 border-orange-300/30";
      default:
        return "bg-gray-500/20 text-gray-700 dark:text-gray-300 border-gray-300/30";
    }
  };

  return (
    <div className="flex gap-8 min-h-screen">
      {/* Left Sidebar - Sticky Progress Tracker */}
      <div className="w-80 sticky top-24 h-fit">
        <Card className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/10 shadow-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Target className="w-5 h-5 text-blue-500" />
              <span>Processing Status</span>
            </CardTitle>
            <CardDescription>Job ID: {jdId}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Overall Progress */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Overall Progress</span>
                <span className="text-gray-600 dark:text-gray-400">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            
            {/* Step Progress */}
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={step.name} className="flex items-start space-x-3">
                  <div className="mt-1">
                    {getStepIcon(index)}
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <p className="font-medium text-sm text-gray-900 dark:text-white">{step.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{step.description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">{step.details}</p>
                    <Badge 
                      className={`text-xs ${
                        getStepStatus(index) === "completed" ? "bg-green-100/50 dark:bg-green-900/30 text-green-700 dark:text-green-300" :
                        getStepStatus(index) === "in-progress" ? "bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" :
                        "bg-gray-100/50 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {getStepStatus(index) === "completed" ? "✓ Completed" :
                       getStepStatus(index) === "in-progress" ? "⏳ Processing" :
                       "⏸ Pending"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            {/* Send Email Button */}
            {currentStep >= 3 && !emailSent && (
              <Button
                onClick={() => setShowEmailPreview(true)}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Results
              </Button>
            )}
          </CardContent>
        </Card>

        {/* AI Agent Activity */}
        <Card className="mt-6 backdrop-blur-xl bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/10">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Brain className="w-5 h-5 text-purple-500" />
              <span>AI Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {agentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-xl bg-white/30 dark:bg-black/30 backdrop-blur-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 animate-pulse"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white font-medium">{activity.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Content - Dynamic Results */}
      <div className="flex-1 space-y-8">
        {/* Top 3 Matches */}
        {matches.length > 0 && (
          <Card className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/10 shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-2xl">
                <Trophy className="w-6 h-6 text-yellow-500" />
                <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Top 3 Consultant Matches
                </span>
              </CardTitle>
              <CardDescription className="text-base">
                AI-ranked profiles with detailed scoring and explanations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {matches.map((match, index) => (
                <Card key={match.id} className="backdrop-blur-sm bg-white/30 dark:bg-black/30 border-white/40 dark:border-white/20 hover:bg-white/40 dark:hover:bg-black/40 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg ${
                          index === 0 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                          index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-600' :
                          'bg-gradient-to-r from-orange-400 to-red-500'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{match.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">ID: {match.id} • {match.experience} • {match.vertical}</p>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className="text-3xl font-bold text-gray-900 dark:text-white">{match.similarity}%</div>
                        <Badge className={`${getLabelColor(match.label)} px-3 py-1 rounded-full font-medium`}>
                          {match.label}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Key Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {match.skills.map((skill: string) => (
                            <Badge key={skill} className="bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200/30 dark:border-blue-700/30">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-green-700 dark:text-green-300 mb-2">✓ Highlights</h4>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            {match.highlights.map((highlight: string, idx: number) => (
                              <li key={idx}>• {highlight}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-orange-700 dark:text-orange-300 mb-2">⚠ Areas to Develop</h4>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            {match.missing.map((missing: string, idx: number) => (
                              <li key={idx}>• {missing}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-xl bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">AI Explanation</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{match.explanation}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Email History */}
        {emailHistory.length > 0 && (
          <Card className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-blue-500" />
                <span>Email History</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {emailHistory.map((email) => (
                  <div key={email.id} className="p-4 rounded-xl bg-white/30 dark:bg-black/30 backdrop-blur-sm border border-white/40 dark:border-white/20">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-gray-900 dark:text-white">{email.subject}</div>
                      <Badge className="bg-green-100/50 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                        {email.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <p>To: {email.to}</p>
                      {email.cc.length > 0 && <p>CC: {email.cc.join(', ')}</p>}
                      <p>Sent: {email.sentAt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Email Preview Modal */}
      {showEmailPreview && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto backdrop-blur-xl bg-white/95 dark:bg-black/95 border-white/50 dark:border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Email Preview</span>
                <Button variant="ghost" onClick={() => setShowEmailPreview(false)}>
                  ✕
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">To:</label>
                  <Input value={userEmail} disabled className="mt-1 bg-gray-100 dark:bg-gray-800" />
                </div>
                
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">CC:</label>
                    <Button variant="ghost" size="sm" onClick={() => setNewCcEmail("")}>
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="mt-1 space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {ccEmails.map((email) => (
                        <div key={email} className="flex items-center space-x-1 bg-blue-100 dark:bg-blue-900 rounded-full px-3 py-1">
                          <span className="text-sm">{email}</span>
                          <Button variant="ghost" size="sm" onClick={() => removeCcEmail(email)} className="h-4 w-4 p-0">
                            <Minus className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add CC email"
                        value={newCcEmail}
                        onChange={(e) => setNewCcEmail(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addCcEmail()}
                      />
                      <Button onClick={addCcEmail} size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Subject:</label>
                  <Input
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Message:</label>
                  <Textarea
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    rows={12}
                    className="mt-1 font-mono text-sm"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setShowEmailPreview(false)}>
                  Cancel
                </Button>
                <Button onClick={sendEmail} className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                  <Send className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LiveTracker;
