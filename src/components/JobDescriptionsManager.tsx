
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, FileText, Plus, Edit, Eye, Download, Calendar, Building, MapPin, DollarSign, Users, Clock, TrendingUp, Briefcase, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const JobDescriptionsManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [verticalFilter, setVerticalFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [showAddJD, setShowAddJD] = useState(false);
  const { toast } = useToast();

  const mockJDs = [
    {
      id: "JD-2024-001",
      title: "Senior Full Stack Developer",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      vertical: "Full Stack Development",
      status: "Active",
      priority: "High",
      experience: "5-8 years",
      salary: "$120K - $160K",
      postedDate: "2024-01-20",
      deadline: "2024-02-15",
      applicants: 47,
      matches: 12,
      skills: ["React", "Node.js", "TypeScript", "AWS", "MongoDB"],
      description: "We are looking for a Senior Full Stack Developer to join our growing team...",
      requirements: ["5+ years experience", "React expertise", "Node.js proficiency"],
      matchScore: 94
    },
    {
      id: "JD-2024-002",
      title: "AI/ML Engineer",
      company: "DataTech Innovations",
      location: "Austin, TX",
      vertical: "AI/ML Engineering",
      status: "Active",
      priority: "Critical",
      experience: "4-7 years",
      salary: "$130K - $180K",
      postedDate: "2024-01-18",
      deadline: "2024-02-12",
      applicants: 34,
      matches: 8,
      skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Docker"],
      description: "Join our AI team to build cutting-edge machine learning solutions...",
      requirements: ["4+ years ML experience", "Python mastery", "Deep learning knowledge"],
      matchScore: 89
    },
    {
      id: "JD-2024-003",
      title: "DevOps Engineer",
      company: "CloudScale Systems",
      location: "Seattle, WA",
      vertical: "DevOps Engineering",
      status: "Paused",
      priority: "Medium",
      experience: "3-6 years",
      salary: "$110K - $150K",
      postedDate: "2024-01-15",
      deadline: "2024-02-20",
      applicants: 23,
      matches: 6,
      skills: ["Kubernetes", "Docker", "AWS", "Terraform", "Jenkins"],
      description: "Seeking a DevOps Engineer to optimize our cloud infrastructure...",
      requirements: ["3+ years DevOps", "Kubernetes experience", "Cloud platforms"],
      matchScore: 86
    },
    {
      id: "JD-2024-004",
      title: "Frontend Developer",
      company: "DesignTech Studios",
      location: "New York, NY",
      vertical: "Frontend Development",
      status: "Active",
      priority: "High",
      experience: "2-5 years",
      salary: "$90K - $130K",
      postedDate: "2024-01-22",
      deadline: "2024-02-18",
      applicants: 56,
      matches: 15,
      skills: ["React", "Vue.js", "TypeScript", "SCSS", "Figma"],
      description: "Creative Frontend Developer needed for innovative web applications...",
      requirements: ["2+ years frontend", "React proficiency", "Design sensibility"],
      matchScore: 92
    },
    {
      id: "JD-2024-005",
      title: "Backend Engineer",
      company: "ServerTech Corp",
      location: "Denver, CO",
      vertical: "Backend Engineering",
      status: "Filled",
      priority: "Low",
      experience: "4-8 years",
      salary: "$115K - $155K",
      postedDate: "2024-01-10",
      deadline: "2024-02-05",
      applicants: 41,
      matches: 9,
      skills: ["Java", "Spring Boot", "Microservices", "PostgreSQL", "Redis"],
      description: "Backend Engineer for scalable enterprise applications...",
      requirements: ["4+ years backend", "Java expertise", "Microservices architecture"],
      matchScore: 88
    }
  ];

  const verticals = ["Full Stack Development", "AI/ML Engineering", "DevOps Engineering", "Frontend Development", "Backend Engineering"];
  const locations = ["San Francisco, CA", "Austin, TX", "Seattle, WA", "New York, NY", "Denver, CO"];

  const filteredJDs = mockJDs.filter(jd => {
    const matchesSearch = jd.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         jd.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         jd.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || statusFilter === "all" || jd.status === statusFilter;
    const matchesVertical = !verticalFilter || verticalFilter === "all" || jd.vertical === verticalFilter;
    const matchesLocation = !locationFilter || locationFilter === "all" || jd.location === locationFilter;
    
    return matchesSearch && matchesStatus && matchesVertical && matchesLocation;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-700 dark:text-green-300 border-green-300/30";
      case "Paused":
        return "bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-700 dark:text-orange-300 border-orange-300/30";
      case "Filled":
        return "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-700 dark:text-blue-300 border-blue-300/30";
      default:
        return "bg-gradient-to-r from-gray-500/20 to-slate-500/20 text-gray-700 dark:text-gray-300 border-gray-300/30";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "from-red-500 to-pink-500";
      case "High":
        return "from-orange-500 to-amber-500";
      case "Medium":
        return "from-blue-500 to-cyan-500";
      case "Low":
        return "from-gray-500 to-slate-500";
      default:
        return "from-gray-500 to-slate-500";
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "from-emerald-500 to-green-500";
    if (score >= 80) return "from-blue-500 to-cyan-500";
    if (score >= 70) return "from-orange-500 to-amber-500";
    return "from-gray-500 to-slate-500";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold gradient-text">
            Job Descriptions Management
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Monitor, manage, and track all job descriptions with AI-powered matching insights
          </p>
        </div>
        <Button
          onClick={() => setShowAddJD(true)}
          className="group bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 hover:from-blue-600 hover:via-purple-600 hover:to-cyan-600 text-white shadow-2xl hover:shadow-purple-500/25 smooth-transition hover:scale-105 px-6 py-3 rounded-2xl"
        >
          <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 smooth-transition" />
          Add New JD
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card border-0 hover:shadow-2xl smooth-transition hover:scale-105">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active JDs</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {mockJDs.filter(jd => jd.status === "Active").length}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 font-medium">+3 this week</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 hover:shadow-2xl smooth-transition hover:scale-105">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Applicants</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {mockJDs.reduce((sum, jd) => sum + jd.applicants, 0)}
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">+23 today</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 hover:shadow-2xl smooth-transition hover:scale-105">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">AI Matches</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {mockJDs.reduce((sum, jd) => sum + jd.matches, 0)}
                </p>
                <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">89% accuracy</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center">
                <Star className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 hover:shadow-2xl smooth-transition hover:scale-105">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Filled Positions</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {mockJDs.filter(jd => jd.status === "Filled").length}
                </p>
                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">20% fill rate</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="glass-card border-0 p-8">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Search */}
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="search" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                <Search className="w-4 h-4 mr-2" />
                Search JDs
              </Label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search by title, ID, or company"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 glass-effect border-white/30 dark:border-white/20 rounded-2xl text-lg focus:ring-2 focus:ring-blue-500/50 smooth-transition"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Status
              </Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-12 glass-effect border-white/30 dark:border-white/20 rounded-2xl">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent className="glass-effect border-white/30 dark:border-white/20">
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Paused">Paused</SelectItem>
                  <SelectItem value="Filled">Filled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Vertical Filter */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                <Briefcase className="w-4 h-4 mr-2" />
                Vertical
              </Label>
              <Select value={verticalFilter} onValueChange={setVerticalFilter}>
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

            {/* Location Filter */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Location
              </Label>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="h-12 glass-effect border-white/30 dark:border-white/20 rounded-2xl">
                  <SelectValue placeholder="All locations" />
                </SelectTrigger>
                <SelectContent className="glass-effect border-white/30 dark:border-white/20">
                  <SelectItem value="all">All locations</SelectItem>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/20 dark:border-white/10">
            <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
              Showing <span className="gradient-text font-bold">{filteredJDs.length}</span> of <span className="gradient-text font-bold">{mockJDs.length}</span> job descriptions
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("");
                setVerticalFilter("");
                setLocationFilter("");
              }}
              className="glass-effect border-white/30 dark:border-white/20 hover:bg-white/20 dark:hover:bg-white/10 rounded-xl smooth-transition"
            >
              <Filter className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Job Descriptions Table */}
      <Card className="glass-card border-0">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/20 dark:border-white/10">
                  <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">Job Details</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">Company & Location</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">Status & Priority</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">Metrics</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">AI Match Score</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJDs.map((jd, index) => (
                  <TableRow key={jd.id} className="border-white/20 dark:border-white/10 hover:bg-white/10 dark:hover:bg-white/5 smooth-transition" style={{animationDelay: `${index * 0.1}s`}}>
                    <TableCell className="py-6">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 dark:text-white text-lg">{jd.title}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{jd.id}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span>Posted: {jd.postedDate}</span>
                          <span className="text-gray-400">•</span>
                          <span>Deadline: {jd.deadline}</span>
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell className="py-6">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Building className="w-4 h-4 text-gray-500" />
                          <span className="font-medium text-gray-900 dark:text-white">{jd.company}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">{jd.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">{jd.salary}</span>
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell className="py-6">
                      <div className="space-y-3">
                        <Badge className={`${getStatusColor(jd.status)} px-3 py-2 rounded-full text-sm font-semibold`}>
                          {jd.status}
                        </Badge>
                        <Badge className={`bg-gradient-to-r ${getPriorityColor(jd.priority)} text-white px-3 py-1 rounded-lg text-xs font-bold`}>
                          {jd.priority} Priority
                        </Badge>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{jd.vertical}</p>
                      </div>
                    </TableCell>
                    
                    <TableCell className="py-6">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{jd.applicants} applicants</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-purple-500" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{jd.matches} AI matches</span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{jd.experience}</p>
                      </div>
                    </TableCell>
                    
                    <TableCell className="py-6">
                      <div className="flex items-center justify-center">
                        <div className={`w-16 h-16 bg-gradient-to-r ${getMatchScoreColor(jd.matchScore)} rounded-2xl flex items-center justify-center shadow-lg`}>
                          <span className="text-white font-bold text-lg">{jd.matchScore}</span>
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell className="py-6">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl glass-effect hover:bg-white/20 dark:hover:bg-white/10 smooth-transition">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl glass-effect hover:bg-white/20 dark:hover:bg-white/10 smooth-transition">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl glass-effect hover:bg-white/20 dark:hover:bg-white/10 smooth-transition">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {filteredJDs.length === 0 && (
        <Card className="glass-card border-0">
          <CardContent className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-400/20 to-slate-400/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-gray-400 dark:text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No job descriptions found</h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
              Try adjusting your search criteria or add new job descriptions
            </p>
            <Button
              onClick={() => setShowAddJD(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-2xl font-semibold smooth-transition hover:scale-105 shadow-xl"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add First JD
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default JobDescriptionsManager;
