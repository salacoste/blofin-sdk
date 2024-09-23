# Blofin SDK

Blofin SDK is a TypeScript library for interacting with the **Blofin** exchange API. The package provides convenient methods for working with accounts, orders, market data, and many other platform functions.

## Installation

Install the package via npm:

```bash
npm install blofin-sdk
```

## Usage

### Import and Configuration

To get started with the Blofin SDK, import the necessary APIs from the main export file:

```typescript
import { createHttpClient } from 'blofin-sdk';

const apiKey = 'your-api-key';
const apiSecret = 'your-api-secret';

 const client = createHttpClient(apiKey, apiSecret);

 const balance = await client.get('/api/v1/account/balance');
console.log(balance);
```

## API Documentation

### HTTP Client
This SDK uses a shared HTTP client to make requests to the Blofin API. This client encapsulates all the network logic and provides methods for making GET and POST requests.
```
import { createBlofinClient } from 'blofin-sdk';

const apiKey = 'your-api-key';
const apiSecret = 'your-api-secret';

 const client = createBlofinClient(apiKey, apiSecret);

 const balance = await client.account.getBalance();
const openOrders = await client.order.getOpenOrders();
const marketData = await client.market.getTicker('BTCUSDT');

console.log(balance, openOrders, marketData);


```
### 1. AccountAPI

Methods for working with user accounts.

- `getBalance`: Get the account balance.

#### Example:

```typescript
const accountAPI = new AccountAPI();
const balance = await accountAPI.getBalance();
console.log(balance);
```
### 2. AssetAPI 
API for working with asset transfers, deposit history, and withdrawal history.
 

Methods for working with assets.

- `transferFunds`: Transfer funds between accounts.
- `getTransferHistory`: Get transfer history.
- `getDepositHistory`: Get deposit history.
- `getWithdrawalHistory`: Get withdrawal history.

#### Example:

```typescript
const assetAPI = new AssetAPI();
const transferHistory = await assetAPI.getTransferHistory();
console.log(transferHistory);
```

### 3. FeesAPI
This API provides access to fee information on the platform.

Methods for working with fees.

- `getFees`: Get fee information (maker and taker).

#### Example:

```typescript
const feesAPI = new FeesAPI();
const fees = await feesAPI.getFees();
console.log(fees);
```


### 4. LeverageAPI 
This API allows you to manage leverage for different instruments.
 

Methods for working with leverage.

- `getLeverageInfo`: Get information about the current leverage.
- `setLeverage`: Set leverage for a specific instrument.

#### Example:
```
const leverageAPI = new LeverageAPI();
const leverageInfo = await leverageAPI.getLeverageInfo();
console.log(leverageInfo);
```
### 5. MarginAccountAPI 
 
Methods for working with margin accounts.

- `getMarginBalance`: Get margin balance information.

#### Example:

``` 
const marginAccountAPI = new MarginAccountAPI();
const marginBalance = await marginAccountAPI.getMarginBalance();
console.log(marginBalance);
```


### 6. MarginLoansAPI 
API for managing margin loans, including creating and repaying loans.
    
Methods for working with margin loans.

- `getActiveLoans`: Get active loans.
- `borrowMargin`: Create a new margin loan.
- `repayMargin`: Repay a margin loan.

#### Example:

``` 
const marginLoansAPI = new MarginLoansAPI();
const activeLoans = await marginLoansAPI.getActiveLoans();
console.log(activeLoans);
```


### 7. MarginModeAPI 
This API provides management of the margin trading mode.

 

Methods for working with margin trading mode.

- `getMarginMode`: Get the current margin trading mode.
- `setMarginMode`: Set a new margin trading mode.

#### Example:

```typescript
const marginModeAPI = new MarginModeAPI();
const marginMode = await marginModeAPI.getMarginMode();
console.log(marginMode);
```


### 8. MarginOrderAPI
This API is used to manage margin orders.
 

Methods for working with margin orders.

- `createMarginOrder`: Create a new margin order.

#### Example:

