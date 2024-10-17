import { BlofingClient } from '../src/BlofingClient';
import dotenv from 'dotenv';

dotenv.config();

const client = new BlofingClient(
  process.env.API_KEY!,
  process.env.API_SECRET!,
  process.env.PASSPHRASE!
);

async function accountExample() {
  try {
    const balance = await client.accountApi.getBalance('futures');
    console.log('Futures account balance:', balance);

    const transferResult = await client.accountApi.transferFunds({
      currency: 'USDT',
      amount: '10',
      fromAccount: 'funding',
      toAccount: 'futures',
    });
    console.log('Transfer result:', transferResult);

    const transferHistory = await client.accountApi.getFundsTransferHistory();
    console.log('Transfer history:', transferHistory);
  } catch (error) {
    console.error('Error:', error);
  }
}

accountExample();