import { MarginAccountAPI } from '../marginAccount';
import { httpClient } from '../../httpClient';

jest.mock('../../httpClient');

describe('MarginAccountAPI', () => {
  const marginAccountAPI = new MarginAccountAPI();

  it('should fetch margin balance', async () => {
    const mockResponse = [{ asset: 'BTC', totalBalance: '1.0', availableBalance: '0.5', borrowed: '0.5' }];
    (httpClient.get as jest.Mock).mockResolvedValue(mockResponse);

    const response = await marginAccountAPI.getMarginBalance();
    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/account/margin');
    expect(response).toEqual(mockResponse);
  });
});
