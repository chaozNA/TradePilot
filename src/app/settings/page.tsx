"use client";

import { useState, useEffect } from "react";
import { StreamData } from "@/lib/types/alpaca";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";

export default function SettingsContent() {
  const [ticker, setTicker] = useState<string>("");
  const [connected, setConnected] = useState<boolean>(false);
  const [liveData, setLiveData] = useState<StreamData[]>([]);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [eventSource]);

  const handleConnect = () => {
    if (!ticker) {
      setError("Please enter a ticker symbol");
      return;
    }

    // Close existing connection if any
    if (eventSource) {
      eventSource.close();
    }

    setError(null);
    const newEventSource = new EventSource(`/api/stream?symbol=${ticker}`);

    newEventSource.onopen = () => {
      console.log(`Connected to live updates for ${ticker}`);
      setConnected(true);
    };

    newEventSource.onmessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data) as StreamData;
        setLiveData((prev) => [data, ...prev].slice(0, 100));
      } catch (error) {
        console.error("Error parsing message:", error);
        setError("Error parsing data from server");
      }
    };

    newEventSource.onerror = (event) => {
      console.error("EventSource error:", event);
      setError("Connection error occurred");
      setConnected(false);
      newEventSource.close();
    };

    setEventSource(newEventSource);
  };

  const handleDisconnect = () => {
    if (eventSource) {
      eventSource.close();
      setEventSource(null);
    }
    setConnected(false);
    setLiveData([]);
    setError(null);
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const renderDataRow = (data: StreamData) => {
    switch (data.type) {
      case "quote":
        return (
          <TableRow key={data.timestamp}>
            <TableCell>{formatTimestamp(data.timestamp)}</TableCell>
            <TableCell>
              <Badge variant="outline">Quote</Badge>
            </TableCell>
            <TableCell>${data.data.BidPrice}</TableCell>
            <TableCell>${data.data.AskPrice}</TableCell>
            <TableCell>{data.data.BidSize}</TableCell>
            <TableCell>{data.data.AskSize}</TableCell>
          </TableRow>
        );
      case "trade":
        return (
          <TableRow key={data.timestamp}>
            <TableCell>{formatTimestamp(data.timestamp)}</TableCell>
            <TableCell>
              <Badge>Trade</Badge>
            </TableCell>
            <TableCell colSpan={2}>${data.data.Price}</TableCell>
            <TableCell colSpan={2}>{data.data.Size}</TableCell>
          </TableRow>
        );
      case "error":
        return (
          <TableRow key={data.timestamp}>
            <TableCell>{formatTimestamp(data.timestamp)}</TableCell>
            <TableCell>
              <Badge variant="destructive">Error</Badge>
            </TableCell>
            <TableCell colSpan={4}>{data.data}</TableCell>
          </TableRow>
        );
    }
  };

  return (
    <div className="container mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Live Market Data Stream</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Input
              type="text"
              placeholder="Enter ticker symbol"
              value={ticker}
              onChange={(e) => setTicker(e.target.value.toUpperCase())}
              className="max-w-[200px]"
              disabled={connected}
            />
            {!connected ? (
              <Button onClick={handleConnect} disabled={!ticker}>
                Connect
              </Button>
            ) : (
              <Button onClick={handleDisconnect} variant="destructive">
                Disconnect
              </Button>
            )}
            <div className="flex items-center space-x-2">
              {connected ? (
                <>
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-green-500">Connected</span>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-red-500" />
                  <span className="text-sm text-red-500">Disconnected</span>
                </>
              )}
            </div>
          </div>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          )}
        </CardContent>
      </Card>

      {liveData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Live Data Feed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Bid Price</TableHead>
                    <TableHead>Ask Price</TableHead>
                    <TableHead>Bid Size</TableHead>
                    <TableHead>Ask Size</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {liveData.map((data) => renderDataRow(data))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
