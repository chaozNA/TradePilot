"use client";
import {
  Home,
  ChartCandlestick,
  BriefcaseBusiness,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items with grouping
const menuGroups = {
  main: [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Portfolio",
      url: "/portfolio",
      icon: BriefcaseBusiness,
    },
    {
      title: "Trade",
      url: "/trade",
      icon: ChartCandlestick,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
};

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-[hsl(var(--sidebar-border))] bg-[hsl(var(--sidebar-background))] text-[hsl(var(--sidebar-foreground))]">
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center justify-between p-4">
            <SidebarGroupLabel className="text-xl font-semibold">
              Trade Pilot
            </SidebarGroupLabel>
            {/* <ModeToggle /> */}
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuGroups.main.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className="flex items-center space-x-3 rounded-md px-4 py-2 text-[hsl(var(--sidebar-foreground))] transition-colors duration-200 hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-accent-foreground))]"
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
