
import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  Bell, 
  ChevronDown,
  Search,
  MessageCircle
} from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function Header() {
  return (
    <header className="border-b bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <div className="relative w-64 lg:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search tenders, vendors, reports..."
              className="w-full rounded-md border border-input bg-white px-9 py-2 text-sm ring-offset-background"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-destructive"></span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-2 font-medium border-b">Notifications</div>
              <div className="max-h-80 overflow-auto">
                <div className="p-4 border-b hover:bg-muted/50 cursor-pointer">
                  <div className="text-sm font-medium">Tender evaluation complete</div>
                  <div className="text-xs text-muted-foreground mt-1">Office Equipment Procurement #4302</div>
                  <div className="text-xs text-muted-foreground mt-1">10 minutes ago</div>
                </div>
                <div className="p-4 border-b hover:bg-muted/50 cursor-pointer">
                  <div className="text-sm font-medium">New submission received</div>
                  <div className="text-xs text-muted-foreground mt-1">IT Services Procurement #5501</div>
                  <div className="text-xs text-muted-foreground mt-1">2 hours ago</div>
                </div>
                <div className="p-4 hover:bg-muted/50 cursor-pointer">
                  <div className="text-sm font-medium">Document approval needed</div>
                  <div className="text-xs text-muted-foreground mt-1">Consulting Services #3201</div>
                  <div className="text-xs text-muted-foreground mt-1">Yesterday</div>
                </div>
              </div>
              <div className="p-2 border-t text-center">
                <Button variant="ghost" className="w-full text-sm text-primary">View all notifications</Button>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <MessageCircle className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-2 font-medium border-b">Smart Assistant</div>
              <div className="p-4 max-h-80 overflow-auto">
                <div className="bg-muted p-3 rounded-lg mb-3 text-sm">
                  How can I help with your procurement needs today?
                </div>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start text-left">How do I create a new tender?</Button>
                  <Button variant="outline" size="sm" className="w-full justify-start text-left">Show me tenders with delayed evaluations</Button>
                  <Button variant="outline" size="sm" className="w-full justify-start text-left">What does criteria 3.2 require?</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User" />
                </Avatar>
                <span className="hidden md:inline">John Smith</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile Settings</DropdownMenuItem>
              <DropdownMenuItem>Preferences</DropdownMenuItem>
              <DropdownMenuItem>Team Management</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
