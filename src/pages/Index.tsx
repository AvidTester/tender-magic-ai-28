
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProcurementTimeline } from '@/components/dashboard/ProcurementTimeline';
import { RecentTenders } from '@/components/dashboard/RecentTenders';
import { EvaluationProgress } from '@/components/dashboard/EvaluationProgress';
import { StatCard } from '@/components/dashboard/StatCard';
import { VerticalTimeline } from '@/components/dashboard/VerticalTimeline';
import { ArrowUp, Clock, FileCheck, DollarSign, Users } from 'lucide-react';

export default function Index() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Total Tenders" 
            value="12" 
            icon={<FileCheck className="h-8 w-8 text-blue-500" />}
            trend={{
              value: 4,
              positive: true
            }}
          />
          <StatCard 
            title="In Evaluation" 
            value="5" 
            icon={<Clock className="h-8 w-8 text-yellow-500" />}
            trend={{
              value: 0,
              positive: true
            }}
          />
          <StatCard 
            title="Active Vendors" 
            value="24" 
            icon={<Users className="h-8 w-8 text-green-500" />}
            trend={{
              value: 5,
              positive: true
            }}
          />
          <StatCard 
            title="Budget Allocated" 
            value="$1.2M" 
            icon={<DollarSign className="h-8 w-8 text-purple-500" />}
            trend={{
              value: 12,
              positive: true
            }}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Recent Tenders</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentTenders />
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Procurement Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <ProcurementTimeline />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Vertical Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <VerticalTimeline />
            </CardContent>
          </Card>
          <Card className="lg:col-span-4">
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

        <Card className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-colors">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center text-white">
              <div>
                <h3 className="text-xl font-bold">Start a new procurement process</h3>
                <p className="mt-1 opacity-90">Create a tender, define requirements, and start accepting proposals.</p>
              </div>
              <a 
                href="/create-tender" 
                className="mt-4 md:mt-0 bg-white text-blue-600 hover:bg-blue-50 transition-colors font-medium px-6 py-2 rounded-md flex items-center"
              >
                Create Tender
                <ArrowUp className="ml-2 h-4 w-4 rotate-45" />
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
