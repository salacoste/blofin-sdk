import { LeverageAPI, LeverageInfoResponse, SetLeverageRequest } from '../leverage';
import { HttpClient } from '../../httpClient';

jest.mock('../../httpClient');

describe('LeverageAPI', () => {
  let httpClient: jest.Mocked<HttpClient>;
  let leverageAPI: LeverageAPI;

  beforeEach(() => {
    httpClient = new HttpClient('mockApiKey', 'mockSecret') as jest.Mocked<HttpClient>;
    leverageAPI = new LeverageAPI(httpClient);
  });

  describe('getLeverageInfo', () => {
    it('should fetch leverage info successfully', async () => {
      const mockResponse: LeverageInfoResponse[] = [
        { symbol: 'BTCUSD', leverage: '10' },
        { symbol: 'ETHUSD', leverage: '20' },
      ];
      httpClient.get = jest.fn().mockResolvedValue(mockResponse);

      const result = await leverageAPI.getLeverageInfo();

      expect(httpClient.get).toHaveBeenCalledWith('/api/v1/account/batch-leverage-info');
      expect(result).toEqual(mockResponse);
    });

    it('should handle errors when fetching leverage info', async () => {
      httpClient.get = jest.fn().mockRejectedValue(new Error('Network error'));

      await expect(leverageAPI.getLeverageInfo()).rejects.toThrow('Network error');
    });
  });

  describe('setLeverage', () => {
    it('should set leverage successfully', async () => {
      const request: SetLeverageRequest = { symbol: 'BTCUSD', leverage: '10' };
      httpClient.post = jest.fn().mockResolvedValue(undefined);

      await leverageAPI.setLeverage(request);

      expect(httpClient.post).toHaveBeenCalledWith('/api/v1/account/set-leverage', request);
    });

    it('should handle errors when setting leverage', async () => {
      const request: SetLeverageRequest = { symbol: 'BTCUSD', leverage: '10' };
      httpClient.post = jest.fn().mockRejectedValue(new Error('Network error'));

      await expect(leverageAPI.setLeverage(request)).rejects.toThrow('Network error');
    });
  });
});