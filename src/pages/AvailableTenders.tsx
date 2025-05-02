
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { 
  FileText, 
  Clock, 
  Filter, 
  Search,
  Download,
  SendHorizonal,
  FileArrowUp,
  InfoIcon
} from 'lucide-react';

// Mock data for available tenders
const availableTenders = [
  { 
    id: 'T-2023-42', 
    title: 'IT Infrastructure Upgrade', 
    status: 'open',
    category: 'IT Services',
    deadline: '2025-05-15', 
    publishedDate: '2025-04-25',
    description: 'Seeking solutions for upgrading our IT infrastructure including servers, networking equipment, and related services. The project includes installation, configuration, and training.',
  },
  { 
    id: 'T-2023-41', 
    title: 'Office Furniture Procurement', 
    status: 'open',
    category: 'Equipment',
    deadline: '2025-05-18', 
    publishedDate: '2025-04-28',
    description: 'Procurement of office furniture including desks, chairs, filing cabinets, and meeting room furniture. Must meet ergonomic standards and sustainability requirements.',
  },
  { 
    id: 'T-2023-40', 
    title: 'Consulting Services', 
    status: 'open',
    category: 'Professional Services',
    deadline: '2025-05-05', 
    publishedDate: '2025-04-20',
    description: 'Strategic consulting services to improve operational efficiency, reduce costs, and implement best practices across the organization.',
  },
  { 
    id: 'T-2023-39', 
    title: 'Marketing Campaign',
    status: 'closed',
    category: 'Marketing',
    deadline: '2025-04-20', 
    publishedDate: '2025-04-01',
    description: 'Development and execution of a comprehensive marketing campaign including digital, print, and social media components to promote our new product line.',
  }
];