```typescript
const marginOrderAPI = new MarginOrderAPI();
const orderResponse = await marginOrderAPI.createMarginOrder({
    symbol: 'BTCUSDT',
    side: 'buy',
    type: 'limit',
    quantity: '1',
    price: '50000',
});
console.log(orderResponse);
```

### 9. MarginTransactionsAPI
This API allows you to retrieve information about margin transactions, such as borrowings and repayments.
### MarginTransactionsAPI

Methods for working with margin transactions.

- `getMarginTransactions`: Get margin transaction history.

#### Example:

```typescript
const marginTransactionsAPI = new MarginTransactionsAPI();
const transactions = await marginTransactionsAPI.getMarginTransactions();
console.log(transactions);
```


### 10. MarketAPI 
This API provides access to market data, such as tickers, trade history, order books, and candlestick charts.

```markdown
### MarketAPI

Methods for working with market data.

- `getTicker`: Get the current ticker price.
- `getTrades`: Get trade history.
- `getInstruments`: Get a list of available instruments.
- `getOrderBook`: Get the order book.
- `getCandlesticks`: Get candlestick data.
- `getFundingRate`: Get the current funding rate.
- `getMarkPrice`: Get the current mark price.

#### Example:

```typescript
const marketAPI = new MarketAPI();
const ticker = await marketAPI.getTicker('BTCUSDT');
console.log(ticker);
```


### 3. OrderAPI 
This API is used for working with orders on the platform.

```markdown
### OrderAPI

Methods for working with orders.

- `createOrder`: Create a new order.
- `getOpenOrders`: Get open orders.
- `getOrderHistory`: Get order history.

#### Example:

```typescript
const orderAPI = new OrderAPI();
const orders = await orderAPI.getOpenOrders();
console.log(orders);
```


### 11. PositionAPI 
This API provides access to managing current positions and closing them.

```markdown
### PositionAPI

Methods for working with positions.

- `getPosition`: Get current positions.
- `closePosition`: Close a position.

#### Example:

```typescript
const positionAPI = new PositionAPI();
const positions = await positionAPI.getPosition();
console.log(positions);
```

### 12. PositionModeAPI
This API provides management of the position mode on the platform.

### PositionModeAPI

Methods for working with position mode.

- `getPositionMode`: Get the current position mode.
- `setPositionMode`: Set a new position mode.

#### Example:

```typescript
const positionModeAPI = new PositionModeAPI();
const positionMode = await positionModeAPI.getPositionMode();
console.log(positionMode);
```


### 13. TpslOrderAPI 
This API provides management of Take-Profit/Stop-Loss (TP/SL) orders.

```markdown
### TpslOrderAPI

Methods for working with TP/SL orders.

- `placeTpslOrder`: Place a TP/SL order.
- `cancelTpslOrder`: Cancel a TP/SL order.
- `getTpslOrderHistory`: Get TP/SL order history.

#### Example:

```typescript
const tpslOrderAPI = new TpslOrderAPI();
const tpslOrderHistory = await tpslOrderAPI.getTpslOrderHistory();
console.log(tpslOrderHistory);
```

### 14. TradeAPI 
This API provides management of trading operations, including placing and canceling orders.

```markdown
### TradeAPI

Methods for working with trading operations.

- `placeBatchOrders`: Place multiple orders.
- `cancelOrder`: Cancel an order.
- `cancelBatchOrders`: Cancel multiple orders.
- `getActiveOrders`: Get active orders.

#### Example:

```typescript
const tradeAPI = new TradeAPI();
const activeOrders = await tradeAPI.getActiveOrders('BTCUSDT');
console.log(activeOrders);
```

// Russian version of README.md

# Blofin SDK

Blofin SDK — это TypeScript библиотека для взаимодействия с API биржи **Blofin**. Пакет предоставляет удобные методы для работы с аккаунтом, ордерами, рыночными данными и многими другими функциями платформы.

## Установка

Установите пакет через npm:

```bash
npm install blofin-sdk
```

## Использование

### Импорт и настройка

Для начала работы с Blofin SDK импортируйте необходимые API из основного экспортного файла:

```typescript
import { createHttpClient } from 'blofin-sdk';

