import { FeesAPI, FeesResponse } from '../fees';
import { HttpClient } from '../../httpClient';

jest.mock('../../httpClient');

describe('FeesAPI', () => {
    let httpClient: jest.Mocked<HttpClient>;
    let feesAPI: FeesAPI;

    beforeEach(() => {
        httpClient = new HttpClient('mockApiKey', 'mockSecret') as jest.Mocked<HttpClient>;
        feesAPI = new FeesAPI(httpClient);
    });

    it('should fetch fees successfully', async () => {
        const mockResponse: FeesResponse = {
            makerFee: '0.1',
            takerFee: '0.2',
        };

        httpClient.get = jest.fn().mockResolvedValue(mockResponse);

        const result = await feesAPI.getFees();

        expect(httpClient.get).toHaveBeenCalledWith('/api/v1/account/fees');
        expect(result).toEqual(mockResponse);
    });

    it('should handle errors when fetching fees', async () => {
        const mockError = new Error('Network error');
        httpClient.get = jest.fn().mockRejectedValue(mockError);

        await expect(feesAPI.getFees()).rejects.toThrow('Network error');
    });
});