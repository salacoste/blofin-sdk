import { MarginTransactionsAPI } from '../marginTransactions';
import { httpClient } from '../../httpClient';

jest.mock('../../httpClient');

describe('MarginTransactionsAPI', () => {
  const marginTransactionsAPI = new MarginTransactionsAPI();

  it('should fetch margin transactions', async () => {
    const mockResponse = [
      { transactionId: '123', asset: 'BTC', amount: '1', type: 'borrow', timestamp: 1633024800000 }
    ];
    (httpClient.get as jest.Mock).mockResolvedValue(mockResponse);

    const response = await marginTransactionsAPI.getMarginTransactions();
    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/margin/transactions');
    expect(response).toEqual(mockResponse);
  });
});
