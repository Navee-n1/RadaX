import { Link } from "react-router-dom";
import { Radar, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="glass-effect border-b border-white/20 backdrop-blur-xl bg-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Radar className="w-8 h-8 text-white" />
              <span className="text-2xl font-bold">
                <span className="text-white">Radar</span>
                <span className="text-red-500">X</span>
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <Link to="/login" className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-full font-semibold transition-all duration-300 hover:scale-105">
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-float"></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
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
              <h1 className="text-6xl md:text-7xl font-bold gradient-text leading-tight">
                <span className="text-white">Radar</span>
                <span className="text-red-500">X</span>
              </h1>
              <p className="text-2xl md:text-3xl text-gray-300 font-light">
                The Radar for Talent
              </p>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Intelligent talent matching powered by advanced AI. Connect the right people with the right opportunities.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                to="/login"
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
              >
                <span className="flex items-center space-x-2">
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link 
                to="#features"
                className="px-8 py-4 glass-effect border border-white/20 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-2">AI-Powered Matching</h3>
              <p className="text-gray-300">Advanced algorithms to find the best talent.</p>
            </div>
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-2">Real-Time Analytics</h3>
              <p className="text-gray-300">Track your talent pipeline with insightful data.</p>
            </div>
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-2">Seamless Integration</h3>
              <p className="text-gray-300">Connect with your existing HR systems.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/20">
        <div className="container mx-auto text-center">
          <p className="text-gray-400 text-sm">
            © 2024 RadarX. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
