import { HttpClient } from '../httpClient';

export interface MarginTransactionResponse {
  transactionId: string;
  asset: string;
  amount: string;
  type: 'borrow' | 'repay';
  timestamp: number;
}

export class MarginTransactionsAPI {
  private httpClient: HttpClient;

  // Конструктор принимает экземпляр HttpClient
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Получение истории маржинальных транзакций.
   * @returns {Promise<MarginTransactionResponse[]>} История маржинальных транзакций.
   */
  public async getMarginTransactions(): Promise<MarginTransactionResponse[]> {
    return this.httpClient.get<MarginTransactionResponse[]>('/api/v1/margin/transactions');
  }
}
