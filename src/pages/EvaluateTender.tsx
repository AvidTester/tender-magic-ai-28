
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Award,
  Calendar,
  FileText,
  Download,
  Star,
  StarHalf,
  ChevronLeft,
  ChevronRight,
  Paperclip,
  CheckCircle,
  Building,
  DollarSign,
  Clock
} from 'lucide-react';

// Mock tender and submission data
const tenderData = {
  id: 1,
  title: 'Office Equipment Procurement',
  description: 'Seeking a vendor to supply office equipment including computers, printers, and furniture.',
  organization: 'Ministry of Education',
  deadline: '2025-05-30',
  evaluationCriteria: [
    { id: 1, name: 'Technical Quality', maxScore: 40, description: 'Evaluate the technical specifications and quality of proposed equipment' },
    { id: 2, name: 'Price', maxScore: 30, description: 'Evaluate the competitiveness of the pricing and value for money' },
    { id: 3, name: 'Delivery Timeline', maxScore: 15, description: 'Evaluate the proposed delivery schedule and feasibility' },
    { id: 4, name: 'Vendor Experience', maxScore: 15, description: 'Evaluate vendor\'s past experience and track record with similar projects' },
  ]
};

const submissionsData = [
  {
    id: 101,
    vendorName: 'Tech Solutions Inc.',
    submissionDate: '2025-05-10',
    proposalTitle: 'Premium Office Equipment Package',
    proposalAmount: '$48,500',
    deliveryTimeframe: '21 days',
    proposalSummary: 'We offer high-quality office equipment including the latest models of computers, printers, and ergonomic furniture. Our package includes delivery, installation, and a 3-year warranty on all items.',
    documents: [
      { name: 'Technical Proposal', type: 'pdf', size: '2.1 MB' },
      { name: 'Financial Proposal', type: 'pdf', size: '1.5 MB' },
      { name: 'Company Profile', type: 'pdf', size: '3.2 MB' },
      { name: 'Past Experience', type: 'pdf', size: '2.8 MB' },
    ],
    evaluated: false
  },
  {
    id: 102,
    vendorName: 'Office Depot',
    submissionDate: '2025-05-15',
    proposalTitle: 'Complete Office Solution',
    proposalAmount: '$45,800',
    deliveryTimeframe: '28 days',
    proposalSummary: 'Our comprehensive office solution includes standard desktop computers, network printers, and modular furniture. We provide professional installation and basic staff training on all equipment.',
    documents: [
      { name: 'Technical Proposal', type: 'pdf', size: '1.8 MB' },
      { name: 'Financial Proposal', type: 'pdf', size: '1.2 MB' },
      { name: 'Company Profile', type: 'pdf', size: '2.5 MB' },
      { name: 'Past Experience', type: 'pdf', size: '2.3 MB' },
    ],
    evaluated: true
  },
  {
    id: 103,
    vendorName: 'Business Suppliers Ltd',
    submissionDate: '2025-05-18',
    proposalTitle: 'Budget-Friendly Equipment Package',
    proposalAmount: '$42,300',
    deliveryTimeframe: '35 days',
    proposalSummary: 'We offer cost-effective office equipment without compromising on essential features. Our package includes energy-efficient computers, multifunctional printers, and space-saving furniture.',
    documents: [
      { name: 'Technical Proposal', type: 'pdf', size: '1.9 MB' },
      { name: 'Financial Proposal', type: 'pdf', size: '1.3 MB' },
      { name: 'Company Profile', type: 'pdf', size: '2.1 MB' },
      { name: 'Past Experience', type: 'pdf', size: '1.8 MB' },
    ],
    evaluated: false
  }
];

// Create an evaluation schema based on the tender's criteria
const createEvaluationSchema = (criteria: typeof tenderData.evaluationCriteria) => {
  const schemaObj: Record<string, any> = {};
  
  criteria.forEach(c => {
    schemaObj[`score_${c.id}`] = z.string()
      .refine((val) => !isNaN(parseFloat(val)), "Must be a valid number")
      .refine(
        (val) => parseFloat(val) >= 0 && parseFloat(val) <= c.maxScore, 
        `Score must be between 0 and ${c.maxScore}`
      );
  });
  
  schemaObj['comments'] = z.string().min(10, "Comments must be at least 10 characters").max(500, "Comments cannot exceed 500 characters");
  
  return z.object(schemaObj);
};

