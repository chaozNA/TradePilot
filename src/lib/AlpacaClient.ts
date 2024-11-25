import Alpaca from "@alpacahq/alpaca-trade-api";
import { AlpacaOptionClient } from "@alpacahq/alpaca-trade-api/dist/resources/datav2/option_websocket_v1beta1";
import { AlpacaStocksClient } from "@alpacahq/alpaca-trade-api/dist/resources/datav2/stock_websocket_v2";

class AlpacaClient {
  private static instance: Alpaca;

  private constructor() {}

  public static getInstance(): Alpaca {
    if (!AlpacaClient.instance) {
      AlpacaClient.instance = new Alpaca({
        keyId: process.env.ALPACA_API_KEY!,
        secretKey: process.env.ALPACA_SECRET_KEY!,
        paper: true,
      });
    }
    return AlpacaClient.instance;
  }
}

export default AlpacaClient;
