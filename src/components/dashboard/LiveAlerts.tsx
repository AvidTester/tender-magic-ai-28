
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Bell, AlertTriangle, Clock, FileText, CheckCircle, X } from 'lucide-react';
import { Link } from 'react-router-dom';

// Sample alerts data
const alerts = [
  {
    id: 'alert-1',
    title: '3 tenders approaching deadline in 3 days',
    description: 'Contact vendors and ensure submissions are received.',
    type: 'warning',
    badge: 'DUE SOON',
    link: '/create-tender',
    icon: Clock
  },
  {
    id: 'alert-2',
    title: '2 vendors missing required documents',
    description: 'Technical documents not submitted for IT Infrastructure tender.',
    type: 'error',
    badge: 'MISSING FILES',
    link: '/vendors',
    icon: FileText
  },
  {
    id: 'alert-3',
    title: '4 new vendors need verification',
    description: 'Review and verify vendor credentials to enable submissions.',
    type: 'info',
    badge: 'ACTION REQUIRED',
    link: '/vendors?status=unverified',
    icon: CheckCircle
  }
];

export function LiveAlerts() {
  const [visibleAlerts, setVisibleAlerts] = React.useState(alerts);

  const dismissAlert = (alertId: string) => {
    setVisibleAlerts(visibleAlerts.filter(alert => alert.id !== alertId));
  };

  if (visibleAlerts.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-xl">
          <Bell className="mr-2 h-5 w-5" />
          Live Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {visibleAlerts.map((alert) => (
            <Alert 
              key={alert.id}
              className={`
                flex items-center justify-between
                ${alert.type === 'error' ? 'border-red-500 bg-red-50' : ''}
                ${alert.type === 'warning' ? 'border-amber-500 bg-amber-50' : ''}
                ${alert.type === 'info' ? 'border-blue-500 bg-blue-50' : ''}
              `}
            >
              <div className="flex items-start">
                <alert.icon className={`h-5 w-5 mr-2 mt-0.5
                  ${alert.type === 'error' ? 'text-red-500' : ''}
                  ${alert.type === 'warning' ? 'text-amber-500' : ''}
                  ${alert.type === 'info' ? 'text-blue-500' : ''}
                `} />
                <div>
                  <AlertTitle className="flex items-center gap-2">
                    {alert.title}
                    <Badge className={`
                      text-xs font-medium
                      ${alert.type === 'error' ? 'bg-red-500' : ''}
                      ${alert.type === 'warning' ? 'bg-amber-500' : ''}
                      ${alert.type === 'info' ? 'bg-blue-500' : ''}
                    `}>
                      {alert.badge}
                    </Badge>
                  </AlertTitle>
                  <AlertDescription>
                    {alert.description}
                    <Link to={alert.link}>
                      <Button variant="link" className="p-0 h-auto" size="sm">
                        Take action
                      </Button>
                    </Link>
                  </AlertDescription>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 rounded-full" 
                onClick={() => dismissAlert(alert.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </Alert>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
