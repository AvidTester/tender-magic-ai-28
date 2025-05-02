import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Download,
  SendHorizonal,
  Upload,
  InfoIcon
} from 'lucide-react';

const AvailableTenders = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Available Tenders</h1>
          <p className="text-muted-foreground">Browse and apply for open tenders.</p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Tenders</TabsTrigger>
            <TabsTrigger value="it">IT Services</TabsTrigger>
            <TabsTrigger value="construction">Construction</TabsTrigger>
            <TabsTrigger value="supply">Supply Chain</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Office Equipment Procurement</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Seeking a vendor to supply office equipment including computers, printers, and furniture.
                  </p>
                  <div className="mt-2 flex items-center space-x-2">
                    <Badge variant="secondary">IT</Badge>
                    <Badge>Open</Badge>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <Button variant="ghost">
                    <InfoIcon className="mr-2 h-4 w-4" />
                    Details
                  </Button>
                  <Button>
                    <SendHorizonal className="mr-2 h-4 w-4" />
                    Apply
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>IT Services Procurement</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Looking for a provider of IT services, including network maintenance, cybersecurity, and cloud solutions.
                  </p>
                  <div className="mt-2 flex items-center space-x-2">
                    <Badge variant="secondary">IT</Badge>
                    <Badge>Open</Badge>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <Button variant="ghost">
                    <InfoIcon className="mr-2 h-4 w-4" />
                    Details
                  </Button>
                  <Button>
                    <SendHorizonal className="mr-2 h-4 w-4" />
                    Apply
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Construction Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Requesting bids for construction services for a new office building.
                  </p>
                  <div className="mt-2 flex items-center space-x-2">
                    <Badge variant="secondary">Construction</Badge>
                    <Badge>Open</Badge>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <Button variant="ghost">
                    <InfoIcon className="mr-2 h-4 w-4" />
                    Details
                  </Button>
                  <Button>
                    <SendHorizonal className="mr-2 h-4 w-4" />
                    Apply
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="it" className="mt-4">
            <p>This is the IT Services tab content.</p>
          </TabsContent>
          <TabsContent value="construction" className="mt-4">
            <p>This is the Construction tab content.</p>
          </TabsContent>
          <TabsContent value="supply" className="mt-4">
            <p>This is the Supply Chain tab content.</p>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AvailableTenders;
