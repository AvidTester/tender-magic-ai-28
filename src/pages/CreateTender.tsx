
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Archive, 
  Briefcase, 
  Calendar, 
  File, 
  ListChecks, 
  Upload, 
  Users,
  AlignLeft,
  FileText,
  CheckCircle,
  HelpCircle,
  Save
} from 'lucide-react';

// Form schema
const formSchema = z.object({
  title: z.string().min(10, {
    message: "Title must be at least 10 characters.",
  }),
  reference: z.string().min(3, {
    message: "Reference ID is required.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  description: z.string().min(50, {
    message: "Description must be at least 50 characters.",
  }),
  submissionDeadline: z.string(),
  announcementDate: z.string()
});

const CreateTender = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const [isDraft, setIsDraft] = useState(false);
  
  // Steps and their icons
  const steps = [
    { number: 1, title: 'Basic Information', icon: <AlignLeft className="h-5 w-5" /> },
    { number: 2, title: 'Documents', icon: <FileText className="h-5 w-5" /> },
    { number: 3, title: 'Evaluation Criteria', icon: <ListChecks className="h-5 w-5" /> },
    { number: 4, title: 'Deadlines', icon: <Calendar className="h-5 w-5" /> },
    { number: 5, title: 'Evaluators', icon: <Users className="h-5 w-5" /> }
  ];

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      reference: "",
      category: "",
      description: "",
      submissionDeadline: "",
      announcementDate: ""
    }
  });

  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      console.log(values);
      toast({
        title: "Tender created successfully!",
        description: `Tender "${values.title}" has been created and saved as draft.`,
      });
    }
  }

  const previousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const saveDraft = () => {
    // Get current form values regardless of validation
    const formValues = form.getValues();
    console.log('Draft saved:', formValues);
    setIsDraft(true);
    
    toast({
      title: "Draft saved",
      description: "Your tender has been saved as a draft and can be edited later.",
    });
  };

  // Categories for selection
  const categories = [
    { id: 'it_services', name: 'IT Services' },
    { id: 'consulting', name: 'Consulting Services' },
    { id: 'equipment', name: 'Equipment & Supplies' },
    { id: 'construction', name: 'Construction' },
    { id: 'training', name: 'Training & Development' },
    { id: 'marketing', name: 'Marketing & Communications' },
    { id: 'legal', name: 'Legal Services' },
    { id: 'other', name: 'Other' }
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Tender</h1>
          <div className="flex justify-between items-center mt-2">
            <p className="text-muted-foreground">
              Follow the step-by-step process to create and publish a new tender.
            </p>
            {isDraft && (
              <Badge variant="secondary">Draft</Badge>
            )}
          </div>
        </div>

        {/* Steps indicator */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 overflow-x-auto pb-4 sm:pb-0">
          {steps.map((s) => (
            <div 
              key={s.number} 
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors
                ${step === s.number ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}
              `}
              onClick={() => { if (s.number <= step) setStep(s.number); }}
            >
              <div className={step >= s.number ? 'step-indicator' : 'step-indicator-inactive'}>
                {s.number}
              </div>
              <div className="whitespace-nowrap">{s.title}</div>
              <div className={step === s.number ? 'text-primary' : 'text-muted-foreground'}>
                {s.icon}
              </div>
            </div>
          ))}
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className={step >= 1 ? 'step-indicator' : 'step-indicator-inactive'}>
                {steps[step-1].icon}
              </div>
              <div>
                <CardTitle>{steps[step-1].title}</CardTitle>
                <CardDescription>Step {step} of {totalSteps}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Step 1: Basic Information */}
                {step === 1 && (
                  <>
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tender Title</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., IT Infrastructure Upgrade Project" 
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Enter a clear, descriptive title for this tender.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="reference"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Reference ID</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="e.g., AADF-TECH-2023-01" 
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Unique reference number for this procurement.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categories.map(category => (
                                  <SelectItem key={category.id} value={category.id}>
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Select the category that best fits this procurement.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Provide a detailed description of the tender requirements and objectives..." 
                              className="min-h-[150px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            This description will be visible to all vendors.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {/* Step 2: Documents */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div className="bg-muted/50 p-6 rounded-lg border border-dashed border-muted-foreground/25 text-center">
                      <Upload className="h-10 w-10 mx-auto text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-medium">Upload Tender Documents</h3>
                      <p className="text-sm text-muted-foreground mt-2 mb-4">
                        Drag and drop your files here, or click to browse
                      </p>
                      <Button variant="secondary" type="button">Browse Files</Button>
                      <p className="text-xs text-muted-foreground mt-4">
                        Supported formats: PDF, DOCX, XLSX (Max: 10MB per file)
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Document Templates</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {['Financial Proposal', 'Technical Requirements', 'Terms & Conditions'].map((doc, idx) => (
                          <Card key={idx} className="hover:bg-muted/50 cursor-pointer">
                            <CardContent className="p-4 flex items-center gap-3">
                              <File className="h-5 w-5 text-primary" />
                              <div>
                                <div className="font-medium text-sm">{doc}</div>
                                <div className="text-xs text-muted-foreground">Template</div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Evaluation Criteria */}
                {step === 3 && (
                  <div className="space-y-6">
                    <Tabs defaultValue="preset" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="preset">Preset Criteria</TabsTrigger>
                        <TabsTrigger value="custom">Custom Criteria</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="preset" className="space-y-4 pt-4">
                        <p className="text-muted-foreground text-sm">
                          Select from predefined evaluation criteria templates based on procurement type.
                        </p>
                        
                        <div className="space-y-4">
                          {['Technical Capability (40%)', 'Financial Offer (30%)', 'Experience (20%)', 'Timeline (10%)'].map((criteria, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <CheckCircle className="h-5 w-5 text-primary" />
                                <span>{criteria}</span>
                              </div>
                              <Button variant="outline" size="sm">Edit Weight</Button>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="custom" className="space-y-4 pt-4">
                        <p className="text-muted-foreground text-sm">
                          Create custom evaluation criteria specific to your procurement needs.
                        </p>
                        
                        <div className="space-y-3">
                          {[1, 2].map(i => (
                            <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3 border rounded-lg">
                              <div className="md:col-span-2">
                                <Input placeholder={`Criteria ${i} name`} />
                              </div>
                              <div className="flex items-center gap-2">
                                <Input placeholder="Weight %" type="number" min="1" max="100" />
                                <span>%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <Button variant="outline" type="button" className="w-full">
                          + Add Another Criteria
                        </Button>
                      </TabsContent>
                    </Tabs>
                    
                    <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-3">
                      <HelpCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div className="text-sm text-muted-foreground">
                        <p className="font-medium">Evaluation Criteria Tips:</p>
                        <p>Ensure your criteria are clear, measurable, and relevant to the tender requirements. The combined weight of all criteria should equal 100%.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Deadlines */}
                {step === 4 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="submissionDeadline"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Submission Deadline</FormLabel>
                            <FormControl>
                              <Input 
                                type="date" 
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Last date for vendors to submit their proposals.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="announcementDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Announcement Date</FormLabel>
                            <FormControl>
                              <Input 
                                type="date" 
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Date when the winner will be announced.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Card className="bg-muted/30">
                      <CardContent className="p-4">
                        <h3 className="font-medium mb-2">Timeline Preview</h3>
                        <div className="relative">
                          <div className="absolute h-full w-0.5 bg-primary/30 left-4 top-0 z-0"></div>
                          
                          {['Publication', 'Q&A Period', 'Submission Deadline', 'Evaluation Period', 'Winner Announcement'].map((phase, idx) => (
                            <div key={idx} className="flex items-center gap-4 relative z-10 mb-6 last:mb-0">
                              <div className="w-8 h-8 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-primary">
                                {idx + 1}
                              </div>
                              <div className="flex-1 bg-background p-3 rounded-lg border">
                                <div className="font-medium">{phase}</div>
                                <div className="text-xs text-muted-foreground">
                                  {idx === 0 ? 'Today' : 
                                    idx === 2 ? form.watch('submissionDeadline') || 'Not set' : 
                                    idx === 4 ? form.watch('announcementDate') || 'Not set' : 
                                    'Date to be calculated'}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Step 5: Evaluators */}
                {step === 5 && (
                  <div className="space-y-6">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Assign Evaluators</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Select team members who will review and score vendor submissions.
                      </p>
                      
                      <div className="space-y-2">
                        {[
                          { name: 'John Smith', email: 'john@example.com', department: 'IT' },
                          { name: 'Emma Wilson', email: 'emma@example.com', department: 'Procurement' },
                          { name: 'Michael Brown', email: 'michael@example.com', department: 'Finance' },
                          { name: 'Sarah Davis', email: 'sarah@example.com', department: 'Legal' }
                        ].map((user, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-background rounded-lg border">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-xs text-muted-foreground">{user.email} • {user.department}</div>
                              </div>
                            </div>
                            <input type="checkbox" className="h-4 w-4" />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg flex items-start gap-3 border border-dashed border-muted-foreground/25">
                      <Users className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Evaluator Access:</p>
                        <p className="text-sm text-muted-foreground">
                          Assigned evaluators will receive an email notification with instructions on how to access and evaluate the tender submissions.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={previousStep}
                    disabled={step === 1}
                  >
                    Previous
                  </Button>
                  <div className="space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={saveDraft}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Draft
                    </Button>
                    <Button type="submit">
                      {step < totalSteps ? 'Continue' : 'Create Tender'}
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default CreateTender;