const apiKey = 'your-api-key';
const apiSecret = 'your-api-secret';

 const client = createHttpClient(apiKey, apiSecret);

 const balance = await client.get('/api/v1/account/balance');
console.log(balance);
```

## Документация API

### HTTP-клиент
Этот SDK использует общий HTTP-клиент для выполнения запросов к API Blofin. Этот клиент инкапсулирует всю логику работы с сетью и предоставляет методы для выполнения GET и POST запросов.
```
import { httpClient } from 'blofin-sdk';

// GET запрос
const balance = await httpClient.get('/api/v1/account/balance');

// POST запрос
const orderResponse = await httpClient.post('/api/v1/order', {
  symbol: 'BTCUSDT',
  side: 'buy',
  type: 'limit',
  quantity: '1',
  price: '50000',
});

```
### 1. AccountAPI

Методы для работы с аккаунтами пользователей.

- `getBalance`: Получение баланса аккаунта.

#### Пример:

```typescript
const accountAPI = new AccountAPI();
const balance = await accountAPI.getBalance();
console.log(balance);
```
### 2. AssetAPI 
API для работы с переводами активов, историей депозитов и выводов.
 

Методы для работы с активами.

- `transferFunds`: Перевод средств между счетами.
- `getTransferHistory`: Получение истории переводов.
- `getDepositHistory`: Получение истории депозитов.
- `getWithdrawalHistory`: Получение истории выводов.

#### Пример:

```typescript
const assetAPI = new AssetAPI();
const transferHistory = await assetAPI.getTransferHistory();
console.log(transferHistory);
```

### 3. FeesAPI
Этот API предоставляет доступ к информации о комиссиях на платформе.

Методы для работы с комиссиями.

- `getFees`: Получение информации о комиссиях (maker и taker).

#### Пример:

```typescript
const feesAPI = new FeesAPI();
const fees = await feesAPI.getFees();
console.log(fees);
```


### 4. LeverageAPI 
Этот API позволяет управлять кредитным плечом для разных инструментов.
 

Методы для работы с кредитным плечом.

- `getLeverageInfo`: Получение информации о текущем кредитном плече.
- `setLeverage`: Установка кредитного плеча для конкретного инструмента.

#### Пример:
```
const leverageAPI = new LeverageAPI();
const leverageInfo = await leverageAPI.getLeverageInfo();
console.log(leverageInfo);
```
### 5. MarginAccountAPI 
 
Методы для работы с маржинальными аккаунтами.

- `getMarginBalance`: Получение информации о маржинальных балансах.

#### Пример:

``` 
const marginAccountAPI = new MarginAccountAPI();
const marginBalance = await marginAccountAPI.getMarginBalance();
console.log(marginBalance);
```


### 6. MarginLoansAPI 
API для управления маржинальными займами, включая создание и погашение займов.
  
Методы для работы с маржинальными займами.

- `getActiveLoans`: Получение активных займов.
- `borrowMargin`: Оформление нового маржинального займа.
- `repayMargin`: Погашение маржинального займа.

#### Пример:

``` 
const marginLoansAPI = new MarginLoansAPI();
const activeLoans = await marginLoansAPI.getActiveLoans();
console.log(activeLoans);
```


### 7. MarginModeAPI 
Этот API предоставляет управление режимом маржинальной торговли.

 

Методы для работы с режимом маржинальной торговли.

- `getMarginMode`: Получение текущего режима маржинальной торговли.
- `setMarginMode`: Установка нового режима маржинальной торговли.

#### Пример:

```typescript
const marginModeAPI = new MarginModeAPI();
const marginMode = await marginModeAPI.getMarginMode();
console.log(marginMode);
```


### 8. MarginOrderAPI
Этот API используется для управления маржинальными ордерами.
 

Методы для работы с маржинальными ордерами.

- `createMarginOrder`: Создание нового маржинального ордера.

#### Пример:

```typescript
const marginOrderAPI = new MarginOrderAPI();
const orderResponse = await marginOrderAPI.createMarginOrder({
  symbol: 'BTCUSDT',
  side: 'buy',
  type: 'limit',
  quantity: '1',
  price: '50000',
});
console.log(orderResponse);
```

### 9. MarginTransactionsAPI
Этот API позволяет получать информацию о маржинальных транзакциях, таких как заимствования и погашения.
### MarginTransactionsAPI

Методы для работы с маржинальными транзакциями.

- `getMarginTransactions`: Получение истории маржинальных транзакций.

#### Пример:

```typescript
const marginTransactionsAPI = new MarginTransactionsAPI();
const transactions = await marginTransactionsAPI.getMarginTransactions();
console.log(transactions);
```


### 10. MarketAPI 
Этот API предоставляет доступ к рыночным данным, таким как тикеры, торговая история, стаканы ордеров и свечные графики.

```markdown
### MarketAPI

