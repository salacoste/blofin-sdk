import { BlofingClient } from '../../src/BlofingClient';
import dotenv from 'dotenv';

dotenv.config();

const client = new BlofingClient(
  process.env.API_KEY!,
  process.env.API_SECRET!,
  process.env.PASSPHRASE!
);

client.webSocket.on('open', () => {
  console.log('WebSocket connected');
  client.webSocket.subscribeTrades('BTC-USDT');
  client.webSocket.subscribeOrderBook('BTC-USDT');
});

client.webSocket.on('trades', (message) => {
  console.log('Received trades:', message.data);
});

client.webSocket.on('orderbook', (message) => {
  console.log('Received order book:', message.data);
});

client.webSocket.on('error', (error) => {
  console.error('WebSocket error:', error);
});

client.webSocket.connect();

// Keep the script running
process.on('SIGINT', () => {
  console.log('Closing WebSocket connection');
  client.webSocket.close();
  process.exit();
});