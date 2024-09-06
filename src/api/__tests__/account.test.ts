import { AccountAPI } from '../account';
import { httpClient } from '../../httpClient';

jest.mock('../../httpClient');

describe('AccountAPI', () => {
  const accountAPI = new AccountAPI();

  it('should fetch account balance', async () => {
    const mockResponse = [{ asset: 'BTC', balance: '1.0', available: '0.5' }];
    (httpClient.get as jest.Mock).mockResolvedValue(mockResponse);

    const balances = await accountAPI.getBalance();
    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/account/balance');
    expect(balances).toEqual(mockResponse);
  });
});
