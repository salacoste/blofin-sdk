import { OrderAPI, OrderRequest, OrderResponse, OpenOrderResponse, OrderHistoryResponse } from '../order';
import { HttpClient } from '../../httpClient';

jest.mock('../../httpClient');

describe('OrderAPI', () => {
  let httpClient: jest.Mocked<HttpClient>;
  let orderAPI: OrderAPI;

  beforeEach(() => {
    httpClient = new HttpClient('mockApiKey', 'mockSecret') as jest.Mocked<HttpClient>;
    orderAPI = new OrderAPI(httpClient);
  });

  describe('createOrder', () => {
    it('should create an order and return the response', async () => {
      const orderRequest: OrderRequest = {
        symbol: 'BTCUSD',
        side: 'buy',
        type: 'limit',
        quantity: '1',
        price: '50000',
      };

      const orderResponse: OrderResponse = {
        orderId: '12345',
        status: 'created',
      };

      httpClient.post = jest.fn().mockResolvedValue(orderResponse);

      const result = await orderAPI.createOrder(orderRequest);

      expect(httpClient.post).toHaveBeenCalledWith('/api/v1/order', orderRequest);
      expect(result).toEqual(orderResponse);
    });
  });

  describe('getOpenOrders', () => {
    it('should return a list of open orders', async () => {
      const openOrdersResponse: OpenOrderResponse[] = [
        { orderId: '12345', symbol: 'BTCUSD', status: 'open' },
        { orderId: '67890', symbol: 'ETHUSD', status: 'open' },
      ];

      httpClient.get = jest.fn().mockResolvedValue(openOrdersResponse);

      const result = await orderAPI.getOpenOrders();

      expect(httpClient.get).toHaveBeenCalledWith('/api/v1/order/open');
      expect(result).toEqual(openOrdersResponse);
    });
  });

  describe('getOrderHistory', () => {
    it('should return a list of order history', async () => {
      const orderHistoryResponse: OrderHistoryResponse[] = [
        { orderId: '12345', symbol: 'BTCUSD', status: 'filled', executedQty: '1', price: '50000', time: 1620000000000 },
        { orderId: '67890', symbol: 'ETHUSD', status: 'filled', executedQty: '2', price: '2500', time: 1620000000001 },
      ];

      httpClient.get = jest.fn().mockResolvedValue(orderHistoryResponse);

      const result = await orderAPI.getOrderHistory();

      expect(httpClient.get).toHaveBeenCalledWith('/api/v1/order/history');
      expect(result).toEqual(orderHistoryResponse);
    });
  });
});