const EvaluateTender = () => {
  const { id } = useParams();
  const [currentSubmissionIndex, setCurrentSubmissionIndex] = useState(0);
  const [evaluatedSubmissions, setEvaluatedSubmissions] = useState<number[]>([102]);
  
  // Get tender and submissions data (mock data for now)
  const tender = tenderData;
  const submissions = submissionsData;
  const currentSubmission = submissions[currentSubmissionIndex];
  
  // Check if submission is already evaluated
  const isEvaluated = evaluatedSubmissions.includes(currentSubmission.id);
  
  // Create schema dynamically based on criteria
  const evaluationSchema = createEvaluationSchema(tender.evaluationCriteria);
  
  // Create form with default values
  const form = useForm({
    resolver: zodResolver(evaluationSchema),
    defaultValues: tender.evaluationCriteria.reduce((acc, criteria) => {
      return {
        ...acc,
        [`score_${criteria.id}`]: '',
      };
    }, { comments: '' }),
  });
  
  // Calculate total score
  const calculateTotalScore = () => {
    return tender.evaluationCriteria.reduce((total, criteria) => {
      const scoreValue = form.watch(`score_${criteria.id}`) || '0';
      return total + (parseFloat(scoreValue) || 0);
    }, 0);
  };
  
  const totalMaxScore = tender.evaluationCriteria.reduce((sum, c) => sum + c.maxScore, 0);
  const currentTotalScore = calculateTotalScore();
  
  // Navigate between submissions
  const navigateSubmission = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentSubmissionIndex > 0) {
      setCurrentSubmissionIndex(currentSubmissionIndex - 1);
      form.reset();
    } else if (direction === 'next' && currentSubmissionIndex < submissions.length - 1) {
      setCurrentSubmissionIndex(currentSubmissionIndex + 1);
      form.reset();
    }
  };
  
  // Handle form submission
  const onSubmit = (data: z.infer<ReturnType<typeof createEvaluationSchema>>) => {
    console.log('Evaluation data:', data);
    
    // Add submission to evaluated list
    if (!evaluatedSubmissions.includes(currentSubmission.id)) {
      setEvaluatedSubmissions([...evaluatedSubmissions, currentSubmission.id]);
    }
    
    // Show success message
    toast({
      title: "Evaluation submitted",
      description: `You've successfully evaluated ${currentSubmission.vendorName}'s submission.`,
    });
    
    // Navigate to next submission if available
    if (currentSubmissionIndex < submissions.length - 1) {
      navigateSubmission('next');
    } else {
      // If this was the last submission, go to the completed evaluations page
      form.reset();
    }
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Button variant="outline" size="sm" asChild>
              <Link to={`/tenders/${id}`}>
                Back to Tender
              </Link>
            </Button>
          </div>
          <h1 className="text-2xl font-bold">Evaluate Tender Submissions</h1>
          <div className="flex items-center gap-1">
            <h2 className="text-lg">{tender.title}</h2>
            <span className="text-muted-foreground">({submissions.length} submissions)</span>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <Button 
            variant="outline" 
            onClick={() => navigateSubmission('prev')}
            disabled={currentSubmissionIndex === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          
          <div className="text-center">
            <div className="text-lg font-medium">{currentSubmissionIndex + 1} of {submissions.length}</div>
            <div className="text-sm text-muted-foreground">
              {evaluatedSubmissions.length} of {submissions.length} evaluated
            </div>
          </div>
          
          <Button 
            variant="outline" 
            onClick={() => navigateSubmission('next')}
            disabled={currentSubmissionIndex === submissions.length - 1}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Submission Details</CardTitle>
                  <Badge variant={isEvaluated ? "secondary" : "outline"}>
                    {isEvaluated ? "Evaluated" : "Pending Evaluation"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-1">
                      <h3 className="text-lg font-medium">{currentSubmission.proposalTitle}</h3>
                      <div className="text-sm text-muted-foreground">
                        Submitted: {currentSubmission.submissionDate}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{currentSubmission.vendorName}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground mt-1" />
                      <div>
                        <div className="text-sm text-muted-foreground">Proposed Budget</div>
                        <div className="font-medium">{currentSubmission.proposalAmount}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground mt-1" />
                      <div>
                        <div className="text-sm text-muted-foreground">Delivery Timeframe</div>
                        <div className="font-medium">{currentSubmission.deliveryTimeframe}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Proposal Summary</h4>
                    <div className="text-sm text-muted-foreground bg-muted/30 p-4 rounded-md">
                      {currentSubmission.proposalSummary}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Submitted Documents</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {currentSubmission.documents.map((doc, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-muted/30 rounded-md">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-blue-500" />
                            <span className="text-sm">{doc.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">{doc.size}</span>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Evaluation Form</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium mb-4">Scoring Criteria</h4>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Criteria</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="w-24 text-right">Max Score</TableHead>
                            <TableHead className="w-24 text-right">Your Score</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {tender.evaluationCriteria.map((criteria) => (
                            <TableRow key={criteria.id}>
                              <TableCell className="font-medium">{criteria.name}</TableCell>
                              <TableCell className="text-sm text-muted-foreground">{criteria.description}</TableCell>
                              <TableCell className="text-right">{criteria.maxScore}</TableCell>
                              <TableCell className="text-right">
                                <FormField
                                  control={form.control}
                                  name={`score_${criteria.id}`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input
                                          {...field}
                                          className="w-16 text-right"
                                          placeholder="0"
                                          disabled={isEvaluated}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                          <TableRow>
                            <TableCell colSpan={2} className="text-right font-medium">Total</TableCell>
                            <TableCell className="text-right font-medium">{totalMaxScore}</TableCell>
                            <TableCell className="text-right font-medium">{currentTotalScore}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    
                    <div>
                      <FormField
                        control={form.control}
                        name="comments"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Evaluation Comments</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Provide your comments and feedback on this submission..."
                                className="min-h-24"
                                {...field}
                                disabled={isEvaluated}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-3">
                      {!isEvaluated && (
                        <Button type="submit">
                          <Award className="h-4 w-4 mr-2" />
                          Submit Evaluation
                        </Button>
                      )}
                      
                      {isEvaluated && (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="h-5 w-5 mr-2" />
                          <span>Evaluation Submitted</span>
                        </div>
                      )}
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Evaluation Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium">Technical Quality (max 40 points)</h4>
                  <ul className="list-disc list-inside space-y-1 mt-2 text-muted-foreground">
                    <li>Exceeds requirements: 30-40 points</li>
                    <li>Meets all requirements: 20-29 points</li>
                    <li>Meets most requirements: 10-19 points</li>
                    <li>Inadequate solution: 0-9 points</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium">Price (max 30 points)</h4>
                  <ul className="list-disc list-inside space-y-1 mt-2 text-muted-foreground">
                    <li>Excellent value: 25-30 points</li>
                    <li>Good value: 15-24 points</li>
                    <li>Average value: 8-14 points</li>
                    <li>Poor value: 0-7 points</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium">Delivery Timeline (max 15 points)</h4>
                  <ul className="list-disc list-inside space-y-1 mt-2 text-muted-foreground">
                    <li>Under 25 days: 12-15 points</li>
                    <li>25-35 days: 8-11 points</li>
                    <li>36-45 days: 4-7 points</li>
                    <li>Over 45 days: 0-3 points</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium">Vendor Experience (max 15 points)</h4>
                  <ul className="list-disc list-inside space-y-1 mt-2 text-muted-foreground">
                    <li>Extensive experience: 12-15 points</li>
                    <li>Moderate experience: 8-11 points</li>
                    <li>Limited experience: 4-7 points</li>
                    <li>Minimal experience: 0-3 points</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/30 border-t">
                <div className="text-xs text-muted-foreground">
                  Your evaluations should be fair, objective, and based solely on the submission content and evaluation criteria.
                </div>
              </CardFooter>
            </Card>
            
            <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-100 rounded-md">
              <div className="space-y-1">
                <div className="text-sm font-medium text-yellow-800">Evaluation Progress</div>
                <div className="text-xs text-yellow-700">{evaluatedSubmissions.length} of {submissions.length} evaluated</div>
              </div>
              
              <div className="flex">
                {submissions.map((_, index) => (
                  <div 
                    key={index} 
                    className={`w-2 h-2 rounded-full mx-0.5 ${
                      evaluatedSubmissions.includes(submissions[index].id) 
                        ? 'bg-green-500' 
                        : currentSubmissionIndex === index 
                          ? 'bg-yellow-500' 
                          : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EvaluateTender;
