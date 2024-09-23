import { HttpClient } from '../httpClient';

export interface MarginBalanceResponse {
  asset: string;
  totalBalance: string;
  availableBalance: string;
  borrowed: string;
}

export class MarginAccountAPI {
  private httpClient: HttpClient;

  // Конструктор принимает экземпляр HttpClient
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Получение маржинального баланса.
   * @returns {Promise<MarginBalanceResponse[]>} Баланс по маржинальным активам.
   */
  public async getMarginBalance(): Promise<MarginBalanceResponse[]> {
    return this.httpClient.get<MarginBalanceResponse[]>('/api/v1/account/margin');
  }
}
