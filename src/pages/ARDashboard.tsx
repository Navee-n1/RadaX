
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import JDUpload from "@/components/JDUpload";
import LiveTracker from "@/components/LiveTracker";

const ARDashboard = () => {
  const navigate = useNavigate();
  const [uploadedJD, setUploadedJD] = useState<any>(null);

  const handleJDUpload = (jdData: any) => {
    setUploadedJD(jdData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-gray-900">AR Requestor Dashboard</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {!uploadedJD ? (
            <JDUpload onUpload={handleJDUpload} />
          ) : (
            <LiveTracker jdId={uploadedJD.id} userEmail={uploadedJD.userEmail} />
          )}
        </div>
      </main>
    </div>
  );
};

export default ARDashboard;
