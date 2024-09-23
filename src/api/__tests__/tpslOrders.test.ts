import { TpslOrderAPI, TpslOrderRequest, CancelTpslOrderRequest, TpslOrderHistoryResponse } from '../tpslOrders';
import { HttpClient } from '../../httpClient';

jest.mock('../../httpClient');

describe('TpslOrderAPI', () => {
  let httpClient: jest.Mocked<HttpClient>;
  let tpslOrderAPI: TpslOrderAPI;

  beforeEach(() => {
    httpClient = new HttpClient('mockApiKey', 'mockSecret') as jest.Mocked<HttpClient>;
    tpslOrderAPI = new TpslOrderAPI(httpClient);
  });

  describe('placeTpslOrder', () => {
    it('should place a TPSL order', async () => {
      const request: TpslOrderRequest = {
        symbol: 'BTCUSD',
        side: 'buy',
        stopPrice: '50000',
        takeProfitPrice: '60000'
      };

      httpClient.post = jest.fn().mockResolvedValue(undefined);

      await tpslOrderAPI.placeTpslOrder(request);

      expect(httpClient.post).toHaveBeenCalledWith('/api/v1/trade/order-tpsl', request);
    });
  });

  describe('cancelTpslOrder', () => {
    it('should cancel a TPSL order', async () => {
      const request: CancelTpslOrderRequest = {
        symbol: 'BTCUSD',
        orderId: '12345'
      };

      httpClient.post = jest.fn().mockResolvedValue(undefined);

      await tpslOrderAPI.cancelTpslOrder(request);

      expect(httpClient.post).toHaveBeenCalledWith('/api/v1/trade/cancel-tpsl', request);
    });
  });

  describe('getTpslOrderHistory', () => {
    it('should get TPSL order history', async () => {
      const response: TpslOrderHistoryResponse[] = [
        {
          orderId: '12345',
          symbol: 'BTCUSD',
          status: 'filled',
          stopPrice: '50000',
          takeProfitPrice: '60000',
          timestamp: 1627849200000
        }
      ];

      httpClient.get = jest.fn().mockResolvedValue(response);

      const result = await tpslOrderAPI.getTpslOrderHistory();

      expect(httpClient.get).toHaveBeenCalledWith('/api/v1/trade/tpsl-order-history');
      expect(result).toEqual(response);
    });
  });
});