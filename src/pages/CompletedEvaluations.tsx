
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileText, Search, CheckCircle, ArrowUpDown, BarChart2 } from 'lucide-react';

// Mock data for completed evaluations
const completedEvaluations = [
  {
    id: 'E-1001',
    tenderId: 'T-2023-38',
    tenderTitle: 'Website Redesign Project',
    completedDate: '2025-04-25',
    submissionsEvaluated: 6,
    averageScore: 4.2
  },
  {
    id: 'E-1002',
    tenderId: 'T-2023-35',
    tenderTitle: 'Annual Office Supplies',
    completedDate: '2025-04-10',
    submissionsEvaluated: 8,
    averageScore: 3.8
  },
  {
    id: 'E-1003',
    tenderId: 'T-2023-30',
    tenderTitle: 'Training Services',
    completedDate: '2025-03-15',
    submissionsEvaluated: 4,
    averageScore: 4.5
  }
];

// Mock data for vendor evaluations for a specific tender
const vendorEvaluations = [
  {
    vendorId: 'V-001',
    vendorName: 'TechSolutions Inc.',
    scores: {
      technical: 4.5,
      experience: 4.8,
      timeline: 3.9,
      budget: 4.2
    },
    average: 4.4,
    comments: "Strong technical solution with excellent experience, but timeline could be improved."
  },
  {
    vendorId: 'V-002',
    vendorName: 'Creative Design Studio',
    scores: {
      technical: 4.2,
      experience: 3.9,
      timeline: 4.5,
      budget: 3.8
    },
    average: 4.1,
    comments: "Good overall proposal with strong timeline management."
  },
  {
    vendorId: 'V-003',
    vendorName: 'Global Consulting Group',
    scores: {
      technical: 3.7,
      experience: 4.5,
      timeline: 3.5,
      budget: 4.1
    },
    average: 4.0,
    comments: "Excellent expertise but technical approach could be more innovative."
  },
  {
    vendorId: 'V-004',
    vendorName: 'Future Innovations Ltd',
    scores: {
      technical: 4.7,
      experience: 3.8,
      timeline: 4.0,
      budget: 3.5
    },
    average: 4.0,
    comments: "Strong technical solution but budget efficiency could be improved."
  }
];

// Evaluation criteria
const evaluationCriteria = [
  { id: 'technical', name: 'Technical Solution', weight: 30 },
  { id: 'experience', name: 'Experience & Expertise', weight: 25 },
  { id: 'timeline', name: 'Implementation Timeline', weight: 15 },
  { id: 'budget', name: 'Budget & Cost Efficiency', weight: 30 }
];

