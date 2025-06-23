
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Search, Filter, Brain, Users, FileText, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const jobDescriptions = [
    {
      id: "JD-2024-001",
      title: "Senior Full Stack Developer",
      status: "completed",
      matches: 3,
      created: "2024-01-15",
      requester: "John Smith"
    },
    {
      id: "JD-2024-002", 
      title: "DevOps Engineer",
      status: "in-progress",
      matches: 0,
      created: "2024-01-14",
      requester: "Sarah Johnson"
    },
    {
      id: "JD-2024-003",
      title: "Data Scientist",
      status: "pending",
      matches: 0,
      created: "2024-01-13",
      requester: "Mike Chen"
    }
  ];

  const agentMetrics = [
    {
      agent: "Comparison Agent",
      status: "active",
      latency: "1.2s",
      errorRate: "0.1%",
      processed: 156
    },
    {
      agent: "Ranking Agent", 
      status: "active",
      latency: "0.8s",
      errorRate: "0.0%",
      processed: 89
    },
    {
      agent: "Communication Agent",
      status: "active", 
      latency: "2.1s",
      errorRate: "0.2%",
      processed: 24
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "in-progress":
        return <Clock className="w-4 h-4 text-blue-600 animate-spin" />;
      case "pending":
        return <AlertCircle className="w-4 h-4 text-orange-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case "pending":
        return <Badge className="bg-orange-100 text-orange-800">Pending</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-gray-900">Recruiter Admin Console</h1>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              All Agents Active
            </Badge>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total JDs</p>
                  <p className="text-3xl font-bold text-gray-900">24</p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Matches</p>
                  <p className="text-3xl font-bold text-gray-900">47</p>
                </div>
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Latency</p>
                  <p className="text-3xl font-bold text-gray-900">1.4s</p>
                </div>
                <Brain className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Error Rate</p>
                  <p className="text-3xl font-bold text-gray-900">0.1%</p>
                </div>
                <AlertCircle className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="jds" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="jds">Job Descriptions</TabsTrigger>
            <TabsTrigger value="agents">Agent Monitoring</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Job Descriptions Tab */}
          <TabsContent value="jds">
            <Card>
              <CardHeader>
                <CardTitle>Job Description Management</CardTitle>
                <CardDescription>Search, filter, and monitor JD processing status</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Search and Filter Controls */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search by JD title, ID, or requester..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* JD Table */}
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Job Description</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Matches</TableHead>
                        <TableHead>Requester</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {jobDescriptions.map((jd) => (
                        <TableRow key={jd.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{jd.title}</p>
                              <p className="text-sm text-gray-500">{jd.id}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(jd.status)}
                              {getStatusBadge(jd.status)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {jd.matches} matches
                            </Badge>
                          </TableCell>
                          <TableCell>{jd.requester}</TableCell>
                          <TableCell>{jd.created}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Agent Monitoring Tab */}
          <TabsContent value="agents">
            <Card>
              <CardHeader>
                <CardTitle>AI Agent Performance Monitoring</CardTitle>
                <CardDescription>Real-time metrics for the multi-agent framework</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {agentMetrics.map((agent) => (
                    <div key={agent.agent} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                          <h3 className="font-semibold text-gray-900">{agent.agent}</h3>
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            {agent.status}
                          </Badge>
                        </div>
                        <Badge variant="secondary">
                          {agent.processed} processed
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600">Average Latency</p>
                          <p className="text-xl font-bold text-gray-900">{agent.latency}</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600">Error Rate</p>
                          <p className="text-xl font-bold text-gray-900">{agent.errorRate}</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600">Queue Status</p>
                          <p className="text-xl font-bold text-green-600">Healthy</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Analytics & Reports</CardTitle>
                <CardDescription>Generate detailed reports on matching performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Quick Reports</h3>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <FileText className="w-4 h-4 mr-2" />
                        Weekly Matching Summary
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Users className="w-4 h-4 mr-2" />
                        Top Performing Consultants
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Brain className="w-4 h-4 mr-2" />
                        Agent Performance Report
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Recent Activity</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="text-sm font-medium">JD-2024-001 processed</p>
                          <p className="text-xs text-gray-600">3 matches found</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-sm font-medium">JD-2024-002 in progress</p>
                          <p className="text-xs text-gray-600">Ranking profiles</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default RecruiterDashboard;
