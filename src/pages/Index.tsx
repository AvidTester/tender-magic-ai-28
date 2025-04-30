
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { FileText, Users, CheckCircle, Clock, AlertTriangle, Search, Filter, CirclePlus } from 'lucide-react';
import { RecentTenders } from '@/components/dashboard/RecentTenders';
import { VerticalTimeline } from '@/components/dashboard/VerticalTimeline';
import { EvaluationProgress } from '@/components/dashboard/EvaluationProgress';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Welcome to Smart Procurement platform. Here's an overview of your procurement activities.
            </p>
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search tenders..." className="w-full md:w-[250px] pl-8" />
            </div>
            <Button size="icon" variant="outline">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Active Tenders"
            value="16"
            icon={<FileText className="h-5 w-5 text-primary" />}
            trend={{ value: 12, positive: true }}
          />
          <StatCard
            title="Registered Vendors"
            value="84"
            icon={<Users className="h-5 w-5 text-primary" />}
            trend={{ value: 5, positive: true }}
            description="+5% this month"
          />
          <StatCard
            title="Completed Evaluations"
            value="42"
            icon={<CheckCircle className="h-5 w-5 text-primary" />}
          />
          <StatCard
            title="Pending Reviews"
            value="7"
            icon={<Clock className="h-5 w-5 text-primary" />}
            trend={{ value: 2, positive: false }}
          />
        </div>

        {/* Alerts */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-md flex items-start">
          <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3 mt-0.5" />
          <div>
            <div className="font-medium text-yellow-800">Attention Needed</div>
            <div className="text-sm text-yellow-700">
              2 tenders are approaching their evaluation deadline. <a href="#" className="font-medium underline">Review now</a>
            </div>
          </div>
        </div>

        {/* Additional Dashboard Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Tenders Awaiting Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">IT Infrastructure Upgrade</p>
                    <p className="text-sm text-muted-foreground">3/5 evaluations completed</p>
                  </div>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-800">
                    <Clock className="mr-1 h-3 w-3" /> 2 days left
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Office Furniture</p>
                    <p className="text-sm text-muted-foreground">0/5 evaluations completed</p>
                  </div>
                  <Badge variant="outline" className="bg-red-50 text-red-800">
                    <Clock className="mr-1 h-3 w-3" /> Overdue
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Marketing Services</p>
                    <p className="text-sm text-muted-foreground">4/5 evaluations completed</p>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-800">
                    <Clock className="mr-1 h-3 w-3" /> 7 days left
                  </Badge>
                </div>
                
                <Button variant="outline" className="w-full mt-2">
                  View All Pending Reviews
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">New Submissions (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    <div>
                      <p className="font-medium">TechSolutions Inc.</p>
                      <p className="text-sm text-muted-foreground">IT Infrastructure Tender</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">2 days ago</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    <div>
                      <p className="font-medium">Global Consulting</p>
                      <p className="text-sm text-muted-foreground">Marketing Services</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">3 days ago</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    <div>
                      <p className="font-medium">Creative Designs</p>
                      <p className="text-sm text-muted-foreground">Office Furniture</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">5 days ago</p>
                </div>
                
                <Button variant="outline" className="w-full mt-2">
                  View All Submissions
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button className="h-20 flex-col">
                  <CirclePlus className="h-6 w-6 mb-1" />
                  <span>New Tender</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <FileText className="h-6 w-6 mb-1" />
                  <span>New Report</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Users className="h-6 w-6 mb-1" />
                  <span>Add Vendor</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <CheckCircle className="h-6 w-6 mb-1" />
                  <span>Evaluate</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentTenders />
          </div>
          <div className="lg:col-span-1">
            <VerticalTimeline />
          </div>
        </div>

        {/* Bottom section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <EvaluationProgress />
          </div>
          <div className="lg:col-span-2">
            <div className="gradient-background text-white rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-medium">Ready to create a new tender?</h3>
                  <p className="mt-2 text-white/80">
                    Get started with our step-by-step wizard to set up your next procurement.
                  </p>
                </div>
                <a
                  href="/create-tender"
                  className="bg-white text-primary hover:bg-gray-100 px-4 py-2 rounded-md font-medium text-sm transition-colors"
                >
                  Create Tender
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
