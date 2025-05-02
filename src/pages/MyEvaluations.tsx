
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  FileText, 
  ClipboardCheck, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  CalendarClock, 
  Search
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Mock data for evaluator assignments
const assignedTenders = [
  {
    id: 'T-2023-42',
    title: 'IT Infrastructure Upgrade',
    deadline: '2025-05-15',
    assignedDate: '2025-05-01',
    status: 'pending', // pending, in-progress, completed
    submissions: 5,
    dueDate: '2025-05-10',
    urgency: 'high' // high, medium, low
  },
  {
    id: 'T-2023-41',
    title: 'Office Furniture Procurement',
    deadline: '2025-05-18',
    assignedDate: '2025-05-01',
    status: 'in-progress',
    submissions: 4,
    dueDate: '2025-05-15',
    urgency: 'medium'
  }
];

// Mock data for completed evaluations
const completedEvaluations = [
  {
    id: 'E-1001',
    tenderId: 'T-2023-38',
    tenderTitle: 'Website Redesign Project',
    completedDate: '2025-04-25',
    submissionsEvaluated: 6
  },
  {
    id: 'E-1002',
    tenderId: 'T-2023-35',
    tenderTitle: 'Annual Office Supplies',
    completedDate: '2025-04-10',
    submissionsEvaluated: 8
  }
];

// Mock data for vendor submissions for a specific tender
const submissions = [
  {
    id: 'S-001',
    vendorName: 'TechSolutions Inc.',
    submissionDate: '2025-04-20',
    files: 4,
    evaluated: false,
    status: 'not-started' // not-started, in-progress, completed
  },
  {
    id: 'S-002',
    vendorName: 'Creative Design Studio',
    submissionDate: '2025-04-22',
    files: 3,
    evaluated: false,
    status: 'in-progress'
  },
  {
    id: 'S-003',
    vendorName: 'Global Consulting Group',
    submissionDate: '2025-04-25',
    files: 5,
    evaluated: false,
    status: 'not-started'
  },
  {
    id: 'S-004',
    vendorName: 'Future Innovations Ltd',
    submissionDate: '2025-04-27',
    files: 3,
    evaluated: false,
    status: 'not-started'
  },
  {
    id: 'S-005',
    vendorName: 'SmartBuild Construction',
    submissionDate: '2025-04-28',
    files: 4,
    evaluated: false,
    status: 'completed'
  }
];

// Evaluation criteria for scoring
const evaluationCriteria = [
  { id: 'technical', name: 'Technical Solution', weight: 30 },
  { id: 'experience', name: 'Experience & Expertise', weight: 25 },
  { id: 'timeline', name: 'Implementation Timeline', weight: 15 },
  { id: 'budget', name: 'Budget & Cost Efficiency', weight: 30 }
];

