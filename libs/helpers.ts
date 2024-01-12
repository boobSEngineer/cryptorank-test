import {Currency} from "@/libs/types";

//for converter + table
export function formatAndRoundNumber(x: number): string {
  if (Math.abs(x) < 1e-15)
    return '0'
  if (x < 0) {
    return '-' + formatAndRoundNumber(-x)
  }
  let i = 0
  let postfix = ''

  if (x >= 1e12) {
    postfix = 'T'
    x /= 1e12
  }
  else if (x >= 1e9) {
    postfix = 'B'
    x /= 1e9
  }
  else if (x >= 1e6) {
    postfix = 'M'
    x /= 1e6
  }

  if (x >= 1e3) {
    return x.toFixed(0) + postfix
  }
  else if (x >= 1) {
    return x.toFixed(2) + postfix
  }

  let p = 1
  while (true) {
    if (x > p) {
      return x.toFixed(i + 1).replace(/\.0000000+/g, ',00...0')
    }
    p /= 10
    i++
  }
}

//for converter
export function covertCurrencyValue (value: string, thisCurrency: Currency | null, otherCurrency: Currency | null): number {
  if (thisCurrency == null || otherCurrency == null) {
    return parseFloat(value) || 0
  }
  return parseFloat(value) * (thisCurrency.priceUSD / otherCurrency.priceUSD)
}

//for table
export function calcHistoricalPrice(curPrice: number, percentChange: number): number {
  return curPrice / (1 + percentChange / 100)
}

//for converter + table
export function transformCurrencyData (data: any[]): Currency[] {
  if (data == null) return []
  return data.map((c: any) => {
    return {
      id: c.id,
      priceUSD: c.values.USD.price,
      marketCap: c.values.USD.marketCap,
      name: c.name,
      symbol: c.symbol,
      category: c.category,
      circulatingSupply: c.circulatingSupply || 0,
      percentChange3m: c.values.USD.percentChange3m,
      percentChange6m: c.values.USD.percentChange6m,
      percentChange7d: c.values.USD.percentChange7d,
      percentChange24h: c.values.USD.percentChange24h,
      percentChange30d: c.values.USD.percentChange30d,
    }
  })
}


