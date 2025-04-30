
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { FileUp, AlertCircle, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

// Define the form validation schema
const submissionSchema = z.object({
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  contactName: z.string().min(2, { message: "Contact name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  registrationId: z.string().min(4, { message: "Registration ID is required." }),
  tenderId: z.string().min(1, { message: "Please select a tender." }),
  notes: z.string().optional(),
});

// Mock data for available tenders
const availableTenders = [
  { id: "T-2023-42", title: "IT Infrastructure Upgrade" },
  { id: "T-2023-41", title: "Office Furniture Procurement" },
  { id: "T-2023-40", title: "Consulting Services" },
  { id: "T-2023-39", title: "Marketing Campaign" },
];

export default function Submissions() {
  const form = useForm({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      registrationId: "",
      tenderId: "",
      notes: "",
    },
  });

  const [files, setFiles] = React.useState<File[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    
    // Validate files (PDF or Word only, min 20KB)
    const validFiles = selectedFiles.filter(file => {
      const isValidType = file.type === 'application/pdf' || 
                         file.type === 'application/msword' || 
                         file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      const isValidSize = file.size >= 20 * 1024; // 20KB minimum
      
      if (!isValidType) {
        toast({
          title: "Invalid file type",
          description: `${file.name} must be PDF or Word document.`,
          variant: "destructive",
        });
      }
      
      if (!isValidSize) {
        toast({
          title: "File too small",
          description: `${file.name} must be at least 20KB.`,
          variant: "destructive",
        });
      }
      
      return isValidType && isValidSize;
    });
    
    setFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = (data: z.infer<typeof submissionSchema>) => {
    if (files.length === 0) {
      toast({
        title: "Missing files",
        description: "Please upload at least one document.",
        variant: "destructive",
      });
      return;
    }
    
    // Here you would typically send the data and files to your backend
    console.log("Form data:", data);
    console.log("Files:", files);
    
    toast({
      title: "Submission successful",
      description: "Your proposal has been submitted and will be visible after the deadline.",
    });
    
    // Reset form and files
    form.reset();
    setFiles([]);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tender Submission</h1>
          <p className="text-muted-foreground mt-2">
            Submit your proposal for an open tender. All submissions are hidden until the deadline.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Vendor Submission Form</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Company Details</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="companyName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter company name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="registrationId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Registration ID *</FormLabel>
                              <FormControl>
                                <Input placeholder="Company registration number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="contactName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Contact Person *</FormLabel>
                              <FormControl>
                                <Input placeholder="Full name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address *</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="contact@company.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="tenderId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Select Tender *</FormLabel>
                            <FormControl>
                              <select 
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                {...field}
                              >
                                <option value="">Select a tender</option>
                                {availableTenders.map((tender) => (
                                  <option key={tender.id} value={tender.id}>
                                    {tender.id}: {tender.title}
                                  </option>
                                ))}
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Notes</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Any special instructions or comments about your submission"
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Document Upload</h3>
                      
                      <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                        <input
                          ref={fileInputRef}
                          type="file"
                          onChange={handleFileChange}
                          multiple
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                        />
                        
                        <div className="flex flex-col items-center">
                          <FileUp className="h-12 w-12 text-gray-400 mb-4" />
                          <h3 className="text-lg font-medium">Drag files here or click to upload</h3>
                          <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto">
                            Upload your proposal documents, budget, timeline, and any supporting materials.
                            Accepted formats: PDF, Word (.doc, .docx)
                          </p>
                          <Button 
                            type="button"
                            onClick={triggerFileInput}
                            className="mt-4"
                          >
                            Select Files
                          </Button>
                        </div>
                      </div>

                      {files.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium mb-2">Uploaded Files</h4>
                          <ul className="space-y-2">
                            {files.map((file, index) => (
                              <li key={index} className="flex justify-between items-center p-2 bg-muted rounded-md">
                                <span className="text-sm truncate max-w-[80%]">{file.name}</span>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFile(index)}
                                >
                                  Remove
                                </Button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="border-t pt-4 flex flex-col space-y-2">
                      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-md flex items-start">
                        <AlertCircle className="h-5 w-5 text-yellow-500 mr-3 mt-0.5" />
                        <div>
                          <div className="text-sm text-yellow-800">
                            Your submission will remain hidden until the tender deadline has passed.
                            Make sure all required documents are attached before submitting.
                          </div>
                        </div>
                      </div>
                      
                      <Button type="submit" className="ml-auto" size="lg">
                        <Send className="mr-2 h-4 w-4" />
                        Submit Proposal
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Submission Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium">Required Documents</h4>
                  <ul className="list-disc list-inside space-y-1 mt-2 text-muted-foreground">
                    <li>Company registration certificate</li>
                    <li>Formal proposal document (PDF)</li>
                    <li>Financial offer/budget</li>
                    <li>Implementation timeline</li>
                    <li>Team CVs (if applicable)</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium">File Requirements</h4>
                  <ul className="list-disc list-inside space-y-1 mt-2 text-muted-foreground">
                    <li>PDF or Word formats only</li>
                    <li>File size: minimum 20KB, maximum 10MB per file</li>
                    <li>Clear file naming (e.g., "CompanyName_Budget.pdf")</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium">Deadline Information</h4>
                  <p className="mt-2 text-muted-foreground">
                    All submissions must be completed before the tender deadline.
                    Late submissions will not be accepted by the system.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
