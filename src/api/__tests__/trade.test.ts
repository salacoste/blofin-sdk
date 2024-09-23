import { TradeAPI, BatchOrderRequest, CancelOrderRequest, ActiveOrderResponse } from '../trade';
import { HttpClient } from '../../httpClient';

jest.mock('../../httpClient');

describe('TradeAPI', () => {
  let httpClient: jest.Mocked<HttpClient>;
  let tradeAPI: TradeAPI;

  beforeEach(() => {
    httpClient = new HttpClient('mockApiKey', 'mockSecret') as jest.Mocked<HttpClient>;
    tradeAPI = new TradeAPI(httpClient);
  });

  it('should place batch orders', async () => {
    const orders: BatchOrderRequest[] = [
      { symbol: 'BTCUSD', side: 'buy', type: 'limit', quantity: '1', price: '50000' },
      { symbol: 'ETHUSD', side: 'sell', type: 'market', quantity: '2' }
    ];

    httpClient.post = jest.fn().mockResolvedValue(undefined);

    await tradeAPI.placeBatchOrders(orders);

    expect(httpClient.post).toHaveBeenCalledWith('/api/v1/trade/batch-orders', { orders });
  });

  it('should cancel an order', async () => {
    const request: CancelOrderRequest = { orderId: '12345', symbol: 'BTCUSD' };

    httpClient.post = jest.fn().mockResolvedValue(undefined);

    await tradeAPI.cancelOrder(request);

    expect(httpClient.post).toHaveBeenCalledWith('/api/v1/trade/cancel-order', request);
  });

  it('should cancel batch orders', async () => {
    const symbol = 'BTCUSD';

    httpClient.post = jest.fn().mockResolvedValue(undefined);

    await tradeAPI.cancelBatchOrders(symbol);

    expect(httpClient.post).toHaveBeenCalledWith('/api/v1/trade/cancel-batch-orders', { symbol });
  });

  it('should get active orders', async () => {
    const symbol = 'BTCUSD';
    const activeOrders: ActiveOrderResponse[] = [
      { orderId: '12345', symbol: 'BTCUSD', status: 'open', price: '50000', quantity: '1' }
    ];
    httpClient.get = jest.fn().mockResolvedValue(activeOrders);

    const result = await tradeAPI.getActiveOrders(symbol);

    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/trade/orders-pending', { symbol });
    expect(result).toEqual(activeOrders);
  });
});