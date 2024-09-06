import { httpClient } from '../httpClient';

export interface PositionResponse {
  symbol: string;
  positionAmount: string;
  entryPrice: string;
}

export class PositionAPI {
  /**
 * Получение текущих позиций.
 * @returns {Promise<PositionResponse[]>} Массив текущих позиций.
 */
public async getPosition(): Promise<PositionResponse[]> {
  return httpClient.get<PositionResponse[]>('/api/v1/position');
}

/**
 * Закрытие позиции.
 * @param {ClosePositionRequest} request - Параметры закрытия позиции (символ, сторона).
 * @returns {Promise<void>} Результат выполнения.
 */
public async closePosition(request: ClosePositionRequest): Promise<void> {
  await httpClient.post('/api/v1/position/close', request);
}
}

export interface ClosePositionRequest {
  symbol: string;
  positionSide: 'LONG' | 'SHORT';
}
 
