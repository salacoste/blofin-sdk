import { BlofingWebSocket } from '../src/modules/webSocket';
import WebSocket from 'ws';

jest.mock('ws');

describe('BlofingWebSocket', () => {
  let webSocket: BlofingWebSocket;

  beforeEach(() => {
    webSocket = new BlofingWebSocket(
      'wss://test.com',
      'apiKey',
      'apiSecret',
      'passphrase'
    );
  });

  test('connect should create a new WebSocket instance', () => {
    webSocket.connect();
    expect(WebSocket).toHaveBeenCalledWith('wss://test.com');
  });

  test('subscribe should send a subscribe message', () => {
    const mockSend = jest.fn();
    (webSocket as any).ws = { readyState: WebSocket.OPEN, send: mockSend };

    webSocket.subscribe('trades', 'BTC-USDT');

    expect(mockSend).toHaveBeenCalledWith(
      JSON.stringify({
        op: 'subscribe',
        args: [{ channel: 'trades', instId: 'BTC-USDT' }],
      })
    );
  });

  // Add more tests for other methods and scenarios
});
