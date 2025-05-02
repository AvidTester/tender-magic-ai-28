
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Calendar,
  Building,
  Clock,
  FileText,
  Download,
  Upload,
  Check,
  Send,
  FileUp,
  AlertCircle
} from 'lucide-react';

// Mock tender data
const tenderData = {
  id: 1,
  title: 'Office Equipment Procurement',
  description: 'Seeking a vendor to supply office equipment including computers, printers, and furniture.',
  category: 'IT',
  status: 'Open',
  deadline: '2025-05-30',
  budget: '$50,000',
  organization: 'Ministry of Education',
  publishDate: '2025-05-01',
  documents: [
    { id: 1, name: 'Tender Specification Document', type: 'pdf', size: '2.4 MB' },
    { id: 2, name: 'Equipment Requirements', type: 'docx', size: '1.8 MB' },
    { id: 3, name: 'Evaluation Criteria', type: 'pdf', size: '1.1 MB' }
  ],
  requiredDocuments: [
    'Technical Proposal',
    'Financial Proposal',
    'Company Profile',
    'Past Experience'
  ]
};

// Define form validation schema
const applicationSchema = z.object({
  proposalTitle: z.string().min(5, "Proposal title must be at least 5 characters"),
  proposalAmount: z.string()
    .refine((val) => !isNaN(parseFloat(val)), "Must be a valid number")
    .refine((val) => parseFloat(val) > 0, "Amount must be greater than 0"),
  proposalSummary: z.string().min(100, "Summary must be at least 100 characters"),
  deliveryTimeframe: z.string().min(2, "Please specify a timeframe"),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

const ApplyTender = () => {
  const { id } = useParams();
  const [files, setFiles] = useState<{[key: string]: File | null}>({});
  const [currentTab, setCurrentTab] = useState('proposal');
  
  // Initialize form
  const form = useForm({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      proposalTitle: '',
      proposalAmount: '',
      proposalSummary: '',
      deliveryTimeframe: '',
      termsAccepted: false,
    },
  });
  
  // Using mock data for now
  const tender = tenderData;
  
  // File input refs for each document type
  const fileInputRefs: {[key: string]: React.RefObject<HTMLInputElement>} = {};
  tender.requiredDocuments.forEach(doc => {
    fileInputRefs[doc] = React.useRef<HTMLInputElement>(null);
  });

  // Initialize files object
  React.useEffect(() => {
    const newFiles: {[key: string]: File | null} = {};
    tender.requiredDocuments.forEach(doc => {
      newFiles[doc] = null;
    });
    setFiles(newFiles);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, docType: string) => {
    const selectedFile = e.target.files?.[0];
    
    if (!selectedFile) return;
    
    // Validate file type (PDF or Word only)
    const isValidType = selectedFile.type === 'application/pdf' || 
                      selectedFile.type === 'application/msword' || 
                      selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    
    // Validate file size (max 10MB)
    const isValidSize = selectedFile.size <= 10 * 1024 * 1024;
    
    if (!isValidType) {
      toast({
        title: "Invalid file type",
        description: `${selectedFile.name} must be a PDF or Word document.`,
        variant: "destructive",
      });
      return;
    }
    
    if (!isValidSize) {
      toast({
        title: "File too large",
        description: `${selectedFile.name} must be less than 10MB.`,
        variant: "destructive",
      });
      return;
    }
    
    setFiles(prev => ({ ...prev, [docType]: selectedFile }));
    
    toast({
      title: "File added",
      description: `${selectedFile.name} has been added to your submission.`,
    });
  };

  const triggerFileInput = (docType: string) => {
    fileInputRefs[docType]?.current?.click();
  };

  const removeFile = (docType: string) => {
    setFiles(prev => ({ ...prev, [docType]: null }));
    
    toast({
      title: "File removed",
      description: `${docType} has been removed from your submission.`,
    });
  };

  const onSubmit = (data: z.infer<typeof applicationSchema>) => {
    // Check if all required documents are uploaded
    const missingDocs = tender.requiredDocuments.filter(doc => !files[doc]);
    
    if (missingDocs.length > 0) {
      toast({
        title: "Missing documents",
        description: `Please upload: ${missingDocs.join(', ')}`,
        variant: "destructive",
      });
      setCurrentTab('documents');
      return;
    }
    
    // In a real app, you would submit the form data and files to your backend
    console.log('Form data:', data);
    console.log('Files:', files);
    
    // Success message
    toast({
      title: "Submission successful!",
      description: "Your tender application has been submitted successfully.",
    });
    
    // Redirect to my submissions page
    setTimeout(() => {
      window.location.href = '/my-submissions';
    }, 2000);
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Button variant="outline" size="sm" asChild>
                <Link to={`/tenders/${id}`}>
                  Back to Tender Details
                </Link>
              </Button>
              <Badge>{tender.status}</Badge>
              <Badge variant="outline">{tender.category}</Badge>
            </div>
            <h1 className="text-2xl font-bold">Apply for: {tender.title}</h1>
            <p className="text-muted-foreground mt-1">
              Complete all required information and upload necessary documents
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Tender Application</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={currentTab} onValueChange={setCurrentTab}>
                  <TabsList>
                    <TabsTrigger value="proposal">Proposal Details</TabsTrigger>
                    <TabsTrigger value="documents">Document Upload</TabsTrigger>
                  </TabsList>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                      <TabsContent value="proposal">
                        <div className="space-y-6 pt-4">
                          <FormField
                            control={form.control}
                            name="proposalTitle"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Proposal Title</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter a title for your proposal" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="proposalAmount"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Proposed Budget ($)</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter your proposed budget" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="deliveryTimeframe"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Delivery Timeframe</FormLabel>
                                <FormControl>
                                  <Input placeholder="E.g., 30 days, 8 weeks" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="proposalSummary"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Proposal Summary</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Provide a summary of your proposal" 
                                    className="h-32" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="flex justify-end">
                            <Button type="button" onClick={() => setCurrentTab('documents')}>
                              Next: Document Upload
                            </Button>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="documents">
                        <div className="space-y-6 pt-4">
                          <div className="space-y-4">
                            <h3 className="text-sm font-medium">Required Documents</h3>
                            <div className="grid gap-4 md:grid-cols-2">
                              {tender.requiredDocuments.map((docType) => (
                                <div key={docType} className={`border rounded-md p-3 ${files[docType] ? 'border-green-200' : ''}`}>
                                  <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center">
                                      <FileUp className="h-4 w-4 mr-2 text-muted-foreground" />
                                      <span className="text-sm font-medium">{docType}</span>
                                    </div>
                                    {files[docType] ? (
                                      <Badge variant="outline" className="bg-green-50 text-green-700">
                                        <Check className="h-3 w-3 mr-1" /> Uploaded
                                      </Badge>
                                    ) : (
                                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                                        Required
                                      </Badge>
                                    )}
                                  </div>
                                  
                                  <input
                                    type="file"
                                    ref={fileInputRefs[docType]}
                                    className="hidden"
                                    onChange={(e) => handleFileChange(e, docType)}
                                    accept=".pdf,.doc,.docx"
                                  />
                                  
                                  {files[docType] && (
                                    <div className="text-xs truncate mb-2">{files[docType]?.name}</div>
                                  )}
                                  
                                  <div className="flex space-x-2">
                                    <Button 
                                      type="button" 
                                      variant={files[docType] ? "outline" : "default"} 
                                      size="sm"
                                      className="w-full text-xs"
                                      onClick={() => triggerFileInput(docType)}
                                    >
                                      <Upload className="h-3 w-3 mr-1" />
                                      {files[docType] ? 'Replace' : 'Upload'}
                                    </Button>
                                    
                                    {files[docType] && (
                                      <Button 
                                        type="button" 
                                        variant="destructive" 
                                        size="sm"
                                        className="text-xs"
                                        onClick={() => removeFile(docType)}
                                      >
                                        Remove
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-md text-sm">
                            <div className="flex">
                              <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                              <div>
                                <p className="font-medium text-yellow-700">Important</p>
                                <p className="text-yellow-600">
                                  All documents must be in PDF or Word format. Maximum file size is 10MB per document.
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="termsAccepted"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                  <input
                                    type="checkbox"
                                    className="h-4 w-4 mt-1"
                                    checked={field.value}
                                    onChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>
                                    I confirm all information is accurate and legally valid
                                  </FormLabel>
                                  <p className="text-sm text-muted-foreground">
                                    By checking this box, I confirm that all submitted information is truthful and all documents are authentic.
                                  </p>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="flex justify-between pt-2">
                            <Button 
                              type="button" 
                              variant="outline"
                              onClick={() => setCurrentTab('proposal')}
                            >
                              Back to Proposal
                            </Button>
                            <Button type="submit">
                              <Send className="mr-2 h-4 w-4" />
                              Submit Application
                            </Button>
                          </div>
                        </div>
                      </TabsContent>
                    </form>
                  </Form>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Tender Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium">Description</h3>
                  <p className="text-sm text-muted-foreground mt-1">{tender.description}</p>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Deadline:</span>
                    </div>
                    <span className="text-sm font-medium">{tender.deadline}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Organization:</span>
                    </div>
                    <span className="text-sm">{tender.organization}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Estimated Budget:</span>
                    </div>
                    <span className="text-sm">{tender.budget}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Tender Documents</h3>
                  {tender.documents.map(doc => (
                    <div key={doc.id} className="flex justify-between items-center mb-2 text-sm">
                      <div className="flex items-center gap-1">
                        <FileText className="h-3 w-3 text-muted-foreground" />
                        <span className="truncate">{doc.name}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-4 bg-blue-50 border border-blue-100 rounded-md p-4">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Application Tips</h3>
              <ul className="text-xs text-blue-700 space-y-2 list-disc pl-4">
                <li>Complete all required fields in the form</li>
                <li>Upload all required documents in the specified format</li>
                <li>Make sure your proposed budget is realistic and competitive</li>
                <li>Provide a clear and concise proposal summary</li>
                <li>Double check all information before submitting</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ApplyTender;
