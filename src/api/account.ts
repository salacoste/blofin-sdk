// src/api/account.ts
import { httpClient } from '../httpClient';

export interface BalanceResponse {
  asset: string;
  balance: string;
  available: string;
}

export class AccountAPI {
 /**
 * Получение баланса аккаунта.
 * @returns {Promise<BalanceResponse[]>} Массив с балансом активов.
 */
public async getBalance(): Promise<BalanceResponse[]> {
  return httpClient.get<BalanceResponse[]>('/api/v1/account/balance');
}

}