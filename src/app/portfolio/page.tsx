'use client'
import React from 'react';
import { PortfolioOverview } from '@/components/portfolio/portfolio-overview';
import { PositionsList } from '@/components/portfolio/positions-list';
import { RecentActivity } from '@/components/portfolio/recent-activity';
import { usePortfolio } from '@/hooks/use-portfolio';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from 'lucide-react';
import { Card } from "@/components/ui/card";

export default function PortfolioPage() {
    const {
        portfolio,
        positions,
        activities,
        isLoading,
        error
    } = usePortfolio();

    if (error) {
        return (
            <Card className="m-4 p-6">
                <div className="text-red-500">Error loading portfolio: {error}</div>
            </Card>
        );
    }

    if (isLoading) {
        return (
            <div className="flex-1 flex items-center justify-end">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    // Add null check for portfolio
    if (!portfolio) {
        return (
            <Card className="m-4 p-6">
                <div className="text-muted-foreground">No portfolio data available</div>
            </Card>
        );
    }

    return (
        <div className="container mx-auto p-4 space-y-6">
            <h1 className="text-3xl font-bold">Portfolio</h1>
            <PortfolioOverview portfolio={portfolio} />

            <Tabs defaultValue="positions" className="w-full">
                <TabsList>
                    <TabsTrigger value="positions">Positions</TabsTrigger>
                    <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                </TabsList>

                <TabsContent value="positions">
                    <PositionsList positions={positions} />
                </TabsContent>

                <TabsContent value="activity">
                    <RecentActivity activities={activities} />
                </TabsContent>
            </Tabs>
        </div>
    );
}