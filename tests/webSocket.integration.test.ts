import { BlofingWebSocket } from '../src/modules/webSocket';

describe('BlofingWebSocket Integration', () => {
  let webSocket: BlofingWebSocket;

  beforeEach(() => {
    webSocket = new BlofingWebSocket(
      'wss://openapi.blofin.com/ws/public',
      process.env.API_KEY!,
      process.env.API_SECRET!,
      process.env.PASSPHRASE!
    );
  });

  afterEach(() => {
    webSocket.close();
  });

  test('should connect and subscribe to trades', (done) => {
    webSocket.on('open', () => {
      webSocket.subscribeTrades('BTC-USDT');
    });

    webSocket.on('trades', (message) => {
      expect(message.arg.channel).toBe('trades');
      expect(message.arg.instId).toBe('BTC-USDT');
      expect(Array.isArray(message.data)).toBe(true);
      done();
    });

    webSocket.connect();
  }, 10000); // Increase timeout for network operations

  // Add more integration tests...
});