
import { useState } from "react";
import ARDashboardHeader from "@/components/ARDashboardHeader";
import ARDashboardTabs from "@/components/ARDashboardTabs";
import ARDashboardBackground from "@/components/ARDashboardBackground";

const ARDashboard = () => {
  const [isDark, setIsDark] = useState(false);
  const [activeJD, setActiveJD] = useState(null);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleJDUpload = (jdData: any) => {
    setActiveJD(jdData);
    console.log('JD uploaded:', jdData);
  };

  return (
    <div className={`min-h-screen transition-all duration-700 font-['Helvetica_Neue','-apple-system','BlinkMacSystemFont',sans-serif] ${isDark ? 'dark bg-gradient-to-br from-slate-900 via-slate-800 to-black' : 'bg-gradient-to-br from-slate-50 via-sky-50 to-slate-100'}`}>
      <ARDashboardBackground />
      
      <ARDashboardHeader isDark={isDark} toggleTheme={toggleTheme} />

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <ARDashboardTabs activeJD={activeJD} handleJDUpload={handleJDUpload} />
      </div>
    </div>
  );
};

export default ARDashboard;