export default function AvailableTenders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTender, setSelectedTender] = useState<any>(null);
  const [showTenderDetails, setShowTenderDetails] = useState(false);
  const [showSubmissionDialog, setShowSubmissionDialog] = useState(false);
  
  // Filter tenders based on search term and filters
  const filteredTenders = availableTenders.filter(tender => {
    const matchesSearch = 
      tender.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      tender.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || tender.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || tender.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  // Handle viewing tender details
  const viewTenderDetails = (tender: any) => {
    setSelectedTender(tender);
    setShowTenderDetails(true);
  };
  
  // Handle submission dialog
  const openSubmissionDialog = (tender: any) => {
    setSelectedTender(tender);
    setShowSubmissionDialog(true);
  };
  
  // Handle submission form
  const handleSubmit = () => {
    toast({
      title: "Submission successful",
      description: `Your proposal for ${selectedTender.title} has been submitted.`,
    });
    setShowSubmissionDialog(false);
  };
  
  // Get days remaining until deadline
  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Available Tenders</h1>
          <p className="text-muted-foreground mt-2">
            Browse and submit proposals for open tender opportunities.
          </p>
        </div>
        
        <Card>
          <CardHeader className="pb-3 flex flex-col md:flex-row justify-between">
            <CardTitle>Tender Opportunities</CardTitle>
            <div className="flex flex-col gap-3 sm:flex-row mt-4 md:mt-0">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search tenders..." 
                  className="pl-8 w-full sm:w-[200px]" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="IT Services">IT Services</SelectItem>
                  <SelectItem value="Equipment">Equipment</SelectItem>
                  <SelectItem value="Professional Services">Professional Services</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="icon" className="h-10 w-10">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTenders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                      No tenders match your search criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTenders.map((tender) => (
                    <TableRow key={tender.id}>
                      <TableCell className="font-medium">{tender.id}</TableCell>
                      <TableCell>{tender.title}</TableCell>
                      <TableCell>{tender.category}</TableCell>
                      <TableCell>
                        {tender.status === 'open' ? (
                          <Badge className="bg-green-100 text-green-800">Open</Badge>
                        ) : (
                          <Badge variant="outline">Closed</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1 text-muted-foreground" /> 
                          <span className={tender.status === 'open' && getDaysRemaining(tender.deadline) < 3 ? 'text-destructive' : ''}>
                            {tender.status === 'open' ? `${getDaysRemaining(tender.deadline)} days` : tender.deadline}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => viewTenderDetails(tender)}
                          >
                            <FileText className="h-4 w-4 mr-1" />
                            Details
                          </Button>
                          {tender.status === 'open' && (
                            <Button 
                              size="sm" 
                              onClick={() => openSubmissionDialog(tender)}
                            >
                              <SendHorizonal className="h-4 w-4 mr-1" />
                              Submit
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      {/* Tender Details Dialog */}
      <Dialog open={showTenderDetails} onOpenChange={setShowTenderDetails}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Tender Details</DialogTitle>
          </DialogHeader>
          
          {selectedTender && (
            <div className="space-y-6">
              <div>
                <div className="text-sm text-muted-foreground">{selectedTender.id}</div>
                <h2 className="text-xl font-semibold">{selectedTender.title}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={selectedTender.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-gray-100'}>
                    {selectedTender.status.charAt(0).toUpperCase() + selectedTender.status.slice(1)}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Published: {selectedTender.publishedDate}
                  </span>
                </div>
              </div>
              
              <Tabs defaultValue="details">
                <TabsList>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-1">Description</h3>
                    <p className="text-muted-foreground">{selectedTender.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="text-sm font-medium mb-1">Category</h4>
                      <p>{selectedTender.category}</p>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="text-sm font-medium mb-1">Submission Deadline</h4>
                      <p>{selectedTender.deadline}</p>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="text-sm font-medium mb-1">Status</h4>
                      <p>{selectedTender.status.charAt(0).toUpperCase() + selectedTender.status.slice(1)}</p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex items-start gap-3">
                    <InfoIcon className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium mb-1">Submission Requirements</h4>
                      <p className="text-sm">Vendors are required to submit technical proposals, financial offers, team composition, and project timeline. All submissions must comply with format specifications detailed in the tender documents.</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="documents" className="space-y-4">
                  <div className="space-y-2">
                    {['Tender Specifications', 'Technical Requirements', 'Financial Template', 'Terms & Conditions'].map((doc, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <span>{doc}</span>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="timeline" className="space-y-4">
                  <div className="relative pt-2">
                    <div className="absolute h-full w-0.5 bg-muted left-4 top-0 z-0"></div>
                    
                    {[
                      { phase: 'Publication Date', date: selectedTender.publishedDate, completed: true },
                      { phase: 'Q&A Period', date: 'April 30, 2025', completed: true },
                      { phase: 'Submission Deadline', date: selectedTender.deadline, completed: false },
                      { phase: 'Evaluation Period', date: 'May 20, 2025', completed: false },
                      { phase: 'Award Announcement', date: 'May 30, 2025', completed: false }
                    ].map((item, idx) => (
                      <div key={idx} className="relative pl-10 mb-6 last:mb-0">
                        <div className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center top-0 ${
                          item.completed ? 'bg-primary text-white' : 'bg-muted/50 text-muted-foreground'
                        }`}>
                          {idx + 1}
                        </div>
                        <div>
                          <h4 className="font-medium">{item.phase}</h4>
                          <p className="text-sm text-muted-foreground">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
              
              <DialogFooter className="gap-2 sm:space-x-0">
                <Button variant="outline" onClick={() => setShowTenderDetails(false)}>
                  Close
                </Button>
                
                {selectedTender.status === 'open' && (
                  <Button onClick={() => {
                    setShowTenderDetails(false);
                    openSubmissionDialog(selectedTender);
                  }}>
                    <SendHorizonal className="h-4 w-4 mr-1" />
                    Submit Proposal
                  </Button>
                )}
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Submission Dialog */}
      <Dialog open={showSubmissionDialog} onOpenChange={setShowSubmissionDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Submit Proposal</DialogTitle>
            <DialogDescription>
              {selectedTender && `Prepare your submission for ${selectedTender.id}: ${selectedTender.title}`}
            </DialogDescription>
          </DialogHeader>
          
          {selectedTender && (
            <div className="space-y-6">
              <div className="bg-muted/20 p-4 rounded-lg border">
                <div className="text-sm text-muted-foreground">Tender:</div>
                <div className="font-medium">{selectedTender.title}</div>
                <div className="text-sm mt-1">Submission deadline: {selectedTender.deadline}</div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Documents</h3>
                
                <div className="space-y-3">
                  {['Technical Proposal', 'Financial Offer', 'Company Profile'].map((doc, idx) => (
                    <div key={idx} className="border border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                      <FileArrowUp className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="mt-2 font-medium">{doc}</p>
                      <p className="text-sm text-muted-foreground mb-2">Upload your {doc.toLowerCase()}</p>
                      <Button variant="outline" size="sm">Browse Files</Button>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4">
                  <h3 className="text-lg font-medium mb-2">Additional Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium" htmlFor="delivery-time">
                        Estimated Delivery Time (days)
                      </label>
                      <Input id="delivery-time" type="number" min="1" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium" htmlFor="notes">
                        Notes for Procurement Team
                      </label>
                      <textarea 
                        id="notes"
                        className="w-full rounded-md border border-input bg-background p-3 text-sm ring-offset-background mt-1 min-h-[100px]"
                        placeholder="Any additional information you'd like to include..."
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <DialogFooter className="gap-2 sm:space-x-0">
                <Button variant="outline" onClick={() => setShowSubmissionDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit}>
                  Submit Proposal
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
