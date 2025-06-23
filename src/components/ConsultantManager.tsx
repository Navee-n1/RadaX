
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Filter, Plus, Users, Edit, Eye, Trash2 } from "lucide-react";

const ConsultantManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [skillFilter, setSkillFilter] = useState("all");
  const [experienceFilter, setExperienceFilter] = useState("all");
  const [verticalFilter, setVerticalFilter] = useState("all");

  // Mock consultant data
  const consultants = [
    {
      empId: "EMP001",
      name: "Sarah Johnson",
      vertical: "Technology",
      skills: ["React", "TypeScript", "Node.js", "AWS", "Docker"],
      experience: "5 years",
      status: "Available",
      location: "New York",
      rate: "$95/hr",
      projects: 12,
      rating: 4.8
    },
    {
      empId: "EMP002", 
      name: "Mike Chen",
      vertical: "Data Science",
      skills: ["Python", "Machine Learning", "TensorFlow", "SQL", "Azure"],
      experience: "7 years",
      status: "On Project",
      location: "San Francisco",
      rate: "$110/hr",
      projects: 18,
      rating: 4.9
    },
    {
      empId: "EMP003",
      name: "Emily Rodriguez",
      vertical: "Technology",
      skills: ["Java", "Spring Boot", "Microservices", "Kubernetes", "GCP"],
      experience: "6 years", 
      status: "Available",
      location: "Austin",
      rate: "$100/hr",
      projects: 15,
      rating: 4.7
    },
    {
      empId: "EMP004",
      name: "David Kumar",
      vertical: "DevOps",
      skills: ["Jenkins", "Docker", "Kubernetes", "Terraform", "AWS"],
      experience: "8 years",
      status: "Available", 
      location: "Seattle",
      rate: "$120/hr",
      projects: 22,
      rating: 4.9
    },
    {
      empId: "EMP005",
      name: "Lisa Wang",
      vertical: "Frontend",
      skills: ["Vue.js", "React", "JavaScript", "CSS", "Figma"],
      experience: "4 years",
      status: "On Project",
      location: "Los Angeles",
      rate: "$85/hr",
      projects: 10,
      rating: 4.6
    }
  ];

  const verticals = ["All", "Technology", "Data Science", "DevOps", "Frontend", "Backend"];
  const experienceLevels = ["All", "1-3 years", "3-5 years", "5-7 years", "7+ years"];
  const skillCategories = ["All", "React", "Python", "Java", "AWS", "Docker", "Kubernetes"];

  const filteredConsultants = consultants.filter(consultant => {
    const matchesSearch = consultant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consultant.empId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consultant.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesVertical = verticalFilter === "all" || consultant.vertical === verticalFilter;
    const matchesSkill = skillFilter === "all" || consultant.skills.includes(skillFilter);
    
    return matchesSearch && matchesVertical && matchesSkill;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      "Available": "bg-green-100 text-green-800",
      "On Project": "bg-blue-100 text-blue-800", 
      "Unavailable": "bg-red-100 text-red-800"
    };
    return variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span>Consultant Management</span>
              </CardTitle>
              <CardDescription>
                Search, filter, and manage consultant profiles
              </CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Consultant
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Consultant</DialogTitle>
                  <DialogDescription>
                    Enter consultant details to add them to the system
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input placeholder="Employee ID" />
                  <Input placeholder="Full Name" />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Vertical" />
                    </SelectTrigger>
                    <SelectContent>
                      {verticals.slice(1).map(vertical => (
                        <SelectItem key={vertical} value={vertical.toLowerCase()}>
                          {vertical}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input placeholder="Skills (comma-separated)" />
                  <Input placeholder="Years of Experience" />
                  <div className="flex space-x-2">
                    <Button className="flex-1">Add Consultant</Button>
                    <Button variant="outline" className="flex-1">Cancel</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by name, EmpID, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Select value={verticalFilter} onValueChange={setVerticalFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Vertical" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Verticals</SelectItem>
                  {verticals.slice(1).map(vertical => (
                    <SelectItem key={vertical} value={vertical}>
                      {vertical}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={skillFilter} onValueChange={setSkillFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Skills" />
                </SelectTrigger>
                <SelectContent>
                  {skillCategories.map(skill => (
                    <SelectItem key={skill} value={skill === "All" ? "all" : skill}>
                      {skill}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Experience" />
                </SelectTrigger>
                <SelectContent>
                  {experienceLevels.map(level => (
                    <SelectItem key={level} value={level === "All" ? "all" : level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600">
              Showing {filteredConsultants.length} of {consultants.length} consultants
            </p>
            <div className="flex space-x-2">
              <Badge variant="outline">{consultants.filter(c => c.status === "Available").length} Available</Badge>
              <Badge variant="outline">{consultants.filter(c => c.status === "On Project").length} On Project</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Consultants Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Consultant</TableHead>
                  <TableHead>Vertical</TableHead>
                  <TableHead>Skills</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredConsultants.map((consultant) => (
                  <TableRow key={consultant.empId}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900">{consultant.name}</p>
                        <p className="text-sm text-gray-500">{consultant.empId}</p>
                        <p className="text-xs text-gray-400">{consultant.location}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{consultant.vertical}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1 max-w-48">
                        {consultant.skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {consultant.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{consultant.skills.length - 3}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{consultant.experience}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(consultant.status)}>
                        {consultant.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{consultant.rate}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-500">★</span>
                        <span className="font-medium">{consultant.rating}</span>
                        <span className="text-xs text-gray-500">({consultant.projects})</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
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
    </div>
  );
};

export default ConsultantManager;
