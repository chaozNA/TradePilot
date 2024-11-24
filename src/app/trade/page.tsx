"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import OptionQuoteDto from "@/lib/entity/OptionQuoteDto";
import { Alert } from "@/components/ui/alert";
import OptionChainTable from "@/components/options/option-chain-table";

const Trade = () => {
  const [ticker, setTicker] = useState<string>("");
  const [options, setOptions] = useState<OptionQuoteDto[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`/api/options?ticker=${ticker}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch options for ${ticker}`);
      }
      const data: OptionQuoteDto[] = await response.json();
      setOptions(data);
    } catch (error) {
      setError("Failed to fetch options");
      console.error("Error:", error);
    }
  };

  const handleTickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTicker(e.target.value.toUpperCase());
  };

  return (
    <div className="flex h-full flex-col">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Options Chain</h1>
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={ticker}
                onChange={handleTickerChange}
                placeholder="Enter ticker symbol"
                className="w-[200px] rounded-md border bg-background px-3 py-2"
              />
              <Button type="submit">Find Options</Button>
            </form>
            {error && <Alert variant="destructive">{error}</Alert>}
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-4">
          <OptionChainTable options={options} />
        </div>
      </div>
    </div>
  );
};

export default Trade;
