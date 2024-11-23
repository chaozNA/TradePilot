import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/nav/app-sidebar";
import React from "react";
import { ModeToggle } from "@/components/nav/mode-toggle";
import { cookies } from "next/headers"
import BreadcrumbNav from "@/components/nav/breadcrumb-nav"

export const metadata: Metadata = {
    title: "Trade Pilot",
    description: "Trade Pilot - Your trading assistant",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

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
                        <SidebarProvider defaultOpen={defaultOpen}>
                            <div className="fixed top-4 right-4">
                                <ModeToggle />
                            </div>

                            <div className="flex flex-1">
                                <AppSidebar />
                                <div className="flex-1">
                                    <header>
                                        <div className="flex items-center h-14 px-1">
                                            <SidebarTrigger />
                                            <BreadcrumbNav />
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