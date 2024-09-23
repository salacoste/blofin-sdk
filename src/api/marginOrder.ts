import { HttpClient } from '../httpClient';

export interface MarginOrderRequest {
  symbol: string;
  side: 'buy' | 'sell';
  type: 'limit' | 'market';
  quantity: string;
  price?: string;
}

export interface MarginOrderResponse {
  orderId: string;
  status: string;
}

export class MarginOrderAPI {
  private httpClient: HttpClient;

  // Конструктор принимает экземпляр HttpClient
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Создание маржинального ордера.
   * @param {MarginOrderRequest} order - Параметры ордера (символ, сторона, тип, количество).
   * @returns {Promise<MarginOrderResponse>} Ответ с ID ордера и статусом.
   */
  public async createMarginOrder(order: MarginOrderRequest): Promise<MarginOrderResponse> {
    return this.httpClient.post<MarginOrderResponse>('/api/v1/order/margin', order);
  }
}
