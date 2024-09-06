import { MarginOrderAPI } from '../marginOrder';
import { httpClient } from '../../httpClient';

jest.mock('../../httpClient');

describe('MarginOrderAPI', () => {
  const marginOrderAPI = new MarginOrderAPI();

  it('should create a margin order', async () => {
    const mockRequest = { symbol: 'BTCUSDT', side: 'buy' as const, type: 'limit' as const, quantity: '1', price: '50000' };
    const mockResponse = { orderId: '123', status: 'open' };
    (httpClient.post as jest.Mock).mockResolvedValue(mockResponse);

    const response = await marginOrderAPI.createMarginOrder(mockRequest);
    expect(httpClient.post).toHaveBeenCalledWith('/api/v1/order/margin', mockRequest);
    expect(response).toEqual(mockResponse);
  });
});
