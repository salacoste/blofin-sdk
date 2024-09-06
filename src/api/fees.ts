import { httpClient } from '../httpClient';

export interface FeesResponse {
  makerFee: string;
  takerFee: string;
}

export class FeesAPI {
 /**
 * Получение данных о комиссиях.
 * @returns {Promise<FeesResponse>} Информация о комиссиях (maker и taker).
 */
public async getFees(): Promise<FeesResponse> {
  return httpClient.get<FeesResponse>('/api/v1/account/fees');
}
}
