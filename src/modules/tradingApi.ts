import { BlofingClient } from '../BlofingClient';

export class TradingApi {
  constructor(private client: BlofingClient) {}

  async getPositions(instId?: string): Promise<any> {
    const endpoint = `/api/v1/account/positions${instId ? `?instId=${instId}` : ''}`;
    return this.client.request('GET', endpoint);
  }

  async placeOrder(params: {
    instId: string;
    marginMode: string;
    positionSide: string;
    side: string;
    orderType: string;
    price: string;
    size: string;
    reduceOnly?: boolean;
    clientOrderId?: string;
    tpTriggerPrice?: string;
    tpOrderPrice?: string;
    slTriggerPrice?: string;
    slOrderPrice?: string;
  }): Promise<any> {
    return this.client.request('POST', '/api/v1/trade/order', params);
  }

  async cancelOrder(params: { instId: string; orderId: string }): Promise<any> {
    return this.client.request('POST', '/api/v1/trade/cancel-order', params);
  }

  async getActiveOrders(params?: {
    instId?: string;
    orderType?: string;
    state?: string;
    after?: string;
    before?: string;
    limit?: number;
  }): Promise<any> {
    const queryParams = new URLSearchParams(params as any).toString();
    const endpoint = `/api/v1/trade/orders-pending${queryParams ? `?${queryParams}` : ''}`;
    return this.client.request('GET', endpoint);
  }

  async placeMultipleOrders(orders: any[]): Promise<any> {
    return this.client.request('POST', '/api/v1/trade/batch-orders', orders);
  }

  async cancelMultipleOrders(orders: any[]): Promise<any> {
    return this.client.request(
      'POST',
      '/api/v1/trade/cancel-batch-orders',
      orders
    );
  }

  async getOrderHistory(params?: {
    instId?: string;
    orderType?: string;
    state?: string;
    after?: string;
    before?: string;
    begin?: string;
    end?: string;
    limit?: number;
  }): Promise<any> {
    const queryParams = new URLSearchParams(params as any).toString();
    const endpoint = `/api/v1/trade/orders-history${queryParams ? `?${queryParams}` : ''}`;
    return this.client.request('GET', endpoint);
  }

  async getFuturesAccountBalance(): Promise<any> {
    return this.client.request('GET', '/api/v1/account/balance');
  }

  async getMarginMode(): Promise<any> {
    return this.client.request('GET', '/api/v1/account/margin-mode');
  }

  async setMarginMode(marginMode: string): Promise<any> {
    return this.client.request('POST', '/api/v1/account/set-margin-mode', {
      marginMode,
    });
  }

  async getPositionMode(): Promise<any> {
    return this.client.request('GET', '/api/v1/account/position-mode');
  }

  async setPositionMode(positionMode: string): Promise<any> {
    return this.client.request('POST', '/api/v1/account/set-position-mode', {
      positionMode,
    });
  }

  async getMultipleLeverage(params: {
    instId: string;
    marginMode: string;
  }): Promise<any> {
    const queryParams = new URLSearchParams(params as any).toString();
    return this.client.request(
      'GET',
      `/api/v1/account/batch-leverage-info?${queryParams}`
    );
  }

  async setLeverage(params: {
    instId: string;
    leverage: string;
    marginMode: string;
    positionSide?: string;
  }): Promise<any> {
    return this.client.request('POST', '/api/v1/account/set-leverage', params);
  }

  async placeTpslOrder(params: {
    instId: string;
    marginMode: string;
    positionSide: string;
    side: string;
    tpTriggerPrice?: string;
    tpOrderPrice?: string;
    slTriggerPrice?: string;
    slOrderPrice?: string;
    size: string;
    reduceOnly?: boolean;
    clientOrderId?: string;
  }): Promise<any> {
    return this.client.request('POST', '/api/v1/trade/order-tpsl', params);
  }

  async cancelTpslOrder(params: {
    instId: string;
    tpslId: string;
  }): Promise<any> {
    return this.client.request('POST', '/api/v1/trade/cancel-tpsl', params);
  }

  async getActiveTpslOrders(params?: {
    instId?: string;
    tpslId?: string;
    clientOrderId?: string;
    after?: string;
    before?: string;
    limit?: number;
  }): Promise<any> {
    const queryParams = new URLSearchParams(params as any).toString();
    return this.client.request(
      'GET',
      `/api/v1/trade/orders-tpsl-pending${queryParams ? `?${queryParams}` : ''}`
    );
  }

  async closePositions(params: {
    instId: string;
    marginMode: string;
    positionSide: string;
    clientOrderId?: string;
  }): Promise<any> {
    return this.client.request('POST', '/api/v1/trade/close-position', params);
  }

  async getTpslOrderHistory(params?: {
    instId?: string;
    tpslId?: string;
    clientOrderId?: string;
    state?: string;
    after?: string;
    before?: string;
    limit?: number;
  }): Promise<any> {
    const queryParams = new URLSearchParams(params as any).toString();
    return this.client.request(
      'GET',
      `/api/v1/trade/orders-tpsl-history${queryParams ? `?${queryParams}` : ''}`
    );
  }

  async getTradeHistory(params?: {
    instId?: string;
    orderId?: string;
    after?: string;
    before?: string;
    begin?: string;
    end?: string;
    limit?: number;
  }): Promise<any> {
    const queryParams = new URLSearchParams(params as any).toString();
    return this.client.request(
      'GET',
      `/api/v1/trade/fills-history${queryParams ? `?${queryParams}` : ''}`
    );
  }
}
