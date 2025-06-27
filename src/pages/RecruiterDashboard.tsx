
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Brain, Users, FileText, BarChart3, Moon, Sun, Activity, CheckCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ConsultantManager from "@/components/ConsultantManager";
import JobDescriptionsManager from "@/components/JobDescriptionsManager";

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const agentMetrics = [
    {
      agent: "SBERT Matching Engine",
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
    <div className={`min-h-screen professional-gradient smooth-transition ${isDark ? 'dark' : ''}`}>
      {/* Professional Header */}
      <header className="glass-surface border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="rounded-xl">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Home
              </Button>
              <div className="h-6 w-px bg-slate-300 dark:bg-slate-600"></div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-sky-500 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-200">
                    Recruiter Portal
                  </h1>
                  <p className="text-sm professional-text">Internal Talent Management</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={toggleTheme} className="rounded-xl">
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Badge className="bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800 px-4 py-2 rounded-full">
                All Systems Online
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card hover:scale-[1.02] smooth-transition">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium professional-text">Active JDs</p>
                  <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">24</p>
                  <p className="text-sm text-green-600 dark:text-green-400 font-medium">+12% this week</p>
                </div>
                <div className="w-12 h-12 bg-sky-100 dark:bg-sky-900/20 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-sky-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card hover:scale-[1.02] smooth-transition">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium professional-text">Active Consultants</p>
                  <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">156</p>
                  <p className="text-sm text-green-600 dark:text-green-400 font-medium">+8% this week</p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card hover:scale-[1.02] smooth-transition">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium professional-text">AI Accuracy</p>
                  <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">98.2%</p>
                  <p className="text-sm text-green-600 dark:text-green-400 font-medium">+0.3% this week</p>
                </div>
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card hover:scale-[1.02] smooth-transition">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium professional-text">Matches Today</p>
                  <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">47</p>
                  <p className="text-sm text-green-600 dark:text-green-400 font-medium">+23% this week</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="consultants" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 glass-surface p-1 rounded-2xl h-14">
            <TabsTrigger value="consultants" className="rounded-xl data-[state=active]:bg-sky-500 data-[state=active]:text-white font-medium">
              Consultant Profiles
            </TabsTrigger>
            <TabsTrigger value="jds" className="rounded-xl data-[state=active]:bg-sky-500 data-[state=active]:text-white font-medium">
              Job Descriptions
            </TabsTrigger>
            <TabsTrigger value="agents" className="rounded-xl data-[state=active]:bg-sky-500 data-[state=active]:text-white font-medium">
              AI Monitoring
            </TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-xl data-[state=active]:bg-sky-500 data-[state=active]:text-white font-medium">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="consultants">
            <ConsultantManager />
          </TabsContent>

          <TabsContent value="jds">
            <JobDescriptionsManager />
          </TabsContent>

          <TabsContent value="agents">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-sky-600" />
                  <span>AI Agent Performance Monitoring</span>
                </CardTitle>
                <CardDescription>Real-time metrics and health monitoring for the AI matching framework</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {agentMetrics.map((agent) => (
                    <Card key={agent.agent} className="glass-surface border border-slate-200 dark:border-slate-700">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center space-x-4">
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                            <div>
                              <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-lg">{agent.agent}</h3>
                              <Badge className="bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800 mt-1">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                {agent.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className="bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-900/20 dark:text-sky-400 dark:border-sky-800 px-3 py-1">
                              {agent.processed.toLocaleString()} processed today
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="text-center p-4 bg-sky-50 dark:bg-sky-900/20 rounded-xl">
                            <p className="text-sm professional-text mb-1">Avg Latency</p>
                            <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{agent.latency}</p>
                          </div>
                          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                            <p className="text-sm professional-text mb-1">Error Rate</p>
                            <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{agent.errorRate}</p>
                          </div>
                          <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                            <p className="text-sm professional-text mb-1">Accuracy</p>
                            <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{agent.accuracy}</p>
                          </div>
                          <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                            <p className="text-sm professional-text mb-1">Queue Status</p>
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

          <TabsContent value="analytics">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-sky-600" />
                  <span>Analytics & Performance Insights</span>
                </CardTitle>
                <CardDescription>Generate detailed reports and analyze recruitment matching performance</CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 bg-sky-100 dark:bg-sky-900/20 rounded-2xl flex items-center justify-center mx-auto">
                    <BarChart3 className="w-8 h-8 text-sky-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">Advanced Analytics Dashboard</h3>
                    <p className="professional-text max-w-2xl mx-auto">
                      Comprehensive analytics including matching performance trends, agent efficiency metrics, 
                      consultant placement rates, and detailed reporting capabilities.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="p-6 rounded-2xl bg-sky-50 dark:bg-sky-900/20">
                      <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Matching Trends</h4>
                      <p className="text-sm professional-text">Track match quality and success rates over time</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-green-50 dark:bg-green-900/20">
                      <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Performance Metrics</h4>
                      <p className="text-sm professional-text">Monitor AI agent performance and optimization opportunities</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-red-50 dark:bg-red-900/20">
                      <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Custom Reports</h4>
                      <p className="text-sm professional-text">Generate detailed reports for stakeholders and analysis</p>
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
