import Alpaca from '@alpacahq/alpaca-trade-api';

class AlpacaClient {
    private static instance: Alpaca;

    private constructor() {} // Private constructor to prevent direct instantiation

    public static getInstance(): Alpaca {
        if (!AlpacaClient.instance) {
            AlpacaClient.instance = new Alpaca({
                keyId: process.env.ALPACA_API_KEY!,
                secretKey: process.env.ALPACA_SECRET_KEY!,
                paper: true
            });
        }
        return AlpacaClient.instance;
    }
}

export default AlpacaClient;

