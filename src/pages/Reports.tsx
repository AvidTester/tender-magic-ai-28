
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { 
  Search, 
  FileText, 
  Download, 
  FileDown, 
  Calendar, 
  CircleCheck,
  Printer,
  CheckCircle
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for tender reports
const reports = [
  {
    id: 'R-2023-42',
    tenderId: 'T-2023-42',
    title: 'IT Infrastructure Upgrade',
    generatedDate: '2025-04-25',
    status: 'Draft',
    winningVendor: 'TechSolutions Inc.',
    author: 'Jane Smith',
    submissions: 5,
    averageScore: 4.2
  },
  {
    id: 'R-2023-41',
    tenderId: 'T-2023-41',
    title: 'Office Furniture Procurement',
    generatedDate: '2025-04-22',
    status: 'Final',
    winningVendor: 'SmartBuild Construction',
    author: 'John Doe',
    submissions: 4,
    averageScore: 3.8
  },
  {
    id: 'R-2023-40',
    tenderId: 'T-2023-40',
    title: 'Consulting Services',
    generatedDate: '2025-04-18',
    status: 'Final',
    winningVendor: 'Global Consulting Group',
    author: 'Michael Johnson',
    submissions: 3,
    averageScore: 4.5
  },
  {
    id: 'R-2023-39',
    tenderId: 'T-2023-39',
    title: 'Marketing Campaign',
    generatedDate: '2025-04-15',
    status: 'Draft',
    winningVendor: 'Creative Design Studio',
    author: 'Sarah Williams',
    submissions: 6,
    averageScore: 3.9
  }
];

// Mock data for report scoring details
const scoringDetails = [
  { vendorName: 'TechSolutions Inc.', totalScore: 86, technicalScore: 28, experienceScore: 22, timelineScore: 13, budgetScore: 23 },
  { vendorName: 'Creative Design Studio', totalScore: 79, technicalScore: 24, experienceScore: 20, timelineScore: 15, budgetScore: 20 },
  { vendorName: 'Global Consulting Group', totalScore: 81, technicalScore: 25, experienceScore: 23, timelineScore: 12, budgetScore: 21 },
  { vendorName: 'Future Innovations Ltd', totalScore: 72, technicalScore: 22, experienceScore: 18, timelineScore: 12, budgetScore: 20 },
  { vendorName: 'SmartBuild Construction', totalScore: 68, technicalScore: 20, experienceScore: 15, timelineScore: 13, budgetScore: 20 }
];

// Mock data for evaluator comments
const evaluatorComments = [
  { 
    evaluator: 'Jane Smith',
    comments: {
      technical: 'The technical solution proposed is comprehensive and addresses all requirements. The architecture is well thought out.',
      experience: 'Strong track record with similar projects, documented case studies provided.',
      timeline: 'Timeline seems realistic and includes contingency planning.',
      budget: 'The proposed budget is within range but slightly higher than competitors.'
    }
  },
  { 
    evaluator: 'John Doe',
    comments: {
      technical: 'Good technical approach but missing some details on integration points.',
      experience: 'Team has relevant experience, but company is relatively new in this field.',
      timeline: 'Timeline looks optimistic, might need to extend certain phases.',
      budget: 'Budget breakdown is detailed and reasonable.'
    }
  },
  { 
    evaluator: 'Michael Johnson',
    comments: {
      technical: 'Innovative technical approach with clear methodology.',
      experience: 'Strong team with proven expertise in similar projects.',
      timeline: 'Implementation timeline is well-structured but could be more detailed.',
      budget: 'Good value for money, competitive pricing with comprehensive breakdown.'
    }
  }
];

export default function Reports() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<'All' | 'Draft' | 'Final'>('All');
  const [reportList, setReportList] = React.useState(reports);
  const [showReportDialog, setShowReportDialog] = React.useState(false);
  const [selectedReport, setSelectedReport] = React.useState<typeof reports[0] | null>(null);
  
  // Filter reports based on search term and status filter
  React.useEffect(() => {
    const filtered = reports.filter(report => {
      const matchesSearch = 
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        report.tenderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || report.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
    
    setReportList(filtered);
  }, [searchTerm, statusFilter]);
  
  // View report details
  const viewReport = (report: typeof reports[0]) => {
    setSelectedReport(report);
    setShowReportDialog(true);
  };
  
  // Generate PDF report (mock functionality)
  const generatePdf = () => {
    toast({
      title: "Generating PDF",
      description: "Your report is being prepared for download.",
    });
    
    // Simulate PDF generation delay
    setTimeout(() => {
      toast({
        title: "PDF Ready",
        description: "Your report has been generated successfully.",
      });
    }, 1500);
  };
  
  // Generate Word document (mock functionality)
  const generateWord = () => {
    toast({
      title: "Generating Word Document",
      description: "Your report is being prepared for download.",
    });
    
    // Simulate Word document generation delay
    setTimeout(() => {
      toast({
        title: "Word Document Ready",
        description: "Your report has been generated successfully.",
      });
    }, 1500);
  };
  
  // Finalize report (mock functionality)
  const finalizeReport = () => {
    toast({
      title: "Report Finalized",
      description: "The report has been marked as final and can no longer be edited.",
    });
    
    setShowReportDialog(false);
    
    // Update report status in the list
    if (selectedReport) {
      setReportList(currentList => 
        currentList.map(report => 
          report.id === selectedReport.id 
            ? { ...report, status: 'Final' } 
            : report
        )
      );
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Report Generator</h1>
          <p className="text-muted-foreground mt-2">
            Generate, view, and download evaluation reports for tenders.
          </p>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Tender Evaluation Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search reports by title or ID..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant={statusFilter === 'All' ? 'default' : 'outline'} 
                  onClick={() => setStatusFilter('All')}
                >
                  All
                </Button>
                <Button 
                  variant={statusFilter === 'Draft' ? 'default' : 'outline'} 
                  onClick={() => setStatusFilter('Draft')}
                >
                  Draft
                </Button>
                <Button 
                  variant={statusFilter === 'Final' ? 'default' : 'outline'} 
                  onClick={() => setStatusFilter('Final')}
                >
                  Final
                </Button>
              </div>
            </div>

            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report ID</TableHead>
                    <TableHead>Tender Title</TableHead>
                    <TableHead>Generated Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Winning Vendor</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportList.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No reports found matching your search criteria.
                      </TableCell>
                    </TableRow>
                  ) : (
                    reportList.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.id}</TableCell>
                        <TableCell>{report.title}</TableCell>
                        <TableCell>
                          {new Date(report.generatedDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric"
                          })}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={report.status === 'Final' ? 'secondary' : 'outline'}
                            className={report.status === 'Final' ? 'bg-green-100 text-green-800' : ''}
                          >
                            {report.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{report.winningVendor}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => viewReport(report)}
                            >
                              <FileText className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={generatePdf}
                            >
                              <FileDown className="h-4 w-4 mr-1" />
                              PDF
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Preview Dialog */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {selectedReport?.title} - Evaluation Report
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            {selectedReport && (
              <div className="space-y-8">
                {/* Report Header */}
                <div className="pb-4 border-b">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Report ID</p>
                      <p className="font-medium">{selectedReport.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tender ID</p>
                      <p className="font-medium">{selectedReport.tenderId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Generated Date</p>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                        <p>{new Date(selectedReport.generatedDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge 
                        variant={selectedReport.status === 'Final' ? 'secondary' : 'outline'}
                        className={selectedReport.status === 'Final' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {selectedReport.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Prepared By</p>
                      <p>{selectedReport.author}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Submissions</p>
                      <p>{selectedReport.submissions} vendors</p>
                    </div>
                  </div>
                </div>

                {/* Report Tabs */}
                <Tabs defaultValue="summary">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                    <TabsTrigger value="scores">Scoring Details</TabsTrigger>
                    <TabsTrigger value="comments">Evaluator Comments</TabsTrigger>
                  </TabsList>
                  
                  {/* Summary Tab */}
                  <TabsContent value="summary" className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Tender Summary</h3>
                      <Card className="bg-muted/50">
                        <CardContent className="pt-6">
                          <p>
                            This report summarizes the evaluation process for <strong>{selectedReport.title}</strong>. 
                            A total of {selectedReport.submissions} vendors submitted proposals which were evaluated 
                            against the pre-defined criteria. Based on the cumulative scoring, <strong>{selectedReport.winningVendor}</strong> 
                            was selected as the winning vendor with an average score of {selectedReport.averageScore}/5.
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">Decision Summary</h3>
                      <Card className="bg-green-50 border-green-200">
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-4">
                            <div className="bg-green-100 p-2 rounded-full">
                              <CheckCircle className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-base">{selectedReport.winningVendor} Selected</h4>
                              <p className="text-sm mt-2">
                                After careful evaluation of all submissions, {selectedReport.winningVendor} has been 
                                selected for this tender based on their superior technical proposal, proven experience, 
                                realistic timeline, and competitive pricing. The vendor demonstrated exceptional understanding 
                                of the requirements and provided a comprehensive solution.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="flex justify-between pt-2">
                      <div className="text-sm text-muted-foreground">
                        <p>Report generated on {new Date(selectedReport.generatedDate).toLocaleDateString()}</p>
                        <p>Reference: {selectedReport.id}</p>
                      </div>
                      <div>
                        {selectedReport.status === 'Final' && (
                          <div className="flex items-center gap-1 text-green-700">
                            <CircleCheck className="h-4 w-4" />
                            <span className="text-sm font-medium">Finalized</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>

                  {/* Scores Tab */}
                  <TabsContent value="scores" className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Vendor Scoring Overview</h3>
                      <div className="border rounded-md">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Vendor</TableHead>
                              <TableHead className="text-center">Technical (30%)</TableHead>
                              <TableHead className="text-center">Experience (25%)</TableHead>
                              <TableHead className="text-center">Timeline (15%)</TableHead>
                              <TableHead className="text-center">Budget (30%)</TableHead>
                              <TableHead className="text-center">Total Score</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {scoringDetails.map((vendor, index) => (
                              <TableRow key={index} className={vendor.vendorName === selectedReport.winningVendor ? "bg-green-50" : ""}>
                                <TableCell className="font-medium">
                                  {vendor.vendorName}
                                  {vendor.vendorName === selectedReport.winningVendor && (
                                    <Badge className="ml-2 bg-green-100 text-green-800">Winner</Badge>
                                  )}
                                </TableCell>
                                <TableCell className="text-center">{vendor.technicalScore}/30</TableCell>
                                <TableCell className="text-center">{vendor.experienceScore}/25</TableCell>
                                <TableCell className="text-center">{vendor.timelineScore}/15</TableCell>
                                <TableCell className="text-center">{vendor.budgetScore}/30</TableCell>
                                <TableCell className="text-center font-bold">{vendor.totalScore}/100</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Comments Tab */}
                  <TabsContent value="comments" className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Evaluator Feedback for {selectedReport.winningVendor}</h3>
                      
                      {evaluatorComments.map((evaluator, index) => (
                        <Card key={index} className="mb-4">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">{evaluator.evaluator}</CardTitle>
                          </CardHeader>
                          <CardContent className="pb-3">
                            <div className="space-y-3">
                              <div>
                                <h4 className="text-sm font-medium">Technical Solution</h4>
                                <p className="text-sm text-muted-foreground">{evaluator.comments.technical}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium">Experience & Expertise</h4>
                                <p className="text-sm text-muted-foreground">{evaluator.comments.experience}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium">Implementation Timeline</h4>
                                <p className="text-sm text-muted-foreground">{evaluator.comments.timeline}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium">Budget & Cost Efficiency</h4>
                                <p className="text-sm text-muted-foreground">{evaluator.comments.budget}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <div className="w-full flex justify-between items-center">
              <div className="flex gap-2">
                <Button variant="outline" onClick={generatePdf}>
                  <FileDown className="h-4 w-4 mr-1" />
                  Export as PDF
                </Button>
                <Button variant="outline" onClick={generateWord}>
                  <Download className="h-4 w-4 mr-1" />
                  Export as Word
                </Button>
                <Button variant="outline" onClick={() => window.print()}>
                  <Printer className="h-4 w-4 mr-1" />
                  Print
                </Button>
              </div>
              
              {selectedReport?.status === 'Draft' && (
                <Button onClick={finalizeReport} className="bg-green-600 hover:bg-green-700">
                  <CircleCheck className="h-4 w-4 mr-1" />
                  Finalize Report
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
