export interface WebSocketMessage {
  event?: string;
  arg?: {
    channel: string;
    instId?: string;
  };
  data?: any;
}

export interface TradeMessage extends WebSocketMessage {
  data: {
    instId: string;
    tradeId: string;
    price: string;
    size: string;
    side: 'buy' | 'sell';
    ts: string;
  }[];
}

export interface OrderBookMessage extends WebSocketMessage {
  data: {
    asks: [string, string][];
    bids: [string, string][];
    ts: string;
  };
}

// Add more interfaces for other message types
