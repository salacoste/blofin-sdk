# WebSocket Example

This example demonstrates how to use the BlofingClient to connect to a WebSocket and subscribe to trade updates for the BTC-USDT pair.

```javascript
const client = new BlofingClient(
  'your-api-key',
  'your-api-secret',
  'your-passphrase'
);

client.webSocket.on('open', () => {
  console.log('WebSocket connected');
  client.webSocket.subscribe('trades', 'BTC-USDT');
});

client.webSocket.on('message', (message) => {
  console.log('Received message:', message);
});

client.webSocket.on('error', (error) => {
  console.error('WebSocket error:', error);
});

client.webSocket.connect();

// Later, when you're done:
client.webSocket.close();
```

### Features

This implementation provides basic WebSocket functionality, including:

- **Connection and authentication**: Establishes a connection to the WebSocket server and authenticates using provided API credentials.
- **Subscription and unsubscription to channels**: Allows subscribing to and unsubscribing from specific channels, such as trade updates.
- **Automatic reconnection on disconnection**: Automatically attempts to reconnect if the WebSocket connection is lost.
- **Ping/pong to keep the connection alive**: Sends periodic ping/pong messages to ensure the connection remains active.
