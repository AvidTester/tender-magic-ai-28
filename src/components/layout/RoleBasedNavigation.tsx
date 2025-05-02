
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton
} from '@/components/ui/sidebar';
import { 
  Home, 
  FilePlus, 
  Send, 
  Users, 
  Award, 
  FileCheck, 
  Settings, 
  HelpCircle, 
  LogOut, 
  Briefcase, 
  ClipboardCheck
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import type { UserRole } from '@/contexts/AuthContext';

// Menu items by role
const menuItemsByRole: Record<UserRole, Array<{title: string; icon: React.FC<any>; path: string}>> = {
  admin: [
    { title: 'Dashboard', icon: Home, path: '/' },
    { title: 'Create Tender', icon: FilePlus, path: '/create-tender' },
    { title: 'Submissions', icon: Send, path: '/submissions' },
    { title: 'Vendors', icon: Users, path: '/vendors' },
    { title: 'Evaluations', icon: Award, path: '/evaluations' },
    { title: 'Reports', icon: FileCheck, path: '/reports' },
  ],
  vendor: [
    { title: 'Dashboard', icon: Home, path: '/' },
    { title: 'Available Tenders', icon: Briefcase, path: '/available-tenders' },
    { title: 'My Submissions', icon: Send, path: '/my-submissions' },
  ],
  evaluator: [
    { title: 'Dashboard', icon: Home, path: '/' },
    { title: 'My Evaluations', icon: ClipboardCheck, path: '/my-evaluations' },
    { title: 'Completed Evaluations', icon: FileCheck, path: '/completed-evaluations' },
  ]
};

// Utility menu items (common for all roles)
const utilityMenuItems = [
  { title: 'Settings', icon: Settings, path: '/settings' },
  { title: 'Help', icon: HelpCircle, path: '/help' },
];

export function RoleBasedNavigation() {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  // If no user, don't render navigation
  if (!user) return null;
  
  // Get menu items based on user role
  const mainMenuItems = menuItemsByRole[user.role] || [];

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-white font-bold">
            SP
          </div>
          <div className="font-semibold text-sidebar-foreground">Smart Procurement</div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.path}
                  >
                    <Link to={item.path}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel>Utilities</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {utilityMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.path}
                  >
                    <Link to={item.path}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                  {user.avatar || user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </div>
                </div>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenuButton asChild onClick={logout}>
          <button className="w-full flex items-center gap-2 text-sidebar-foreground hover:text-sidebar-accent-foreground">
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
