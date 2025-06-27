
import { Link } from "react-router-dom";
import { Target, ArrowRight, Search, Users, Zap, Shield, BarChart3, Clock } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen professional-gradient text-slate-800 dark:text-slate-100">
      {/* Navigation */}
      <nav className="glass-surface border-b border-slate-200/50 dark:border-slate-700/50 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl flex items-center justify-center shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">
                <span className="text-slate-800 dark:text-slate-100">Radar</span>
                <span className="text-red-600">X</span>
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <Link 
                to="/login" 
                className="px-6 py-2 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Access Portal
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-slate-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-slate-400/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${6 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-bold leading-tight">
                <span className="text-slate-800 dark:text-slate-100">Radar</span>
                <span className="text-red-600">X</span>
              </h1>
              <p className="text-2xl md:text-3xl text-slate-600 dark:text-slate-400 font-light">
                Internal Talent Management System
              </p>
              <p className="text-xl text-slate-500 dark:text-slate-500 max-w-2xl mx-auto leading-relaxed">
                Advanced AI-powered talent matching for internal organizational excellence. Streamline your talent acquisition and management process.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                to="/login"
                className="px-8 py-4 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
              >
                <span className="flex items-center space-x-2">
                  <span>Access Portal</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link 
                to="#features"
                className="px-8 py-4 glass-surface border border-slate-200/50 dark:border-slate-700/50 rounded-full font-semibold text-lg hover:bg-white/20 dark:hover:bg-slate-800/20 transition-all duration-300 hover:scale-105 text-slate-700 dark:text-slate-300"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-800 dark:text-slate-100">Core Capabilities</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Comprehensive talent management tools designed for organizational excellence
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <div className="glass-card p-8 hover:scale-105 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-sky-100 to-sky-200 dark:from-sky-900/30 dark:to-sky-800/30 rounded-2xl flex items-center justify-center mb-6">
                <Search className="w-7 h-7 text-sky-600 dark:text-sky-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-100">AI-Powered Matching</h3>
              <p className="text-slate-600 dark:text-slate-400">Advanced algorithms to find the perfect talent match for your requirements.</p>
            </div>
            
            <div className="glass-card p-8 hover:scale-105 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 rounded-2xl flex items-center justify-center mb-6">
                <BarChart3 className="w-7 h-7 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-100">Real-Time Analytics</h3>
              <p className="text-slate-600 dark:text-slate-400">Track your talent pipeline with comprehensive insights and data visualization.</p>
            </div>
            
            <div className="glass-card p-8 hover:scale-105 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800/30 dark:to-slate-700/30 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-slate-600 dark:text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-100">Profile Management</h3>
              <p className="text-slate-600 dark:text-slate-400">Comprehensive consultant profile management with skill-based categorization.</p>
            </div>
            
            <div className="glass-card p-8 hover:scale-105 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="w-7 h-7 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-100">Live Tracking</h3>
              <p className="text-slate-600 dark:text-slate-400">Real-time status updates and progress monitoring for all recruitment activities.</p>
            </div>
            
            <div className="glass-card p-8 hover:scale-105 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-100">Automated Workflows</h3>
              <p className="text-slate-600 dark:text-slate-400">Streamlined processes with intelligent automation for enhanced efficiency.</p>
            </div>
            
            <div className="glass-card p-8 hover:scale-105 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-100">Secure & Compliant</h3>
              <p className="text-slate-600 dark:text-slate-400">Enterprise-grade security with full compliance for internal organizational use.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto text-center">
          <div className="glass-card p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-slate-800 dark:text-slate-100">Ready to Transform Your Talent Management?</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              Join our internal platform and experience the future of organizational talent acquisition.
            </p>
            <Link 
              to="/login"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-200/50 dark:border-slate-700/50">
        <div className="container mx-auto text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            © 2024 RadarX. Internal Talent Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
