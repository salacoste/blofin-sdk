import { MarginAccountAPI, MarginBalanceResponse } from '../marginAccount';
import { HttpClient } from '../../httpClient';

jest.mock('../../httpClient');

describe('MarginAccountAPI', () => {
  let httpClient: jest.Mocked<HttpClient>;
  let marginAccountAPI: MarginAccountAPI;

  beforeEach(() => {
    httpClient = new HttpClient('mockApiKey', 'mockSecret') as jest.Mocked<HttpClient>;
    marginAccountAPI = new MarginAccountAPI(httpClient);
  });

  it('should fetch margin balance', async () => {
    const mockResponse: MarginBalanceResponse[] = [
      {
        asset: 'BTC',
        totalBalance: '1.0',
        availableBalance: '0.5',
        borrowed: '0.5',
      },
    ];

    httpClient.get = jest.fn().mockResolvedValue(mockResponse);

    const result = await marginAccountAPI.getMarginBalance();

    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/account/margin');
    expect(result).toEqual(mockResponse);
  });

  it('should handle errors when fetching margin balance', async () => {
    const mockError = new Error('Network error');
    httpClient.get = jest.fn().mockRejectedValue(mockError);

    await expect(marginAccountAPI.getMarginBalance()).rejects.toThrow('Network error');
  });
});