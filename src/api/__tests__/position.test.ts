import { PositionAPI, PositionResponse, ClosePositionRequest } from '../position';
import { HttpClient } from '../../httpClient';

jest.mock('../../httpClient');

describe('PositionAPI', () => {
  let httpClient: jest.Mocked<HttpClient>;
  let positionAPI: PositionAPI;

  beforeEach(() => {
    httpClient = new HttpClient('mockApiKey', 'mockSecret') as jest.Mocked<HttpClient>;
    positionAPI = new PositionAPI(httpClient);
  });

  describe('getPosition', () => {
    it('should fetch current positions', async () => {
      const mockResponse: PositionResponse[] = [
        { symbol: 'BTCUSD', positionAmount: '1', entryPrice: '50000' },
      ];
      httpClient.get = jest.fn().mockResolvedValue(mockResponse);

      const result = await positionAPI.getPosition();

      expect(httpClient.get).toHaveBeenCalledWith('/api/v1/position');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('closePosition', () => {
    it('should close a position', async () => {
      const request: ClosePositionRequest = { symbol: 'BTCUSD', positionSide: 'LONG' };
      httpClient.post = jest.fn().mockResolvedValue(undefined);

      await positionAPI.closePosition(request);

      expect(httpClient.post).toHaveBeenCalledWith('/api/v1/position/close', request);
    });
  });
});