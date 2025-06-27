
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, Briefcase, Code, Database, Smartphone, Globe, Brain, Star, TrendingUp, Calendar, Users, Award } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const ResumeToProjects = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [projectMatches, setProjectMatches] = useState([]);
  const { toast } = useToast();

  const mockProjects = [
    {
      id: 'PRJ001',
      name: 'E-commerce Platform Modernization',
      client: 'RetailCorp',
      type: 'Web Development',
      duration: '6 months',
      teamSize: 8,
      matchScore: 94,
      skills: ['React', 'Node.js', 'MongoDB', 'AWS', 'TypeScript'],
      description: 'Complete overhaul of legacy e-commerce platform with modern tech stack',
      requirements: [
        '5+ years full-stack development',
        'Experience with React and Node.js',
        'E-commerce domain knowledge',
        'AWS cloud experience'
      ],
      responsibilities: [
        'Lead frontend development team',
        'Architect scalable solutions',
        'Implement payment systems',
        'Performance optimization'
      ],
      fitAnalysis: {
        technical: 96,
        domain: 88,
        leadership: 92,
        overall: 94
      }
    },
    {
      id: 'PRJ002',
      name: 'AI-Powered Analytics Dashboard',
      client: 'DataTech Solutions',
      type: 'Data Science',
      duration: '4 months',
      teamSize: 5,
      matchScore: 78,
      skills: ['Python', 'Machine Learning', 'React', 'TensorFlow', 'PostgreSQL'],
      description: 'Build intelligent dashboard with predictive analytics and real-time insights',
      requirements: [
        '3+ years in data science',
        'Python and ML expertise',
        'Dashboard development experience',
        'Statistical analysis skills'
      ],
      responsibilities: [
        'Develop ML models',
        'Create interactive dashboards',
        'Data pipeline optimization',
        'Statistical analysis'
      ],
      fitAnalysis: {
        technical: 82,
        domain: 70,
        leadership: 75,
        overall: 78
      }
    },
    {
      id: 'PRJ003',
      name: 'Mobile Banking Application',
      client: 'FinanceFirst Bank',
      type: 'Mobile Development',
      duration: '8 months',
      teamSize: 12,
      matchScore: 85,
      skills: ['React Native', 'Node.js', 'Security', 'APIs', 'Banking'],
      description: 'Secure mobile banking app with advanced features and biometric authentication',
      requirements: [
        '4+ years mobile development',
        'React Native expertise',
        'Security implementation',
        'Financial domain knowledge'
      ],
      responsibilities: [
        'Mobile app architecture',
        'Security implementation',
        'API integration',
        'Performance optimization'
      ],
      fitAnalysis: {
        technical: 88,
        domain: 80,
        leadership: 85,
        overall: 85
      }
    },
    {
      id: 'PRJ004',
      name: 'Cloud Infrastructure Migration',
      client: 'TechStartup Inc',
      type: 'DevOps',
      duration: '3 months',
      teamSize: 4,
      matchScore: 72,
      skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
      description: 'Migrate on-premise infrastructure to AWS cloud with containerization',
      requirements: [
        '3+ years DevOps experience',
        'AWS certification preferred',
        'Container orchestration',
        'Infrastructure as Code'
      ],
      responsibilities: [
        'Cloud architecture design',
        'Migration planning',
        'Container deployment',
        'Monitoring setup'
      ],
      fitAnalysis: {
        technical: 75,
        domain: 68,
        leadership: 70,
        overall: 72
      }
    },
    {
      id: 'PRJ005',
      name: 'Blockchain Supply Chain',
      client: 'LogiChain Corp',
      type: 'Blockchain',
      duration: '10 months',
      teamSize: 6,
      matchScore: 88,
      skills: ['Solidity', 'Ethereum', 'Node.js', 'React', 'Supply Chain'],
      description: 'Transparent supply chain tracking system using blockchain technology',
      requirements: [
        '2+ years blockchain experience',
        'Smart contract development',
        'Supply chain knowledge',
        'Full-stack capabilities'
      ],
      responsibilities: [
        'Smart contract development',
        'Blockchain integration',
        'Frontend development',
        'System architecture'
      ],
      fitAnalysis: {
        technical: 90,
        domain: 85,
        leadership: 88,
        overall: 88
      }
    }
  ];

  const handleAnalyze = () => {
    if (!resumeFile) {
      toast({
        title: "No Resume Uploaded",
        description: "Please upload a resume to analyze project suitability",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    setTimeout(() => {
      // Sort projects by match score and take top matches
      const sortedProjects = [...mockProjects].sort((a, b) => b.matchScore - a.matchScore);
      setProjectMatches(sortedProjects);
      setIsAnalyzing(false);
      toast({
        title: "Analysis Complete!",
        description: `Found ${sortedProjects.length} suitable projects`
      });
    }, 3000);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreBg = (score) => {
    if (score >= 90) return 'bg-green-100/50 dark:bg-green-900/30';
    if (score >= 80) return 'bg-blue-100/50 dark:bg-blue-900/30';
    if (score >= 70) return 'bg-orange-100/50 dark:bg-orange-900/30';
    return 'bg-red-100/50 dark:bg-red-900/30';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100/50 to-pink-100/50 dark:from-purple-900/30 dark:to-pink-900/30 backdrop-blur-sm rounded-full px-6 py-2 border border-purple-200/30 dark:border-purple-700/30">
          <Briefcase className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Project Matching</span>
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-purple-900 dark:from-white dark:to-purple-100 bg-clip-text text-transparent">
          Resume to Project Suitability
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Upload a candidate's resume to discover which projects they're best suited for based on skills, experience, and domain expertise.
        </p>
      </div>

      {/* Upload Section */}
      <Card className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/10 shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5 text-blue-600" />
            <span>Upload Candidate Resume</span>
          </CardTitle>
          <CardDescription>Upload resume to analyze project compatibility</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
            resumeFile ? 'border-green-400 bg-green-50/50 dark:bg-green-900/20' : 'border-gray-300/50 dark:border-gray-600/50 hover:border-gray-400/70 dark:hover:border-gray-500/70'
          }`}>
            {resumeFile ? (
              <div className="space-y-3">
                <FileText className="w-12 h-12 mx-auto text-green-600" />
                <div>
                  <p className="font-medium text-green-700 dark:text-green-300 text-lg">{resumeFile.name}</p>
                  <p className="text-sm text-gray-500">{(resumeFile.size / 1024).toFixed(1)} KB uploaded</p>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={() => setResumeFile(null)}
                  className="text-red-600 hover:text-red-700"
                >
                  Remove File
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <FileText className="w-16 h-16 mx-auto text-gray-400" />
                <div>
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <label className="cursor-pointer text-blue-600 hover:underline">
                      Click to upload resume
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

          <Button
            onClick={handleAnalyze}
            disabled={!resumeFile || isAnalyzing}
            className="w-full py-4 text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50"
          >
            {isAnalyzing ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Analyzing Projects...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Brain className="w-5 h-5" />
                <span>Find Suitable Projects</span>
              </div>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {projectMatches.length > 0 && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Project Recommendations
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Found {projectMatches.length} projects ranked by suitability
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {projectMatches.map((project, index) => (
              <Card key={project.id} className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/10 shadow-2xl hover:scale-105 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                        index === 0 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                        index === 1 ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
                        index === 2 ? 'bg-gradient-to-r from-blue-400 to-cyan-500' :
                        'bg-gradient-to-r from-purple-400 to-pink-500'
                      }`}>
                        {index === 0 ? <Award className="w-8 h-8 text-white" /> : 
                         index === 1 ? <Star className="w-8 h-8 text-white" /> :
                         <Briefcase className="w-8 h-8 text-white" />}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{project.name}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{project.client} • {project.type}</p>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{project.duration}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{project.teamSize} members</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-4xl font-bold ${getScoreColor(project.matchScore)}`}>
                        {project.matchScore}%
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Match Score</p>
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Requirements</h4>
                      <ul className="space-y-2">
                        {project.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-600 dark:text-gray-400">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Responsibilities</h4>
                      <ul className="space-y-2">
                        {project.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-600 dark:text-gray-400">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill) => (
                        <Badge key={skill} className="bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 p-4 rounded-xl bg-gray-50/50 dark:bg-gray-800/50 space-y-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Fit Analysis</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${getScoreColor(project.fitAnalysis.technical)}`}>
                          {project.fitAnalysis.technical}%
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Technical</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${getScoreColor(project.fitAnalysis.domain)}`}>
                          {project.fitAnalysis.domain}%
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Domain</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${getScoreColor(project.fitAnalysis.leadership)}`}>
                          {project.fitAnalysis.leadership}%
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Leadership</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${getScoreColor(project.fitAnalysis.overall)}`}>
                          {project.fitAnalysis.overall}%
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Overall</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeToProjects;
