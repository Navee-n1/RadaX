
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Filter, Download, Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap, Star, Edit, Trash2, Eye, Users, Code, Database, Smartphone, Globe, Award, TrendingUp } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const ConsultantManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVertical, setSelectedVertical] = useState('all');
  const [selectedExperience, setSelectedExperience] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const { toast } = useToast();

  const consultants = [
    {
      empId: 'EMP001',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      avatar: '/placeholder.svg',
      initials: 'SJ',
      vertical: 'Full Stack Development',
      experience: '6 years',
      currentProject: 'E-commerce Platform',
      availability: 'Available',
      skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB', 'GraphQL'],
      certifications: ['AWS Certified', 'React Certified'],
      rating: 4.8,
      projectsCompleted: 24,
      clientSatisfaction: 96,
      hourlyRate: '$85',
      lastActive: '2 hours ago',
      bio: 'Experienced full-stack developer with expertise in modern web technologies and cloud platforms.',
      education: 'MS Computer Science, Stanford University',
      languages: ['English', 'Spanish'],
      specializations: ['E-commerce', 'SaaS Applications', 'API Development']
    },
    {
      empId: 'EMP002',
      name: 'Michael Chen',
      email: 'michael.chen@company.com', 
      phone: '+1 (555) 234-5678',
      location: 'New York, NY',
      avatar: '/placeholder.svg',
      initials: 'MC',
      vertical: 'Data Science',
      experience: '5 years',
      currentProject: 'ML Analytics Platform',
      availability: 'In Project',
      skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'R', 'Statistics'],
      certifications: ['Google ML Certified', 'Tableau Certified'],
      rating: 4.9,
      projectsCompleted: 18,
      clientSatisfaction: 98,
      hourlyRate: '$95',
      lastActive: '1 hour ago',
      bio: 'Data scientist specializing in machine learning and predictive analytics with proven track record.',
      education: 'PhD Statistics, MIT',
      languages: ['English', 'Mandarin'],
      specializations: ['Predictive Analytics', 'NLP', 'Computer Vision']
    },
    {
      empId: 'EMP003',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@company.com',
      phone: '+1 (555) 345-6789',
      location: 'Austin, TX',
      avatar: '/placeholder.svg',
      initials: 'ER',
      vertical: 'Mobile Development',
      experience: '4 years',
      currentProject: 'Banking Mobile App',
      availability: 'Available Soon',
      skills: ['React Native', 'Flutter', 'iOS', 'Android', 'Firebase', 'Redux'],
      certifications: ['Google Flutter Certified', 'iOS Developer'],
      rating: 4.7,
      projectsCompleted: 21,
      clientSatisfaction: 94,
      hourlyRate: '$78',
      lastActive: '30 minutes ago',
      bio: 'Mobile app developer with expertise in cross-platform development and native solutions.',
      education: 'BS Computer Engineering, UT Austin',
      languages: ['English', 'Spanish'],
      specializations: ['Cross-platform Apps', 'Mobile Banking', 'Real-time Features']
    },
    {
      empId: 'EMP004',
      name: 'David Kumar',
      email: 'david.kumar@company.com',
      phone: '+1 (555) 456-7890',
      location: 'Seattle, WA',
      avatar: '/placeholder.svg',
      initials: 'DK',
      vertical: 'DevOps Engineering',
      experience: '7 years',
      currentProject: 'Cloud Migration',
      availability: 'In Project',
      skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'Monitoring'],
      certifications: ['AWS Solutions Architect', 'Kubernetes Certified'],
      rating: 4.9,
      projectsCompleted: 32,
      clientSatisfaction: 97,
      hourlyRate: '$92',
      lastActive: '4 hours ago',
      bio: 'Senior DevOps engineer with extensive experience in cloud infrastructure and automation.',
      education: 'MS Software Engineering, University of Washington',
      languages: ['English', 'Hindi'],
      specializations: ['Cloud Architecture', 'CI/CD Pipelines', 'Infrastructure Automation']
    },
    {
      empId: 'EMP005',
      name: 'Jessica Taylor',
      email: 'jessica.taylor@company.com',
      phone: '+1 (555) 567-8901',
      location: 'Boston, MA',
      avatar: '/placeholder.svg',
      initials: 'JT',
      vertical: 'UI/UX Design',
      experience: '5 years',
      currentProject: 'Design System',
      availability: 'Available',
      skills: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research', 'Design Systems'],
      certifications: ['Google UX Certified', 'Adobe Certified'],
      rating: 4.8,
      projectsCompleted: 28,
      clientSatisfaction: 95,
      hourlyRate: '$82',
      lastActive: '1 hour ago',
      bio: 'Creative UI/UX designer focused on user-centered design and modern design systems.',
      education: 'BFA Graphic Design, RISD',
      languages: ['English', 'French'],
      specializations: ['Design Systems', 'Mobile UX', 'Accessibility']
    },
    {
      empId: 'EMP006',
      name: 'Robert Wilson',
      email: 'robert.wilson@company.com',
      phone: '+1 (555) 678-9012',
      location: 'Chicago, IL',
      avatar: '/placeholder.svg',
      initials: 'RW',
      vertical: 'Blockchain Development',
      experience: '3 years',
      currentProject: 'DeFi Platform',
      availability: 'Available Soon',
      skills: ['Solidity', 'Ethereum', 'Smart Contracts', 'Web3', 'DeFi', 'Node.js'],
      certifications: ['Ethereum Developer', 'Blockchain Certified'],
      rating: 4.6,
      projectsCompleted: 15,
      clientSatisfaction: 92,
      hourlyRate: '$88',
      lastActive: '2 hours ago',
      bio: 'Blockchain developer specializing in smart contracts and decentralized applications.',
      education: 'MS Cryptography, Northwestern University',
      languages: ['English'],
      specializations: ['Smart Contracts', 'DeFi Protocols', 'Token Economics']
    }
  ];

  const verticals = ['all', 'Full Stack Development', 'Data Science', 'Mobile Development', 'DevOps Engineering', 'UI/UX Design', 'Blockchain Development'];
  const experienceLevels = ['all', '0-2 years', '3-5 years', '6+ years'];

  const filteredConsultants = consultants.filter(consultant => {
    const matchesSearch = consultant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consultant.empId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consultant.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         consultant.vertical.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesVertical = selectedVertical === 'all' || consultant.vertical === selectedVertical;
    
    const matchesExperience = selectedExperience === 'all' || 
                             (selectedExperience === '0-2 years' && parseInt(consultant.experience) <= 2) ||
                             (selectedExperience === '3-5 years' && parseInt(consultant.experience) >= 3 && parseInt(consultant.experience) <= 5) ||
                             (selectedExperience === '6+ years' && parseInt(consultant.experience) >= 6);

    return matchesSearch && matchesVertical && matchesExperience;
  });

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'Available': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'In Project': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'Available Soon': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const handleExportData = () => {
    toast({
      title: "Export Initiated",
      description: "Consultant data is being exported to CSV"
    });
  };

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Consultant Profiles</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage and search through consultant database</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button onClick={handleExportData} className="bg-green-600 hover:bg-green-700">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Consultant
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/10">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Name, ID, skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 backdrop-blur-sm bg-white/50 dark:bg-black/50 border-white/50 dark:border-white/20"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Vertical</label>
              <select
                value={selectedVertical}
                onChange={(e) => setSelectedVertical(e.target.value)}
                className="w-full p-2 rounded-md backdrop-blur-sm bg-white/50 dark:bg-black/50 border border-white/50 dark:border-white/20"
              >
                {verticals.map(vertical => (
                  <option key={vertical} value={vertical}>
                    {vertical === 'all' ? 'All Verticals' : vertical}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Experience</label>
              <select
                value={selectedExperience}
                onChange={(e) => setSelectedExperience(e.target.value)}
                className="w-full p-2 rounded-md backdrop-blur-sm bg-white/50 dark:bg-black/50 border border-white/50 dark:border-white/20"
              >
                {experienceLevels.map(level => (
                  <option key={level} value={level}>
                    {level === 'all' ? 'All Experience' : level}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">View</label>
              <div className="flex space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="flex-1"
                >
                  Grid
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="flex-1"
                >
                  List
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600 dark:text-gray-400">
          Showing {filteredConsultants.length} of {consultants.length} consultants
        </p>
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600 dark:text-gray-400">Active filters applied</span>
        </div>
      </div>

      {/* Consultants Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConsultants.map((consultant) => (
            <Card key={consultant.empId} className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/10 hover:scale-105 transition-all duration-300 shadow-2xl">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={consultant.avatar} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold">
                        {consultant.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{consultant.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{consultant.empId}</p>
                    </div>
                  </div>
                  <Badge className={getAvailabilityColor(consultant.availability)}>
                    {consultant.availability}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Briefcase className="w-4 h-4" />
                    <span>{consultant.vertical}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{consultant.experience} experience</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>{consultant.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span>{consultant.rating} ({consultant.projectsCompleted} projects)</span>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Key Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {consultant.skills.slice(0, 4).map((skill) => (
                      <Badge key={skill} className="text-xs bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                        {skill}
                      </Badge>
                    ))}
                    {consultant.skills.length > 4 && (
                      <Badge className="text-xs bg-gray-100/50 dark:bg-gray-900/30">
                        +{consultant.skills.length - 4}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/20 dark:border-white/10">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{consultant.hourlyRate}</div>
                    <div className="text-xs text-gray-500">per hour</div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                      <Mail className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/10">
          <CardContent className="p-0">
            {filteredConsultants.map((consultant, index) => (
              <div key={consultant.empId} className={`p-6 ${index !== filteredConsultants.length - 1 ? 'border-b border-white/20 dark:border-white/10' : ''}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={consultant.avatar} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold">
                        {consultant.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{consultant.name}</h3>
                        <Badge className="text-xs">{consultant.empId}</Badge>
                        <Badge className={getAvailabilityColor(consultant.availability)}>
                          {consultant.availability}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center space-x-1">
                          <Briefcase className="w-3 h-3" />
                          <span>{consultant.vertical}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{consultant.experience}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{consultant.location}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span>{consultant.rating}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">{consultant.hourlyRate}</div>
                      <div className="text-xs text-gray-500">per hour</div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                        <Mail className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {consultant.skills.map((skill) => (
                    <Badge key={skill} className="text-xs bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {filteredConsultants.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No consultants found</h3>
          <p className="text-gray-600 dark:text-gray-400">Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  );
};

export default ConsultantManager;
