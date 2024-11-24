import { useState, useEffect } from "react";
import { Portfolio, Position, Activity } from "@/lib/entity/portfolio";

export function usePortfolio() {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [positions, setPositions] = useState<Position[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPortfolioData() {
      try {
        setIsLoading(true);

        // Fetch portfolio overview
        const portfolioResponse = await fetch("/api/portfolio");
        const portfolioData = await portfolioResponse.json();

        // Fetch positions
        const positionsResponse = await fetch("/api/positions");
        const positionsData = await positionsResponse.json();

        // Fetch activities
        const activitiesResponse = await fetch("/api/activities");
        const activitiesData = await activitiesResponse.json();

        setPortfolio(portfolioData);
        setPositions(positionsData);
        setActivities(activitiesData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch portfolio data",
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchPortfolioData();

    // Optional: Set up WebSocket connection for real-time updates
    const ws = new WebSocket("wss://your-websocket-url");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // Update state based on websocket messages
      // You'll need to implement this based on your WebSocket API
    };

    return () => ws.close();
  }, []);

  return {
    portfolio,
    positions,
    activities,
    isLoading,
    error,
  };
}
