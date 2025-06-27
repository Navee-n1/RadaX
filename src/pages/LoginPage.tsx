
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Eye, EyeOff, Target, Users, Search, Mail, Lock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [isRecruiter, setIsRecruiter] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Handle login logic here
    console.log("Login attempted:", { email, password, role: isRecruiter ? "recruiter" : "ar-requestor" });
    // Navigate to appropriate dashboard
    if (isRecruiter) {
      window.location.href = "/recruiter-dashboard";
    } else {
      window.location.href = "/ar-dashboard";
    }
  };

  return (
    <div className="min-h-screen professional-gradient flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-slate-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
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

      {/* Main Login Card */}
      <Card className="w-full max-w-md glass-card border-0 shadow-2xl relative z-10">
        <CardHeader className="text-center space-y-6 pb-8">
          {/* Logo */}
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Target className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl font-bold">
              <span className="text-slate-800 dark:text-slate-100">Radar</span>
              <span className="text-red-600">X</span>
            </h1>
          </div>
          
          <div className="space-y-2">
            <CardTitle className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400 text-lg">
              Internal Talent Management System
            </CardDescription>
          </div>

          {/* Role Switcher */}
          <div className="glass-surface p-4 rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Search className="w-5 h-5 text-sky-500" />
                <span className="text-slate-700 dark:text-slate-300 font-medium">AR Requestor</span>
              </div>
              <Switch
                checked={isRecruiter}
                onCheckedChange={setIsRecruiter}
                className="data-[state=checked]:bg-red-600"
              />
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-red-600" />
                <span className="text-slate-700 dark:text-slate-300 font-medium">Recruiter</span>
              </div>
            </div>
            <div className="text-center">
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {isRecruiter ? "Manage profiles and job descriptions" : "Upload JDs and track matches"}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-700 dark:text-slate-300 font-medium">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-11 glass-surface border-slate-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 placeholder:text-slate-400 focus:border-sky-500/50 focus:ring-sky-500/20"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-700 dark:text-slate-300 font-medium">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-11 pr-11 glass-surface border-slate-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 placeholder:text-slate-400 focus:border-sky-500/50 focus:ring-sky-500/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link to="#" className="text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">
              Forgot your password?
            </Link>
          </div>

          {/* Login Button */}
          <Button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
            size="lg"
          >
            <span className="flex items-center justify-center space-x-2">
              <span>Sign In as {isRecruiter ? "Recruiter" : "AR Requestor"}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-slate-50 dark:bg-slate-900 px-4 text-slate-500 dark:text-slate-400">
                New to RadarX?
              </span>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <Link
              to="#"
              className="text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors font-medium"
            >
              Contact Administrator for Access
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Branding */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          © 2024 RadarX. Internal Talent Management System.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
