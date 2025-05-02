
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar,
  Building,
  Clock,
  Users,
  FileText,
  Download,
  CheckCircle2,
  Award,
  AlignLeft,
  Send,
  ListChecks,
  Paperclip
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Mock tender data
const tenderData = {
  id: 1,
  title: 'Office Equipment Procurement',
  description: 'Seeking a vendor to supply office equipment including computers, printers, and furniture. This tender is part of our annual upgrade program.',
  category: 'IT',
  status: 'Open',
  deadline: '2025-05-30',
  budget: '$50,000',
  organization: 'Ministry of Education',
  publishDate: '2025-05-01',
  questions: [
    {
      id: 1,
      question: 'Is there a preferred brand for computers?',
      answer: 'No specific brand preference, but all equipment must meet the minimum specifications outlined in the tender documents.'
    },
    {
      id: 2,
      question: 'What is the expected delivery timeline?',
      answer: 'All equipment should be delivered within 30 days of contract award.'
    }
  ],
  documents: [
    { id: 1, name: 'Tender Specification Document', type: 'pdf', size: '2.4 MB' },
    { id: 2, name: 'Equipment Requirements', type: 'docx', size: '1.8 MB' },
    { id: 3, name: 'Evaluation Criteria', type: 'pdf', size: '1.1 MB' }
  ],
  evaluators: [
    { id: 1, name: 'John Evaluator' },
    { id: 2, name: 'Sarah Reviewer' }
  ],
  submissions: 4
};

const TenderDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const isVendor = user?.role === 'vendor';
  const isEvaluator = user?.role === 'evaluator';

  // In a real app, fetch tender data based on id
  // const { data: tender, isLoading } = useQuery(...);
  
  // Using mock data for now
  const tender = tenderData;

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Button variant="outline" size="sm" asChild>
                <Link to={isAdmin ? "/tenders" : "/available-tenders"}>
                  Back to Tenders
                </Link>
              </Button>
              <Badge>{tender.status}</Badge>
              <Badge variant="outline">{tender.category}</Badge>
            </div>
            <h1 className="text-2xl font-bold">{tender.title}</h1>
            <p className="text-muted-foreground mt-1">
              Tender ID: {tender.id} • Published: {tender.publishDate}
            </p>
          </div>

          <div className="flex gap-3">
            {isVendor && (
              <Button asChild>
                <Link to={`/apply-tender/${tender.id}`}>
                  <Send className="mr-2 h-4 w-4" />
                  Apply for Tender
                </Link>
              </Button>
            )}
            
            {isAdmin && (
              <Button variant="outline" asChild>
                <Link to={`/tenders/${tender.id}/edit`}>Edit Tender</Link>
              </Button>
            )}

            {isEvaluator && (
              <Button asChild>
                <Link to={`/evaluate-tender/${tender.id}`}>
                  <Award className="mr-2 h-4 w-4" />
                  Evaluate Submissions
                </Link>
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tender Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-muted-foreground">{tender.description}</p>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Deadline:</span> 
                      <span className="text-muted-foreground">{tender.deadline}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Organization:</span>
                      <span className="text-muted-foreground">{tender.organization}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Budget:</span>
                      <span className="text-muted-foreground">{tender.budget}</span>
                    </div>
                    {isAdmin && (
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Submissions:</span>
                        <span className="text-muted-foreground">{tender.submissions}</span>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3">Tender Documents</h3>
                  <div className="space-y-2">
                    {tender.documents.map(doc => (
                      <div key={doc.id} className="flex justify-between items-center p-3 bg-muted/30 rounded-md border">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-blue-500" />
                          <span>{doc.name}</span>
                          <Badge variant="outline">{doc.type.toUpperCase()}</Badge>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-muted-foreground">{doc.size}</span>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {isAdmin && (
              <Card>
                <CardHeader>
                  <CardTitle>Assigned Evaluators</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {tender.evaluators.map(evaluator => (
                      <div key={evaluator.id} className="flex justify-between items-center p-3 bg-muted/30 rounded-md border">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{evaluator.name}</span>
                        </div>
                        <Button variant="outline" size="sm">
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button className="w-full mt-4" variant="outline" size="sm">
                      Assign New Evaluator
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <Tabs defaultValue="faq">
              <TabsList>
                <TabsTrigger value="faq">Questions & Answers</TabsTrigger>
                {isAdmin && <TabsTrigger value="submissions">Submissions</TabsTrigger>}
                {isAdmin && <TabsTrigger value="history">Activity History</TabsTrigger>}
              </TabsList>
              <TabsContent value="faq" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    {tender.questions.length > 0 ? (
                      <div className="space-y-4">
                        {tender.questions.map(q => (
                          <div key={q.id} className="border rounded-md p-4">
                            <div className="flex gap-2 items-start">
                              <AlignLeft className="h-5 w-5 text-muted-foreground mt-0.5" />
                              <div>
                                <div className="font-medium">{q.question}</div>
                                <div className="mt-1 text-muted-foreground">{q.answer}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-muted-foreground">
                        No questions have been asked about this tender yet.
                      </div>
                    )}

                    {isVendor && (
                      <Button className="mt-4" variant="outline">
                        Ask a Question
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {isAdmin && (
                <TabsContent value="submissions" className="mt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center py-6 text-muted-foreground">
                        {tender.submissions > 0 ? (
                          <>
                            <CheckCircle2 className="mx-auto h-8 w-8 mb-2 text-green-500" />
                            <p className="font-medium">This tender has {tender.submissions} submissions</p>
                            <Button className="mt-4">
                              <ListChecks className="mr-2 h-4 w-4" />
                              View Submissions
                            </Button>
                          </>
                        ) : (
                          <>
                            <Paperclip className="mx-auto h-8 w-8 mb-2 text-muted-foreground" />
                            <p>No submissions received yet</p>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

              {isAdmin && (
                <TabsContent value="history" className="mt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="border-l-2 border-muted pl-4 py-1">
                          <p className="text-sm">Tender published</p>
                          <p className="text-xs text-muted-foreground">{tender.publishDate}</p>
                        </div>
                        <div className="border-l-2 border-muted pl-4 py-1">
                          <p className="text-sm">Evaluators assigned</p>
                          <p className="text-xs text-muted-foreground">{tender.publishDate}</p>
                        </div>
                        <div className="border-l-2 border-muted pl-4 py-1">
                          <p className="text-sm">Question answered</p>
                          <p className="text-xs text-muted-foreground">2025-05-05</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
            </Tabs>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Important Dates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-green-500" />
                    <span>Published</span>
                  </div>
                  <span className="text-muted-foreground">{tender.publishDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-red-500" />
                    <span>Deadline</span>
                  </div>
                  <span className="font-medium">{tender.deadline}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    <span>Evaluation</span>
                  </div>
                  <span className="text-muted-foreground">June 5-10, 2025</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-amber-500" />
                    <span>Award</span>
                  </div>
                  <span className="text-muted-foreground">June 15, 2025</span>
                </div>
              </CardContent>
            </Card>

            {isVendor && (
              <Card>
                <CardHeader>
                  <CardTitle>Submission Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-4">
                    <p className="text-muted-foreground mb-4">You have not submitted a proposal for this tender yet.</p>
                    <Button asChild className="w-full">
                      <Link to={`/apply-tender/${tender.id}`}>
                        <Send className="mr-2 h-4 w-4" />
                        Apply for Tender
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {isEvaluator && (
              <Card>
                <CardHeader>
                  <CardTitle>Evaluation Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Submissions to evaluate:</span>
                    <span className="font-medium">{tender.submissions}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Completed:</span>
                    <span className="text-green-600">0/{tender.submissions}</span>
                  </div>
                  <Button asChild className="w-full mt-2">
                    <Link to={`/evaluate-tender/${tender.id}`}>
                      <Award className="mr-2 h-4 w-4" />
                      Start Evaluation
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TenderDetail;