export default function CompletedEvaluations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvaluation, setSelectedEvaluation] = useState<any>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'ascending' | 'descending' | null }>({
    key: '', 
    direction: null
  });
  
  // Filter evaluations by search term
  const filteredEvaluations = completedEvaluations.filter(evaluation =>
    evaluation.tenderTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    evaluation.tenderId.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sort vendors by score
  const sortedVendors = [...vendorEvaluations].sort((a, b) => {
    if (sortConfig.key === '') return 0;
    
    let valueA = sortConfig.key === 'average' 
      ? a.average 
      : sortConfig.key.startsWith('scores.') 
        ? a.scores[sortConfig.key.split('.')[1] as keyof typeof a.scores] 
        : (a as any)[sortConfig.key];
    
    let valueB = sortConfig.key === 'average'
      ? b.average
      : sortConfig.key.startsWith('scores.')
        ? b.scores[sortConfig.key.split('.')[1] as keyof typeof b.scores]
        : (b as any)[sortConfig.key];
    
    if (sortConfig.direction === 'ascending') {
      return valueA > valueB ? 1 : -1;
    }
    
    return valueA < valueB ? 1 : -1;
  });
  
  // Handle sort
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' | null = 'ascending';
    
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = null;
    }
    
    setSortConfig({ key, direction });
  };
  
  // View evaluation details
  const viewEvaluationDetails = (evaluation: any) => {
    setSelectedEvaluation(evaluation);
    setDetailsDialogOpen(true);
    // Reset sort when opening a new evaluation
    setSortConfig({ key: 'average', direction: 'descending' });
  };
  
  // Get sort direction indicator
  const getSortDirectionIndicator = (key: string) => {
    if (sortConfig.key !== key) {
      return null;
    }
    
    return sortConfig.direction === 'ascending' ? ' ↑' : ' ↓';
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Completed Evaluations</h1>
          <p className="text-muted-foreground mt-2">
            Review tender evaluations you've completed.
          </p>
        </div>
        
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Evaluation History</h2>
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search evaluations..." 
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <Card>
          <CardContent className="p-0 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Evaluation ID</TableHead>
                  <TableHead>Tender</TableHead>
                  <TableHead>Completed Date</TableHead>
                  <TableHead>Submissions</TableHead>
                  <TableHead>Average Score</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvaluations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                      No evaluations match your search.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEvaluations.map((evaluation) => (
                    <TableRow key={evaluation.id}>
                      <TableCell className="font-medium">{evaluation.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="text-sm text-muted-foreground">{evaluation.tenderId}</div>
                          {evaluation.tenderTitle}
                        </div>
                      </TableCell>
                      <TableCell>{evaluation.completedDate}</TableCell>
                      <TableCell>{evaluation.submissionsEvaluated}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">
                          {evaluation.averageScore.toFixed(1)}/5
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => viewEvaluationDetails(evaluation)}>
                          <FileText className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      {/* Evaluation Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Evaluation Details</DialogTitle>
            <DialogDescription>
              {selectedEvaluation && 
                `${selectedEvaluation.tenderId}: ${selectedEvaluation.tenderTitle} - Completed on ${selectedEvaluation.completedDate}`
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Vendor Evaluations</h3>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Button variant="outline" size="sm" onClick={() => requestSort('average')} className="flex items-center">
                  <BarChart2 className="h-4 w-4 mr-1" />
                  Average Score{getSortDirectionIndicator('average')}
                </Button>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendor</TableHead>
                    {evaluationCriteria.map((criterion) => (
                      <TableHead key={criterion.id} className="text-center">
                        <button 
                          className="flex flex-col items-center font-semibold hover:text-primary"
                          onClick={() => requestSort(`scores.${criterion.id}`)}
                        >
                          <span className="whitespace-nowrap">{criterion.name}</span>
                          <span className="text-xs text-muted-foreground">({criterion.weight}%)</span>
                          {getSortDirectionIndicator(`scores.${criterion.id}`)}
                        </button>
                      </TableHead>
                    ))}
                    <TableHead className="text-center">
                      <button 
                        className="flex items-center justify-center font-semibold hover:text-primary"
                        onClick={() => requestSort('average')}
                      >
                        Average{getSortDirectionIndicator('average')}
                      </button>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedVendors.map((vendor, index) => (
                    <TableRow key={vendor.vendorId} className={index === 0 ? 'bg-green-50' : ''}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {index === 0 && <CheckCircle className="h-4 w-4 text-green-600" />}
                          <div>
                            <div className="font-medium">{vendor.vendorName}</div>
                            <div className="text-xs text-muted-foreground">{vendor.vendorId}</div>
                          </div>
                        </div>
                      </TableCell>
                      {evaluationCriteria.map((criterion) => (
                        <TableCell key={criterion.id} className="text-center">
                          <Badge className={vendor.scores[criterion.id as keyof typeof vendor.scores] >= 4.0 ? 
                            'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                            {vendor.scores[criterion.id as keyof typeof vendor.scores].toFixed(1)}
                          </Badge>
                        </TableCell>
                      ))}
                      <TableCell className="text-center">
                        <Badge className={
                          vendor.average >= 4.5 ? 'bg-green-100 text-green-800 font-bold' :
                          vendor.average >= 4.0 ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }>
                          {vendor.average.toFixed(1)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Evaluation Comments</h3>
              <div className="space-y-3">
                {sortedVendors.map((vendor) => (
                  <div key={`comment-${vendor.vendorId}`} className="bg-muted/30 p-3 rounded-lg">
                    <div className="font-medium">{vendor.vendorName}</div>
                    <p className="text-sm mt-1">{vendor.comments}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
