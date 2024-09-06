import { AccountAPI } from './api/account';
import { OrderAPI } from './api/order';
import { MarketAPI } from './api/market';
import { MarginOrderAPI } from './api/marginOrder';
import { PositionAPI } from './api/position';
import { MarginAccountAPI } from './api/marginAccount';
import { FeesAPI } from './api/fees';
import { MarginTransactionsAPI } from './api/marginTransactions';
import { MarginLoansAPI } from './api/marginLoans';
import { MarginModeAPI } from './api/marginMode';
import { PositionModeAPI } from './api/positionMode';
import {LeverageAPI} from './api/leverage';
import {TradeAPI} from './api/trade';
import {AssetAPI} from './api/asset';
import {TpslOrderAPI} from './api/tpslOrders';

export const accountAPI = new AccountAPI();
export const orderAPI = new OrderAPI();
export const marketAPI = new MarketAPI();
export const marginOrderAPI = new MarginOrderAPI();
export const positionAPI = new PositionAPI();
export const marginAccountAPI = new MarginAccountAPI();
export const feesAPI = new FeesAPI();
export const marginTransactionsAPI = new MarginTransactionsAPI();
export const marginLoansAPI = new MarginLoansAPI();
export const marginModeAPI = new MarginModeAPI(); // Declare the variable before using it
export const positionModeAPI = new PositionModeAPI(); // Declare the variable before using it
export const leverageAPI = new LeverageAPI(); // Declare the variable before using it
export const tradeAPI = new TradeAPI(); // Declare the variable before using it
export const assetAPI = new AssetAPI(); // Declare the variable before using it
export const tpslOrderAPI = new TpslOrderAPI(); // Declare the variable before using it