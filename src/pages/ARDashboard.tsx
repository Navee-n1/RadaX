
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
              <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="rounded-xl">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Home
              </Button>
              <div className="h-6 w-px bg-slate-300 dark:bg-slate-600"></div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-sky-500 rounded-xl flex items-center justify-center">
                  <Target className="text-white w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-200">
                    AR Requestor Portal
                  </h1>
                  <p className="text-sm professional-text">Internal Talent Matching System</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={toggleTheme} className="rounded-xl">
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Stats */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium professional-text">Active Requests</p>
                  <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">12</p>
                </div>
                <div className="w-12 h-12 bg-sky-100 dark:bg-sky-900/20 rounded-xl flex items-center justify-center">
                  <Upload className="w-6 h-6 text-sky-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium professional-text">Available Consultants</p>
                  <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">47</p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium professional-text">Matches Today</p>
                  <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">8</p>
                </div>
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="jd-matching" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 glass-surface p-1 rounded-2xl h-14">
            <TabsTrigger value="jd-matching" className="rounded-xl data-[state=active]:bg-sky-500 data-[state=active]:text-white font-medium">
              JD to Top 3 Matches
            </TabsTrigger>
            <TabsTrigger value="one-to-one" className="rounded-xl data-[state=active]:bg-sky-500 data-[state=active]:text-white font-medium">
              One-to-One Matching
            </TabsTrigger>
            <TabsTrigger value="resume-projects" className="rounded-xl data-[state=active]:bg-sky-500 data-[state=active]:text-white font-medium">
              Resume to Projects
            </TabsTrigger>
            <TabsTrigger value="live-tracker" className="rounded-xl data-[state=active]:bg-sky-500 data-[state=active]:text-white font-medium">
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
              <LiveTracker 
                jdId={activeJD.id} 
                userEmail={userEmail} 
                jdData={activeJD} 
              />
            ) : (
              <Card className="glass-card">
                <CardContent className="text-center py-16">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">No Active JD</h3>
                  <p className="professional-text">Upload a JD first to see live tracking</p>
                </CardContent>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ARDashboard;
