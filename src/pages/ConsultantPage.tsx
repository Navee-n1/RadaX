
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, User, Plus, Edit, Eye, Briefcase, Calendar, MapPin, Code, Database, Smartphone, Globe, GraduationCap, ArrowLeft, Moon, Sun } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const ConsultantPage = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVertical, setSelectedVertical] = useState('all');
  const [selectedExperience, setSelectedExperience] = useState('all');

  const consultants = [
    {
      empId: 'EMP001',
      name: 'Sarah Chen',
      email: 'sarah.chen@company.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      avatar: '/placeholder.svg',
      initials: 'SC',
      vertical: 'Full Stack Development',
      experience: '6 years',
      currentProject: 'E-commerce Platform',
      availability: 'Available',
      skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB', 'GraphQL'],
      certifications: ['AWS Certified', 'React Certified'],
      projectsCompleted: 24,
      lastActive: '2 hours ago',
      bio: 'Experienced full-stack developer with expertise in modern web technologies.',
      education: 'MS Computer Science, Stanford University',
      languages: ['English', 'Mandarin'],
      specializations: ['E-commerce', 'SaaS Applications', 'API Development']
    },
    {
      empId: 'EMP002',
      name: 'Michael Rodriguez',
      email: 'michael.rodriguez@company.com', 
      phone: '+1 (555) 234-5678',
      location: 'New York, NY',
      avatar: '/placeholder.svg',
      initials: 'MR',
      vertical: 'Data Engineering',
      experience: '5 years',
      currentProject: 'Analytics Pipeline',
      availability: 'In Project',
      skills: ['Python', 'Apache Spark', 'SQL', 'Kafka', 'Docker', 'Kubernetes'],
      certifications: ['Google Cloud Professional', 'Databricks Certified'],
      projectsCompleted: 18,
      lastActive: '1 hour ago',
      bio: 'Data engineer specializing in large-scale data processing and analytics.',
      education: 'BS Data Science, MIT',
      languages: ['English', 'Spanish'],
      specializations: ['Data Pipelines', 'Real-time Processing', 'Cloud Architecture']
    },
    {
      empId: 'EMP003',
      name: 'Emily Wang',
      email: 'emily.wang@company.com',
      phone: '+1 (555) 345-6789',
      location: 'Austin, TX',
      avatar: '/placeholder.svg',
      initials: 'EW',
      vertical: 'Mobile Development',
      experience: '4 years',
      currentProject: 'Banking Mobile App',
      availability: 'Available Soon',
      skills: ['React Native', 'Flutter', 'iOS', 'Android', 'Firebase'],
      certifications: ['Google Flutter Certified', 'iOS Developer'],
      projectsCompleted: 21,
      lastActive: '30 minutes ago',
      bio: 'Mobile app developer with expertise in cross-platform solutions.',
      education: 'BS Computer Engineering, UT Austin',
      languages: ['English', 'Mandarin'],
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
      skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins'],
      certifications: ['AWS Solutions Architect', 'Kubernetes Certified'],
      projectsCompleted: 32,
      lastActive: '4 hours ago',
      bio: 'Senior DevOps engineer with extensive cloud infrastructure experience.',
      education: 'MS Software Engineering, University of Washington',
      languages: ['English', 'Hindi'],
      specializations: ['Cloud Architecture', 'CI/CD Pipelines', 'Infrastructure Automation']
    },
    {
      empId: 'EMP005',
      name: 'Jessica Park',
      email: 'jessica.park@company.com',
      phone: '+1 (555) 567-8901',
      location: 'Boston, MA',
      avatar: '/placeholder.svg',
      initials: 'JP',
      vertical: 'UI/UX Design',
      experience: '5 years',
      currentProject: 'Design System',
      availability: 'Available',
      skills: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research'],
      certifications: ['Google UX Certified', 'Adobe Certified'],
      projectsCompleted: 28,
      lastActive: '1 hour ago',
      bio: 'Creative UI/UX designer focused on user-centered design.',
      education: 'BFA Graphic Design, RISD',
      languages: ['English', 'Korean'],
      specializations: ['Design Systems', 'Mobile UX', 'Accessibility']
    }
  ];

  const verticals = ['all', 'Full Stack Development', 'Data Engineering', 'Mobile Development', 'DevOps Engineering', 'UI/UX Design'];
  const experienceLevels = ['all', '0-2 years', '3-5 years', '6+ years'];

  const filteredConsultants = consultants.filter(consultant => {
    const matchesSearch = consultant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consultant.empId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consultant.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesVertical = selectedVertical === 'all' || consultant.vertical === selectedVertical;
    
    const matchesExperience = selectedExperience === 'all' || 
                             (selectedExperience === '0-2 years' && parseInt(consultant.experience) <= 2) ||
                             (selectedExperience === '3-5 years' && parseInt(consultant.experience) >= 3 && parseInt(consultant.experience) <= 5) ||
                             (selectedExperience === '6+ years' && parseInt(consultant.experience) >= 6);

    return matchesSearch && matchesVertical && matchesExperience;
  });

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'Available': return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800';
      case 'In Project': return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800';
      case 'Available Soon': return 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800';
      default: return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
    }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen professional-gradient smooth-transition ${isDark ? 'dark' : ''}`}>
      {/* Header */}
      <header className="glass-surface border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="rounded-xl">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="h-6 w-px bg-slate-300 dark:bg-slate-600"></div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-sky-500 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-200">
                  Consultant Directory
                </h1>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={toggleTheme} className="rounded-xl">
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filters */}
        <Card className="glass-card mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium professional-text">Search Consultants</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Name, ID, or skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-11 glass-surface border-slate-300 dark:border-slate-600 rounded-xl"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium professional-text">Vertical</label>
                <select
                  value={selectedVertical}
                  onChange={(e) => setSelectedVertical(e.target.value)}
                  className="w-full p-3 rounded-xl glass-surface border border-slate-300 dark:border-slate-600 professional-text"
                >
                  {verticals.map(vertical => (
                    <option key={vertical} value={vertical}>
                      {vertical === 'all' ? 'All Verticals' : vertical}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium professional-text">Experience</label>
                <select
                  value={selectedExperience}
                  onChange={(e) => setSelectedExperience(e.target.value)}
                  className="w-full p-3 rounded-xl glass-surface border border-slate-300 dark:border-slate-600 professional-text"
                >
                  {experienceLevels.map(level => (
                    <option key={level} value={level}>
                      {level === 'all' ? 'All Experience' : level}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <p className="professional-text font-medium">
            Showing {filteredConsultants.length} of {consultants.length} consultants
          </p>
          <Button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Consultant
          </Button>
        </div>

        {/* Consultant Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConsultants.map((consultant) => (
            <Card key={consultant.empId} className="glass-card group hover:scale-[1.02] smooth-transition">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={consultant.avatar} />
                      <AvatarFallback className="bg-sky-500 text-white font-semibold">
                        {consultant.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-slate-800 dark:text-slate-200">{consultant.name}</h3>
                      <p className="text-sm professional-text">{consultant.empId}</p>
                    </div>
                  </div>
                  <Badge className={`${getAvailabilityColor(consultant.availability)} px-3 py-1 rounded-full text-xs font-medium border`}>
                    {consultant.availability}
                  </Badge>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2 text-sm professional-text">
                    <Briefcase className="w-4 h-4 text-sky-500" />
                    <span>{consultant.vertical}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm professional-text">
                    <Calendar className="w-4 h-4 text-sky-500" />
                    <span>{consultant.experience} experience</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm professional-text">
                    <MapPin className="w-4 h-4 text-sky-500" />
                    <span>{consultant.location}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium professional-text mb-2">Key Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {consultant.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} className="text-xs bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-900/20 dark:text-sky-400 dark:border-sky-800">
                        {skill}
                      </Badge>
                    ))}
                    {consultant.skills.length > 3 && (
                      <Badge className="text-xs bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700">
                        +{consultant.skills.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="text-sm professional-text">
                    <span className="font-medium">{consultant.projectsCompleted}</span> projects completed
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="ghost" className="w-8 h-8 p-0 rounded-lg hover:bg-sky-100 dark:hover:bg-sky-900/20">
                      <Eye className="w-4 h-4 text-sky-600" />
                    </Button>
                    <Button size="sm" variant="ghost" className="w-8 h-8 p-0 rounded-lg hover:bg-sky-100 dark:hover:bg-sky-900/20">
                      <Edit className="w-4 h-4 text-sky-600" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredConsultants.length === 0 && (
          <Card className="glass-card">
            <CardContent className="text-center py-16">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">No consultants found</h3>
              <p className="professional-text mb-6">Try adjusting your search criteria</p>
              <Button className="btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                Add First Consultant
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ConsultantPage;
