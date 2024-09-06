import { PositionModeAPI } from '../positionMode';
import { httpClient } from '../../httpClient';

jest.mock('../../httpClient');

describe('PositionModeAPI', () => {
  const positionModeAPI = new PositionModeAPI();

  it('should fetch the current position mode', async () => {
    const mockResponse = { mode: 'Hedge' };
    (httpClient.get as jest.Mock).mockResolvedValue(mockResponse);

    const response = await positionModeAPI.getPositionMode();
    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/account/position-mode');
    expect(response).toEqual(mockResponse);
  });

  it('should set the position mode', async () => {
    const mockRequest = 'OneWay';
    (httpClient.post as jest.Mock).mockResolvedValue(undefined);

    await positionModeAPI.setPositionMode(mockRequest);
    expect(httpClient.post).toHaveBeenCalledWith('/api/v1/account/set-position-mode', { mode: mockRequest });
  });
});
