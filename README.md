# Blofin SDK
# Blofin SDK

Blofin SDK is a comprehensive Node.js library for interacting with the Blofin cryptocurrency exchange API. It provides an easy-to-use interface for accessing both REST API endpoints and WebSocket streams.

## Installation

```bash
npm install blofin-sdk
```

## Quick Start

```javascript
import { BlofingClient } from 'blofin-sdk';

const client = new BlofingClient('YOUR_API_KEY', 'YOUR_API_SECRET', 'YOUR_PASSPHRASE');

async function example() {
  try {
    const balance = await client.accountApi.getBalance('futures');
    console.log('Futures account balance:', balance);
  } catch (error) {
    console.error('Error:', error);
  }
}

example();
```

## Features

- Full coverage of Blofin REST API
- WebSocket support for real-time data
- Rate limiting for API requests
- Comprehensive TypeScript support

## Usage

### REST API

The SDK is divided into several modules, each corresponding to a section of the Blofin API:

#### Account API

```javascript
// Get account balance
const balance = await client.accountApi.getBalance('futures');

// Transfer funds
const transferResult = await client.accountApi.transferFunds({
  currency: 'USDT',
  amount: '10',
  fromAccount: 'funding',
  toAccount: 'futures',
});

// Get funds transfer history
const transferHistory = await client.accountApi.getFundsTransferHistory();

// Get withdraw history
const withdrawHistory = await client.accountApi.getWithdrawHistory();

// Get deposit history
const depositHistory = await client.accountApi.getDepositHistory();
```

#### Trading API

```javascript
// Get positions
const positions = await client.tradingApi.getPositions('BTC-USDT');

// Place an order
const orderResult = await client.tradingApi.placeOrder({
  instId: 'BTC-USDT',
  marginMode: 'cross',
  positionSide: 'net',
  side: 'buy',
  orderType: 'limit',
  price: '30000',
  size: '0.001',
});

// Cancel an order
const cancelResult = await client.tradingApi.cancelOrder({
  instId: 'BTC-USDT',
  orderId: 'ORDER_ID',
});

// Get active orders
const activeOrders = await client.tradingApi.getActiveOrders({ instId: 'BTC-USDT' });

// Place multiple orders
const multipleOrdersResult = await client.tradingApi.placeMultipleOrders([
  { /* order 1 params */ },
  { /* order 2 params */ },
]);

// Get order history
const orderHistory = await client.tradingApi.getOrderHistory({ instId: 'BTC-USDT' });

// Get trade history
const tradeHistory = await client.tradingApi.getTradeHistory({ instId: 'BTC-USDT' });
```

#### Public API

```javascript
// Get instruments
const instruments = await client.publicApi.getInstruments('BTC-USDT');

// Get tickers
const tickers = await client.publicApi.getTickers('BTC-USDT');

// Get order book
const orderBook = await client.publicApi.getOrderBook('BTC-USDT', 20);

// Get candlestick data
const candles = await client.publicApi.getCandlesticks('BTC-USDT', '1m');
```

### WebSocket API

```javascript
// Connect to WebSocket
client.webSocket.connect();

// Subscribe to trades
client.webSocket.on('open', () => {
  client.webSocket.subscribeTrades('BTC-USDT');
});

client.webSocket.on('trades', (message) => {
  console.log('Received trades:', message.data);
});

// Subscribe to order book
client.webSocket.subscribeOrderBook('BTC-USDT');

client.webSocket.on('orderbook', (message) => {
  console.log('Received order book:', message.data);
});

// Handle errors
client.webSocket.on('error', (error) => {
  console.error('WebSocket error:', error);
});

// Close connection
client.webSocket.close();
```

## Examples

For more detailed examples, please check the examples directory in this repository:

- Account operations example
- Trading operations example
- WebSocket usage example

## API Documentation

For detailed API documentation, please refer to the generated TypeDoc documentation.

## Error Handling

The SDK uses custom error classes for better error handling. Always wrap your API calls in try-catch blocks:

```javascript
try {
  const result = await client.accountApi.getBalance('futures');
} catch (error) {
  if (error instanceof BlofingApiError) {
    console.error('API Error:', error.message, 'Code:', error.code);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## Rate Limiting

The SDK implements rate limiting to comply with Blofin API restrictions. If you exceed the rate limit, the SDK will automatically delay your requests.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.