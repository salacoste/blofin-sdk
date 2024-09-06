// src/api/order.ts
import { httpClient } from '../httpClient';

export interface OrderRequest {
  symbol: string;
  side: 'buy' | 'sell';
  type: 'limit' | 'market';
  quantity: string;
  price?: string; // Для лимитных ордеров
}

export interface OrderResponse {
  orderId: string;
  status: string;
}

export interface OpenOrderResponse {
  orderId: string;
  symbol: string;
  status: string;
}
 

export class OrderAPI {
  /**
 * Создание ордера.
 * @param {OrderRequest} order - Параметры ордера.
 * @returns {Promise<OrderResponse>} Ответ с ID ордера и статусом.
 */
public async createOrder(order: OrderRequest): Promise<OrderResponse> {
  return httpClient.post<OrderResponse>('/api/v1/order', order);
}

/**
 * Получение открытых ордеров.
 * @returns {Promise<OpenOrderResponse[]>} Массив открытых ордеров.
 */
public async getOpenOrders(): Promise<OpenOrderResponse[]> {
  return httpClient.get<OpenOrderResponse[]>('/api/v1/order/open');
}

/**
 * Получение истории ордеров.
 * @returns {Promise<OrderHistoryResponse[]>} Массив истории ордеров.
 */
public async getOrderHistory(): Promise<OrderHistoryResponse[]> {
  return httpClient.get<OrderHistoryResponse[]>('/api/v1/order/history');
}

}

export interface OrderHistoryResponse {
  orderId: string;
  symbol: string;
  status: string;
  executedQty: string;
  price: string;
  time: number;
}

 
