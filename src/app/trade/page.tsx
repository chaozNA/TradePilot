"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Clock, Book } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import OptionSearchContainer from "@/components/options/option-search-container";

export default function TradePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto max-w-6xl space-y-6 py-8"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Trade
        </h1>
      </div>

      <Tabs defaultValue="options" className="w-full space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100/50 backdrop-blur-sm dark:bg-gray-800/50">
          <TabsTrigger value="options" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Options
          </TabsTrigger>
          <TabsTrigger value="watchlist" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Watchlist
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <Book className="h-4 w-4" />
            Orders
          </TabsTrigger>
        </TabsList>

        <TabsContent value="options">
          <Card className="border-gray-200 bg-white/50 p-6 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/50">
            <Suspense
              fallback={
                <div className="flex h-32 items-center justify-center">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Loading...
                  </div>
                </div>
              }
            >
              <OptionSearchContainer />
            </Suspense>
          </Card>
        </TabsContent>

        <TabsContent value="watchlist">
          <Card className="border-gray-200 bg-white/50 p-6 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/50">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Watchlist content coming soon...
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card className="border-gray-200 bg-white/50 p-6 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/50">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Orders content coming soon...
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
