import { BlofingClient } from '../BlofingClient';

export class AffiliateApi {
  constructor(private client: BlofingClient) {}

  async getAffiliateInfo(): Promise<any> {
    return this.client.request('GET', '/api/v1/affiliate/basic');
  }

  async getReferralCode(): Promise<any> {
    return this.client.request('GET', '/api/v1/affiliate/referral-code');
  }

  async getDirectInvitees(params?: {
    uid?: string;
    after?: string;
    before?: string;
    begin?: string;
    end?: string;
    limit?: number;
  }): Promise<any> {
    const queryParams = new URLSearchParams(params as any).toString();
    const endpoint = `/api/v1/affiliate/invitees${queryParams ? `?${queryParams}` : ''}`;
    return this.client.request('GET', endpoint);
  }

  async getSubInvitees(params?: {
    uid?: string;
    after?: string;
    before?: string;
    subAffiliateUid?: string;
    subAffiliateLevel?: string;
    begin?: string;
    end?: string;
    limit?: number;
  }): Promise<any> {
    const queryParams = new URLSearchParams(params as any).toString();
    return this.client.request(
      'GET',
      `/api/v1/affiliate/sub-invitees${queryParams ? `?${queryParams}` : ''}`
    );
  }

  async getSubAffiliates(params?: {
    after?: string;
    before?: string;
    subAffiliateUid?: string;
    subAffiliateLevel?: string;
    begin?: string;
    end?: string;
    limit?: number;
  }): Promise<any> {
    const queryParams = new URLSearchParams(params as any).toString();
    return this.client.request(
      'GET',
      `/api/v1/affiliate/sub-affiliates${queryParams ? `?${queryParams}` : ''}`
    );
  }

  async getDailyCommissionOfDirectInvitees(params?: {
    uid?: string;
    after?: string;
    before?: string;
    begin?: string;
    end?: string;
    limit?: number;
  }): Promise<any> {
    const queryParams = new URLSearchParams(params as any).toString();
    return this.client.request(
      'GET',
      `/api/v1/affiliate/invitees/daily${queryParams ? `?${queryParams}` : ''}`
    );
  }
}
