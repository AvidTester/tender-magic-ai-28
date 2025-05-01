
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProcurementTimeline } from '@/components/dashboard/ProcurementTimeline';
import { RecentTenders } from '@/components/dashboard/RecentTenders';
import { EvaluationProgress } from '@/components/dashboard/EvaluationProgress';
import { StatCard } from '@/components/dashboard/StatCard';
import { VerticalTimeline } from '@/components/dashboard/VerticalTimeline';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowUp, 
  Clock, 
  FileCheck, 
  DollarSign, 
  Users, 
  AlertTriangle, 
  CheckCircle,
  Lightbulb,
  Bell,
  Calendar
} from 'lucide-react';
import { DashboardCharts } from '@/components/dashboard/DashboardCharts';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { LiveAlerts } from '@/components/dashboard/LiveAlerts';
import { AiInsights } from '@/components/dashboard/AiInsights';
import { Link } from 'react-router-dom';

export default function Index() {
  const [timeFilter, setTimeFilter] = useState('7days');
  const [userFilter, setUserFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          
          {/* Dashboard Filters */}
          <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
            <select 
              className="px-3 py-1 rounded-md border text-sm bg-background" 
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
            >
              <option value="today">Today</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
            </select>
            <select 
              className="px-3 py-1 rounded-md border text-sm bg-background"
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
            >
              <option value="all">All Users</option>
              <option value="me">My Activity</option>
              <option value="evaluators">Evaluators</option>
            </select>
            <select 
              className="px-3 py-1 rounded-md border text-sm bg-background"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="issues">With Issues</option>
            </select>
          </div>
        </div>
        
        {/* Metrics Section (Top Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          <Link to="/create-tender" className="block">
            <StatCard 
              title="Total Tenders" 
              value="12" 
              icon={<FileCheck className="h-8 w-8 text-blue-500" />}
              trend={{
                value: 4,
                positive: true
              }}
            />
          </Link>
          
          <Link to="/evaluations" className="block">
            <StatCard 
              title="In Evaluation" 
              value="5" 
              icon={<Clock className="h-8 w-8 text-yellow-500" />}
              trend={{
                value: 0,
                positive: true
              }}
            />
          </Link>
          
          <Link to="/vendors" className="block">
            <StatCard 
              title="Active Vendors" 
              value="24" 
              icon={<Users className="h-8 w-8 text-green-500" />}
              trend={{
                value: 5,
                positive: true
              }}
            />
          </Link>
          
          <Link to="/reports" className="block">
            <StatCard 
              title="Budget Allocated" 
              value="$1.2M" 
              icon={<DollarSign className="h-8 w-8 text-purple-500" />}
              trend={{
                value: 12,
                positive: true
              }}
            />
          </Link>

          <Link to="/submissions?status=issue" className="block">
            <StatCard 
              title="AI Issues Detected" 
              value="3" 
              icon={<AlertTriangle className="h-8 w-8 text-red-500" />}
              trend={{
                value: 2,
                positive: false
              }}
            />
          </Link>
          
          <Link to="/vendors?status=unverified" className="block">
            <StatCard 
              title="Unverified Vendors" 
              value="8" 
              icon={<CheckCircle className="h-8 w-8 text-amber-500" />}
              trend={{
                value: 3,
                positive: false
              }}
            />
          </Link>
        </div>

        {/* Live Alerts Section */}
        <LiveAlerts />

        {/* Main Content Grid */}
        <div className="grid gap-4 md:grid-cols-7">
          {/* Left Column - Tenders and Timeline */}
          <div className="md:col-span-4 space-y-4">
            {/* Visualization Section */}
            <DashboardCharts timeFilter={timeFilter} />
            
            {/* Recent Tenders Table */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Recent Tenders</CardTitle>
                <Link to="/create-tender">
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <RecentTenders />
              </CardContent>
            </Card>

            {/* Procurement Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Procurement Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <ProcurementTimeline />
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Evaluation and Insights */}
          <div className="md:col-span-3 space-y-4">
            {/* AI Insight Panel */}
            <AiInsights />
            
            {/* Vertical Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Vertical Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <VerticalTimeline />
              </CardContent>
            </Card>

            {/* Evaluation Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Evaluation Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="technical">
                  <TabsList>
                    <TabsTrigger value="technical">Technical</TabsTrigger>
                    <TabsTrigger value="financial">Financial</TabsTrigger>
                    <TabsTrigger value="compliance">Compliance</TabsTrigger>
                  </TabsList>
                  <TabsContent value="technical" className="pt-4">
                    <EvaluationProgress />
                  </TabsContent>
                  <TabsContent value="financial" className="pt-4">
                    <EvaluationProgress />
                  </TabsContent>
                  <TabsContent value="compliance" className="pt-4">
                    <EvaluationProgress />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <ActivityFeed userFilter={userFilter} />

        {/* Create Tender CTA */}
        <Card className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-colors">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center text-white">
              <div>
                <h3 className="text-xl font-bold">Start a new procurement process</h3>
                <p className="mt-1 opacity-90">Create a tender, define requirements, and start accepting proposals.</p>
              </div>
              <Link 
                to="/create-tender" 
                className="mt-4 md:mt-0 bg-white text-blue-600 hover:bg-blue-50 transition-colors font-medium px-6 py-2 rounded-md flex items-center"
              >
                Create Tender
                <ArrowUp className="ml-2 h-4 w-4 rotate-45" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
