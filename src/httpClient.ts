import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'https://api.blofin.com'; // Базовый URL API

export class HttpClient {
  private client: AxiosInstance;
  private apiKey: string;
  private apiSecret: string;

  constructor(apiKey: string, apiSecret: string) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;

    this.client = axios.create({
      baseURL: BASE_URL,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': this.apiKey,  // Добавляем API Key в заголовки
        'X-API-SECRET': this.apiSecret  // Добавляем Secret Key в заголовки
      }
    });
  }

  // GET-запрос с передачей параметров
  public async get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
    const response = await this.client.get<T>(url, { params });
    return response.data;
  }

  // POST-запрос с передачей данных
  public async post<T>(url: string, data: unknown): Promise<T> {
    const response = await this.client.post<T>(url, data);
    return response.data;
  }
}

// Функция для создания HTTP клиента с ключами API
export const createHttpClient = (apiKey: string, apiSecret: string) => new HttpClient(apiKey, apiSecret);
