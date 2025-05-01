
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FileCheck, Users, Clock, Eye } from 'lucide-react';

interface ActivityFeedProps {
  userFilter: string;
}

// Sample activity data
const activityData = [
  {
    id: 1,
    user: {
      name: 'Jane Smith',
      avatar: 'JS',
      role: 'Evaluator'
    },
    action: 'evaluated',
    target: 'Tech Solutions Inc.',
    targetType: 'vendor',
    timestamp: '2025-05-01T13:45:00',
    icon: Eye
  },
  {
    id: 2,
    user: {
      name: 'John Doe',
      avatar: 'JD',
      role: 'Admin'
    },
    action: 'created',
    target: 'IT Infrastructure Upgrade',
    targetType: 'tender',
    timestamp: '2025-05-01T11:20:00',
    icon: FileCheck
  },
  {
    id: 3,
    user: {
      name: 'Michael Johnson',
      avatar: 'MJ',
      role: 'Vendor'
    },
    action: 'submitted documents for',
    target: 'Office Furniture Procurement',
    targetType: 'tender',
    timestamp: '2025-04-30T16:30:00',
    icon: FileCheck
  },
  {
    id: 4,
    user: {
      name: 'Sarah Davis',
      avatar: 'SD',
      role: 'Evaluator'
    },
    action: 'completed review of',
    target: 'Marketing Campaign tender',
    targetType: 'tender',
    timestamp: '2025-04-30T14:15:00',
    icon: Eye
  },
  {
    id: 5,
    user: {
      name: 'Emma Wilson',
      avatar: 'EW',
      role: 'Admin'
    },
    action: 'verified',
    target: 'GlobalTech Services',
    targetType: 'vendor',
    timestamp: '2025-04-29T10:45:00',
    icon: Users
  }
];

export function ActivityFeed({ userFilter }: ActivityFeedProps) {
  // Filter activities based on user filter
  const filteredActivities = activityData.filter(activity => {
    if (userFilter === 'all') return true;
    if (userFilter === 'me') return activity.user.name === 'John Doe'; // Assuming current user
    if (userFilter === 'evaluators') return activity.user.role === 'Evaluator';
    return true;
  });

  // Group activities by date
  const groupedActivities: Record<string, typeof activityData> = {};
  
  filteredActivities.forEach(activity => {
    const date = new Date(activity.timestamp);
    const dateKey = date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric' 
    });
    
    if (!groupedActivities[dateKey]) {
      groupedActivities[dateKey] = [];
    }
    
    groupedActivities[dateKey].push(activity);
  });

  // Format time from timestamp
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Recent Activity</CardTitle>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(groupedActivities).map(([date, activities]) => (
            <div key={date} className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">{date}</h3>
              
              <div className="space-y-3">
                {activities.map(activity => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {activity.user.avatar}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 space-y-1">
                      <p className="text-sm leading-none">
                        <span className="font-medium">{activity.user.name}</span>{' '}
                        {activity.action}{' '}
                        <span className="font-medium">{activity.target}</span>
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center">
                        <activity.icon className="mr-1 h-3 w-3" />
                        {formatTime(activity.timestamp)} · {activity.user.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
