'use client'
import {Home, ChartCandlestick, BriefcaseBusiness, Settings} from "lucide-react";
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
import { ModeToggle } from "@/components/mode-toggle";

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
    ],
    system: [
        {
            title: "Settings",
            url: "/settings",
            icon: Settings,
        },
    ],
};

export function AppSidebar() {
    return (
        <Sidebar className="border-r border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <SidebarContent className="flex flex-col h-full">
                <SidebarGroupLabel className="text-2xl font-bold px-6 py-10">
                    Trade Pilot
                </SidebarGroupLabel>

                <div className="flex-1 px-3">
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {menuGroups.main.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                                        >
                                            <a href={item.url}>
                                                <item.icon className="h-4 w-4" />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </div>

                <div className="mt-auto border-t border-border/40">
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {menuGroups.system.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                                        >
                                            <a href={item.url}>
                                                <item.icon className="h-4 w-4" />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                    <div className="p-4 flex justify-end">
                        <ModeToggle />
                    </div>
                </div>
            </SidebarContent>
        </Sidebar>
    );
}