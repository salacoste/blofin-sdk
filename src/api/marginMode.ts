import { HttpClient } from '../httpClient';

export interface MarginModeResponse {
  mode: string;
}

export class MarginModeAPI {
  private httpClient: HttpClient;

  // Конструктор принимает экземпляр HttpClient
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Получение текущего режима маржи.
   * @returns {Promise<MarginModeResponse>} Текущий режим маржи.
   */
  public async getMarginMode(): Promise<MarginModeResponse> {
    return this.httpClient.get<MarginModeResponse>('/api/v1/account/margin-mode');
  }

  /**
   * Установка режима маржи.
   * @param {string} mode - Режим маржи.
   * @returns {Promise<void>} Результат выполнения.
   */
  public async setMarginMode(mode: string): Promise<void> {
    await this.httpClient.post('/api/v1/account/set-margin-mode', { mode });
  }
}
