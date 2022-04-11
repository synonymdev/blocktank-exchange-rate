'use strict'
const { default: axios } = require('axios')
const { toBtc } = require('./sats-convert')
const { default: BigNumber } = require('bignumber.js')

async function callAPI (ticker) {
  try {
    const res = await axios.get('https://api-pub.bitfinex.com/v2/tickers?symbols=' + ticker)
    return res
  } catch (err) {
    console.log('Failed to get FRR')
    console.log(err)
    return null
  }
}

async function getRate (ticker) {
  const data = await callAPI(ticker)
  let res
  if(data.data && data.data[0]){
    res = data.data[0]
  }
  return {
    price: res[7] || null
  }
}

const ExchangeRate = {
  satsToUSD: async (sats) => {
    if (sats === 0) return 0
    const btcUSD = await ExchangeRate.getBtcUsd()
    const btc = toBtc(sats)
    return BigNumber(btc).times(btcUSD.price).toNumber()
  },

  getBtcUsd: () => {
    return getRate('tBTCUSD')
  },

  async getRatesRaw (tickers) {
    const res = await callAPI(tickers)
    return res.data
  }
}
module.exports = ExchangeRate