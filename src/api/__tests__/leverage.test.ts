import { LeverageAPI } from '../leverage';
import { httpClient } from '../../httpClient';

jest.mock('../../httpClient');

describe('LeverageAPI', () => {
  const leverageAPI = new LeverageAPI();

  it('should fetch leverage info', async () => {
    const mockResponse = [{ symbol: 'BTCUSDT', leverage: '10' }];
    (httpClient.get as jest.Mock).mockResolvedValue(mockResponse);

    const response = await leverageAPI.getLeverageInfo();
    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/account/batch-leverage-info');
    expect(response).toEqual(mockResponse);
  });

  it('should set leverage', async () => {
    const mockRequest = { symbol: 'BTCUSDT', leverage: '10' };
    (httpClient.post as jest.Mock).mockResolvedValue(undefined);

    await leverageAPI.setLeverage(mockRequest);
    expect(httpClient.post).toHaveBeenCalledWith('/api/v1/account/set-leverage', mockRequest);
  });
});
