import { BlofingWebSocket } from '../src/modules/webSocket';
import WebSocket from 'ws';
import { EventEmitter } from 'events';

jest.mock('ws');

describe('BlofingWebSocket', () => {
  let webSocket: BlofingWebSocket;
  let mockWs: EventEmitter;

  beforeEach(() => {
    webSocket = new BlofingWebSocket('wss://test.com', 'apiKey', 'apiSecret', 'passphrase');
    mockWs = new EventEmitter();
    (WebSocket as unknown as jest.Mock).mockImplementation(() => mockWs);
  });

  test('connect should create a new WebSocket instance', () => {
    webSocket.connect();
    expect(WebSocket).toHaveBeenCalledWith('wss://test.com');
  });

  test('should emit open event when connection is established', (done) => {
    webSocket.on('open', () => {
      expect(true).toBe(true);
      done();
    });

    webSocket.connect();
    mockWs.emit('open');
  });

  test('should attempt to reconnect on close', (done) => {
    jest.useFakeTimers();
    webSocket.connect();

    webSocket.on('close', () => {
      expect(setTimeout).toHaveBeenCalled();
      jest.runOnlyPendingTimers();
      expect(WebSocket).toHaveBeenCalledTimes(2);
      done();
    });

    mockWs.emit('close', 1000, 'Normal closure');
  });

  test('should emit error on message parse failure', (done) => {
    webSocket.on('error', (error) => {
      expect(error.message).toBe('Failed to parse message');
      done();
    });

    webSocket.connect();
    mockWs.emit('message', 'invalid json');
  });

  // Add more unit tests...
});