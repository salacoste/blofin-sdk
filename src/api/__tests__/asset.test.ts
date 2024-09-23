import { AssetAPI } from '../asset';
import { HttpClient } from '../../httpClient';

jest.mock('../../httpClient');

describe('AssetAPI', () => {
  let httpClient: jest.Mocked<HttpClient>;
  let assetAPI: AssetAPI;

  beforeEach(() => {
    httpClient = new HttpClient('mockApiKey', 'mockSecret') as jest.Mocked<HttpClient>;
    assetAPI = new AssetAPI(httpClient);
  });

  describe('transferFunds', () => {
    it('should transfer funds and return transferId', async () => {
      const request = {
        asset: 'BTC',
        amount: '1.0',
        fromAccountType: 'spot',
        toAccountType: 'margin'
      };
      const response = { transferId: '12345' };
      httpClient.post = jest.fn().mockResolvedValue(response);

      const result = await assetAPI.transferFunds(request);

      expect(httpClient.post).toHaveBeenCalledWith('/api/v1/asset/transfer', request);
      expect(result).toEqual(response);
    });
  });

  describe('getTransferHistory', () => {
    it('should return transfer history', async () => {
      const response = [
        {
          transferId: '12345',
          asset: 'BTC',
          amount: '1.0',
          fromAccountType: 'spot',
          toAccountType: 'margin',
          timestamp: 1620000000
        }
      ];
      httpClient.get = jest.fn().mockResolvedValue(response);

      const result = await assetAPI.getTransferHistory();

      expect(httpClient.get).toHaveBeenCalledWith('/api/v1/asset/bills');
      expect(result).toEqual(response);
    });
  });

  describe('getDepositHistory', () => {
    it('should return deposit history', async () => {
      const response = [
        {
          depositId: '67890',
          asset: 'ETH',
          amount: '2.0',
          status: 'completed',
          timestamp: 1620000000
        }
      ];
      httpClient.get = jest.fn().mockResolvedValue(response);

      const result = await assetAPI.getDepositHistory();

      expect(httpClient.get).toHaveBeenCalledWith('/api/v1/asset/deposit-history');
      expect(result).toEqual(response);
    });
  });

  describe('getWithdrawalHistory', () => {
    it('should return withdrawal history', async () => {
      const response = [
        {
          withdrawalId: '54321',
          asset: 'USDT',
          amount: '500.0',
          status: 'completed',
          timestamp: 1620000000
        }
      ];
      httpClient.get = jest.fn().mockResolvedValue(response);

      const result = await assetAPI.getWithdrawalHistory();

      expect(httpClient.get).toHaveBeenCalledWith('/api/v1/asset/withdrawal-history');
      expect(result).toEqual(response);
    });
  });
});