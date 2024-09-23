import { AccountAPI } from '../account';
import { HttpClient } from '../../httpClient';

jest.mock('../../httpClient');

describe('AccountAPI', () => {
  let httpClient: jest.Mocked<HttpClient>;
  let accountAPI: AccountAPI;

  beforeEach(() => {
    httpClient = new HttpClient('mockApiKey', 'mockSecret') as jest.Mocked<HttpClient>;
    accountAPI = new AccountAPI(httpClient);
  });

  it('should fetch account balance', async () => {
    const mockBalanceResponse = [
      { asset: 'BTC', balance: '1.0', available: '0.5' },
      { asset: 'ETH', balance: '10.0', available: '5.0' },
    ];
    httpClient.get = jest.fn().mockResolvedValue(mockBalanceResponse);

    const balance = await accountAPI.getBalance();

    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/account/balance');
    expect(balance).toEqual(mockBalanceResponse);
  });

  it('should transfer funds between accounts', async () => {
    const mockTransferRequest = {
      asset: 'BTC',
      amount: '0.1',
      fromAccountType: 'spot',
      toAccountType: 'margin',
    };
    const mockTransferResponse = { transferId: '12345' };
    httpClient.post = jest.fn().mockResolvedValue(mockTransferResponse);

    const transferResponse = await accountAPI.transferFunds(mockTransferRequest);

    expect(httpClient.post).toHaveBeenCalledWith('/api/v1/asset/transfer', mockTransferRequest);
    expect(transferResponse).toEqual(mockTransferResponse);
  });

  it('should fetch transfer history', async () => {
    const mockTransferHistoryResponse = [
      {
        transferId: '12345',
        asset: 'BTC',
        amount: '0.1',
        fromAccountType: 'spot',
        toAccountType: 'margin',
        timestamp: 1620000000,
      },
    ];
    httpClient.get = jest.fn().mockResolvedValue(mockTransferHistoryResponse);

    const transferHistory = await accountAPI.getTransferHistory();

    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/asset/bills');
    expect(transferHistory).toEqual(mockTransferHistoryResponse);
  });

  it('should fetch deposit history', async () => {
    const mockDepositHistoryResponse = [
      {
        depositId: '67890',
        asset: 'ETH',
        amount: '1.0',
        status: 'completed',
        timestamp: 1620000000,
      },
    ];
    httpClient.get = jest.fn().mockResolvedValue(mockDepositHistoryResponse);

    const depositHistory = await accountAPI.getDepositHistory();

    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/asset/deposit-history');
    expect(depositHistory).toEqual(mockDepositHistoryResponse);
  });

  it('should fetch withdrawal history', async () => {
    const mockWithdrawalHistoryResponse = [
      {
        withdrawalId: '54321',
        asset: 'BTC',
        amount: '0.5',
        status: 'completed',
        timestamp: 1620000000,
      },
    ];
    httpClient.get = jest.fn().mockResolvedValue(mockWithdrawalHistoryResponse);

    const withdrawalHistory = await accountAPI.getWithdrawalHistory();

    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/asset/withdrawal-history');
    expect(withdrawalHistory).toEqual(mockWithdrawalHistoryResponse);
  });
});