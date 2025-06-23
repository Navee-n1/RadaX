
import { useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, CheckCircle, X } from "lucide-react";
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
      title: "JD Uploaded Successfully",
      description: "AI agents will start processing your job description",
    });

    // Reset form
    setJobTitle("");
    setRequiredSkills("");
    setExperience("");
    setDescription("");
    setUserEmail("");
    setFile(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Upload className="w-5 h-5 text-blue-600" />
          <span>Upload Job Description</span>
        </CardTitle>
        <CardDescription>
          Upload your JD file or enter details manually for AI-powered matching
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Email Input */}
        <div className="space-y-2">
          <Label htmlFor="email">Your Email Address *</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email for notifications"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>

        {/* File Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive 
              ? 'border-blue-500 bg-blue-50' 
              : file 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {file ? (
            <div className="flex items-center justify-center space-x-3">
              <FileText className="w-8 h-8 text-green-600" />
              <div className="text-left">
                <p className="font-medium text-green-700">{file.name}</p>
                <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={removeFile}
                className="text-red-600 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div>
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">
                Drag and drop your JD file here, or{" "}
                <label className="text-blue-600 cursor-pointer hover:underline">
                  browse files
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileChange}
                  />
                </label>
              </p>
              <p className="text-sm text-gray-500">Supports PDF, DOC, DOCX, TXT</p>
            </div>
          )}
        </div>

        {/* Manual JD Details */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Job Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Senior Full Stack Developer"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">Required Skills (comma-separated)</Label>
            <Input
              id="skills"
              placeholder="e.g., React, Node.js, TypeScript, AWS"
              value={requiredSkills}
              onChange={(e) => setRequiredSkills(e.target.value)}
            />
            {requiredSkills && (
              <div className="flex flex-wrap gap-1 mt-2">
                {requiredSkills.split(',').map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill.trim()}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Experience Required</Label>
            <Input
              id="experience"
              placeholder="e.g., 3-5 years"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Job Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Paste or type the full job description here..."
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <Button 
          onClick={handleSubmit} 
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          disabled={!jobTitle || !userEmail}
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload & Start Matching
        </Button>
      </CardContent>
    </Card>
  );
};

export default JDUpload;
