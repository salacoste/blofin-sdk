import { MarginModeAPI, MarginModeResponse } from '../marginMode';
import { HttpClient } from '../../httpClient';

jest.mock('../../httpClient');

describe('MarginModeAPI', () => {
  let httpClient: jest.Mocked<HttpClient>;
  let marginModeAPI: MarginModeAPI;

  beforeEach(() => {
    httpClient = new HttpClient('mockApiKey', 'mockSecret') as jest.Mocked<HttpClient>;
    marginModeAPI = new MarginModeAPI(httpClient);
  });

  describe('getMarginMode', () => {
    it('should return the current margin mode', async () => {
      const mockResponse: MarginModeResponse = { mode: 'cross' };
      httpClient.get = jest.fn().mockResolvedValue(mockResponse);

      const result = await marginModeAPI.getMarginMode();

      expect(httpClient.get).toHaveBeenCalledWith('/api/v1/account/margin-mode');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('setMarginMode', () => {
    it('should set the margin mode', async () => {
      const mode = 'isolated';
      httpClient.post = jest.fn().mockResolvedValue(undefined);

      await marginModeAPI.setMarginMode(mode);

      expect(httpClient.post).toHaveBeenCalledWith('/api/v1/account/set-margin-mode', { mode });
    });
  });
});