
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Brain, Users, FileText, AlertCircle, BarChart3, Moon, Sun, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RecruiterProfileManager from "@/components/RecruiterProfileManager";

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const agentMetrics = [
    {
      agent: "SBERT Comparison Engine",
      status: "active",
      latency: "0.8s",
      errorRate: "0.0%",
      processed: 2847,
      accuracy: "98.7%"
    },
    {
      agent: "Smart Ranking System", 
      status: "active",
      latency: "0.6s",
      errorRate: "0.1%",
      processed: 1543,
      accuracy: "96.4%"
    },
    {
      agent: "Communication Hub",
      status: "active", 
      latency: "1.2s",
      errorRate: "0.0%",
      processed: 247,
      accuracy: "100%"
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-700 ${isDark ? 'dark bg-gradient-to-br from-gray-900 via-slate-900 to-black' : 'bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50'}`}>
      {/* Glassmorphic Header */}
      <header className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border-b border-white/20 dark:border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 rounded-full backdrop-blur-sm bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/30"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Button>
              <div className="h-6 w-px bg-white/30 dark:bg-white/20"></div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Recruiter Command Center
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="rounded-full backdrop-blur-sm bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Badge className="bg-green-500/20 text-green-700 dark:text-green-300 border-green-300/30 px-4 py-2 rounded-full">
                All Agents Online
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active JDs</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">24</p>
                  <p className="text-sm text-green-600 dark:text-green-400 font-medium">+12% this week</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Consultants</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">156</p>
                  <p className="text-sm text-green-600 dark:text-green-400 font-medium">+8% this week</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">AI Accuracy</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">98.2%</p>
                  <p className="text-sm text-green-600 dark:text-green-400 font-medium">+0.3% this week</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Matches Today</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">47</p>
                  <p className="text-sm text-green-600 dark:text-green-400 font-medium">+23% this week</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="consultants" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 backdrop-blur-xl bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/10 p-1 rounded-2xl">
            <TabsTrigger value="consultants" className="rounded-xl data-[state=active]:bg-white/50 dark:data-[state=active]:bg-black/50">
              Consultant Profiles
            </TabsTrigger>
            <TabsTrigger value="jds" className="rounded-xl data-[state=active]:bg-white/50 dark:data-[state=active]:bg-black/50">
              Job Descriptions
            </TabsTrigger>
            <TabsTrigger value="agents" className="rounded-xl data-[state=active]:bg-white/50 dark:data-[state=active]:bg-black/50">
              AI Monitoring
            </TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-xl data-[state=active]:bg-white/50 dark:data-[state=active]:bg-black/50">
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Consultants Tab */}
          <TabsContent value="consultants">
            <RecruiterProfileManager />
          </TabsContent>

          {/* Job Descriptions Tab */}
          <TabsContent value="jds">
            <Card className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span>Job Description Management</span>
                </CardTitle>
                <CardDescription>Monitor and manage all JD processing requests with detailed insights</CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto">
                    <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">JD Management Interface</h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                    Advanced JD tracking and management features will be available here with real-time processing status and detailed analytics.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Agent Monitoring Tab */}
          <TabsContent value="agents">
            <Card className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span>AI Agent Performance Monitoring</span>
                </CardTitle>
                <CardDescription>Real-time metrics and health monitoring for the AI multi-agent framework</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {agentMetrics.map((agent) => (
                    <Card key={agent.agent} className="backdrop-blur-sm bg-white/30 dark:bg-black/30 border-white/40 dark:border-white/20">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center space-x-4">
                            <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                            <div>
                              <h3 className="font-bold text-gray-900 dark:text-white text-lg">{agent.agent}</h3>
                              <Badge className="bg-green-100/50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-300/30 mt-1">
                                {agent.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className="bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-300/30 px-3 py-1">
                              {agent.processed.toLocaleString()} processed today
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="text-center p-4 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl backdrop-blur-sm">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg Latency</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{agent.latency}</p>
                          </div>
                          <div className="text-center p-4 bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl backdrop-blur-sm">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Error Rate</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{agent.errorRate}</p>
                          </div>
                          <div className="text-center p-4 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl backdrop-blur-sm">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Accuracy</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{agent.accuracy}</p>
                          </div>
                          <div className="text-center p-4 bg-gradient-to-br from-orange-50/50 to-red-50/50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl backdrop-blur-sm">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Queue Status</p>
                            <p className="text-2xl font-bold text-green-600 dark:text-green-400">Healthy</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span>Analytics & Performance Insights</span>
                </CardTitle>
                <CardDescription>Generate detailed reports and analyze recruitment matching performance</CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto">
                    <BarChart3 className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Advanced Analytics Dashboard</h3>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                      Comprehensive analytics including matching performance trends, agent efficiency metrics, 
                      consultant placement rates, and detailed reporting capabilities will be available here.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-100/50 to-cyan-100/50 dark:from-blue-900/20 dark:to-cyan-900/20 backdrop-blur-sm">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Matching Trends</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Track match quality and success rates over time</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-green-100/50 to-emerald-100/50 dark:from-green-900/20 dark:to-emerald-900/20 backdrop-blur-sm">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Performance Metrics</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Monitor AI agent performance and optimization opportunities</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-100/50 to-pink-100/50 dark:from-purple-900/20 dark:to-pink-900/20 backdrop-blur-sm">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Custom Reports</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Generate detailed reports for stakeholders and analysis</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default RecruiterDashboard;
