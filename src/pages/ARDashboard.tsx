
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Moon, Sun, Target, Upload, Users, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import JDUpload from "@/components/JDUpload";
import LiveTracker from "@/components/LiveTracker";
import OneToOneMatching from "@/components/OneToOneMatching";
import ResumeToProjects from "@/components/ResumeToProjects";

const ARDashboard = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const [activeJD, setActiveJD] = useState(null);
  const [userEmail, setUserEmail] = useState("");

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleJDUpload = (jdData) => {
    setActiveJD(jdData);
    setUserEmail(jdData.userEmail);
    console.log('JD uploaded:', jdData);
  };

  return (
    <div className={`min-h-screen professional-gradient smooth-transition ${isDark ? 'dark' : ''}`}>
      {/* Professional Header */}
      <header className="glass-surface border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Home
              </Button>
              <div className="h-6 w-px bg-slate-300 dark:bg-slate-600"></div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Target className="text-white w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                    AR Requestor Portal
                  </h1>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Internal Talent Acquisition</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={toggleTheme} className="rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Stats */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="glass-card border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Active Requests</p>
                  <p className="text-3xl font-bold text-slate-800 dark:text-slate-100">12</p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">+2 this week</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-sky-100 to-sky-200 dark:from-sky-900/30 dark:to-sky-800/30 rounded-2xl flex items-center justify-center">
                  <Upload className="w-7 h-7 text-sky-600 dark:text-sky-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Available Consultants</p>
                  <p className="text-3xl font-bold text-slate-800 dark:text-slate-100">47</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Ready to deploy</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-2xl flex items-center justify-center">
                  <Users className="w-7 h-7 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Matches Today</p>
                  <p className="text-3xl font-bold text-slate-800 dark:text-slate-100">8</p>
                  <p className="text-xs text-red-600 dark:text-red-400 mt-1">High priority</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 rounded-2xl flex items-center justify-center">
                  <Zap className="w-7 h-7 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="jd-matching" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 glass-surface p-1.5 rounded-2xl h-16 border-0 shadow-lg">
            <TabsTrigger 
              value="jd-matching" 
              className="rounded-xl data-[state=active]:bg-sky-500 data-[state=active]:text-white font-semibold text-sm transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              JD Upload & Match
            </TabsTrigger>
            <TabsTrigger 
              value="one-to-one" 
              className="rounded-xl data-[state=active]:bg-sky-500 data-[state=active]:text-white font-semibold text-sm transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              One-to-One Match
            </TabsTrigger>
            <TabsTrigger 
              value="resume-projects" 
              className="rounded-xl data-[state=active]:bg-sky-500 data-[state=active]:text-white font-semibold text-sm transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Resume to Projects
            </TabsTrigger>
            <TabsTrigger 
              value="live-tracker" 
              className="rounded-xl data-[state=active]:bg-sky-500 data-[state=active]:text-white font-semibold text-sm transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Live Tracker
            </TabsTrigger>
          </TabsList>

          <TabsContent value="jd-matching" className="mt-8">
            <JDUpload onUpload={handleJDUpload} />
          </TabsContent>

          <TabsContent value="one-to-one" className="mt-8">
            <OneToOneMatching />
          </TabsContent>

          <TabsContent value="resume-projects" className="mt-8">
            <ResumeToProjects />
          </TabsContent>

          <TabsContent value="live-tracker" className="mt-8">
            {activeJD ? (
              <LiveTracker 
                jdId={activeJD.id} 
                userEmail={userEmail} 
                jdData={activeJD} 
              />
            ) : (
              <Card className="glass-card border-0 shadow-xl">
                <CardContent className="text-center py-20">
                  <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Target className="w-10 h-10 text-slate-400 dark:text-slate-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3">No Active JD</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-lg">Upload a Job Description first to enable live tracking</p>
                  <Button 
                    onClick={() => document.querySelector('[value="jd-matching"]')?.click()} 
                    className="mt-6 bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Upload JD Now
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ARDashboard;
