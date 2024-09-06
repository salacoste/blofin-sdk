import { TradeAPI } from '../trade';
import { httpClient } from '../../httpClient';

jest.mock('../../httpClient');

describe('TradeAPI', () => {
  const tradeAPI = new TradeAPI();

  it('should place batch orders', async () => {
    const mockRequest = [
      { symbol: 'BTCUSDT', side: 'buy' as const, type: 'limit' as const, quantity: '1', price: '50000' }
    ];
    (httpClient.post as jest.Mock).mockResolvedValue(undefined);

    await tradeAPI.placeBatchOrders(mockRequest);
    expect(httpClient.post).toHaveBeenCalledWith('/api/v1/trade/batch-orders', { orders: mockRequest });
  });

  it('should cancel an order', async () => {
    const mockRequest = { orderId: '123', symbol: 'BTCUSDT' };
    (httpClient.post as jest.Mock).mockResolvedValue(undefined);

    await tradeAPI.cancelOrder(mockRequest);
    expect(httpClient.post).toHaveBeenCalledWith('/api/v1/trade/cancel-order', mockRequest);
  });

  it('should cancel batch orders', async () => {
    const mockRequest = 'BTCUSDT';
    (httpClient.post as jest.Mock).mockResolvedValue(undefined);

    await tradeAPI.cancelBatchOrders(mockRequest);
    expect(httpClient.post).toHaveBeenCalledWith('/api/v1/trade/cancel-batch-orders', { symbol: mockRequest });
  });

  it('should fetch active orders', async () => {
    const mockResponse = [{ orderId: '123', symbol: 'BTCUSDT', status: 'open', price: '50000', quantity: '1' }];
    (httpClient.get as jest.Mock).mockResolvedValue(mockResponse);

    const response = await tradeAPI.getActiveOrders('BTCUSDT');
    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/trade/orders-pending', { symbol: 'BTCUSDT' });
    expect(response).toEqual(mockResponse);
  });
});
