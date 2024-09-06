import { httpClient } from '../httpClient'; // Добавлен импорт

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

export class MarketAPI {
  /**
 * Получение текущего тикера для символа.
 * @param {string} symbol - Символ актива.
 * @returns {Promise<TickerResponse>} Текущая цена и символ.
 */
public async getTicker(symbol: string): Promise<TickerResponse> {
  return httpClient.get<TickerResponse>('/api/v1/market/ticker', { symbol });
}

/**
 * Получение истории сделок для символа.
 * @param {string} symbol - Символ актива.
 * @returns {Promise<TradeResponse[]>} Массив данных по сделкам.
 */
public async getTrades(symbol: string): Promise<TradeResponse[]> {
  return httpClient.get<TradeResponse[]>('/api/v1/market/trades', { symbol });
}

/**
 * Получение списка активных инструментов.
 * @returns {Promise<InstrumentResponse[]>} Массив активных инструментов.
 */
public async getInstruments(): Promise<InstrumentResponse[]> {
  return httpClient.get<InstrumentResponse[]>('/api/v1/market/instruments');
}

/**
 * Получение стакана ордеров для символа.
 * @param {string} symbol - Символ актива.
 * @returns {Promise<OrderBookResponse>} Стакан ордеров (цены и объемы).
 */
public async getOrderBook(symbol: string): Promise<OrderBookResponse> {
  return httpClient.get<OrderBookResponse>('/api/v1/market/books', { symbol });
}

/**
 * Получение данных по свечам (candlestick) для символа.
 * @param {string} symbol - Символ актива.
 * @param {string} interval - Интервал свечи (1m, 5m и т.д.).
 * @returns {Promise<CandlestickResponse[]>} Массив данных по свечам.
 */
public async getCandlesticks(symbol: string, interval: string): Promise<CandlestickResponse[]> {
  return httpClient.get<CandlestickResponse[]>('/api/v1/market/candles', { symbol, interval });
}

/**
 * Получение текущего funding rate для символа.
 * @param {string} symbol - Символ актива.
 * @returns {Promise<FundingRateResponse>} Текущий funding rate и символ.
 */
public async getFundingRate(symbol: string): Promise<FundingRateResponse> {
  return httpClient.get<FundingRateResponse>('/api/v1/market/funding-rate', { symbol });
}

/**
 * Получение истории funding rate для символа.
 * @param {string} symbol - Символ актива.
 * @returns {Promise<FundingRateHistoryResponse[]>} Массив данных по истории funding rate.
 */
public async getFundingRateHistory(symbol: string): Promise<FundingRateHistoryResponse[]> {
  return httpClient.get<FundingRateHistoryResponse[]>('/api/v1/market/funding-rate-history', { symbol });
}

/**
 * Получение текущей mark price для символа.
 * @param {string} symbol - Символ актива.
 * @returns {Promise<MarkPriceResponse>} Текущая mark price и время.
 */
public async getMarkPrice(symbol: string): Promise<MarkPriceResponse> {
  return httpClient.get<MarkPriceResponse>('/api/v1/market/mark-price', { symbol });
}

/**
 * Получение данных по всем тикерам.
 * @returns {Promise<TickerInfo[]>} Массив данных по всем тикерам.
 */
public async getAllTickers(): Promise<TickerInfo[]> {
  return httpClient.get<TickerInfo[]>('/api/v1/market/tickers');
}

/**
 * Получение истории сделок для символа.
 * @param {string} symbol - Символ актива.
 * @returns {Promise<TradeHistoryResponse[]>} Массив данных по истории сделок.
 */
public async getTradeHistory(symbol: string): Promise<TradeHistoryResponse[]> {
  return httpClient.get<TradeHistoryResponse[]>('/api/v1/market/trades-history', { symbol });
}

}


export interface InstrumentResponse {
  symbol: string;
  baseAsset: string;
  quoteAsset: string;
  status: string;
}
 
export interface OrderBookResponse {
  bids: [string, string][]; // массив с [цена, количество]
  asks: [string, string][]; // массив с [цена, количество]
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

 

 
 
 
 
 
