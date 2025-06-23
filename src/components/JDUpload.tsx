
import { useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, CheckCircle, X, Sparkles, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface JDUploadProps {
  onUpload: (jdData: any) => void;
}

const JDUpload = ({ onUpload }: JDUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleSubmit = () => {
    if (!jobTitle || !userEmail) {
      toast({
        title: "Missing Information",
        description: "Please provide job title and email address",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    // Simulate processing delay
    setTimeout(() => {
      const jdData = {
        id: `JD-${Date.now()}`,
        title: jobTitle,
        skills: requiredSkills.split(',').map(s => s.trim()).filter(s => s),
        experience,
        description,
        file: file,
        userEmail,
        uploadedAt: new Date().toISOString()
      };

      onUpload(jdData);
      
      toast({
        title: "JD Processing Started",
        description: "AI agents are analyzing your job description",
      });

      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100/50 to-purple-100/50 dark:from-blue-900/30 dark:to-purple-900/30 backdrop-blur-sm rounded-full px-6 py-2 border border-blue-200/30 dark:border-blue-700/30">
          <Brain className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">AI-Powered Matching</span>
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 dark:from-white dark:to-blue-100 bg-clip-text text-transparent">
          Submit Your Job Requisition
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Upload your job description and let our AI find the perfect consultant matches with detailed scoring and explanations.
        </p>
      </div>

      {/* Main Upload Card */}
      <Card className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/10 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-600/10 dark:to-purple-600/10"></div>
        <CardHeader className="relative pb-6">
          <CardTitle className="flex items-center space-x-3 text-2xl">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
              <Upload className="w-5 h-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Job Description Upload
            </span>
          </CardTitle>
          <CardDescription className="text-base text-gray-600 dark:text-gray-400">
            Upload your JD file or enter details manually for AI-powered consultant matching
          </CardDescription>
        </CardHeader>
        
        <CardContent className="relative space-y-8">
          {/* Email Input */}
          <div className="space-y-3">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Your Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email for notifications"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="backdrop-blur-sm bg-white/50 dark:bg-black/50 border-white/50 dark:border-white/20 rounded-xl h-12"
            />
          </div>

          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
              dragActive 
                ? 'border-blue-400 bg-blue-50/50 dark:bg-blue-900/20 scale-105' 
                : file 
                  ? 'border-green-400 bg-green-50/50 dark:bg-green-900/20' 
                  : 'border-gray-300/50 dark:border-gray-600/50 hover:border-gray-400/70 dark:hover:border-gray-500/70 hover:bg-white/30 dark:hover:bg-black/30'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {file ? (
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-green-700 dark:text-green-300 text-lg">{file.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={removeFile}
                  className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto">
                  <Upload className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-gray-700 dark:text-gray-300 mb-2 text-lg">
                    Drag and drop your JD file here, or{" "}
                    <label className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline font-medium">
                      browse files
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={handleFileChange}
                      />
                    </label>
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Supports PDF, DOC, DOCX, TXT (Max 10MB)</p>
                </div>
              </div>
            )}
          </div>

          {/* Manual JD Details */}
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="title" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Job Title *
              </Label>
              <Input
                id="title"
                placeholder="e.g., Senior Full Stack Developer"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="backdrop-blur-sm bg-white/50 dark:bg-black/50 border-white/50 dark:border-white/20 rounded-xl h-12"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="skills" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Required Skills (comma-separated)
              </Label>
              <Input
                id="skills"
                placeholder="e.g., React, Node.js, TypeScript, AWS, Machine Learning"
                value={requiredSkills}
                onChange={(e) => setRequiredSkills(e.target.value)}
                className="backdrop-blur-sm bg-white/50 dark:bg-black/50 border-white/50 dark:border-white/20 rounded-xl h-12"
              />
              {requiredSkills && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {requiredSkills.split(',').map((skill, index) => (
                    <Badge key={index} className="bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200/30 dark:border-blue-700/30 text-sm px-3 py-1 rounded-full">
                      {skill.trim()}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="experience" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Experience Required
              </Label>
              <Input
                id="experience"
                placeholder="e.g., 3-5 years"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="backdrop-blur-sm bg-white/50 dark:bg-black/50 border-white/50 dark:border-white/20 rounded-xl h-12"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Job Description (Optional)
              </Label>
              <Textarea
                id="description"
                placeholder="Paste or type the full job description here..."
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="backdrop-blur-sm bg-white/50 dark:bg-black/50 border-white/50 dark:border-white/20 rounded-xl resize-none"
              />
            </div>
          </div>

          <Button 
            onClick={handleSubmit} 
            disabled={!jobTitle || !userEmail || isProcessing}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg"
          >
            {isProcessing ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Processing JD...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>Start AI Matching</span>
              </div>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default JDUpload;
