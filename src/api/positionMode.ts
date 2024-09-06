import { httpClient } from '../httpClient';

export interface PositionModeResponse {
  mode: string;
}

export class PositionModeAPI {
 /**
 * Получение текущего режима позиций.
 * @returns {Promise<PositionModeResponse>} Текущий режим позиций.
 */
public async getPositionMode(): Promise<PositionModeResponse> {
  return httpClient.get<PositionModeResponse>('/api/v1/account/position-mode');
}

/**
 * Установка режима позиций.
 * @param {string} mode - Режим позиций.
 */
public async setPositionMode(mode: string): Promise<void> {
  await httpClient.post('/api/v1/account/set-position-mode', { mode });
}
}
