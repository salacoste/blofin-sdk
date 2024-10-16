import { BlofingClient } from '../BlofingClient';

export class PublicApi {
  constructor(private client: BlofingClient) {}

  async getInstruments(instId?: string): Promise<any> {
    const endpoint = `/api/v1/market/instruments${instId ? `?instId=${instId}` : ''}`;
    return this.client.request('GET', endpoint);
  }

  async getTickers(instId?: string): Promise<any> {
    const endpoint = `/api/v1/market/tickers${instId ? `?instId=${instId}` : ''}`;
    return this.client.request('GET', endpoint);
  }

  async getOrderBook(instId: string, size?: number): Promise<any> {
    const endpoint = `/api/v1/market/books?instId=${instId}${size ? `&size=${size}` : ''}`;
    return this.client.request('GET', endpoint);
  }

  async getTrades(instId: string, limit?: number): Promise<any> {
    const endpoint = `/api/v1/market/trades?instId=${instId}${limit ? `&limit=${limit}` : ''}`;
    return this.client.request('GET', endpoint);
  }

  async getMarkPrice(instId: string): Promise<any> {
    const endpoint = `/api/v1/market/mark-price?instId=${instId}`;
    return this.client.request('GET', endpoint);
  }

  async getFundingRate(instId: string): Promise<any> {
    const endpoint = `/api/v1/market/funding-rate?instId=${instId}`;
    return this.client.request('GET', endpoint);
  }

  async getFundingRateHistory(
    instId: string,
    before?: string,
    after?: string,
    limit?: number
  ): Promise<any> {
    let endpoint = `/api/v1/market/funding-rate-history?instId=${instId}`;
    if (before) endpoint += `&before=${before}`;
    if (after) endpoint += `&after=${after}`;
    if (limit) endpoint += `&limit=${limit}`;
    return this.client.request('GET', endpoint);
  }

  async getCandlesticks(
    instId: string,
    bar?: string,
    after?: string,
    before?: string,
    limit?: number
  ): Promise<any> {
    let endpoint = `/api/v1/market/candles?instId=${instId}`;
    if (bar) endpoint += `&bar=${bar}`;
    if (after) endpoint += `&after=${after}`;
    if (before) endpoint += `&before=${before}`;
    if (limit) endpoint += `&limit=${limit}`;
    return this.client.request('GET', endpoint);
  }
}
