import { HttpClient } from '../httpClient';

export interface LeverageInfoResponse {
  symbol: string;
  leverage: string;
}

export interface SetLeverageRequest {
  symbol: string;
  leverage: string;
}

export class LeverageAPI {
  private httpClient: HttpClient;

  // Конструктор принимает экземпляр HttpClient
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Получение текущего кредитного плеча для символа.
   * @returns {Promise<LeverageInfoResponse[]>} Информация о плечах для символов.
   */
  public async getLeverageInfo(): Promise<LeverageInfoResponse[]> {
    return this.httpClient.get<LeverageInfoResponse[]>('/api/v1/account/batch-leverage-info');
  }

  /**
   * Установка кредитного плеча для символа.
   * @param {SetLeverageRequest} request - Параметры для установки плеча.
   * @returns {Promise<void>} Результат выполнения.
   */
  public async setLeverage(request: SetLeverageRequest): Promise<void> {
    await this.httpClient.post('/api/v1/account/set-leverage', request);
  }
}
