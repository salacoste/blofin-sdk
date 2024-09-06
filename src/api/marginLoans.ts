import { httpClient } from '../httpClient';

export interface MarginLoanResponse {
  loanId: string;
  asset: string;
  amountBorrowed: string;
  interestAccrued: string;
  timestamp: number;
}

export class MarginLoansAPI {
  /**
 * Получение активных заимствований.
 * @returns {Promise<MarginLoanResponse[]>} Массив активных займов.
 */
public async getActiveLoans(): Promise<MarginLoanResponse[]> {
  return httpClient.get<MarginLoanResponse[]>('/api/v1/margin/loans');
}

/**
 * Оформление маржинального заимствования.
 * @param {MarginBorrowRequest} request - Параметры заимствования.
 * @returns {Promise<MarginBorrowResponse>} Ответ с ID займа.
 */
public async borrowMargin(request: MarginBorrowRequest): Promise<MarginBorrowResponse> {
  return httpClient.post<MarginBorrowResponse>('/api/v1/margin/borrow', request);
}

/**
 * Возврат маржинального заимствования.
 * @param {MarginRepayRequest} request - Параметры возврата.
 * @returns {Promise<MarginRepayResponse>} Ответ с ID возврата.
 */
public async repayMargin(request: MarginRepayRequest): Promise<MarginRepayResponse> {
  return httpClient.post<MarginRepayResponse>('/api/v1/margin/repay', request);
}
}

export interface MarginBorrowRequest {
  asset: string;
  amount: string;
}

export interface MarginBorrowResponse {
  borrowId: string;
  status: string;
}

export interface MarginRepayRequest {
  asset: string;
  amount: string;
}

export interface MarginRepayResponse {
  repayId: string;
  status: string;
}

 
