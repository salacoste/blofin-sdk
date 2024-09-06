import { MarketAPI } from '../market';
import { httpClient } from '../../httpClient';

jest.mock('../../httpClient');

describe('MarketAPI', () => {
  const marketAPI = new MarketAPI();

  it('should fetch ticker data', async () => {
    const mockResponse = { symbol: 'BTCUSDT', price: '50000' };
    (httpClient.get as jest.Mock).mockResolvedValue(mockResponse);

    const response = await marketAPI.getTicker('BTCUSDT');
    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/market/ticker', { symbol: 'BTCUSDT' });
    expect(response).toEqual(mockResponse);
  });

  it('should fetch trade history', async () => {
    const mockResponse = [{ id: 123, price: '50000', quantity: '1', timestamp: 1633024800000 }];
    (httpClient.get as jest.Mock).mockResolvedValue(mockResponse);

    const response = await marketAPI.getTradeHistory('BTCUSDT');
    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/market/trades-history', { symbol: 'BTCUSDT' });
    expect(response).toEqual(mockResponse);
  });

  it('should fetch instruments', async () => {
    const mockResponse = [{ symbol: 'BTCUSDT', baseAsset: 'BTC', quoteAsset: 'USDT', status: 'active' }];
    (httpClient.get as jest.Mock).mockResolvedValue(mockResponse);

    const response = await marketAPI.getInstruments();
    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/market/instruments');
    expect(response).toEqual(mockResponse);
  });

  it('should fetch order book', async () => {
    const mockResponse = {
      bids: [['50000', '1']],
      asks: [['50010', '1']],
      timestamp: 1633024800000
    };
    (httpClient.get as jest.Mock).mockResolvedValue(mockResponse);

    const response = await marketAPI.getOrderBook('BTCUSDT');
    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/market/books', { symbol: 'BTCUSDT' });
    expect(response).toEqual(mockResponse);
  });

  it('should fetch candlesticks', async () => {
    const mockResponse = [
      {
        openTime: 1633024800000,
        open: '50000',
        high: '51000',
        low: '49000',
        close: '50500',
        volume: '100',
        closeTime: 1633034800000
      }
    ];
    (httpClient.get as jest.Mock).mockResolvedValue(mockResponse);

    const response = await marketAPI.getCandlesticks('BTCUSDT', '1h');
    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/market/candles', {
      symbol: 'BTCUSDT',
      interval: '1h'
    });
    expect(response).toEqual(mockResponse);
  });

  it('should fetch funding rate', async () => {
    const mockResponse = { symbol: 'BTCUSDT', fundingRate: '0.01', nextFundingTime: 1633034800000 };
    (httpClient.get as jest.Mock).mockResolvedValue(mockResponse);

    const response = await marketAPI.getFundingRate('BTCUSDT');
    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/market/funding-rate', { symbol: 'BTCUSDT' });
    expect(response).toEqual(mockResponse);
  });

  it('should fetch funding rate history', async () => {
    const mockResponse = [{ symbol: 'BTCUSDT', fundingRate: '0.01', fundingTime: 1633024800000 }];
    (httpClient.get as jest.Mock).mockResolvedValue(mockResponse);

    const response = await marketAPI.getFundingRateHistory('BTCUSDT');
    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/market/funding-rate-history', { symbol: 'BTCUSDT' });
    expect(response).toEqual(mockResponse);
  });

  it('should fetch mark price', async () => {
    const mockResponse = { symbol: 'BTCUSDT', markPrice: '50000', timestamp: 1633024800000 };
    (httpClient.get as jest.Mock).mockResolvedValue(mockResponse);

    const response = await marketAPI.getMarkPrice('BTCUSDT');
    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/market/mark-price', { symbol: 'BTCUSDT' });
    expect(response).toEqual(mockResponse);
  });

  it('should fetch all tickers', async () => {
    const mockResponse = [{ symbol: 'BTCUSDT', price: '50000' }];
    (httpClient.get as jest.Mock).mockResolvedValue(mockResponse);

    const response = await marketAPI.getAllTickers();
    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/market/tickers');
    expect(response).toEqual(mockResponse);
  });
});
