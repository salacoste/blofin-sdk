import { httpClient } from '../httpClient';

export interface MarginTransactionResponse {
  transactionId: string;
  asset: string;
  amount: string;
  type: 'borrow' | 'repay';
  timestamp: number;
}

export class MarginTransactionsAPI {
  /**
 * Получение истории маржинальных транзакций.
 * @returns {Promise<MarginTransactionResponse[]>} История маржинальных транзакций.
 */
public async getMarginTransactions(): Promise<MarginTransactionResponse[]> {
  return httpClient.get<MarginTransactionResponse[]>('/api/v1/margin/transactions');
}
}