Методы для работы с рыночными данными.

- `getTicker`: Получение текущей цены тикера.
- `getTrades`: Получение истории сделок.
- `getInstruments`: Список доступных инструментов.
- `getOrderBook`: Получение стакана ордеров.
- `getCandlesticks`: Получение данных по свечам (candlestick).
- `getFundingRate`: Получение текущего funding rate.
- `getMarkPrice`: Получение текущей mark price.

#### Пример:

```typescript
const marketAPI = new MarketAPI();
const ticker = await marketAPI.getTicker('BTCUSDT');
console.log(ticker);
```


### 3. OrderAPI 
Этот API используется для работы с ордерами на платформе.

```markdown
### OrderAPI

Методы для работы с ордерами.

- `createOrder`: Создание нового ордера.
- `getOpenOrders`: Получение открытых ордеров.
- `getOrderHistory`: Получение истории ордеров.

#### Пример:

```typescript
const orderAPI = new OrderAPI();
const orders = await orderAPI.getOpenOrders();
console.log(orders);
```


### 11. PositionAPI 
Этот API предоставляет доступ к управлению текущими позициями и их закрытию.

```markdown
### PositionAPI

Методы для работы с позициями.

- `getPosition`: Получение текущих позиций.
- `closePosition`: Закрытие позиции.

#### Пример:

```typescript
const positionAPI = new PositionAPI();
const positions = await positionAPI.getPosition();
console.log(positions);
```

### 12. PositionModeAPI
Этот API предоставляет управление режимом позиций на платформе.

### PositionModeAPI

Методы для работы с режимом позиций.

- `getPositionMode`: Получение текущего режима позиций.
- `setPositionMode`: Установка нового режима позиций.

#### Пример:

```typescript
const positionModeAPI = new PositionModeAPI();
const positionMode = await positionModeAPI.getPositionMode();
console.log(positionMode);
```


### 13. TpslOrderAPI 
Этот API предоставляет управление ордерами типа Take-Profit/Stop-Loss (TP/SL).

```markdown
### TpslOrderAPI

Методы для работы с TP/SL ордерами.

- `placeTpslOrder`: Размещение ордера TP/SL.
- `cancelTpslOrder`: Отмена TP/SL ордера.
- `getTpslOrderHistory`: Получение истории TP/SL ордеров.

#### Пример:

```typescript
const tpslOrderAPI = new TpslOrderAPI();
const tpslOrderHistory = await tpslOrderAPI.getTpslOrderHistory();
console.log(tpslOrderHistory);
```

### 14. TradeAPI 
Этот API предоставляет управление торговыми операциями, включая размещение и отмену ордеров.

```markdown
### TradeAPI

Методы для работы с торговыми операциями.

- `placeBatchOrders`: Размещение нескольких ордеров.
- `cancelOrder`: Отмена ордера.
- `cancelBatchOrders`: Отмена нескольких ордеров.
- `getActiveOrders`: Получение активных ордеров.

#### Пример:

```typescript
const tradeAPI = new TradeAPI();
const activeOrders = await tradeAPI.getActiveOrders('BTCUSDT');
console.log(activeOrders);
```