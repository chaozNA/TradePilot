"use client"; // Add this since we're using motion

import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { usePortfolio } from "@/hooks/use-portfolio";
import { PortfolioOverview } from "@/components/portfolio/portfolio-overview";
import { PositionsList } from "@/components/portfolio/positions-list";
import { RecentActivity } from "@/components/portfolio/recent-activity";

export default function PortfolioPage() {
  const { portfolio, positions, activities, isLoading, error } = usePortfolio();

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <Card className="m-4 bg-red-100 p-6 text-red-600 shadow-lg">
          <div>Error loading portfolio: {error}</div>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-full flex-1 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Add null check for portfolio
  if (!portfolio) {
    return (
      <div className="flex h-full items-center justify-center">
        <Card className="m-4 bg-gray-100 p-6 text-gray-500 shadow-lg">
          <div>No portfolio data available</div>
        </Card>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="portfolio-page"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="container mx-auto space-y-6 p-4"
      >
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
          Portfolio
        </h1>
        <PortfolioOverview portfolio={portfolio} />

        <Tabs defaultValue="positions" className="w-full">
          <TabsList className="border-b border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
            <TabsTrigger
              value="positions"
              className="text-gray-700 transition-colors duration-200 hover:text-primary dark:text-gray-300"
            >
              Positions
            </TabsTrigger>
            <TabsTrigger
              value="activity"
              className="text-gray-700 transition-colors duration-200 hover:text-primary dark:text-gray-300"
            >
              Recent Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="positions">
            <PositionsList positions={positions} />
          </TabsContent>

          <TabsContent value="activity">
            <RecentActivity activities={activities} />
          </TabsContent>
        </Tabs>
      </motion.div>
    </AnimatePresence>
  );
}
