import { MarketAPI } from '../market';
import { HttpClient } from '../../httpClient';

jest.mock('../../httpClient');

describe('MarketAPI', () => {
  let httpClient: jest.Mocked<HttpClient>;
  let marketAPI: MarketAPI;

  beforeEach(() => {
    httpClient = new HttpClient('mockApiKey', 'mockSecret') as jest.Mocked<HttpClient>;
    marketAPI = new MarketAPI(httpClient);
  });

  it('should fetch ticker for a specific symbol', async () => {
    const mockResponse = { symbol: 'BTCUSD', price: '50000' };
    httpClient.get = jest.fn().mockResolvedValue(mockResponse);

    const result = await marketAPI.getTicker('BTCUSD');

    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/market/ticker', { symbol: 'BTCUSD' });
    expect(result).toEqual(mockResponse);
  });

  it('should fetch trade history for a specific symbol', async () => {
    const mockResponse = [{ id: 1, price: '50000', quantity: '0.1', timestamp: 1620000000 }];
    httpClient.get = jest.fn().mockResolvedValue(mockResponse);

    const result = await marketAPI.getTrades('BTCUSD');

    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/market/trades', { symbol: 'BTCUSD' });
    expect(result).toEqual(mockResponse);
  });

  it('should fetch list of all available instruments', async () => {
    const mockResponse = [{ symbol: 'BTCUSD', baseAsset: 'BTC', quoteAsset: 'USD', status: 'active' }];
    httpClient.get = jest.fn().mockResolvedValue(mockResponse);

    const result = await marketAPI.getInstruments();

    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/market/instruments');
    expect(result).toEqual(mockResponse);
  });

  it('should fetch order book for a specific symbol', async () => {
    const mockResponse = { bids: [['50000', '1']], asks: [['51000', '1']], timestamp: 1620000000 };
    httpClient.get = jest.fn().mockResolvedValue(mockResponse);

    const result = await marketAPI.getOrderBook('BTCUSD');

    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/market/books', { symbol: 'BTCUSD' });
    expect(result).toEqual(mockResponse);
  });

  it('should fetch candlestick data for a specific symbol and interval', async () => {
    const mockResponse = [{ openTime: 1620000000, open: '50000', high: '51000', low: '49000', close: '50500', volume: '100', closeTime: 1620003600 }];
    httpClient.get = jest.fn().mockResolvedValue(mockResponse);

    const result = await marketAPI.getCandlesticks('BTCUSD', '1h');

    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/market/candles', { symbol: 'BTCUSD', interval: '1h' });
    expect(result).toEqual(mockResponse);
  });

  it('should fetch funding rate for a specific symbol', async () => {
    const mockResponse = { symbol: 'BTCUSD', fundingRate: '0.01', nextFundingTime: 1620007200 };
    httpClient.get = jest.fn().mockResolvedValue(mockResponse);

    const result = await marketAPI.getFundingRate('BTCUSD');

    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/market/funding-rate', { symbol: 'BTCUSD' });
    expect(result).toEqual(mockResponse);
  });

  it('should fetch funding rate history for a specific symbol', async () => {
    const mockResponse = [{ symbol: 'BTCUSD', fundingRate: '0.01', fundingTime: 1620000000 }];
    httpClient.get = jest.fn().mockResolvedValue(mockResponse);

    const result = await marketAPI.getFundingRateHistory('BTCUSD');

    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/market/funding-rate-history', { symbol: 'BTCUSD' });
    expect(result).toEqual(mockResponse);
  });

  it('should fetch current mark price for a specific symbol', async () => {
    const mockResponse = { symbol: 'BTCUSD', markPrice: '50500', timestamp: 1620000000 };
    httpClient.get = jest.fn().mockResolvedValue(mockResponse);

    const result = await marketAPI.getMarkPrice('BTCUSD');

    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/market/mark-price', { symbol: 'BTCUSD' });
    expect(result).toEqual(mockResponse);
  });

  it('should fetch all tickers', async () => {
    const mockResponse = [{ symbol: 'BTCUSD', price: '50500' }];
    httpClient.get = jest.fn().mockResolvedValue(mockResponse);

    const result = await marketAPI.getAllTickers();

    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/market/tickers');
    expect(result).toEqual(mockResponse);
  });

  it('should fetch trade history for a specific symbol', async () => {
    const mockResponse = [{ id: 1, price: '50000', quantity: '0.1', timestamp: 1620000000 }];
    httpClient.get = jest.fn().mockResolvedValue(mockResponse);

    const result = await marketAPI.getTradeHistory('BTCUSD');

    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/market/trades-history', { symbol: 'BTCUSD' });
    expect(result).toEqual(mockResponse);
  });
});