
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, FileText, Brain, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Active JDs",
      value: "24",
      icon: FileText,
      trend: "+12%",
      color: "text-blue-600"
    },
    {
      title: "Available Consultants",
      value: "156",
      icon: Users,
      trend: "+8%",
      color: "text-green-600"
    },
    {
      title: "AI Agents Active",
      value: "3",
      icon: Brain,
      trend: "100%",
      color: "text-purple-600"
    },
    {
      title: "Matches Found Today",
      value: "47",
      icon: Mail,
      trend: "+23%",
      color: "text-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AI Recruitment Matcher</h1>
                <p className="text-sm text-gray-500">Document Similarity & Ranking System</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                All Systems Operational
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Intelligent Recruitment Matching
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Leverage AI-powered multi-agent framework to automatically compare job descriptions 
            with consultant profiles, rank matches, and streamline recruitment processes.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm ${stat.color} font-medium`}>{stat.trend} from last week</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-50`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dashboard Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* AR Requestor Dashboard */}
          <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">AR Requestor Dashboard</CardTitle>
                  <CardDescription>Track your job requisition matching status</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Real-time matching progress</span>
                  <Badge variant="secondary">Live Updates</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Top 3 matches notification</span>
                  <Badge variant="secondary">Auto Email</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">JD comparison status</span>
                  <Badge variant="secondary">AI Powered</Badge>
                </div>
              </div>
              <Button 
                onClick={() => navigate('/ar-dashboard')} 
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              >
                Access AR Dashboard
              </Button>
            </CardContent>
          </Card>

          {/* Recruiter Admin Console */}
          <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">Recruiter Admin Console</CardTitle>
                  <CardDescription>Manage and monitor the AI matching system</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Agent performance monitoring</span>
                  <Badge variant="secondary">Real-time</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">JD search & filtering</span>
                  <Badge variant="secondary">Advanced</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Detailed reporting</span>
                  <Badge variant="secondary">Analytics</Badge>
                </div>
              </div>
              <Button 
                onClick={() => navigate('/recruiter-dashboard')} 
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              >
                Access Admin Console
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Agent Status Overview */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-purple-600" />
              <span>AI Agent Framework Status</span>
            </CardTitle>
            <CardDescription>
              Multi-agent system overview for document similarity and ranking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-blue-50">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="font-medium text-gray-900">Comparison Agent</p>
                  <p className="text-sm text-gray-600">Processing JD similarities</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-green-50">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="font-medium text-gray-900">Ranking Agent</p>
                  <p className="text-sm text-gray-600">Sorting profile matches</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-orange-50">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="font-medium text-gray-900">Communication Agent</p>
                  <p className="text-sm text-gray-600">Sending notifications</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Index;
