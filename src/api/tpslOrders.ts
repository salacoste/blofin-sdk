import { HttpClient } from '../httpClient';

export interface TpslOrderRequest {
  symbol: string;
  side: 'buy' | 'sell';
  stopPrice: string;
  takeProfitPrice?: string;
}

export interface CancelTpslOrderRequest {
  symbol: string;
  orderId: string;
}

export interface TpslOrderHistoryResponse {
  orderId: string;
  symbol: string;
  status: string;
  stopPrice: string;
  takeProfitPrice?: string;
  timestamp: number;
}

export class TpslOrderAPI {
  private httpClient: HttpClient;

  // Конструктор принимает экземпляр HttpClient
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Размещение ордера Take-Profit/Stop-Loss.
   * @param {TpslOrderRequest} request - Параметры TP/SL ордера.
   * @returns {Promise<void>} Результат выполнения.
   */
  public async placeTpslOrder(request: TpslOrderRequest): Promise<void> {
    await this.httpClient.post('/api/v1/trade/order-tpsl', request);
  }

  /**
   * Отмена ордера Take-Profit/Stop-Loss.
   * @param {CancelTpslOrderRequest} request - Параметры для отмены TP/SL ордера.
   * @returns {Promise<void>} Результат выполнения.
   */
  public async cancelTpslOrder(request: CancelTpslOrderRequest): Promise<void> {
    await this.httpClient.post('/api/v1/trade/cancel-tpsl', request);
  }

  /**
   * Получение истории ордеров TP/SL.
   * @returns {Promise<TpslOrderHistoryResponse[]>} История TP/SL ордеров.
   */
  public async getTpslOrderHistory(): Promise<TpslOrderHistoryResponse[]> {
    return this.httpClient.get<TpslOrderHistoryResponse[]>('/api/v1/trade/tpsl-order-history');
  }
}
