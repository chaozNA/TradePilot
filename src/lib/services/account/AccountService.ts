import AlpacaClient from "@/lib/AlpacaClient";
import { logger } from "@/lib/utils/logger";

export async function getAccount() {
  try {
    const client = AlpacaClient.getInstance();
    const account = await client.getAccount();
    console.log("Raw Account Response:", account);

    if (!account) {
      throw new Error("No account data received");
    }

    return account;
  } catch (error) {
    logger.error("Error fetching account:", error);
    throw error;
  }
}

export async function getPositions() {
  const client = AlpacaClient.getInstance();
  const positions = await client.getPositions();
  console.log("Positions:", positions);
  return positions;
}
