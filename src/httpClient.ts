import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'https://api.blofin.com'; // Реальный URL

/**
 * Класс HttpClient для работы с API запросами.
 * Использует axios для отправки GET и POST запросов.
 */
class HttpClient {
  private client: AxiosInstance;

  constructor() {
    /**
     * Инициализация клиента axios с базовым URL и заголовками.
     */
    this.client = axios.create({
      baseURL: BASE_URL,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Выполнение GET запроса.
   * @param {string} url - Путь к ресурсу.
   * @param {Record<string, unknown>} params - Параметры запроса.
   * @returns {Promise<T>} Ответ от API.
   */
  public async get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
    const response = await this.client.get<T>(url, { params });
    return response.data;
  }

  /**
   * Выполнение POST запроса.
   * @param {string} url - Путь к ресурсу.
   * @param {unknown} data - Данные для отправки.
   * @returns {Promise<T>} Ответ от API.
   */
  public async post<T>(url: string, data: unknown): Promise<T> {
    const response = await this.client.post<T>(url, data);
    return response.data;
  }
}

export const httpClient = new HttpClient();
