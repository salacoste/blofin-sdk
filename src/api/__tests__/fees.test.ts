import { FeesAPI } from '../fees';
import { httpClient } from '../../httpClient';

jest.mock('../../httpClient');

describe('FeesAPI', () => {
  const feesAPI = new FeesAPI();

  it('should fetch fees', async () => {
    const mockResponse = { makerFee: '0.001', takerFee: '0.002' };
    (httpClient.get as jest.Mock).mockResolvedValue(mockResponse);

    const response = await feesAPI.getFees();
    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/account/fees');
    expect(response).toEqual(mockResponse);
  });
});
