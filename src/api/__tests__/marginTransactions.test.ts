import { MarginTransactionsAPI, MarginTransactionResponse } from '../marginTransactions';
import { HttpClient } from '../../httpClient';

jest.mock('../../httpClient');

describe('MarginTransactionsAPI', () => {
  let httpClient: jest.Mocked<HttpClient>;
  let marginTransactionsAPI: MarginTransactionsAPI;

  beforeEach(() => {
    httpClient = new HttpClient('mockApiKey', 'mockSecret') as jest.Mocked<HttpClient>;
    marginTransactionsAPI = new MarginTransactionsAPI(httpClient);
  });

  it('should fetch margin transactions successfully', async () => {
    const mockResponse: MarginTransactionResponse[] = [
      {
        transactionId: '1',
        asset: 'BTC',
        amount: '0.1',
        type: 'borrow',
        timestamp: 1625247600000,
      },
      {
        transactionId: '2',
        asset: 'ETH',
        amount: '1.5',
        type: 'repay',
        timestamp: 1625247600000,
      },
    ];

    httpClient.get = jest.fn().mockResolvedValue(mockResponse);

    const result = await marginTransactionsAPI.getMarginTransactions();

    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/margin/transactions');
    expect(result).toEqual(mockResponse);
  });

  it('should handle errors when fetching margin transactions', async () => {
    const mockError = new Error('Network Error');
    httpClient.get = jest.fn().mockRejectedValue(mockError);

    await expect(marginTransactionsAPI.getMarginTransactions()).rejects.toThrow('Network Error');
  });
});