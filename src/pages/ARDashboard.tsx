
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import JDUpload from "@/components/JDUpload";
import LiveTracker from "@/components/LiveTracker";

const ARDashboard = () => {
  const navigate = useNavigate();
  const [uploadedJD, setUploadedJD] = useState<any>(null);
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleJDUpload = (jdData: any) => {
    setUploadedJD(jdData);
  };

  const handleReset = () => {
    setUploadedJD(null);
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${isDark ? 'dark bg-gradient-to-br from-gray-900 via-slate-900 to-black' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'}`}>
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
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AR</span>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  AR Requestor Portal
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="rounded-full backdrop-blur-sm bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              {uploadedJD && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  className="rounded-full backdrop-blur-sm bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10"
                >
                  New Request
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {!uploadedJD ? (
          <JDUpload onUpload={handleJDUpload} />
        ) : (
          <LiveTracker jdId={uploadedJD.id} userEmail={uploadedJD.userEmail} jdData={uploadedJD} />
        )}
      </main>
    </div>
  );
};

export default ARDashboard;
