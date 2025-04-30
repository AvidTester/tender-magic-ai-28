
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { FileText, Users, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { RecentTenders } from '@/components/dashboard/RecentTenders';
import { ProcurementTimeline } from '@/components/dashboard/ProcurementTimeline';
import { EvaluationProgress } from '@/components/dashboard/EvaluationProgress';

const Index = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome to Smart Procurement platform. Here's an overview of your procurement activities.
          </p>
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

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentTenders />
          </div>
          <div className="lg:col-span-1">
            <ProcurementTimeline />
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
