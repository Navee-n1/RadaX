
import { Button } from "@/components/ui/button";
import { ArrowLeft, Moon, Sun, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ARDashboardHeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const ARDashboardHeader = ({ isDark, toggleTheme }: ARDashboardHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border-b border-white/20 dark:border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="rounded-full backdrop-blur-sm bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Home
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-slate-600 rounded-2xl flex items-center justify-center">
                <Target className="text-white w-5 h-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold font-['Helvetica_Neue','-apple-system','BlinkMacSystemFont',sans-serif]">
                  <span className="text-slate-900 dark:text-white">Radar</span>
                  <span className="text-red-700">X</span>
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-['Helvetica_Neue','-apple-system','BlinkMacSystemFont',sans-serif]">AR Requestor Portal</p>
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
  );
};

export default ARDashboardHeader;
