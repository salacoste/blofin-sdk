import { MarginLoansAPI, MarginLoanResponse, MarginBorrowRequest, MarginBorrowResponse, MarginRepayRequest, MarginRepayResponse } from '../marginLoans';
import { HttpClient } from '../../httpClient';

jest.mock('../../httpClient');

describe('MarginLoansAPI', () => {
  let httpClient: jest.Mocked<HttpClient>;
  let marginLoansAPI: MarginLoansAPI;

  beforeEach(() => {
    httpClient = new HttpClient('mockApiKey', 'mockSecret') as jest.Mocked<HttpClient>;
    marginLoansAPI = new MarginLoansAPI(httpClient);
  });

  describe('getActiveLoans', () => {
    it('should fetch active margin loans', async () => {
      const mockResponse: MarginLoanResponse[] = [
        {
          loanId: '1',
          asset: 'BTC',
          amountBorrowed: '0.5',
          interestAccrued: '0.01',
          timestamp: 1625256000,
        },
      ];
      httpClient.get = jest.fn().mockResolvedValue(mockResponse);

      const result = await marginLoansAPI.getActiveLoans();

      expect(httpClient.get).toHaveBeenCalledWith('/api/v1/margin/loans');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('borrowMargin', () => {
    it('should borrow margin', async () => {
      const request: MarginBorrowRequest = {
        asset: 'BTC',
        amount: '0.5',
      };
      const mockResponse: MarginBorrowResponse = {
        borrowId: '123',
        status: 'success',
      };
      httpClient.post = jest.fn().mockResolvedValue(mockResponse);

      const result = await marginLoansAPI.borrowMargin(request);

      expect(httpClient.post).toHaveBeenCalledWith('/api/v1/margin/borrow', request);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('repayMargin', () => {
    it('should repay margin', async () => {
      const request: MarginRepayRequest = {
        asset: 'BTC',
        amount: '0.5',
      };
      const mockResponse: MarginRepayResponse = {
        repayId: '456',
        status: 'success',
      };
      httpClient.post = jest.fn().mockResolvedValue(mockResponse);

      const result = await marginLoansAPI.repayMargin(request);

      expect(httpClient.post).toHaveBeenCalledWith('/api/v1/margin/repay', request);
      expect(result).toEqual(mockResponse);
    });
  });
});