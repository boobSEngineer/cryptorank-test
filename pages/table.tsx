import React, {useState} from "react";
import {calcHistoricalPrice, formatAndRoundNumber} from "@/libs/helpers";
import {Currency} from "@/libs/types";
import {Pagination} from "@/components/pagination";
import {converterFetcher, currenciesFetcher} from "@/libs/api";
import {ComponentWrapper, InfoTableBody, TableWrapper} from "@/styles/components/wrappers";
import {Tbody, Title} from "@/styles/components/components";
import useSWR from "swr";

export default function Table(initialProps: {currencies: Currency[], totalCurrencyCount: number}) {
  let [pageSize, setPageSize] = useState<number>(10)
  let [pageOffset, setPageOffset] = useState(0)

  const {data: {currencies: allCurrencies, totalCurrencyCount}, error} = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/currencies?api_key=${process.env.NEXT_PUBLIC_API_TOKEN}&limit=${pageSize}&offset=${pageOffset}`, currenciesFetcher, {
    fallbackData: initialProps,
    revalidateOnMount: false
  })
  
  let curPage = 1 + Math.floor(pageOffset / pageSize)
  let maxPage = Math.ceil(totalCurrencyCount / pageSize)

  if (allCurrencies.length === 0) {
    return <div> Something went wrong </div>
  }

  return <ComponentWrapper>
    <div className={'titleBody'}>
      <Title>Table coins</Title>
    </div>
    <TableWrapper className={'prettyScroll'}>
      <table>
        <Tbody>
          <tr>
            <th>Name</th>
            <th>Price USD</th>
            <th>Circ. Supply</th>
            <th>Market Cap</th>
            <th>Category</th>
            <th>Historic Price 3m</th>
            <th>Historic Price 6m</th>
            <th>Historic Price 7d</th>
            <th>Historic Price 30d</th>
            <th>Historic Price 24h</th>
          </tr>
          {allCurrencies.map((c:Currency) => {
            return <tr key={c.id}>
              <td>{c.name}</td>
              <td>{formatAndRoundNumber(c.priceUSD)}</td>
              <td>{formatAndRoundNumber(c.circulatingSupply)}</td>
              <td>{formatAndRoundNumber(c.marketCap)}</td>
              <td>{c.category}</td>
              <td>{formatAndRoundNumber(calcHistoricalPrice(c.priceUSD, c.percentChange3m))}</td>
              <td>{formatAndRoundNumber(calcHistoricalPrice(c.priceUSD, c.percentChange6m))}</td>
              <td>{formatAndRoundNumber(calcHistoricalPrice(c.priceUSD, c.percentChange7d))}</td>
              <td>{formatAndRoundNumber(calcHistoricalPrice(c.priceUSD, c.percentChange30d))}</td>
              <td>{formatAndRoundNumber(calcHistoricalPrice(c.priceUSD, c.percentChange24h))}</td>
            </tr>
          })}
        </Tbody>
      </table>
    </TableWrapper>
    <InfoTableBody>
      <div className={'countRows'}>
        <p>show rows </p>
        <select id="sel_id" name="sel_name" value={pageSize} onChange={e => setPageSize(parseInt(e.target.value))}>
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
       <Pagination
        curPage={curPage}
        maxPage={maxPage}
        pageOffset={pageOffset}
        pageSize={pageSize}
        setPageOffset={setPageOffset}
      />
    </InfoTableBody>
  </ComponentWrapper>
}

Table.getInitialProps = async () => {
  try {
    return await currenciesFetcher(`${process.env.NEXT_PUBLIC_API_URL}/currencies?api_key=${process.env.NEXT_PUBLIC_API_TOKEN}&limit=10&offset=0`)
  } catch (e) {
    return {currencies: [], totalCurrencyCount: 0}
  }
};
