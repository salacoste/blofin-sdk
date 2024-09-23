import { HttpClient } from '../httpClient';

export interface FeesResponse {
  makerFee: string;
  takerFee: string;
}

export class FeesAPI {
  private httpClient: HttpClient;

  // Конструктор принимает экземпляр HttpClient
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Получение данных о комиссиях.
   * @returns {Promise<FeesResponse>} Информация о комиссиях (maker и taker).
   */
  public async getFees(): Promise<FeesResponse> {
    return this.httpClient.get<FeesResponse>('/api/v1/account/fees');
  }
}
