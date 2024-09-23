import { HttpClient } from '../httpClient';

export interface TransferRequest {
  asset: string;
  amount: string;
  fromAccountType: string;
  toAccountType: string;
}

export interface TransferResponse {
  transferId: string;
}

export interface TransferHistoryResponse {
  transferId: string;
  asset: string;
  amount: string;
  fromAccountType: string;
  toAccountType: string;
  timestamp: number;
}

export interface DepositHistoryResponse {
  depositId: string;
  asset: string;
  amount: string;
  status: string;
  timestamp: number;
}

export interface WithdrawalHistoryResponse {
  withdrawalId: string;
  asset: string;
  amount: string;
  status: string;
  timestamp: number;
}

export class AssetAPI {
  private httpClient: HttpClient;

  // Принимаем HttpClient через конструктор
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Перевод средств между счетами.
   * @param {TransferRequest} request - Данные перевода.
   * @returns {Promise<TransferResponse>} Ответ с ID перевода.
   */
  public async transferFunds(request: TransferRequest): Promise<TransferResponse> {
    return this.httpClient.post<TransferResponse>('/api/v1/asset/transfer', request);
  }

  /**
   * Получение истории переводов.
   * @returns {Promise<TransferHistoryResponse[]>} История переводов.
   */
  public async getTransferHistory(): Promise<TransferHistoryResponse[]> {
    return this.httpClient.get<TransferHistoryResponse[]>('/api/v1/asset/bills');
  }

  /**
   * Получение истории депозитов.
   * @returns {Promise<DepositHistoryResponse[]>} История депозитов.
   */
  public async getDepositHistory(): Promise<DepositHistoryResponse[]> {
    return this.httpClient.get<DepositHistoryResponse[]>('/api/v1/asset/deposit-history');
  }

  /**
   * Получение истории выводов.
   * @returns {Promise<WithdrawalHistoryResponse[]>} История выводов.
   */
  public async getWithdrawalHistory(): Promise<WithdrawalHistoryResponse[]> {
    return this.httpClient.get<WithdrawalHistoryResponse[]>('/api/v1/asset/withdrawal-history');
  }
}
