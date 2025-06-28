
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JDUpload from "@/components/JDUpload";
import LiveTracker from "@/components/LiveTracker";
import OneToOneMatching from "@/components/OneToOneMatching";
import ResumeToProjects from "@/components/ResumeToProjects";

interface ARDashboardTabsProps {
  activeJD: any;
  handleJDUpload: (jdData: any) => void;
}

const ARDashboardTabs = ({ activeJD, handleJDUpload }: ARDashboardTabsProps) => {
  return (
    <Tabs defaultValue="jd-matching" className="space-y-8">
      <TabsList className="grid w-full grid-cols-4 backdrop-blur-xl bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/10 p-1 rounded-2xl">
        <TabsTrigger value="jd-matching" className="rounded-xl data-[state=active]:bg-white/50 dark:data-[state=active]:bg-black/50 font-['Helvetica_Neue','-apple-system','BlinkMacSystemFont',sans-serif]">
          JD to Top 3 Matches
        </TabsTrigger>
        <TabsTrigger value="one-to-one" className="rounded-xl data-[state=active]:bg-white/50 dark:data-[state=active]:bg-black/50 font-['Helvetica_Neue','-apple-system','BlinkMacSystemFont',sans-serif]">
          One-to-One Matching
        </TabsTrigger>
        <TabsTrigger value="resume-projects" className="rounded-xl data-[state=active]:bg-white/50 dark:data-[state=active]:bg-black/50 font-['Helvetica_Neue','-apple-system','BlinkMacSystemFont',sans-serif]">
          Resume to Projects
        </TabsTrigger>
        <TabsTrigger value="live-tracker" className="rounded-xl data-[state=active]:bg-white/50 dark:data-[state=active]:bg-black/50 font-['Helvetica_Neue','-apple-system','BlinkMacSystemFont',sans-serif]">
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
          <LiveTracker jdId={activeJD.id} userEmail={activeJD.userEmail} />
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-400 font-['Helvetica_Neue','-apple-system','BlinkMacSystemFont',sans-serif]">Upload a JD first to see live tracking</p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default ARDashboardTabs;
