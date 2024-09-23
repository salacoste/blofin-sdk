import { HttpClient } from '../httpClient';

// Define necessary interfaces
export interface TickerResponse {
  symbol: string;
  price: string;
}

export interface TradeResponse {
  id: number;
  price: string;
  quantity: string;
  timestamp: number;
}

export interface InstrumentResponse {
  symbol: string;
  baseAsset: string;
  quoteAsset: string;
  status: string;
}

export interface OrderBookResponse {
  bids: [string, string][];
  asks: [string, string][];
  timestamp: number;
}

export interface CandlestickResponse {
  openTime: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  closeTime: number;
}

export interface FundingRateResponse {
  symbol: string;
  fundingRate: string;
  nextFundingTime: number;
}

export interface FundingRateHistoryResponse {
  symbol: string;
  fundingRate: string;
  fundingTime: number;
}

export interface MarkPriceResponse {
  symbol: string;
  markPrice: string;
  timestamp: number;
}

export interface TickerInfo {
  symbol: string;
  price: string;
}

export interface TradeHistoryResponse {
  id: number;
  price: string;
  quantity: string;
  timestamp: number;
}

// MarketAPI class utilizing the new HttpClient
export class MarketAPI {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  // Fetch ticker for a specific symbol
  public async getTicker(symbol: string): Promise<TickerResponse> {
    return this.httpClient.get<TickerResponse>('/api/v1/market/ticker', { symbol });
  }

  // Fetch trade history for a specific symbol
  public async getTrades(symbol: string): Promise<TradeResponse[]> {
    return this.httpClient.get<TradeResponse[]>('/api/v1/market/trades', { symbol });
  }

  // Fetch list of all available instruments
  public async getInstruments(): Promise<InstrumentResponse[]> {
    return this.httpClient.get<InstrumentResponse[]>('/api/v1/market/instruments');
  }

  // Fetch order book for a specific symbol
  public async getOrderBook(symbol: string): Promise<OrderBookResponse> {
    return this.httpClient.get<OrderBookResponse>('/api/v1/market/books', { symbol });
  }

  // Fetch candlestick data for a specific symbol and interval
  public async getCandlesticks(symbol: string, interval: string): Promise<CandlestickResponse[]> {
    return this.httpClient.get<CandlestickResponse[]>('/api/v1/market/candles', { symbol, interval });
  }

  // Fetch funding rate for a specific symbol
  public async getFundingRate(symbol: string): Promise<FundingRateResponse> {
    return this.httpClient.get<FundingRateResponse>('/api/v1/market/funding-rate', { symbol });
  }

  // Fetch funding rate history for a specific symbol
  public async getFundingRateHistory(symbol: string): Promise<FundingRateHistoryResponse[]> {
    return this.httpClient.get<FundingRateHistoryResponse[]>('/api/v1/market/funding-rate-history', { symbol });
  }

  // Fetch current mark price for a specific symbol
  public async getMarkPrice(symbol: string): Promise<MarkPriceResponse> {
    return this.httpClient.get<MarkPriceResponse>('/api/v1/market/mark-price', { symbol });
  }

  // Fetch all tickers
  public async getAllTickers(): Promise<TickerInfo[]> {
    return this.httpClient.get<TickerInfo[]>('/api/v1/market/tickers');
  }

  // Fetch trade history for a specific symbol
  public async getTradeHistory(symbol: string): Promise<TradeHistoryResponse[]> {
    return this.httpClient.get<TradeHistoryResponse[]>('/api/v1/market/trades-history', { symbol });
  }
}
