import { MarginLoansAPI } from '../marginLoans';
import { httpClient } from '../../httpClient';

jest.mock('../../httpClient');

describe('MarginLoansAPI', () => {
  const marginLoansAPI = new MarginLoansAPI();

  it('should fetch active loans', async () => {
    const mockResponse = [{ loanId: '123', asset: 'BTC', amountBorrowed: '1.0', interestAccrued: '0.01' }];
    (httpClient.get as jest.Mock).mockResolvedValue(mockResponse);

    const response = await marginLoansAPI.getActiveLoans();
    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/margin/loans');
    expect(response).toEqual(mockResponse);
  });

  it('should borrow margin', async () => {
    const mockRequest = { asset: 'BTC', amount: '1' };
    const mockResponse = { borrowId: '123', status: 'success' };
    (httpClient.post as jest.Mock).mockResolvedValue(mockResponse);

    const response = await marginLoansAPI.borrowMargin(mockRequest);
    expect(httpClient.post).toHaveBeenCalledWith('/api/v1/margin/borrow', mockRequest);
    expect(response).toEqual(mockResponse);
  });

  it('should repay margin', async () => {
    const mockRequest = { asset: 'BTC', amount: '1' };
    const mockResponse = { repayId: '123', status: 'success' };
    (httpClient.post as jest.Mock).mockResolvedValue(mockResponse);

    const response = await marginLoansAPI.repayMargin(mockRequest);
    expect(httpClient.post).toHaveBeenCalledWith('/api/v1/margin/repay', mockRequest);
    expect(response).toEqual(mockResponse);
  });
});
