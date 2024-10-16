import WebSocket from 'ws';
import { EventEmitter } from 'events';
import {
  WebSocketMessage,
  TradeMessage,
  OrderBookMessage,
} from '../types/websocket';
import logger from '../utils/logger';


class WebSocketError extends Error {
  constructor(message: string, public code?: number) {
    super(message);
    this.name = 'WebSocketError';
  }
}


class Logger {
  static log(message: string) {
    console.log(`[${new Date().toISOString()}] INFO: ${message}`);
  }

  static error(message: string) {
    console.error(`[${new Date().toISOString()}] ERROR: ${message}`);
  }
}

/**
 * BlofingWebSocket class for handling real-time data from Blofin API
 */

export class BlofingWebSocket extends EventEmitter {
  private ws: WebSocket | null = null;
  private pingInterval: NodeJS.Timeout | null = null;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  private readonly maxRequestsPerHour = 480;
  private requestCount = 0;
  private resetTime: number = Date.now() + 3600000; // 1 hour from now

  /**
   * Creates an instance of BlofingWebSocket
   * @param url - WebSocket URL
   * @param apiKey - Blofin API key
   * @param apiSecret - Blofin API secret
   * @param passphrase - Blofin API passphrase
   */

  constructor(
    private url: string,
    private apiKey: string,
    private apiSecret: string,
    private passphrase: string
  ) {
    super();
  }

  /**
   * Checks and enforces the rate limit for requests.
   *
   * This method increments the request count and throws an error if the
   * maximum number of requests per hour has been exceeded. It also resets
   * the request count and reset time if the current time has passed the
   * reset time.
   *
   * @throws {Error} If the rate limit is exceeded.
   */
  private checkRateLimit() {
    const now = Date.now();
    if (now > this.resetTime) {
      this.requestCount = 0;
      this.resetTime = now + 3600000;
    }

    if (this.requestCount >= this.maxRequestsPerHour) {
      throw new Error('Rate limit exceeded');
    }

    this.requestCount++;
  }

  /**
   * Connects to the WebSocket server
   */
  /**
   * Establishes a WebSocket connection to the specified URL.
   *
   * - On successful connection, it logs the connection status, emits an 'open' event,
   *   performs login, and starts a ping interval.
   * - On receiving a message, it attempts to parse the message as JSON and handles it.
   *   If parsing fails, it logs an error and emits an 'error' event.
   * - On connection close, it logs the disconnection status, emits a 'close' event,
   *   clears the ping interval, and attempts to reconnect.
   * - On connection error, it logs the error and emits an 'error' event.
   *
   * @throws {Error} If the message parsing fails.
   */
  connect() {
    this.ws = new WebSocket(this.url);

    this.ws.on('open', () => {
      console.log('WebSocket connected');
      this.emit('open');
      this.login();
      this.startPingInterval();
      this.reconnectAttempts = 0;

    });

    this.ws.on('message', (data: WebSocket.Data) => {
      try {
        const message = JSON.parse(data.toString());
        this.handleMessage(message);
      } catch (error) {
        logger.error(`Failed to parse message: ${error}`);
        this.emit('error', new WebSocketError('Failed to parse message'));
      }
    });

    this.ws.on('close', (code: number, reason: string) => {
      logger.info(`WebSocket disconnected. Code: ${code}, Reason: ${reason}`);
      this.emit('close', code, reason);
      this.clearPingInterval();
      this.reconnect();
    });

    this.ws.on('error', (error) => {
      logger.error(`WebSocket error: ${error.message}`);
      this.emit('error', new WebSocketError(error.message));
    });
  }

  /**
   * Initiates the login process by generating a timestamp and signature,
   * then sends a login message containing the API key, passphrase, timestamp, and signature.
   *
   * @private
   */
  private login() {
    const timestamp = Date.now().toString();
    const sign = this.generateSignature(timestamp);

    const loginMessage = {
      op: 'login',
      args: [
        {
          apiKey: this.apiKey,
          passphrase: this.passphrase,
          timestamp,
          sign,
        },
      ],
    };

    this.send(loginMessage);
  }

  /**
   * Generates a signature based on the provided timestamp.
   *
   * This method is used to create a signature that matches the REST API signature generation logic.
   *
   * @param timestamp - The timestamp used to generate the signature.
   * @returns The generated signature as a string.
   */
  private generateSignature(timestamp: string): string {
    // Implement signature generation logic here
    // This should match the REST API signature generation
    const signature = `signature_based_on_${timestamp}`;
    return signature;
  }

  /**
   * Subscribes to a specified channel, optionally with an instrument ID.
   *
   * @param channel - The name of the channel to subscribe to.
   * @param instId - Optional. The instrument ID to subscribe to within the channel.
   *
   * @remarks
   * This method checks the rate limit before sending the subscription message.
   *
   * @example
   * ```typescript
   * subscribe('ticker', 'BTC-USD');
   * ```
   */
  subscribe(channel: string, instId?: string) {
    this.checkRateLimit();
    const args: any = { channel };
    if (instId) {
      args.instId = instId;
    }
    const subscribeMessage = {
      op: 'subscribe',
      args: [args],
    };

    this.send(subscribeMessage);
  }

