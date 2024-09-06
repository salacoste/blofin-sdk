import { TpslOrderAPI } from '../tpslOrders';
import { httpClient } from '../../httpClient';

jest.mock('../../httpClient');

describe('TpslOrderAPI', () => {
  const tpslOrderAPI = new TpslOrderAPI();

  it('should place a TP/SL order', async () => {
    const mockRequest = { symbol: 'BTCUSDT', side: 'buy' as const, stopPrice: '48000', takeProfitPrice: '52000' };
    (httpClient.post as jest.Mock).mockResolvedValue(undefined);

    await tpslOrderAPI.placeTpslOrder(mockRequest);
    expect(httpClient.post).toHaveBeenCalledWith('/api/v1/trade/order-tpsl', mockRequest);
  });

  it('should cancel a TP/SL order', async () => {
    const mockRequest = { symbol: 'BTCUSDT', orderId: '123' };
    (httpClient.post as jest.Mock).mockResolvedValue(undefined);

    await tpslOrderAPI.cancelTpslOrder(mockRequest);
    expect(httpClient.post).toHaveBeenCalledWith('/api/v1/trade/cancel-tpsl', mockRequest);
  });

  it('should fetch TP/SL order history', async () => {
    const mockResponse = [
      { orderId: '123', symbol: 'BTCUSDT', status: 'closed', stopPrice: '48000', takeProfitPrice: '52000', timestamp: 1633024800000 }
    ];
    (httpClient.get as jest.Mock).mockResolvedValue(mockResponse);

    const response = await tpslOrderAPI.getTpslOrderHistory();
    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/trade/tpsl-order-history');
    expect(response).toEqual(mockResponse);
  });
});
