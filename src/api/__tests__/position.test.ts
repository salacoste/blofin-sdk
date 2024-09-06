import { PositionAPI } from '../position';
import { httpClient } from '../../httpClient';

jest.mock('../../httpClient');

describe('PositionAPI', () => {
  const positionAPI = new PositionAPI();

  it('should fetch positions', async () => {
    const mockResponse = [{ symbol: 'BTCUSDT', positionAmount: '1', entryPrice: '50000' }];
    (httpClient.get as jest.Mock).mockResolvedValue(mockResponse);

    const response = await positionAPI.getPosition();
    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/position');
    expect(response).toEqual(mockResponse);
  });

  it('should close a position', async () => {
    const mockRequest = { symbol: 'BTCUSDT', positionSide: 'LONG' as const };
    (httpClient.post as jest.Mock).mockResolvedValue(undefined);

    await positionAPI.closePosition(mockRequest);
    expect(httpClient.post).toHaveBeenCalledWith('/api/v1/position/close', mockRequest);
  });
});
