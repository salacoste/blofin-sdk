import { BlofingClient } from '../src/BlofingClient';
import dotenv from 'dotenv';

dotenv.config();

const client = new BlofingClient(
  process.env.API_KEY!,
  process.env.API_SECRET!,
  process.env.PASSPHRASE!
);

async function tradingExample() {
  try {
    const positions = await client.tradingApi.getPositions('BTC-USDT');
    console.log('Positions:', positions);

    const orderResult = await client.tradingApi.placeOrder({
      instId: 'BTC-USDT',
      marginMode: 'cross',
      positionSide: 'net',
      side: 'buy',
      orderType: 'limit',
      price: '30000',
      size: '0.001',
    });
    console.log('Order result:', orderResult);

    const activeOrders = await client.tradingApi.getActiveOrders({ instId: 'BTC-USDT' });
    console.log('Active orders:', activeOrders);
  } catch (error) {
    console.error('Error:', error);
  }
}

tradingExample();