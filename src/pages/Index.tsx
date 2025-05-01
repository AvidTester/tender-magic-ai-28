
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatCards } from '@/components/dashboard/StatCards';
import { LiveAlerts } from '@/components/dashboard/LiveAlerts';
import { AiInsightsExpanded } from '@/components/dashboard/AiInsightsExpanded';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { RecentTenders } from '@/components/dashboard/RecentTenders';
import { EvaluationProgress } from '@/components/dashboard/EvaluationProgress';
import { ProcurementTimeline } from '@/components/dashboard/ProcurementTimeline';
import { DashboardCharts } from '@/components/dashboard/DashboardCharts';
import { DashboardFilters } from '@/components/dashboard/DashboardFilters';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Index() {
  const [timeFilter, setTimeFilter] = useState('7days');
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <DashboardFilters />
        
        {/* Stat Cards */}
        <StatCards />
        
        {/* Alerts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <LiveAlerts />
          </div>
          <div className="lg:col-span-1">
            <AiInsightsExpanded />
          </div>
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 gap-6">
          <DashboardCharts timeFilter={timeFilter} />
        </div>
        
        {/* Activity and Timeline Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ActivityFeed />
          </div>
          <div className="lg:col-span-2">
            <Tabs defaultValue="timeline">
              <div className="flex items-center justify-between mb-4">
                <TabsList>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="evaluations">Evaluations</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="timeline">
                <ProcurementTimeline />
              </TabsContent>
              
              <TabsContent value="evaluations">
                <EvaluationProgress />
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Recent Tenders Section */}
        <div className="grid grid-cols-1 gap-6">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-medium">Recent Tenders</h3>
            <Link to="/create-tender">
              <Button variant="ghost" size="sm" className="text-sm">
                <PlusCircle className="h-4 w-4 mr-1" />
                Create New Tender
              </Button>
            </Link>
          </div>
          <RecentTenders />
        </div>
        
        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-6 text-white">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-xl font-bold">Ready to create a new tender?</h3>
              <p className="text-blue-100 mt-1">
                You have 2 tenders started but not submitted. Start fresh or continue your work.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-blue-600">
                Resume Draft
              </Button>
              <Link to="/create-tender">
                <Button className="bg-white text-blue-600 hover:bg-blue-50">Start New Tender</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
