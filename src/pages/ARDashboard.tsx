
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Moon, Sun, Upload, FileText, Users, Brain, Target, Mail, Plus, X, Search, BarChart3, Zap, Sparkles, Trophy, Eye, Download, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const ARDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState("jd-matching");
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [matches, setMatches] = useState([]);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailData, setEmailData] = useState({
    from: "user@company.com",
    to: "",
    cc: [],
    subject: "",
    body: ""
  });
  const [newCcEmail, setNewCcEmail] = useState("");
  
  // JD Matching State
  const [jdFile, setJdFile] = useState(null);
  const [jdText, setJdText] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  
  // One-to-One Matching State
  const [resumeFile, setResumeFile] = useState(null);
  const [selectedJD, setSelectedJD] = useState("");
  const [matchResult, setMatchResult] = useState(null);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const steps = [
    { name: "JD Analysis", icon: FileText, description: "Analyzing job requirements" },
    { name: "Profile Search", icon: Search, description: "Searching consultant database" },
    { name: "AI Matching", icon: Brain, description: "Computing similarity scores" },
    { name: "Results Ready", icon: Trophy, description: "Top matches identified" }
  ];

  const sampleJDs = [
    { id: "JD001", title: "Senior Full Stack Developer", skills: ["React", "Node.js", "Python"], experience: "5+ years" },
    { id: "JD002", title: "Data Scientist", skills: ["Python", "ML", "TensorFlow"], experience: "3+ years" },
    { id: "JD003", title: "DevOps Engineer", skills: ["AWS", "Docker", "Kubernetes"], experience: "4+ years" }
  ];

  const mockMatches = [
    {
      id: "EMP001",
      name: "Sarah Johnson",
      similarity: 94,
      skills: ["React", "TypeScript", "Node.js", "AWS"],
      experience: "6 years",
      avatar: "SJ",
      label: "Perfect Match",
      reasoning: "Exceptional alignment in core technologies and experience level"
    },
    {
      id: "EMP002", 
      name: "Mike Chen",
      similarity: 87,
      skills: ["Python", "Django", "PostgreSQL", "Docker"],
      experience: "5 years",
      avatar: "MC",
      label: "Great Match",
      reasoning: "Strong technical skills with complementary backend expertise"
    },
    {
      id: "EMP003",
      name: "Emily Rodriguez",
      similarity: 82,
      skills: ["Vue.js", "Express", "MongoDB", "GraphQL"],
      experience: "4 years", 
      avatar: "ER",
      label: "Good Match",
      reasoning: "Solid foundation with potential for growth in required areas"
    }
  ];

  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsProcessing(false);
            setMatches(mockMatches);
            setCurrentStep(3);
            toast({
              title: "Analysis Complete!",
              description: "Found 3 excellent matches for your requirements"
            });
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 800);
      
      // Update steps
      setTimeout(() => setCurrentStep(1), 1500);
      setTimeout(() => setCurrentStep(2), 3000);
      
      return () => clearInterval(interval);
    }
  }, [isProcessing]);

  const handleJDUpload = () => {
    if (!jobTitle) {
      toast({ title: "Missing Information", description: "Please provide a job title", variant: "destructive" });
      return;
    }
    setIsProcessing(true);
    setProgress(0);
    setCurrentStep(0);
    setMatches([]);
  };

  const handleOneToOneMatch = () => {
    if (!resumeFile || !selectedJD) {
      toast({ title: "Missing Files", description: "Please upload resume and select JD", variant: "destructive" });
      return;
    }
    
    const mockResult = {
      similarity: 89,
      strengths: ["Technical skills alignment", "Experience level match", "Domain expertise"],
      gaps: ["Certification requirements", "Specific framework experience"],
      recommendation: "Highly recommended with minor skill development"
    };
    
    setMatchResult(mockResult);
    toast({ title: "Match Analysis Complete", description: `${mockResult.similarity}% compatibility score` });
  };

  const addCcEmail = () => {
    if (newCcEmail && !emailData.cc.includes(newCcEmail)) {
      setEmailData(prev => ({ ...prev, cc: [...prev.cc, newCcEmail] }));
      setNewCcEmail("");
    }
  };

  const removeCcEmail = (email) => {
    setEmailData(prev => ({ ...prev, cc: prev.cc.filter(e => e !== email) }));
  };

  const sendEmail = () => {
    toast({ title: "Email Sent!", description: "Match results have been sent successfully" });
    setShowEmailModal(false);
  };

  const prepareEmail = () => {
    setEmailData({
      from: "user@company.com",
      to: "",
      cc: [],
      subject: `Top 3 Consultant Matches - ${jobTitle}`,
      body: `Hi,\n\nI've found excellent consultant matches for the ${jobTitle} position:\n\n🏆 ${matches[0]?.name} - ${matches[0]?.similarity}% match\n🥈 ${matches[1]?.name} - ${matches[1]?.similarity}% match\n🥉 ${matches[2]?.name} - ${matches[2]?.similarity}% match\n\nDetailed profiles are attached.\n\nBest regards,\nRadarX AI System`
    });
    setShowEmailModal(true);
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${isDark ? 'dark bg-gradient-to-br from-gray-900 via-slate-900 to-black' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'}`}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-float"></div>
      </div>

      {/* Header */}
      <header className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border-b border-white/20 dark:border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="rounded-full glass-effect">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Home
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-red-600 rounded-2xl flex items-center justify-center">
                  <Target className="text-white w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">
                    <span className="text-gray-900 dark:text-white">Radar</span>
                    <span className="text-red-500">X</span>
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">AR Requestor Portal</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={toggleTheme} className="rounded-full glass-effect">
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Tab Navigation */}
        <div className="flex space-x-2 mb-8">
          {[
            { id: "jd-matching", label: "JD to Top 3 Matches", icon: Trophy },
            { id: "one-to-one", label: "One-to-One Matching", icon: Target },
            { id: "resume-projects", label: "Resume to Projects", icon: BarChart3 }
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-2xl px-6 py-3 ${activeTab === tab.id ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-xl' : 'glass-effect hover:bg-white/20 dark:hover:bg-black/20'}`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* JD to Top 3 Matches Tab */}
        {activeTab === "jd-matching" && (
          <div className="space-y-8">
            {/* Upload Section */}
            <Card className="glass-effect border-white/30 dark:border-white/10 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
              <CardHeader className="relative">
                <CardTitle className="flex items-center space-x-3 text-2xl">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                    <Upload className="w-5 h-5 text-white" />
                  </div>
                  <span>Job Description Analysis</span>
                </CardTitle>
                <CardDescription>Upload your JD or enter details to find the perfect consultant matches</CardDescription>
              </CardHeader>
              <CardContent className="relative space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Job Title *</label>
                      <Input
                        placeholder="e.g., Senior Full Stack Developer"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        className="glass-effect border-white/50 dark:border-white/20 rounded-xl h-12"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Job Description</label>
                      <Textarea
                        placeholder="Paste or type the job description here..."
                        value={jdText}
                        onChange={(e) => setJdText(e.target.value)}
                        rows={4}
                        className="glass-effect border-white/50 dark:border-white/20 rounded-xl"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Upload JD File (Optional)</label>
                      <div className="border-2 border-dashed border-gray-300/50 dark:border-gray-600/50 rounded-2xl p-6 text-center glass-effect hover:bg-white/10 dark:hover:bg-black/10 transition-all">
                        <FileText className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Drag & drop or{" "}
                          <label className="text-blue-500 cursor-pointer hover:underline">
                            browse files
                            <input type="file" className="hidden" accept=".pdf,.doc,.docx,.txt" onChange={(e) => setJdFile(e.target.files[0])} />
                          </label>
                        </p>
                      </div>
                      {jdFile && (
                        <div className="mt-2 flex items-center space-x-2 glass-effect p-3 rounded-xl">
                          <FileText className="w-4 h-4 text-green-500" />
                          <span className="text-sm">{jdFile.name}</span>
                          <Button variant="ghost" size="sm" onClick={() => setJdFile(null)}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleJDUpload}
                  disabled={isProcessing || !jobTitle}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg"
                >
                  {isProcessing ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Analyzing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-5 h-5" />
                      <span>Find Top 3 Matches</span>
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Progress Tracker */}
            {(isProcessing || matches.length > 0) && (
              <Card className="glass-effect border-white/30 dark:border-white/10 shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    <span>AI Processing Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Overall Progress</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {steps.map((step, index) => (
                      <div key={step.name} className={`p-4 rounded-2xl glass-effect ${index <= currentStep ? 'bg-green-500/10 border-green-500/30' : 'bg-gray-500/10 border-gray-500/30'} border`}>
                        <div className="flex items-center space-x-3 mb-2">
                          <step.icon className={`w-5 h-5 ${index <= currentStep ? 'text-green-500' : 'text-gray-400'}`} />
                          <span className={`font-medium text-sm ${index <= currentStep ? 'text-green-700 dark:text-green-300' : 'text-gray-500'}`}>{step.name}</span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{step.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Results */}
            {matches.length > 0 && (
              <Card className="glass-effect border-white/30 dark:border-white/10 shadow-2xl">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Trophy className="w-6 h-6 text-yellow-500" />
                      <span>Top 3 Consultant Matches</span>
                    </CardTitle>
                    <CardDescription>AI-ranked profiles with detailed analysis</CardDescription>
                  </div>
                  <Button onClick={prepareEmail} className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Results
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  {matches.map((match, index) => (
                    <Card key={match.id} className="glass-effect border-white/40 dark:border-white/20 hover:bg-white/10 dark:hover:bg-black/10 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl ${
                              index === 0 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                              index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-600' :
                              'bg-gradient-to-r from-orange-400 to-red-500'
                            }`}>
                              {match.avatar}
                            </div>
                            <div>
                              <h3 className="text-xl font-bold">{match.name}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">ID: {match.id} • {match.experience}</p>
                              <Badge className={`mt-1 ${
                                index === 0 ? 'bg-green-100/50 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                                index === 1 ? 'bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                                'bg-orange-100/50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                              }`}>
                                {match.label}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                              {match.similarity}%
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Match Score</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">Key Skills</h4>
                            <div className="flex flex-wrap gap-2">
                              {match.skills.map((skill) => (
                                <Badge key={skill} className="glass-effect bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="p-4 rounded-xl glass-effect bg-gray-50/50 dark:bg-gray-800/50">
                            <h4 className="font-medium mb-2">AI Analysis</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{match.reasoning}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* One-to-One Matching Tab */}
        {activeTab === "one-to-one" && (
          <div className="space-y-8">
            <Card className="glass-effect border-white/30 dark:border-white/10 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-2xl">
                  <Target className="w-6 h-6 text-blue-500" />
                  <span>One-to-One Matching</span>
                </CardTitle>
                <CardDescription>Compare a specific resume against a job description</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <label className="text-sm font-medium block">Upload Resume</label>
                    <div className="border-2 border-dashed border-gray-300/50 dark:border-gray-600/50 rounded-2xl p-6 text-center glass-effect hover:bg-white/10 dark:hover:bg-black/10 transition-all">
                      <FileText className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Upload candidate resume
                      </p>
                      <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={(e) => setResumeFile(e.target.files[0])} />
                    </div>
                    {resumeFile && (
                      <div className="flex items-center space-x-2 glass-effect p-3 rounded-xl">
                        <FileText className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{resumeFile.name}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <label className="text-sm font-medium block">Select Job Description</label>
                    <div className="space-y-2">
                      {sampleJDs.map((jd) => (
                        <div
                          key={jd.id}
                          className={`p-4 rounded-xl glass-effect cursor-pointer transition-all ${
                            selectedJD === jd.id ? 'bg-blue-500/20 border-blue-500/50' : 'hover:bg-white/10 dark:hover:bg-black/10'
                          } border ${selectedJD === jd.id ? 'border-blue-500/50' : 'border-white/30 dark:border-white/10'}`}
                          onClick={() => setSelectedJD(jd.id)}
                        >
                          <h4 className="font-medium">{jd.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{jd.experience} • {jd.skills.join(", ")}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleOneToOneMatch}
                  disabled={!resumeFile || !selectedJD}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium py-4 rounded-xl"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Analyze Match
                </Button>
              </CardContent>
            </Card>

            {/* Match Result */}
            {matchResult && (
              <Card className="glass-effect border-white/30 dark:border-white/10 shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <BarChart3 className="w-6 h-6 text-purple-500" />
                    <span>Match Analysis Results</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-6xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent mb-2">
                      {matchResult.similarity}%
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">Compatibility Score</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-medium text-green-700 dark:text-green-300">✓ Strengths</h4>
                      {matchResult.strengths.map((strength, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm">{strength}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium text-orange-700 dark:text-orange-300">⚠ Areas to Develop</h4>
                      {matchResult.gaps.map((gap, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-sm">{gap}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl glass-effect bg-blue-50/50 dark:bg-blue-900/20">
                    <h4 className="font-medium mb-2">AI Recommendation</h4>
                    <p className="text-sm">{matchResult.recommendation}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Resume to Projects Tab */}
        {activeTab === "resume-projects" && (
          <div className="space-y-8">
            <Card className="glass-effect border-white/30 dark:border-white/10 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-2xl">
                  <BarChart3 className="w-6 h-6 text-purple-500" />
                  <span>Resume to Project Suitability</span>
                </CardTitle>
                <CardDescription>Analyze which projects a candidate is best suited for</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-gray-300/50 dark:border-gray-600/50 rounded-2xl p-8 text-center glass-effect hover:bg-white/10 dark:hover:bg-black/10 transition-all">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium mb-2">Upload Candidate Resume</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Drag & drop or click to upload resume for project matching analysis
                  </p>
                  <Button className="glass-effect">
                    <Upload className="w-4 h-4 mr-2" />
                    Browse Files
                  </Button>
                </div>
                
                {/* Sample Project Matches */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  {[
                    { name: "E-commerce Platform", match: 92, skills: ["React", "Node.js", "MongoDB"], type: "Web Development" },
                    { name: "AI Analytics Dashboard", match: 78, skills: ["Python", "ML", "Charts"], type: "Data Science" },
                    { name: "Mobile Banking App", match: 85, skills: ["React Native", "Security", "APIs"], type: "Mobile Development" }
                  ].map((project, index) => (
                    <Card key={project.name} className="glass-effect border-white/40 dark:border-white/20 hover:bg-white/10 dark:hover:bg-black/10 transition-all duration-300 hover:scale-105">
                      <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Eye className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">{project.name}</h3>
                        <div className="text-3xl font-bold text-purple-500 mb-2">{project.match}%</div>
                        <Badge className="mb-3 glass-effect bg-purple-100/50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                          {project.type}
                        </Badge>
                        <div className="flex flex-wrap gap-1 justify-center">
                          {project.skills.map((skill) => (
                            <Badge key={skill} className="text-xs glass-effect bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-effect border-white/50 dark:border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-blue-500" />
                  <span>Send Match Results</span>
                </span>
                <Button variant="ghost" onClick={() => setShowEmailModal(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">From:</label>
                  <Input value={emailData.from} disabled className="mt-1 bg-gray-100 dark:bg-gray-800" />
                </div>
                <div>
                  <label className="text-sm font-medium">To:</label>
                  <Input
                    placeholder="Enter recipient email"
                    value={emailData.to}
                    onChange={(e) => setEmailData(prev => ({ ...prev, to: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">CC:</label>
                  </div>
                  <div className="mt-1 space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {emailData.cc.map((email) => (
                        <div key={email} className="flex items-center space-x-1 glass-effect rounded-full px-3 py-1">
                          <span className="text-sm">{email}</span>
                          <Button variant="ghost" size="sm" onClick={() => removeCcEmail(email)} className="h-4 w-4 p-0">
                            <X className="w-3 h-3" />
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
                      <Button onClick={addCcEmail} size="sm" className="glass-effect">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Subject:</label>
                  <Input
                    value={emailData.subject}
                    onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Message:</label>
                  <Textarea
                    value={emailData.body}
                    onChange={(e) => setEmailData(prev => ({ ...prev, body: e.target.value }))}
                    rows={12}
                    className="mt-1 font-mono text-sm"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setShowEmailModal(false)} className="glass-effect">
                  Cancel
                </Button>
                <Button onClick={sendEmail} className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                  <Mail className="w-4 h-4 mr-2" />
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

export default ARDashboard;