export default function MyEvaluations() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [selectedTender, setSelectedTender] = useState<any>(null);
  const [showSubmissions, setShowSubmissions] = useState(false);
  const [evaluationDialogOpen, setEvaluationDialogOpen] = useState(false);
  const [activeSubmission, setActiveSubmission] = useState<any>(null);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [comments, setComments] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Handle tender selection
  const viewSubmissions = (tender: any) => {
    setSelectedTender(tender);
    setShowSubmissions(true);
  };
  
  // Go back to tender list
  const handleBackToTenders = () => {
    setShowSubmissions(false);
    setSelectedTender(null);
  };
  
  // Open evaluation dialog
  const openEvaluationDialog = (submission: any) => {
    setActiveSubmission(submission);
    setScores({});
    setComments({});
    setEvaluationDialogOpen(true);
  };
  
  // Handle score changes
  const handleScoreChange = (criterionId: string, value: number) => {
    setScores(prev => ({
      ...prev,
      [criterionId]: value
    }));
  };
  
  // Handle comment changes
  const handleCommentChange = (criterionId: string, value: string) => {
    setComments(prev => ({
      ...prev,
      [criterionId]: value
    }));
  };
  
  // Submit evaluation
  const handleSubmitEvaluation = () => {
    setIsSubmitting(true);
    
    // Validate that all criteria have scores and comments
    const allCriteriaScored = evaluationCriteria.every(c => scores[c.id] !== undefined);
    const allCriteriaCommented = evaluationCriteria.every(c => comments[c.id]?.trim());
    
    if (!allCriteriaScored || !allCriteriaCommented) {
      toast({
        title: "Incomplete evaluation",
        description: "Please provide scores and comments for all criteria.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      // In a real implementation, this would be an API call to save the evaluation
      console.log("Evaluation data:", {
        evaluator: user?.id,
        submission: activeSubmission.id,
        tender: selectedTender.id,
        scores,
        comments
      });
      
      toast({
        title: "Evaluation submitted",
        description: `Your evaluation for ${activeSubmission.vendorName} has been recorded.`,
      });
      
      setEvaluationDialogOpen(false);
      setIsSubmitting(false);
      
      // Update local state to reflect that the submission has been evaluated
      // In a real app, this would come from refreshing data from the API
    }, 1000);
  };
  
  // Calculate completion for a tender
  const calculateTenderCompletion = (tender: any) => {
    const completedCount = submissions.filter(s => s.status === 'completed').length;
    return Math.round((completedCount / submissions.length) * 100);
  };

  // Filter tenders by search term
  const filteredAssignedTenders = assignedTenders.filter(tender =>
    tender.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tender.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Evaluations</h1>
          <p className="text-muted-foreground mt-2">
            Manage and complete your assigned tender evaluations.
          </p>
        </div>
        
        {!showSubmissions ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Assigned Tenders</h2>
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search tenders..." 
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid gap-4">
              {filteredAssignedTenders.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">
                  No assigned tenders match your search.
                </div>
              ) : (
                filteredAssignedTenders.map((tender) => (
                  <Card key={tender.id} className={`shadow-sm hover:shadow-md transition-shadow 
                    ${tender.urgency === 'high' ? 'border-l-4 border-l-red-500' : 
                      tender.urgency === 'medium' ? 'border-l-4 border-l-yellow-500' : ''}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-sm text-muted-foreground">{tender.id}</div>
                          <h3 className="text-lg font-medium">{tender.title}</h3>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <CalendarClock className="h-3.5 w-3.5 mr-1" /> 
                              Assigned: {tender.assignedDate}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-3.5 w-3.5 mr-1" /> 
                              Due: {tender.dueDate}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end">
                          <Badge className={
                            tender.status === 'completed' ? 'bg-green-100 text-green-800' :
                            tender.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                            tender.urgency === 'high' ? 'bg-red-100 text-red-800' : 'bg-gray-100'
                          }>
                            {tender.status === 'completed' ? 'Completed' :
                             tender.status === 'in-progress' ? 'In Progress' :
                             tender.urgency === 'high' ? 'Urgent' : 'Pending'}
                          </Badge>
                          
                          {tender.urgency === 'high' && (
                            <div className="flex items-center text-red-600 text-sm mt-1">
                              <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                              Due soon
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex justify-between mb-1 text-sm">
                          <div>Completion Progress</div>
                          <div>{calculateTenderCompletion(tender)}%</div>
                        </div>
                        <Progress value={calculateTenderCompletion(tender)} className="h-2" />
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <div>
                          <span className="font-medium">{tender.submissions}</span>
                          <span className="text-muted-foreground"> submissions to evaluate</span>
                        </div>
                        <Button onClick={() => viewSubmissions(tender)}>
                          <ClipboardCheck className="h-4 w-4 mr-2" />
                          Begin Evaluation
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
            
            <Tabs defaultValue="active" className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Evaluation History</h2>
                <TabsList>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="active" className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {assignedTenders.filter(t => t.status !== 'completed').map((tender) => (
                        <div key={tender.id} className="flex justify-between items-center border-b pb-4 last:border-0 last:pb-0">
                          <div>
                            <div className="text-sm text-muted-foreground">{tender.id}</div>
                            <h3 className="font-medium">{tender.title}</h3>
                            <div className="text-sm text-muted-foreground mt-1">
                              {tender.submissions} submissions | Due: {tender.dueDate}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={
                              tender.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 
                              'bg-gray-100 text-gray-800'
                            }>
                              {tender.status === 'in-progress' ? 'In Progress' : 'Pending'}
                            </Badge>
                            <Button variant="outline" size="sm" onClick={() => viewSubmissions(tender)}>
                              Continue
                            </Button>
                          </div>
                        </div>
                      ))}
                      
                      {assignedTenders.filter(t => t.status !== 'completed').length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          No active evaluations.
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="completed" className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {completedEvaluations.map((evaluation) => (
                        <div key={evaluation.id} className="flex justify-between items-center border-b pb-4 last:border-0 last:pb-0">
                          <div>
                            <div className="text-sm text-muted-foreground">{evaluation.tenderId}</div>
                            <h3 className="font-medium">{evaluation.tenderTitle}</h3>
                            <div className="text-sm text-muted-foreground mt-1">
                              {evaluation.submissionsEvaluated} submissions evaluated | Completed: {evaluation.completedDate}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="h-3.5 w-3.5 mr-1" />
                              Completed
                            </Badge>
                            <Button variant="outline" size="sm">
                              View Report
                            </Button>
                          </div>
                        </div>
                      ))}
                      
                      {completedEvaluations.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          No completed evaluations.
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleBackToTenders}>
                  ← Back to Tenders
                </Button>
                <h2 className="text-xl font-semibold">{selectedTender?.title} Submissions</h2>
              </div>
              <Badge className={
                selectedTender?.urgency === 'high' ? 'bg-red-100 text-red-800' :
                selectedTender?.urgency === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }>
                Due: {selectedTender?.dueDate}
              </Badge>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Vendor Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {submissions.map((submission) => (
                    <div key={submission.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-sm text-muted-foreground">{submission.id}</div>
                          <h3 className="font-medium">{submission.vendorName}</h3>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            <div>Submitted: {submission.submissionDate}</div>
                            <div>{submission.files} document(s)</div>
                          </div>
                        </div>
                        <Badge className={
                          submission.status === 'completed' ? 'bg-green-100 text-green-800' :
                          submission.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }>
                          {submission.status === 'completed' ? 'Evaluated' :
                           submission.status === 'in-progress' ? 'In Progress' :
                           'Not Started'}
                        </Badge>
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <Button variant="outline">
                          <FileText className="h-4 w-4 mr-2" />
                          View Documents
                        </Button>
                        <Button 
                          disabled={submission.status === 'completed'} 
                          onClick={() => openEvaluationDialog(submission)}
                        >
                          {submission.status === 'completed' ? (
                            <>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              View Evaluation
                            </>
                          ) : submission.status === 'in-progress' ? (
                            <>
                              <ClipboardCheck className="h-4 w-4 mr-2" />
                              Continue Evaluation
                            </>
                          ) : (
                            <>
                              <ClipboardCheck className="h-4 w-4 mr-2" />
                              Evaluate
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Evaluation Dialog */}
        <Dialog open={evaluationDialogOpen} onOpenChange={setEvaluationDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Evaluate Submission</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="bg-muted/30 p-4 rounded-lg">
                <div className="text-sm text-muted-foreground">Vendor:</div>
                <div className="font-medium">{activeSubmission?.vendorName}</div>
                <div className="text-sm text-muted-foreground mt-1">Submission ID: {activeSubmission?.id}</div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Evaluation Criteria</h3>
                
                {evaluationCriteria.map((criterion) => (
                  <div key={criterion.id} className="space-y-2 border-b pb-4 last:border-0">
                    <div className="flex justify-between">
                      <div className="font-medium">{criterion.name} ({criterion.weight}%)</div>
                      <div className="text-sm text-muted-foreground">Score: {scores[criterion.id] || '-'}/5</div>
                    </div>
                    
                    <div className="py-2">
                      <RadioGroup 
                        onValueChange={(value) => handleScoreChange(criterion.id, parseInt(value, 10))}
                        value={scores[criterion.id]?.toString() || ''}
                        className="flex space-x-2 justify-between"
                      >
                        {[1, 2, 3, 4, 5].map((score) => (
                          <div key={score} className="flex flex-col items-center gap-1.5">
                            <RadioGroupItem value={score.toString()} id={`${criterion.id}-${score}`} />
                            <Label htmlFor={`${criterion.id}-${score}`} className="text-sm">{score}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Poor</span>
                        <span>Excellent</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm" htmlFor={`comment-${criterion.id}`}>
                        Justification / Comments <span className="text-red-500">*</span>
                      </label>
                      <Textarea 
                        id={`comment-${criterion.id}`}
                        placeholder="Provide detailed justification for your score..."
                        value={comments[criterion.id] || ''}
                        onChange={(e) => handleCommentChange(criterion.id, e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                ))}
                
                <div className="flex items-start gap-2 pt-2">
                  <Checkbox id="confidentiality" />
                  <label htmlFor="confidentiality" className="text-sm">
                    I confirm that I have evaluated this submission fairly and objectively according to the established criteria, and I have no conflicts of interest.
                  </label>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setEvaluationDialogOpen(false)} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitEvaluation} disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Evaluation'}
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
