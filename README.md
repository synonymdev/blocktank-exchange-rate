# Exchange Rate

Call Bitfinex API to get exchange rate for BTC USD (and other tickers).

## How to use

```javascript

const satsUSD = await ExchangeRate.satsToUSD(100000000)
const btcUSDRate = await ExchangeRate.getBtcUsd()
const getRatesRaw = await ExchangeRate.getRatesRaw("bfx tickers")

```