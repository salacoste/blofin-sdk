import { createHttpClient } from './httpClient';
import { AccountAPI } from './api/account';
import { OrderAPI } from './api/order';
import { MarketAPI } from './api/market';
import { FeesAPI } from './api/fees';
import { LeverageAPI } from './api/leverage';
import { MarginAccountAPI } from './api/marginAccount';
import { MarginLoansAPI } from './api/marginLoans';
import { MarginModeAPI } from './api/marginMode';
import { MarginOrderAPI } from './api/marginOrder';
import { MarginTransactionsAPI } from './api/marginTransactions';
import { PositionAPI } from './api/position';
import { PositionModeAPI } from './api/positionMode';
import { TpslOrderAPI } from './api/tpslOrders';
import { TradeAPI } from './api/trade';

// Объединение всех API в одном клиенте
export const createBlofinClient = (apiKey: string, apiSecret: string) => {
  const httpClient = createHttpClient(apiKey, apiSecret);

  return {
    account: new AccountAPI(httpClient),
    order: new OrderAPI(httpClient),
    market: new MarketAPI(httpClient),
    fees: new FeesAPI(httpClient),
    leverage: new LeverageAPI(httpClient),
    marginAccount: new MarginAccountAPI(httpClient),
    marginLoans: new MarginLoansAPI(httpClient),
    marginMode: new MarginModeAPI(httpClient),
    marginOrder: new MarginOrderAPI(httpClient),
    marginTransactions: new MarginTransactionsAPI(httpClient),
    position: new PositionAPI(httpClient),
    positionMode: new PositionModeAPI(httpClient),
    tpslOrder: new TpslOrderAPI(httpClient),
    trade: new TradeAPI(httpClient),
  };
};

