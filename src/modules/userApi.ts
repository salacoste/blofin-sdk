import { BlofingClient } from '../BlofingClient';

export class UserApi {
  constructor(private client: BlofingClient) {}

  async getApiKeyInfo(): Promise<any> {
    return this.client.request('GET', '/api/v1/user/query-apikey');
  }

  // Add more user-related methods here
}
