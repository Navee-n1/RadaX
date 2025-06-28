
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Moon, Sun, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JDUpload from "@/components/JDUpload";
import LiveTracker from "@/components/LiveTracker";
import OneToOneMatching from "@/components/OneToOneMatching";
import ResumeToProjects from "@/components/ResumeToProjects";

const ARDashboard = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const [activeJD, setActiveJD] = useState(null);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleJDUpload = (jdData) => {
    setActiveJD(jdData);
    console.log('JD uploaded:', jdData);
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${isDark ? 'dark bg-gradient-to-br from-gray-900 via-slate-900 to-black' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'}`}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border-b border-white/20 dark:border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="rounded-full backdrop-blur-sm bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10">
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
              <Button variant="ghost" size="sm" onClick={toggleTheme} className="rounded-full backdrop-blur-sm bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10">
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <Tabs defaultValue="jd-matching" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 backdrop-blur-xl bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/10 p-1 rounded-2xl">
            <TabsTrigger value="jd-matching" className="rounded-xl data-[state=active]:bg-white/50 dark:data-[state=active]:bg-black/50">
              JD to Top 3 Matches
            </TabsTrigger>
            <TabsTrigger value="one-to-one" className="rounded-xl data-[state=active]:bg-white/50 dark:data-[state=active]:bg-black/50">
              One-to-One Matching
            </TabsTrigger>
            <TabsTrigger value="resume-projects" className="rounded-xl data-[state=active]:bg-white/50 dark:data-[state=active]:bg-black/50">
              Resume to Projects
            </TabsTrigger>
            <TabsTrigger value="live-tracker" className="rounded-xl data-[state=active]:bg-white/50 dark:data-[state=active]:bg-black/50">
              Live Tracker
            </TabsTrigger>
          </TabsList>

          <TabsContent value="jd-matching">
            <JDUpload onUpload={handleJDUpload} />
          </TabsContent>

          <TabsContent value="one-to-one">
            <OneToOneMatching />
          </TabsContent>

          <TabsContent value="resume-projects">
            <ResumeToProjects />
          </TabsContent>

          <TabsContent value="live-tracker">
            {activeJD ? (
              <LiveTracker jdData={activeJD} />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">Upload a JD first to see live tracking</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ARDashboard;
