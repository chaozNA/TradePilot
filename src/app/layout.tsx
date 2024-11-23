import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import React from "react";
import { ModeToggle } from "@/components/mode-toggle";

export const metadata: Metadata = {
    title: "Trade Pilot",
    description: "Trade Pilot - Your trading assistant",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="flex min-h-screen">
                        <SidebarProvider>
                            <div className="fixed top-4 right-4">
                                <ModeToggle />
                            </div>

                            <div className="flex flex-1">
                                <AppSidebar />
                                <div className="flex-1">
                                    <header>
                                        <div className="flex items-center h-14 px-1">
                                            <SidebarTrigger />
                                            <h1 className="ml-2">Trade Pilot</h1>
                                        </div>
                                    </header>
                                    <main className="container mx-auto p-3 flex-1">
                                        {children}
                                    </main>
                                </div>
                            </div>
                        </SidebarProvider>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
