import { httpClient } from '../httpClient';
export interface LeverageInfoResponse {
  symbol: string;
  leverage: string;
}

export interface SetLeverageRequest {
  symbol: string;
  leverage: string;
}

export class LeverageAPI {
  /**
 * Получение текущего кредитного плеча для символа.
 * @returns {Promise<LeverageInfoResponse[]>} Массив с информацией о плечах для символов.
 */
public async getLeverageInfo(): Promise<LeverageInfoResponse[]> {
  return httpClient.get<LeverageInfoResponse[]>('/api/v1/account/batch-leverage-info');
}

/**
 * Установка кредитного плеча для символа.
 * @param {SetLeverageRequest} request - Параметры для установки плеча.
 */
public async setLeverage(request: SetLeverageRequest): Promise<void> {
  await httpClient.post('/api/v1/account/set-leverage', request);
}
}
