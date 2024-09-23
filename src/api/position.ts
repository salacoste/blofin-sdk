import { HttpClient } from '../httpClient';

// Интерфейсы
export interface PositionResponse {
  symbol: string;
  positionAmount: string;
  entryPrice: string;
}

export interface ClosePositionRequest {
  symbol: string;
  positionSide: 'LONG' | 'SHORT';
}

export class PositionAPI {
  private httpClient: HttpClient;

  // Конструктор принимает экземпляр HttpClient
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Получение текущих позиций.
   * @returns {Promise<PositionResponse[]>} Массив текущих позиций.
   */
  public async getPosition(): Promise<PositionResponse[]> {
    return this.httpClient.get<PositionResponse[]>('/api/v1/position');
  }

  /**
   * Закрытие позиции.
   * @param {ClosePositionRequest} request - Параметры закрытия позиции (символ, сторона).
   * @returns {Promise<void>} Результат выполнения.
   */
  public async closePosition(request: ClosePositionRequest): Promise<void> {
    await this.httpClient.post('/api/v1/position/close', request);
  }
}
