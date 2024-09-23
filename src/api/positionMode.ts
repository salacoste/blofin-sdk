import { HttpClient } from '../httpClient';

export interface PositionModeResponse {
  mode: string;
}

export class PositionModeAPI {
  private httpClient: HttpClient;

  // Конструктор принимает экземпляр HttpClient
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Получение текущего режима позиций.
   * @returns {Promise<PositionModeResponse>} Текущий режим позиций.
   */
  public async getPositionMode(): Promise<PositionModeResponse> {
    return this.httpClient.get<PositionModeResponse>('/api/v1/account/position-mode');
  }

  /**
   * Установка режима позиций.
   * @param {string} mode - Режим позиций.
   * @returns {Promise<void>} Результат выполнения.
   */
  public async setPositionMode(mode: string): Promise<void> {
    await this.httpClient.post('/api/v1/account/set-position-mode', { mode });
  }
}
