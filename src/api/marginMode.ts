import { httpClient } from '../httpClient'; // Добавлен импорт

export interface MarginModeResponse {
  mode: string;
}

export class MarginModeAPI {
 /**
 * Получение текущего режима маржи.
 * @returns {Promise<MarginModeResponse>} Текущий режим маржи.
 */
public async getMarginMode(): Promise<MarginModeResponse> {
  return httpClient.get<MarginModeResponse>('/api/v1/account/margin-mode');
}

/**
 * Установка режима маржи.
 * @param {string} mode - Режим маржи.
 */
public async setMarginMode(mode: string): Promise<void> {
  await httpClient.post('/api/v1/account/set-margin-mode', { mode });
}
}
