
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, Target, Brain, CheckCircle, AlertTriangle, TrendingUp, User, Calendar, MapPin, Mail, Phone } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const OneToOneMatching = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [selectedJD, setSelectedJD] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchResult, setMatchResult] = useState(null);
  const { toast } = useToast();

  const sampleJDs = [
    {
      id: 'JD001',
      title: 'Senior Full Stack Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      experience: '5+ years',
      skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB'],
      description: 'Looking for an experienced full-stack developer to join our innovative team...'
    },
    {
      id: 'JD002', 
      title: 'Data Scientist',
      company: 'DataFlow Solutions',
      location: 'New York, NY',
      experience: '3+ years',
      skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'Statistics'],
      description: 'Seeking a data scientist to drive insights and build predictive models...'
    },
    {
      id: 'JD003',
      title: 'DevOps Engineer',
      company: 'CloudTech Systems',
      location: 'Austin, TX', 
      experience: '4+ years',
      skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
      description: 'Join our DevOps team to scale our cloud infrastructure...'
    }
  ];

  const mockMatchResult = {
    similarity: 87,
    candidateProfile: {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      experience: '6 years',
      currentRole: 'Senior Software Engineer'
    },
    strengths: [
      'Strong technical alignment with required stack',
      'Experience level exceeds requirements',
      'Location match for on-site collaboration',
      'Previous experience in similar industry'
    ],
    gaps: [
      'Missing AWS certification',
      'Limited experience with specific framework version',
      'No mention of team leadership experience'
    ],
    skillsMatch: [
      { skill: 'React', candidate: 95, required: 90, match: true },
      { skill: 'Node.js', candidate: 88, required: 85, match: true },
      { skill: 'TypeScript', candidate: 82, required: 80, match: true },
      { skill: 'AWS', candidate: 65, required: 75, match: false },
      { skill: 'MongoDB', candidate: 78, required: 70, match: true }
    ],
    recommendation: 'Highly recommended candidate with strong technical skills and cultural fit. Consider providing AWS training to bridge the gap.',
    fitScore: {
      technical: 85,
      experience: 92,
      cultural: 88,
      overall: 87
    }
  };

  const handleAnalyze = () => {
    if (!resumeFile || !selectedJD) {
      toast({
        title: "Missing Information",
        description: "Please upload a resume and select a job description",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    setTimeout(() => {
      setMatchResult(mockMatchResult);
      setIsAnalyzing(false);
      toast({
        title: "Analysis Complete!",
        description: `Match score: ${mockMatchResult.similarity}%`
      });
    }, 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100/50 to-purple-100/50 dark:from-blue-900/30 dark:to-purple-900/30 backdrop-blur-sm rounded-full px-6 py-2 border border-blue-200/30 dark:border-blue-700/30">
          <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Precision Matching</span>
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 dark:from-white dark:to-blue-100 bg-clip-text text-transparent">
          One-to-One Candidate Analysis
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Upload a candidate's resume and match it against a specific job description for detailed compatibility analysis.
        </p>
      </div>

      {/* Upload & Selection Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Resume Upload */}
        <Card className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/10 shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="w-5 h-5 text-green-600" />
              <span>Upload Resume</span>
            </CardTitle>
            <CardDescription>Upload the candidate's resume for analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
              resumeFile ? 'border-green-400 bg-green-50/50 dark:bg-green-900/20' : 'border-gray-300/50 dark:border-gray-600/50 hover:border-gray-400/70 dark:hover:border-gray-500/70'
            }`}>
              {resumeFile ? (
                <div className="flex items-center justify-center space-x-3">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="font-medium text-green-700 dark:text-green-300">{resumeFile.name}</p>
                    <p className="text-sm text-gray-500">{(resumeFile.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <FileText className="w-12 h-12 mx-auto text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-300">
                      <label className="cursor-pointer text-blue-600 hover:underline">
                        Choose resume file
                        <input 
                          type="file" 
                          className="hidden" 
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => setResumeFile(e.target.files[0])}
                        />
                      </label>
                    </p>
                    <p className="text-sm text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* JD Selection */}
        <Card className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/10 shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span>Select Job Description</span>
            </CardTitle>
            <CardDescription>Choose the JD to match against</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {sampleJDs.map((jd) => (
              <div
                key={jd.id}
                onClick={() => setSelectedJD(jd.id)}
                className={`p-4 rounded-xl cursor-pointer transition-all border ${
                  selectedJD === jd.id 
                    ? 'bg-blue-500/20 border-blue-500/50 scale-105' 
                    : 'bg-white/10 dark:bg-black/10 border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-black/20'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{jd.title}</h4>
                  <Badge className="text-xs">{jd.id}</Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{jd.company} • {jd.location}</p>
                <div className="flex flex-wrap gap-1">
                  {jd.skills.slice(0, 3).map((skill) => (
                    <Badge key={skill} className="text-xs bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                      {skill}
                    </Badge>
                  ))}
                  {jd.skills.length > 3 && (
                    <Badge className="text-xs bg-gray-100/50 dark:bg-gray-900/30">
                      +{jd.skills.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Analyze Button */}
      <div className="text-center">
        <Button
          onClick={handleAnalyze}
          disabled={!resumeFile || !selectedJD || isAnalyzing}
          className="px-8 py-4 text-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50"
        >
          {isAnalyzing ? (
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Analyzing Match...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5" />
              <span>Analyze Compatibility</span>
            </div>
          )}
        </Button>
      </div>

      {/* Results */}
      {matchResult && (
        <div className="space-y-6">
          {/* Overall Score */}
          <Card className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/10 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                  {matchResult.similarity}% Match
                </span>
              </CardTitle>
              <CardDescription className="text-lg">Overall Compatibility Score</CardDescription>
            </CardHeader>
          </Card>

          {/* Candidate Profile */}
          <Card className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/10 shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5 text-purple-600" />
                <span>Candidate Profile</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">{matchResult.candidateProfile.name}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span>{matchResult.candidateProfile.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{matchResult.candidateProfile.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{matchResult.candidateProfile.location}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Experience:</span>
                    <span className="text-sm">{matchResult.candidateProfile.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Current Role:</span>
                    <span className="text-sm">{matchResult.candidateProfile.currentRole}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Strengths */}
            <Card className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/10 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-700 dark:text-green-300">
                  <CheckCircle className="w-5 h-5" />
                  <span>Strengths</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {matchResult.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Areas for Development */}
            <Card className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/10 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-orange-700 dark:text-orange-300">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Areas for Development</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {matchResult.gaps.map((gap, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{gap}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Skills Breakdown */}
          <Card className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/10 shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span>Skills Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {matchResult.skillsMatch.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.skill}</span>
                      <Badge className={skill.match ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {skill.candidate}% vs {skill.required}% required
                      </Badge>
                    </div>
                    <Progress value={(skill.candidate / skill.required) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommendation */}
          <Card className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/10 shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-purple-600" />
                <span>AI Recommendation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {matchResult.recommendation}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center p-3 bg-blue-50/50 dark:bg-blue-900/20 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">{matchResult.fitScore.technical}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Technical</div>
                </div>
                <div className="text-center p-3 bg-green-50/50 dark:bg-green-900/20 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">{matchResult.fitScore.experience}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Experience</div>
                </div>
                <div className="text-center p-3 bg-purple-50/50 dark:bg-purple-900/20 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">{matchResult.fitScore.cultural}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Cultural</div>
                </div>
                <div className="text-center p-3 bg-orange-50/50 dark:bg-orange-900/20 rounded-xl">
                  <div className="text-2xl font-bold text-orange-600">{matchResult.fitScore.overall}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Overall</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default OneToOneMatching;
