"use client";

import { useState } from "react";
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
import { AlertCircle, CheckCircle2, Loader2, XCircle } from "lucide-react";
import logger from "@/lib/utils/logger";

type ConnectionStatus = "disconnected" | "connecting" | "connected";

export default function SettingsPage() {
  const [ticker, setTicker] = useState("");
  const [status, setStatus] = useState<ConnectionStatus>("disconnected");
  const [error, setError] = useState<string | null>(null);
  const [liveData, setLiveData] = useState<StreamData[]>([]);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);

  const handleConnect = () => {
    if (!ticker) {
      setError("Please enter a ticker symbol");
      return;
    }

    handleDisconnect();
    setStatus("connecting");
    setError(null);

    const source = new EventSource(`/api/stream?symbol=${ticker}`);

    source.onopen = () => {
      setStatus("connected");
      setError(null);
    };

    source.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as StreamData;
        setLiveData((prev) => [data, ...prev].slice(0, 100));
      } catch (error) {
        logger.error("Error parsing message:", error);
      }
    };

    source.onerror = () => {
      setError("Connection error occurred");
      setStatus("disconnected");
      source.close();
    };

    setEventSource(source);
  };

  const handleDisconnect = () => {
    eventSource?.close();
    setEventSource(null);
    setStatus("disconnected");
    setLiveData([]);
    setError(null);
  };

  const renderQuoteTable = () => (
    <Card>
      <CardHeader>
        <CardTitle>Live Quote Feed</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Bid Exchange</TableHead>
                <TableHead>Bid Price</TableHead>
                <TableHead>Bid Size</TableHead>
                <TableHead>Ask Exchange</TableHead>
                <TableHead>Ask Price</TableHead>
                <TableHead>Ask Size</TableHead>
                <TableHead>Condition</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {liveData.map(({ type, timestamp, data }) => (
                <TableRow key={timestamp}>
                  <TableCell>
                    {new Date(timestamp).toLocaleTimeString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={type === "error" ? "destructive" : "outline"}
                    >
                      {type}
                    </Badge>
                  </TableCell>
                  <TableCell>{data.BidExchange}</TableCell>
                  <TableCell>${data.BidPrice.toFixed(2)}</TableCell>
                  <TableCell>{data.BidSize}</TableCell>
                  <TableCell>{data.AskExchange}</TableCell>
                  <TableCell>${data.AskPrice.toFixed(2)}</TableCell>
                  <TableCell>{data.AskSize}</TableCell>
                  <TableCell>{data.Condition}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto space-y-6 py-6">
      <Card>
        <CardHeader>
          <CardTitle>Live Market Data Stream</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Input
              type="text"
              placeholder="Enter option symbol"
              value={ticker}
              onChange={(e) => setTicker(e.target.value.toUpperCase())}
              className="max-w-[300px]"
              disabled={status !== "disconnected"}
            />
            <Button
              onClick={
                status === "connected" ? handleDisconnect : handleConnect
              }
              variant={status === "connected" ? "destructive" : "default"}
              disabled={
                status === "connecting" ||
                (!ticker && status === "disconnected")
              }
            >
              {status === "connected" ? "Disconnect" : "Connect"}
            </Button>
            <div className="flex items-center space-x-2">
              {status === "connected" ? (
                <>
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-green-500">Connected</span>
                </>
              ) : status === "connecting" ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin text-yellow-500" />
                  <span className="text-sm text-yellow-500">Connecting...</span>
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

      {liveData.length > 0 && renderQuoteTable()}
    </div>
  );
}
