"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { StreamData } from "@/lib/types/alpaca";

export default function SettingsContent() {
  const [ticker, setTicker] = useState<string>("");
  const [connected, setConnected] = useState(false);
  const [liveData, setLiveData] = useState<StreamData[]>([]);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (eventSource) {
      eventSource.close();
      setConnected(false);
      setLiveData([]);
    }

    if (ticker) {
      const newEventSource = new EventSource(`/api/stream?symbol=${ticker}`);

      newEventSource.onopen = () => {
        console.log("Connected to stream");
        setConnected(true);
      };

      newEventSource.onmessage = (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data) as StreamData;
          setLiveData((prev) => [data, ...prev].slice(0, 100));
        } catch (error) {
          console.error("Error parsing message:", error);
        }
      };

      newEventSource.onerror = (error: Event) => {
        console.error("EventSource failed:", error);
        setConnected(false);
        newEventSource.close();
      };

      setEventSource(newEventSource);
    }
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Live Options Data</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          placeholder="Enter ticker symbol"
          className="mr-2 rounded border p-2"
        />
        <Button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white"
          disabled={!ticker}
        >
          {connected ? "Reconnect" : "Connect"}
        </Button>
      </form>

      <div className="mb-4">
        <div className="flex items-center gap-2">
          <div
            className={`h-3 w-3 rounded-full ${connected ? "bg-green-500" : "bg-red-500"}`}
          />
          <span>{connected ? "Connected" : "Disconnected"}</span>
        </div>
      </div>

      {liveData.length > 0 && (
        <div className="mt-4">
          <h2 className="mb-2 text-lg font-semibold">
            Live Updates for {ticker}
          </h2>
          <Textarea
            value={JSON.stringify(liveData, null, 2)}
            readOnly
            className="min-h-[400px] w-full font-mono text-sm"
          />
        </div>
      )}
    </div>
  );
}
