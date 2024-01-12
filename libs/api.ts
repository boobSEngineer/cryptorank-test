import {transformCurrencyData} from "@/libs/helpers";

export async function currenciesFetcher(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const {data, meta} = await res.json() || {};
  if (data == null || meta == null) return {currencies: [], totalCurrencyCount: 0}
  return {currencies: transformCurrencyData(data), totalCurrencyCount: meta.count}
}

export async function converterFetcher(url: string) {
  const data = await currenciesFetcher(url);
  data.currencies.unshift({
    id: -1,
    name: "USD",
    symbol: "USD",
    category: 'Currency',
    priceUSD: 1,
    circulatingSupply: -1,
    marketCap: -1,
    percentChange3m: -1,
    percentChange6m: -1,
    percentChange7d: -1,
    percentChange30d: -1,
    percentChange24h: -1
  })
  return data;
}
