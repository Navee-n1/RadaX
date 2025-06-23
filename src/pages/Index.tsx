
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Users, Zap, Shield, ArrowRight, Sparkles, Rocket, Target, Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Index = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen smooth-transition ${isDark ? 'dark bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'}`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 glass-effect border-b border-white/20 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">RadarX</h1>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">AI-Powered Recruitment</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-700 dark:text-green-300 border-green-300/30 px-4 py-2 rounded-full animate-pulse-slow">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                AI Systems Online
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="rounded-full glass-effect hover:bg-white/20 dark:hover:bg-white/10"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20 space-y-8">
          <div className="space-y-6">
            <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-700 dark:text-blue-300 border-blue-300/30 px-6 py-2 rounded-full text-sm font-medium shimmer">
              <Rocket className="w-4 h-4 mr-2" />
              Next-Generation AI Recruitment Platform
            </Badge>
            <h1 className="text-6xl md:text-7xl font-extrabold gradient-text leading-tight">
              Revolutionize
              <br />
              <span className="relative">
                Talent Matching
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-full opacity-60"></div>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
              Harness the power of advanced AI to match consultants with job descriptions instantly. 
              <span className="gradient-text font-medium"> Smart. Fast. Precise.</span>
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <Button
              onClick={() => navigate('/ar-dashboard')}
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white px-10 py-4 rounded-2xl text-lg font-semibold shadow-2xl hover:shadow-blue-500/25 smooth-transition hover:scale-105"
            >
              <span className="relative z-10 flex items-center">
                <Target className="w-5 h-5 mr-3" />
                AR Requestor Portal
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 smooth-transition" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </Button>
            
            <Button
              onClick={() => navigate('/recruiter-dashboard')}
              variant="outline"
              size="lg"
              className="group glass-effect hover:bg-white/20 dark:hover:bg-white/10 border-white/30 dark:border-white/20 px-10 py-4 rounded-2xl text-lg font-semibold smooth-transition hover:scale-105"
            >
              <Users className="w-5 h-5 mr-3" />
              Recruiter Dashboard
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 smooth-transition" />
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            {
              icon: Brain,
              title: "AI-Powered Matching",
              description: "Advanced SBERT algorithms for precise skill matching",
              gradient: "from-purple-500 to-pink-500",
              delay: "0s"
            },
            {
              icon: Zap,
              title: "Lightning Fast",
              description: "Real-time processing and instant recommendations",
              gradient: "from-blue-500 to-cyan-500",
              delay: "0.1s"
            },
            {
              icon: Shield,
              title: "Enterprise Grade",
              description: "Secure, scalable, and reliable infrastructure",
              gradient: "from-green-500 to-emerald-500",
              delay: "0.2s"
            },
            {
              icon: Users,
              title: "Smart Analytics",
              description: "Comprehensive insights and performance tracking",
              gradient: "from-orange-500 to-red-500",
              delay: "0.3s"
            }
          ].map((feature, index) => (
            <Card key={index} className="glass-card border-0 smooth-transition hover:shadow-2xl" style={{animationDelay: feature.delay}}>
              <CardContent className="p-8 text-center space-y-4">
                <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg animate-float`} style={{animationDelay: feature.delay}}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="glass-card p-12 mb-20 text-center">
          <h2 className="text-3xl font-bold gradient-text mb-8">Powered by Advanced AI</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: "Matching Accuracy", value: "98.7%", icon: Target },
              { label: "Processing Speed", value: "<2s", icon: Zap },
              { label: "Success Rate", value: "94.3%", icon: Sparkles }
            ].map((stat, index) => (
              <div key={index} className="space-y-4">
                <div className="w-12 h-12 mx-auto bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-4xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center glass-card p-12 rounded-3xl">
          <h2 className="text-4xl font-bold gradient-text mb-6">Ready to Transform Your Recruitment?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the future of talent acquisition with RadarX's cutting-edge AI technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/ar-dashboard')}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold smooth-transition hover:scale-105 shadow-xl"
            >
              Get Started Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="glass-effect border-white/30 dark:border-white/20 px-8 py-3 rounded-xl font-semibold smooth-transition hover:scale-105"
            >
              Learn More
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
