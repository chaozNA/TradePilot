"use client";

import { useState, useEffect, startTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface OptionSearchProps {
  onSubmit: (formData: FormData) => void;
  disabled?: boolean;
}

const MAX_RECENT_SEARCHES = 5;

export default function OptionSearch({
  onSubmit,
  disabled,
}: OptionSearchProps) {
  const [ticker, setTicker] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!ticker) return;

    // Update recent searches
    const newSearches = [
      ticker,
      ...recentSearches.filter((s) => s !== ticker),
    ].slice(0, MAX_RECENT_SEARCHES);

    setRecentSearches(newSearches);
    localStorage.setItem("recentSearches", JSON.stringify(newSearches));

    // Create and submit form data
    const formData = new FormData();
    formData.append("ticker", ticker);
    startTransition(() => {
      onSubmit(formData);
    });
  };

  const handleRecentSearch = (search: string) => {
    setTicker(search);
    const formData = new FormData();
    formData.append("ticker", search);
    startTransition(() => {
      onSubmit(formData);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          <Input
            name="ticker"
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            placeholder="Enter stock symbol (e.g., AAPL)"
            className="h-11 bg-white/60 pl-10 backdrop-blur-sm dark:bg-gray-900/60"
            autoComplete="off"
          />
        </div>
        <Button
          type="submit"
          disabled={disabled}
          className="h-11 bg-gradient-to-r from-blue-600 to-blue-700 px-6 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600"
        >
          Search Options
        </Button>
      </form>

      {recentSearches.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {recentSearches.map((search) => (
            <Button
              key={search}
              variant="outline"
              size="sm"
              onClick={() => handleRecentSearch(search)}
              className="flex items-center gap-2"
            >
              <Clock className="h-3 w-3" />
              {search}
            </Button>
          ))}
        </div>
      )}
    </motion.div>
  );
}
