
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, User, Plus, Edit, Eye, Star, TrendingUp } from "lucide-react";
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
      lastUpdated: "2024-01-15"
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
      lastUpdated: "2024-01-14"
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
      lastUpdated: "2024-01-13"
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
      lastUpdated: "2024-01-12"
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
      lastUpdated: "2024-01-11"
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
        return "bg-green-100/50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-300/30";
      case "Assigned":
        return "bg-orange-100/50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-300/30";
      default:
        return "bg-gray-100/50 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 border-gray-300/30";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Consultant Management
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage profiles and search consultants with advanced AI-powered filters
          </p>
        </div>
        <Button
          onClick={() => setShowAddProfile(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Profile
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/10">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <Label htmlFor="search" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Search by Name or ID
              </Label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Enter name or employee ID"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 backdrop-blur-sm bg-white/50 dark:bg-black/50 border-white/50 dark:border-white/20 rounded-xl"
                />
              </div>
            </div>

            {/* Vertical Filter */}
            <div>
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Vertical</Label>
              <Select value={selectedVertical} onValueChange={setSelectedVertical}>
                <SelectTrigger className="mt-1 backdrop-blur-sm bg-white/50 dark:bg-black/50 border-white/50 dark:border-white/20 rounded-xl">
                  <SelectValue placeholder="All verticals" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All verticals</SelectItem>
                  {verticals.map(vertical => (
                    <SelectItem key={vertical} value={vertical}>{vertical}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Experience Range */}
            <div>
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Min Experience</Label>
              <Input
                type="number"
                placeholder="0"
                value={minExperience}
                onChange={(e) => setMinExperience(e.target.value)}
                className="mt-1 backdrop-blur-sm bg-white/50 dark:bg-black/50 border-white/50 dark:border-white/20 rounded-xl"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Max Experience</Label>
              <Input
                type="number"
                placeholder="20"
                value={maxExperience}
                onChange={(e) => setMaxExperience(e.target.value)}
                className="mt-1 backdrop-blur-sm bg-white/50 dark:bg-black/50 border-white/50 dark:border-white/20 rounded-xl"
              />
            </div>

            {/* Skills Filter */}
            <div>
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Skills</Label>
              <Input
                placeholder="e.g., React, Python"
                value={skillFilter}
                onChange={(e) => setSkillFilter(e.target.value)}
                className="mt-1 backdrop-blur-sm bg-white/50 dark:bg-black/50 border-white/50 dark:border-white/20 rounded-xl"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredConsultants.length} of {mockConsultants.length} consultants
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setSelectedVertical("");
                setMinExperience("");
                setMaxExperience("");
                setSkillFilter("");
              }}
              className="backdrop-blur-sm bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/10"
            >
              <Filter className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Consultant Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredConsultants.map((consultant) => (
          <Card key={consultant.id} className="group backdrop-blur-xl bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-gray-900 dark:text-white">{consultant.name}</CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{consultant.id}</p>
                  </div>
                </div>
                <Badge className={`${getStatusColor(consultant.status)} px-2 py-1 rounded-full text-xs font-medium`}>
                  {consultant.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">{consultant.vertical}</h4>
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>{consultant.experience} years exp</span>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span>{consultant.rating}</span>
                  </div>
                  <span>•</span>
                  <span>{consultant.projects} projects</span>
                </div>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">Key Skills</h5>
                <div className="flex flex-wrap gap-1">
                  {consultant.skills.slice(0, 3).map((skill) => (
                    <Badge key={skill} className="bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200/30 dark:border-blue-700/30 text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {consultant.skills.length > 3 && (
                    <Badge className="bg-gray-100/50 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400 border-gray-200/30 dark:border-gray-700/30 text-xs">
                      +{consultant.skills.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-white/20 dark:border-white/10">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Updated {consultant.lastUpdated}
                </span>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredConsultants.length === 0 && (
        <Card className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/10">
          <CardContent className="text-center py-12">
            <User className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No consultants found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search criteria or add new consultant profiles
            </p>
            <Button
              onClick={() => setShowAddProfile(true)}
              className="mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add First Profile
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RecruiterProfileManager;