  /**
   * Unsubscribes from a specified channel and optional instrument ID.
   *
   * @param channel - The name of the channel to unsubscribe from.
   * @param instId - Optional. The instrument ID to unsubscribe from within the channel.
   */
  unsubscribe(channel: string, instId?: string) {
    this.checkRateLimit();
    const unsubscribeMessage = {
      op: 'unsubscribe',
      args: [
        {
          channel,
          instId,
        },
      ],
    };

    this.send(unsubscribeMessage);
  }

  /**
   * Sends a message through the WebSocket connection if it is open.
   *
   * @param message - The message to be sent. It will be stringified before sending.
   * @throws Will log an error to the console if the WebSocket is not open.
   */
  private send(message: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not open');
    }
  }

  /**
   * Handles incoming WebSocket messages and emits corresponding events based on the message type.
   *
   * @param message - The incoming WebSocket message.
   * @event 'login' - Emitted when a login event is received.
   * @event 'trades' - Emitted when a trades message is received.
   * @event 'orderbook' - Emitted when an order book message is received.
   * @event 'message' - Emitted for any other type of message.
   */
  private handleMessage(message: any) {
    if (message.event === 'login') {
      logger.info('Successfully logged in');
      this.emit('login');
    } else if (
      message.event === 'subscribe' ||
      message.event === 'unsubscribe'
    ) {
      logger.info(`${message.event} to ${message.arg?.channel}`);
    } else if (message.arg?.channel === 'trades') {
      this.emit('trades', message as TradeMessage);
    } else if (
      message.arg?.channel === 'books' ||
      message.arg?.channel === 'books5'
    ) {
      this.emit('orderbook', message as OrderBookMessage);
    } else {
      this.emit('message', message);
    }
  }

  /**
   * Starts an interval that sends a ping message to the WebSocket server every 30 seconds.
   * This helps to keep the connection alive and detect any disconnections.
   *
   * @private
   */
  private startPingInterval() {
    this.pingInterval = setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.ping();
      }
    }, 30000);
  }

  /**
   * Clears the ping interval if it is set.
   * This method checks if the `pingInterval` is defined and clears it using `clearInterval`.
   * After clearing, it sets `pingInterval` to `null`.
   */
  private clearPingInterval() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }

  /**
   * Attempts to reconnect to the WebSocket server after a delay.
   * Sets a timeout to call the `connect` method after 5 seconds.
   * Logs a message indicating the reconnection attempt.
   *
   * @private
   */
  private reconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      logger.error('Max reconnection attempts reached. Giving up.');
      this.emit('error', new WebSocketError('Max reconnection attempts reached'));
      return;
    }

    const delay = Math.pow(2, this.reconnectAttempts) * 1000; // Exponential backoff
    this.reconnectTimeout = setTimeout(() => {
      logger.info(`Attempting to reconnect (attempt ${this.reconnectAttempts + 1})...`);
      this.reconnectAttempts++;
      this.connect();
    }, delay);
  }

  /**
   * Closes the WebSocket connection and performs necessary cleanup.
   *
   * This method will:
   * - Close the WebSocket connection if it exists.
   * - Clear the ping interval.
   * - Clear the reconnect timeout if it exists.
   */
  close() {
    if (this.ws) {
      this.ws.close();
    }
    this.clearPingInterval();
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }
  }

  /**
   * Subscribes to trade updates for a given instrument.
   *
   * @param instId - The identifier of the instrument to subscribe to.
   */
  subscribeTrades(instId: string) {
    this.subscribe('trades', instId);
  }

  /**
   * Subscribes to the order book for a given instrument ID with a specified depth.
   *
   * @param instId - The instrument ID to subscribe to.
   * @param depth - The depth of the order book to subscribe to. Can be '5' or '200'. Defaults to '200'.
   */
  subscribeOrderBook(instId: string, depth: '5' | '200' = '200') {
    this.subscribe(depth === '5' ? 'books5' : 'books', instId);
  }

  /**
   * Subscribes to candlestick data for a given instrument and interval.
   *
   * @param instId - The identifier of the instrument to subscribe to.
   * @param interval - The interval for the candlestick data (e.g., '1m', '5m', '1h').
   */
  subscribeCandlesticks(instId: string, interval: string) {
    this.subscribe(`candle${interval}`, instId);
  }

  /**
   * Subscribes to ticker updates for a given instrument ID.
   *
   * @param instId - The instrument ID to subscribe to ticker updates for.
   */
  subscribeTickers(instId: string) {
    this.subscribe('tickers', instId);
  }

  /**
   * Subscribes to the funding rate updates for a given instrument.
   *
   * @param instId - The identifier of the instrument to subscribe to.
   */
  subscribeFundingRate(instId: string) {
    this.subscribe('funding-rate', instId);
  }

  /**
   * Subscribes to the 'positions' channel.
   *
   * This method uses the `subscribe` function to listen for updates on the 'positions' channel.
   * It is typically used to receive real-time updates about positions.
   */
  subscribePositions() {
    this.subscribe('positions');
  }

  /**
   * Subscribes to the 'orders' channel.
   * This method uses the `subscribe` function to listen for updates or events related to orders.
   */
  subscribeOrders() {
    this.subscribe('orders');
  }

  /**
   * Subscribes to algorithmic orders updates.
   *
   * This method subscribes to the 'orders-algo' channel to receive updates
   * about algorithmic orders.
   */
  subscribeAlgoOrders() {
    this.subscribe('orders-algo');
  }

  /**
   * Subscribes to the 'account' channel.
   * This method uses the `subscribe` function to listen for updates related to the account.
   */
  subscribeAccount() {
    this.subscribe('account');
  }
}
