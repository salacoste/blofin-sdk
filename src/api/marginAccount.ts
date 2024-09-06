import { httpClient } from '../httpClient';

export interface MarginBalanceResponse {
  asset: string;
  totalBalance: string;
  availableBalance: string;
  borrowed: string;
}

export class MarginAccountAPI {
 /**
 * Получение маржинального баланса.
 * @returns {Promise<MarginBalanceResponse[]>} Баланс по маржинальным активам.
 */
public async getMarginBalance(): Promise<MarginBalanceResponse[]> {
  return httpClient.get<MarginBalanceResponse[]>('/api/v1/account/margin');
}
}
