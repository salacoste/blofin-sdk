import { OrderAPI } from '../order';
import { httpClient } from '../../httpClient';

jest.mock('../../httpClient');

describe('OrderAPI', () => {
  const orderAPI = new OrderAPI();

  it('should create an order', async () => {
    const mockRequest = { symbol: 'BTCUSDT', side: 'buy' as const, type: 'limit' as const, quantity: '1', price: '50000' };
    const mockResponse = { orderId: '123', status: 'open' };
    (httpClient.post as jest.Mock).mockResolvedValue(mockResponse);

    const response = await orderAPI.createOrder(mockRequest);
    expect(httpClient.post).toHaveBeenCalledWith('/api/v1/order', mockRequest);
    expect(response).toEqual(mockResponse);
  });

  it('should fetch open orders', async () => {
    const mockResponse = [{ orderId: '123', symbol: 'BTCUSDT', status: 'open' }];
    (httpClient.get as jest.Mock).mockResolvedValue(mockResponse);

    const response = await orderAPI.getOpenOrders();
    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/order/open');
    expect(response).toEqual(mockResponse);
  });

  it('should fetch order history', async () => {
    const mockResponse = [
      { orderId: '123', symbol: 'BTCUSDT', status: 'closed', executedQty: '1', price: '50000', time: 1633024800000 }
    ];
    (httpClient.get as jest.Mock).mockResolvedValue(mockResponse);

    const response = await orderAPI.getOrderHistory();
    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/order/history');
    expect(response).toEqual(mockResponse);
  });
});
