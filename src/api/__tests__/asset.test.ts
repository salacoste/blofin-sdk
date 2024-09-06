import { AssetAPI } from '../asset';
import { httpClient } from '../../httpClient';

jest.mock('../../httpClient');

describe('AssetAPI', () => {
  const assetAPI = new AssetAPI();

  it('should transfer funds', async () => {
    const mockResponse = { transferId: '123' };
    const mockRequest = { asset: 'BTC', amount: '1', fromAccountType: 'spot', toAccountType: 'margin' };
    (httpClient.post as jest.Mock).mockResolvedValue(mockResponse);

    const response = await assetAPI.transferFunds(mockRequest);
    expect(httpClient.post).toHaveBeenCalledWith('/api/v1/asset/transfer', mockRequest);
    expect(response).toEqual(mockResponse);
  });

  it('should fetch transfer history', async () => {
    const mockResponse = [{ transferId: '123', asset: 'BTC', amount: '1.0' }];
    (httpClient.get as jest.Mock).mockResolvedValue(mockResponse);

    const response = await assetAPI.getTransferHistory();
    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/asset/bills');
    expect(response).toEqual(mockResponse);
  });

  it('should fetch deposit history', async () => {
    const mockResponse = [{ depositId: '123', asset: 'BTC', amount: '1.0' }];
    (httpClient.get as jest.Mock).mockResolvedValue(mockResponse);

    const response = await assetAPI.getDepositHistory();
    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/asset/deposit-history');
    expect(response).toEqual(mockResponse);
  });

  it('should fetch withdrawal history', async () => {
    const mockResponse = [{ withdrawalId: '123', asset: 'BTC', amount: '1.0' }];
    (httpClient.get as jest.Mock).mockResolvedValue(mockResponse);

    const response = await assetAPI.getWithdrawalHistory();
    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/asset/withdrawal-history');
    expect(response).toEqual(mockResponse);
  });
});
