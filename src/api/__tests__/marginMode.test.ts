import { MarginModeAPI } from '../marginMode';
import { httpClient } from '../../httpClient';

jest.mock('../../httpClient');

describe('MarginModeAPI', () => {
  const marginModeAPI = new MarginModeAPI();

  it('should fetch the current margin mode', async () => {
    const mockResponse = { mode: 'cross' };
    (httpClient.get as jest.Mock).mockResolvedValue(mockResponse);

    const response = await marginModeAPI.getMarginMode();
    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/account/margin-mode');
    expect(response).toEqual(mockResponse);
  });

  it('should set the margin mode', async () => {
    const mockRequest = { mode: 'isolated' };
    (httpClient.post as jest.Mock).mockResolvedValue(undefined);

    await marginModeAPI.setMarginMode('isolated');
    expect(httpClient.post).toHaveBeenCalledWith('/api/v1/account/set-margin-mode', { mode: 'isolated' });
  });
});
