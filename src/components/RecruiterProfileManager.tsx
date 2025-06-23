
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, User, Plus, Edit, Eye, Star, TrendingUp, Sparkles, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RecruiterProfileManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVertical, setSelectedVertical] = useState("");
  const [minExperience, setMinExperience] = useState("");
  const [maxExperience, setMaxExperience] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [showAddProfile, setShowAddProfile] = useState(false);
  const { toast } = useToast();

  const mockConsultants = [
    {
      id: "EMP-2024-001",
      name: "Sarah Johnson",
      vertical: "Full Stack Development",
      experience: 5,
      skills: ["React", "TypeScript", "Node.js", "AWS", "GraphQL"],
      rating: 4.8,
      projects: 23,
      status: "Available",
      lastUpdated: "2024-01-15",
      matchScore: 96
    },
    {
      id: "EMP-2024-002", 
      name: "Mike Chen",
      vertical: "AI/ML Engineering",
      experience: 7,
      skills: ["Python", "TensorFlow", "PyTorch", "AWS", "Docker"],
      rating: 4.9,
      projects: 31,
      status: "Assigned",
      lastUpdated: "2024-01-14",
      matchScore: 94
    },
    {
      id: "EMP-2024-003",
      name: "Emily Rodriguez",
      vertical: "Backend Engineering", 
      experience: 6,
      skills: ["Java", "Spring Boot", "Microservices", "Kubernetes", "PostgreSQL"],
      rating: 4.7,
      projects: 28,
      status: "Available",
      lastUpdated: "2024-01-13",
      matchScore: 91
    },
    {
      id: "EMP-2024-004",
      name: "David Kim",
      vertical: "Frontend Development",
      experience: 4,
      skills: ["React", "Vue.js", "TypeScript", "SCSS", "Figma"],
      rating: 4.6,
      projects: 19,
      status: "Available", 
      lastUpdated: "2024-01-12",
      matchScore: 88
    },
    {
      id: "EMP-2024-005",
      name: "Lisa Wang",
      vertical: "DevOps Engineering",
      experience: 8,
      skills: ["Kubernetes", "Docker", "AWS", "Terraform", "Jenkins"],
      rating: 4.9,
      projects: 35,
      status: "Assigned",
      lastUpdated: "2024-01-11",
      matchScore: 97
    }
  ];

  const verticals = ["Full Stack Development", "AI/ML Engineering", "Backend Engineering", "Frontend Development", "DevOps Engineering"];

  const filteredConsultants = mockConsultants.filter(consultant => {
    const matchesName = consultant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       consultant.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVertical = !selectedVertical || selectedVertical === "all" || consultant.vertical === selectedVertical;
    const matchesMinExp = !minExperience || consultant.experience >= parseInt(minExperience);
    const matchesMaxExp = !maxExperience || consultant.experience <= parseInt(maxExperience);
    const matchesSkill = !skillFilter || consultant.skills.some(skill => 
      skill.toLowerCase().includes(skillFilter.toLowerCase())
    );
    
    return matchesName && matchesVertical && matchesMinExp && matchesMaxExp && matchesSkill;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-700 dark:text-green-300 border-green-300/30";
      case "Assigned":
        return "bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-700 dark:text-orange-300 border-orange-300/30";
      default:
        return "bg-gradient-to-r from-gray-500/20 to-slate-500/20 text-gray-700 dark:text-gray-300 border-gray-300/30";
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 95) return "from-emerald-500 to-green-500";
    if (score >= 90) return "from-blue-500 to-cyan-500";
    if (score >= 85) return "from-orange-500 to-amber-500";
    return "from-gray-500 to-slate-500";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold gradient-text">
            Consultant Management
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Manage profiles and search consultants with advanced AI-powered filters
          </p>
        </div>
        <Button
          onClick={() => setShowAddProfile(true)}
          className="group bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 hover:from-blue-600 hover:via-purple-600 hover:to-cyan-600 text-white shadow-2xl hover:shadow-purple-500/25 smooth-transition hover:scale-105 px-6 py-3 rounded-2xl"
        >
          <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 smooth-transition" />
          Add Profile
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="glass-card border-0 p-8">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            {/* Search */}
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="search" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                <Search className="w-4 h-4 mr-2" />
                Search by Name or ID
              </Label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Enter name or employee ID"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 glass-effect border-white/30 dark:border-white/20 rounded-2xl text-lg focus:ring-2 focus:ring-blue-500/50 smooth-transition"
                />
              </div>
            </div>

            {/* Vertical Filter */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Vertical
              </Label>
              <Select value={selectedVertical} onValueChange={setSelectedVertical}>
                <SelectTrigger className="h-12 glass-effect border-white/30 dark:border-white/20 rounded-2xl">
                  <SelectValue placeholder="All verticals" />
                </SelectTrigger>
                <SelectContent className="glass-effect border-white/30 dark:border-white/20">
                  <SelectItem value="all">All verticals</SelectItem>
                  {verticals.map(vertical => (
                    <SelectItem key={vertical} value={vertical}>{vertical}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Experience Range */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Min Experience</Label>
              <Input
                type="number"
                placeholder="0"
                value={minExperience}
                onChange={(e) => setMinExperience(e.target.value)}
                className="h-12 glass-effect border-white/30 dark:border-white/20 rounded-2xl focus:ring-2 focus:ring-blue-500/50 smooth-transition"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Max Experience</Label>
              <Input
                type="number"
                placeholder="20"
                value={maxExperience}
                onChange={(e) => setMaxExperience(e.target.value)}
                className="h-12 glass-effect border-white/30 dark:border-white/20 rounded-2xl focus:ring-2 focus:ring-blue-500/50 smooth-transition"
              />
            </div>

            {/* Skills Filter */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                <Sparkles className="w-4 h-4 mr-2" />
                Skills
              </Label>
              <Input
                placeholder="e.g., React, Python"
                value={skillFilter}
                onChange={(e) => setSkillFilter(e.target.value)}
                className="h-12 glass-effect border-white/30 dark:border-white/20 rounded-2xl focus:ring-2 focus:ring-blue-500/50 smooth-transition"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/20 dark:border-white/10">
            <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
              Showing <span className="gradient-text font-bold">{filteredConsultants.length}</span> of <span className="gradient-text font-bold">{mockConsultants.length}</span> consultants
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedVertical("");
                setMinExperience("");
                setMaxExperience("");
                setSkillFilter("");
              }}
              className="glass-effect border-white/30 dark:border-white/20 hover:bg-white/20 dark:hover:bg-white/10 rounded-xl smooth-transition"
            >
              <Filter className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Consultant Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredConsultants.map((consultant, index) => (
          <Card key={consultant.id} className="group glass-card border-0 hover:shadow-2xl smooth-transition hover:scale-105" style={{animationDelay: `${index * 0.1}s`}}>
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <User className="w-7 h-7 text-white" />
                    </div>
                    <div className={`absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r ${getMatchScoreColor(consultant.matchScore)} rounded-full animate-pulse shadow-lg`}></div>
                  </div>
                  <div>
                    <CardTitle className="text-xl text-gray-900 dark:text-white">{consultant.name}</CardTitle>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{consultant.id}</p>
                    <div className="flex items-center mt-1">
                      <Badge className={`${getMatchScoreColor(consultant.matchScore)} bg-gradient-to-r text-white px-2 py-1 rounded-lg text-xs font-bold`}>
                        {consultant.matchScore}% Match
                      </Badge>
                    </div>
                  </div>
                </div>
                <Badge className={`${getStatusColor(consultant.status)} px-3 py-2 rounded-full text-xs font-semibold`}>
                  {consultant.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">{consultant.vertical}</h4>
                <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Zap className="w-4 h-4 text-blue-500" />
                    <span className="font-medium">{consultant.experience} years</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{consultant.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="font-medium">{consultant.projects} projects</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h5 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 text-purple-500" />
                  Key Skills
                </h5>
                <div className="flex flex-wrap gap-2">
                  {consultant.skills.slice(0, 3).map((skill, skillIndex) => (
                    <Badge key={skill} className={`bg-gradient-to-r ${getMatchScoreColor(95 - skillIndex * 5)} text-white text-xs px-3 py-1 rounded-lg font-medium`}>
                      {skill}
                    </Badge>
                  ))}
                  {consultant.skills.length > 3 && (
                    <Badge className="bg-gradient-to-r from-gray-500 to-slate-500 text-white text-xs px-3 py-1 rounded-lg font-medium">
                      +{consultant.skills.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-white/20 dark:border-white/10">
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Updated {consultant.lastUpdated}
                </span>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl glass-effect hover:bg-white/20 dark:hover:bg-white/10 smooth-transition">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl glass-effect hover:bg-white/20 dark:hover:bg-white/10 smooth-transition">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredConsultants.length === 0 && (
        <Card className="glass-card border-0">
          <CardContent className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-400/20 to-slate-400/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <User className="w-10 h-10 text-gray-400 dark:text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No consultants found</h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
              Try adjusting your search criteria or add new consultant profiles
            </p>
            <Button
              onClick={() => setShowAddProfile(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-2xl font-semibold smooth-transition hover:scale-105 shadow-xl"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add First Profile
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RecruiterProfileManager;
