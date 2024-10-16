import axios, { AxiosInstance } from 'axios';
import crypto from 'crypto';

import { PublicApi } from './modules/publicApi';
import { AccountApi } from './modules/accountApi';
import { TradingApi } from './modules/tradingApi';
import { AffiliateApi } from './modules/affiliateApi';
import { UserApi } from './modules/userApi';

import { BlofingWebSocket } from './modules/webSocket';

export class BlofingClient {
  private readonly apiKey: string;
  private readonly apiSecret: string;
  private readonly passphrase: string;
  private readonly baseUrl: string;
  private readonly axiosInstance: AxiosInstance;

  public readonly publicApi: PublicApi;
  public readonly accountApi: AccountApi;
  public readonly tradingApi: TradingApi;
  public readonly affiliateApi: AffiliateApi;
  public readonly userApi: UserApi;
  public readonly webSocket: BlofingWebSocket;

  constructor(
    apiKey: string,
    apiSecret: string,
    passphrase: string,
    testnet: boolean = false
  ) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.passphrase = passphrase;
    this.baseUrl = testnet
      ? 'https://demo-trading-openapi.blofin.com'
      : 'https://openapi.blofin.com';
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const wsUrl = testnet
      ? 'wss://demo-trading-openapi.blofin.com/ws/public'
      : 'wss://openapi.blofin.com/ws/public';
    this.webSocket = new BlofingWebSocket(wsUrl, apiKey, apiSecret, passphrase);

    this.publicApi = new PublicApi(this);
    this.accountApi = new AccountApi(this);
    this.tradingApi = new TradingApi(this);
    this.affiliateApi = new AffiliateApi(this);
    this.userApi = new UserApi(this);
  }

  private sign(
    timestamp: string,
    method: string,
    requestPath: string,
    body: string = ''
  ): string {
    const message = timestamp + method + requestPath + body;
    return crypto
      .createHmac('sha256', this.apiSecret)
      .update(message)
      .digest('base64');
  }

  async request(
    method: string,
    endpoint: string,
    data: any = null
  ): Promise<any> {
    const timestamp = Date.now().toString();
    const signature = this.sign(
      timestamp,
      method,
      endpoint,
      JSON.stringify(data)
    );

    const headers = {
      'ACCESS-KEY': this.apiKey,
      'ACCESS-SIGN': signature,
      'ACCESS-TIMESTAMP': timestamp,
      'ACCESS-PASSPHRASE': this.passphrase,
      'ACCESS-NONCE': crypto.randomBytes(16).toString('hex'),
    };

    try {
      const response = await this.axiosInstance.request({
        method,
        url: endpoint,
        data,
        headers,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          `Blofin API error: ${error.response.status} - ${JSON.stringify(error.response.data)}`
        );
      }
      throw error;
    }
  }
}
