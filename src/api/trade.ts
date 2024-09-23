import { HttpClient } from '../httpClient';

export interface BatchOrderRequest {
  symbol: string;
  side: 'buy' | 'sell';
  type: 'limit' | 'market';
  quantity: string;
  price?: string;
}

export interface ActiveOrderResponse {
  orderId: string;
  symbol: string;
  status: string;
  price: string;
  quantity: string;
}

export interface CancelOrderRequest {
  orderId: string;
  symbol: string;
}

export class TradeAPI {
  private httpClient: HttpClient;

  // Конструктор принимает экземпляр HttpClient
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Размещение нескольких ордеров.
   * @param {BatchOrderRequest[]} orders - Массив ордеров.
   * @returns {Promise<void>} Результат выполнения.
   */
  public async placeBatchOrders(orders: BatchOrderRequest[]): Promise<void> {
    await this.httpClient.post('/api/v1/trade/batch-orders', { orders });
  }

  /**
   * Отмена ордера.
   * @param {CancelOrderRequest} request - Параметры отмены ордера.
   * @returns {Promise<void>} Результат выполнения.
   */
  public async cancelOrder(request: CancelOrderRequest): Promise<void> {
    await this.httpClient.post('/api/v1/trade/cancel-order', request);
  }

  /**
   * Отмена нескольких ордеров.
   * @param {string} symbol - Символ актива.
   * @returns {Promise<void>} Результат выполнения.
   */
  public async cancelBatchOrders(symbol: string): Promise<void> {
    await this.httpClient.post('/api/v1/trade/cancel-batch-orders', { symbol });
  }

  /**
   * Получение активных ордеров.
   * @param {string} symbol - Символ актива.
   * @returns {Promise<ActiveOrderResponse[]>} Массив активных ордеров.
   */
  public async getActiveOrders(symbol: string): Promise<ActiveOrderResponse[]> {
    return this.httpClient.get<ActiveOrderResponse[]>('/api/v1/trade/orders-pending', { symbol });
  }
}
