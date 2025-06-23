
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, FileText, Brain, Sparkles, Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const stats = [
    {
      title: "Active JDs",
      value: "24",
      icon: FileText,
      trend: "+12%",
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      title: "Available Consultants",
      value: "156",
      icon: Users,
      trend: "+8%",
      color: "from-green-500/20 to-emerald-500/20"
    },
    {
      title: "AI Agents Active",
      value: "3",
      icon: Brain,
      trend: "100%",
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: "Matches Found Today",
      value: "47",
      icon: Sparkles,
      trend: "+23%",
      color: "from-orange-500/20 to-red-500/20"
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-700 ${isDark ? 'dark bg-gradient-to-br from-gray-900 via-slate-900 to-black' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'}`}>
      {/* Glassmorphic Header */}
      <header className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border-b border-white/20 dark:border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Brain className="w-7 h-7 text-white" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  RadarX
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">AI-Powered Recruitment Intelligence</p>
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
              <Badge className="bg-green-500/20 text-green-700 dark:text-green-300 border-green-300/30 px-3 py-1 rounded-full">
                All Systems Active
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100/50 to-purple-100/50 dark:from-blue-900/30 dark:to-purple-900/30 backdrop-blur-sm rounded-full px-6 py-2 border border-blue-200/30 dark:border-blue-700/30">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Powered by Advanced GenAI</span>
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent leading-tight">
            Intelligent Recruitment<br />Matching Platform
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Leverage cutting-edge AI algorithms to automatically match job descriptions with consultant profiles, 
            providing ranked recommendations and detailed insights for optimal hiring decisions.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="group backdrop-blur-xl bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">{stat.trend} from last week</p>
                  </div>
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} backdrop-blur-sm border border-white/20 dark:border-white/10 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dashboard Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* AR Requestor Dashboard */}
          <Card className="group backdrop-blur-xl bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-700 hover:scale-105 hover:shadow-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-600/20 dark:to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardContent className="relative p-8 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">AR Requestor Portal</h3>
                  <p className="text-gray-600 dark:text-gray-400">Submit & track your recruitment requests</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Live progress tracking</span>
                  <Badge className="bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200/30 dark:border-blue-700/30">Real-time</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Top 3 ranked matches</span>
                  <Badge className="bg-green-100/50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200/30 dark:border-green-700/30">AI Powered</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Automated email notifications</span>
                  <Badge className="bg-purple-100/50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200/30 dark:border-purple-700/30">Smart Send</Badge>
                </div>
              </div>
              
              <Button 
                onClick={() => navigate('/ar-dashboard')} 
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Launch AR Portal
              </Button>
            </CardContent>
          </Card>

          {/* Recruiter Admin Console */}
          <Card className="group backdrop-blur-xl bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-700 hover:scale-105 hover:shadow-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 dark:from-green-600/20 dark:to-emerald-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardContent className="relative p-8 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Recruiter Command Center</h3>
                  <p className="text-gray-600 dark:text-gray-400">Manage profiles & AI matching system</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Advanced consultant search</span>
                  <Badge className="bg-green-100/50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200/30 dark:border-green-700/30">Smart Filters</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">AI agent monitoring</span>
                  <Badge className="bg-purple-100/50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200/30 dark:border-purple-700/30">Live Analytics</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Performance insights</span>
                  <Badge className="bg-orange-100/50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200/30 dark:border-orange-700/30">Reports</Badge>
                </div>
              </div>
              
              <Button 
                onClick={() => navigate('/recruiter-dashboard')} 
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Access Command Center
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* AI Agent Status */}
        <Card className="mt-16 backdrop-blur-xl bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 dark:from-purple-600/10 dark:to-pink-600/10"></div>
          <CardContent className="relative p-8">
            <div className="flex items-center space-x-3 mb-8">
              <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">AI Framework Status</h3>
              <div className="flex-1"></div>
              <Badge className="bg-green-500/20 text-green-700 dark:text-green-300 border-green-300/30 px-4 py-2 rounded-full animate-pulse">
                All Agents Online
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-600/20 dark:to-cyan-600/20 backdrop-blur-sm border border-blue-200/30 dark:border-blue-700/30 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                  <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse animation-delay-75"></div>
                  <div className="w-1 h-1 bg-green-200 rounded-full animate-pulse animation-delay-150"></div>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">SBERT Comparison Engine</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Advanced semantic similarity analysis</p>
                <div className="text-xs text-green-600 dark:text-green-400 font-medium">Latency: 0.8s | 99.9% uptime</div>
              </div>
              
              <div className="group p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 dark:from-green-600/20 dark:to-emerald-600/20 backdrop-blur-sm border border-green-200/30 dark:border-green-700/30 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                  <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse animation-delay-75"></div>
                  <div className="w-1 h-1 bg-green-200 rounded-full animate-pulse animation-delay-150"></div>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Smart Ranking System</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Intelligent profile prioritization</p>
                <div className="text-xs text-green-600 dark:text-green-400 font-medium">Processed: 2,847 matches today</div>
              </div>
              
              <div className="group p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-600/20 dark:to-pink-600/20 backdrop-blur-sm border border-purple-200/30 dark:border-purple-700/30 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                  <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse animation-delay-75"></div>
                  <div className="w-1 h-1 bg-green-200 rounded-full animate-pulse animation-delay-150"></div>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Communication Hub</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Automated notification delivery</p>
                <div className="text-xs text-green-600 dark:text-green-400 font-medium">Emails sent: 47 today</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Index;
