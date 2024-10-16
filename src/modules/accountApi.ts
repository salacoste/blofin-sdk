import { BlofingClient } from '../BlofingClient';

export class AccountApi {
  constructor(private client: BlofingClient) {}

  async getBalance(accountType: string, currency?: string): Promise<any> {
    let endpoint = `/api/v1/asset/balances?accountType=${accountType}`;
    if (currency) endpoint += `&currency=${currency}`;
    return this.client.request('GET', endpoint);
  }

  async transferFunds(params: {
    currency: string;
    amount: string;
    fromAccount: string;
    toAccount: string;
    clientId?: string;
  }): Promise<any> {
    return this.client.request('POST', '/api/v1/asset/transfer', params);
  }

  async getFundsTransferHistory(params?: {
    currency?: string;
    fromAccount?: string;
    toAccount?: string;
    before?: string;
    after?: string;
    limit?: number;
  }): Promise<any> {
    const queryParams = new URLSearchParams(params as any).toString();
    const endpoint = `/api/v1/asset/bills${queryParams ? `?${queryParams}` : ''}`;
    return this.client.request('GET', endpoint);
  }

  async getWithdrawHistory(params?: {
    currency?: string;
    withdrawId?: string;
    txId?: string;
    state?: string;
    before?: string;
    after?: string;
    limit?: number;
  }): Promise<any> {
    const queryParams = new URLSearchParams(params as any).toString();
    const endpoint = `/api/v1/asset/withdrawal-history${queryParams ? `?${queryParams}` : ''}`;
    return this.client.request('GET', endpoint);
  }

  async getDepositHistory(params?: {
    currency?: string;
    depositId?: string;
    txId?: string;
    state?: string;
    before?: string;
    after?: string;
    limit?: number;
  }): Promise<any> {
    const queryParams = new URLSearchParams(params as any).toString();
    const endpoint = `/api/v1/asset/deposit-history${queryParams ? `?${queryParams}` : ''}`;
    return this.client.request('GET', endpoint);
  }
}
