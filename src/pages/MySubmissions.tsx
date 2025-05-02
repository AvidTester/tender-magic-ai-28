
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { FileText, Edit, ExternalLink, CheckCircle, AlertCircle, Clock, Send } from 'lucide-react';

// Mock data for vendor submissions
const submissions = [
  {
    id: 'S-001',
    tenderId: 'T-2023-42',
    tenderTitle: 'IT Infrastructure Upgrade',
    submissionDate: '2025-04-28',
    status: 'under-review',
    documents: 4,
    feedback: null
  },
  {
    id: 'S-002',
    tenderId: 'T-2023-38',
    tenderTitle: 'Website Redesign Project',
    submissionDate: '2025-04-15',
    status: 'rejected',
    documents: 3,
    feedback: 'Budget exceeded maximum allocation by 20%. Technical proposal lacked specific implementation details.'
  },
  {
    id: 'S-003',
    tenderId: 'T-2023-35',
    tenderTitle: 'Annual Office Supplies',
    submissionDate: '2025-03-22',
    status: 'approved',
    documents: 2,
    feedback: 'Strong proposal with competitive pricing and excellent delivery terms.'
  },
  {
    id: 'S-004',
    tenderId: 'T-2023-30',
    tenderTitle: 'Training Services',
    submissionDate: '2025-03-10',
    status: 'approved',
    documents: 3,
    feedback: 'Well-structured training program with qualified instructors.'
  }
];

// Mock data for draft submissions
const draftSubmissions = [
  {
    id: 'D-001',
    tenderId: 'T-2023-41',
    tenderTitle: 'Office Furniture Procurement',
    deadline: '2025-05-18',
    progress: 30,
    lastEdited: '2025-04-30'
  }
];

// Mock data for upcoming tenders marked for interest
const upcomingTenders = [
  {
    id: 'T-2023-44',
    title: 'Cloud Services Migration',
    publishDate: '2025-05-05',
    deadline: '2025-05-25',
    category: 'IT Services'
  }
];

export default function MySubmissions() {
  // Helper function for status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'under-review':
        return <Badge className="bg-yellow-100 text-yellow-800">Under Review</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Submissions</h1>
          <p className="text-muted-foreground mt-2">
            Track and manage your tender submissions and proposals.
          </p>
        </div>
        
        <Tabs defaultValue="submissions">
          <TabsList>
            <TabsTrigger value="submissions">Submitted Proposals</TabsTrigger>
            <TabsTrigger value="drafts">Draft Submissions</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming Tenders</TabsTrigger>
          </TabsList>
          
          <TabsContent value="submissions" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Submitted Proposals</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Submission ID</TableHead>
                      <TableHead>Tender</TableHead>
                      <TableHead>Submission Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Documents</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((sub) => (
                      <TableRow key={sub.id}>
                        <TableCell className="font-medium">{sub.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="text-sm text-muted-foreground">{sub.tenderId}</div>
                            {sub.tenderTitle}
                          </div>
                        </TableCell>
                        <TableCell>{sub.submissionDate}</TableCell>
                        <TableCell>{getStatusBadge(sub.status)}</TableCell>
                        <TableCell>{sub.documents}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              <FileText className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                            {sub.status === 'under-review' && (
                              <Button size="sm">
                                <Edit className="h-4 w-4 mr-1" />
                                Update
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Submission Feedback</h3>
              <div className="space-y-4">
                {submissions
                  .filter(sub => sub.feedback)
                  .map((sub) => (
                    <div key={`feedback-${sub.id}`} className="bg-muted/30 p-4 rounded-lg border">
                      <div className="flex gap-2 items-center mb-2">
                        {sub.status === 'approved' ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-red-600" />
                        )}
                        <h4 className="font-medium">{sub.tenderTitle}</h4>
                        {getStatusBadge(sub.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">Feedback:</p>
                      <p className="text-sm mt-1">{sub.feedback}</p>
                    </div>
                  ))}
                  
                {!submissions.some(sub => sub.feedback) && (
                  <div className="text-center py-8 text-muted-foreground">
                    No feedback available for your submissions yet.
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="drafts" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Draft Proposals</CardTitle>
              </CardHeader>
              <CardContent>
                {draftSubmissions.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    You have no draft submissions.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {draftSubmissions.map((draft) => (
                      <div key={draft.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-sm text-muted-foreground">{draft.tenderId}</div>
                            <h3 className="font-medium">{draft.tenderTitle}</h3>
                            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <Clock className="h-3.5 w-3.5 mr-1" />
                                Deadline: {draft.deadline}
                              </div>
                              <div>Last edited: {draft.lastEdited}</div>
                            </div>
                          </div>
                          <Button>
                            Continue Editing
                          </Button>
                        </div>
                        
                        <div className="mt-4">
                          <div className="flex justify-between mb-1 text-sm">
                            <div>Completion Progress</div>
                            <div>{draft.progress}%</div>
                          </div>
                          <Progress value={draft.progress} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="upcoming" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Tender Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                {upcomingTenders.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No upcoming tenders you've marked for interest.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingTenders.map((tender) => (
                      <div key={tender.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-sm text-muted-foreground">{tender.id}</div>
                            <h3 className="font-medium">{tender.title}</h3>
                            <Badge variant="outline" className="mt-1">{tender.category}</Badge>
                          </div>
                          <Button>
                            <ExternalLink className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                        </div>
                        
                        <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                          <div>Publish Date: {tender.publishDate}</div>
                          <div className="flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            Deadline: {tender.deadline}
                          </div>
                        </div>
                        
                        <div className="mt-4 flex justify-end">
                          <Button variant="outline">
                            <Send className="h-4 w-4 mr-1" />
                            Prepare Submission
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
