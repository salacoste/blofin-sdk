import { PositionModeAPI, PositionModeResponse } from '../positionMode';
import { HttpClient } from '../../httpClient';

jest.mock('../../httpClient');

describe('PositionModeAPI', () => {
  let httpClient: jest.Mocked<HttpClient>;
  let positionModeAPI: PositionModeAPI;

  beforeEach(() => {
    httpClient = new HttpClient('mockApiKey', 'mockSecret') as jest.Mocked<HttpClient>;
    positionModeAPI = new PositionModeAPI(httpClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getPositionMode', () => {
    it('should return the current position mode', async () => {
      const mockResponse: PositionModeResponse = { mode: 'hedge' };
      httpClient.get = jest.fn().mockResolvedValue(mockResponse);

      const result = await positionModeAPI.getPositionMode();

      expect(httpClient.get).toHaveBeenCalledWith('/api/v1/account/position-mode');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('setPositionMode', () => {
    it('should set the position mode', async () => {
      const mode = 'one-way';
      httpClient.post = jest.fn().mockResolvedValue(undefined);

      await positionModeAPI.setPositionMode(mode);

      expect(httpClient.post).toHaveBeenCalledWith('/api/v1/account/set-position-mode', { mode });
    });
  });
});