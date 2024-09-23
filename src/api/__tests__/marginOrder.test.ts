import { MarginOrderAPI, MarginOrderRequest, MarginOrderResponse } from '../marginOrder';
import { HttpClient } from '../../httpClient';

jest.mock('../../httpClient');

describe('MarginOrderAPI', () => {
  let httpClient: jest.Mocked<HttpClient>;
  let marginOrderAPI: MarginOrderAPI;

  beforeEach(() => {
    httpClient = new HttpClient('mockApiKey', 'mockSecret') as jest.Mocked<HttpClient>;
    marginOrderAPI = new MarginOrderAPI(httpClient);
  });

  it('should create a margin order successfully', async () => {
    const orderRequest: MarginOrderRequest = {
      symbol: 'BTCUSD',
      side: 'buy',
      type: 'limit',
      quantity: '1',
      price: '50000'
    };

    const orderResponse: MarginOrderResponse = {
      orderId: '12345',
      status: 'created'
    };

    httpClient.post = jest.fn().mockResolvedValue(orderResponse);

    const result = await marginOrderAPI.createMarginOrder(orderRequest);

    expect(httpClient.post).toHaveBeenCalledWith('/api/v1/order/margin', orderRequest);
    expect(result).toEqual(orderResponse);
  });

  it('should handle error when creating a margin order', async () => {
    const orderRequest: MarginOrderRequest = {
      symbol: 'BTCUSD',
      side: 'buy',
      type: 'limit',
      quantity: '1',
      price: '50000'
    };

    const errorMessage = 'Network Error';
    httpClient.post = jest.fn().mockRejectedValue(new Error(errorMessage));

    await expect(marginOrderAPI.createMarginOrder(orderRequest)).rejects.toThrow(errorMessage);
    expect(httpClient.post).toHaveBeenCalledWith('/api/v1/order/margin', orderRequest);
  });
});