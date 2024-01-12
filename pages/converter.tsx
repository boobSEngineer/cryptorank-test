import {useState} from "react";
import {Currency} from "@/libs/types";
import {formatAndRoundNumber, covertCurrencyValue} from "@/libs/helpers";
import {converterFetcher} from "@/libs/api";
import {BaseButton, BaseInput, Title} from "@/styles/components/components";
import {
  ComponentWrapper,
  ConverterBody,
  ConverterWrapper,
  GridWrapper,
  InfoBody
} from "@/styles/components/wrappers";
import useSWR from "swr";

export default function Converter(initialData: {currencies: Currency[], totalCurrencyCount: number}) {
  const { data: { currencies: allCurrencies }, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/currencies?api_key=${process.env.NEXT_PUBLIC_API_TOKEN}&limit=10&offset=0`, converterFetcher, {
    fallbackData: initialData,
    revalidateOnMount: initialData.currencies.length == 0
  });

  let [mainValue, setMainValue] = useState<string>('1')

  let [mainCurrencyIndex, setMainCurrencyIndex] = useState<number>(1)
  let [targetCurrencyIndex, setTargetCurrencyIndex] = useState<number>(0)

  let convertedValue = covertCurrencyValue(mainValue, allCurrencies[mainCurrencyIndex], allCurrencies[targetCurrencyIndex]);

  const reset = () => {
    setMainValue('0')
    convertedValue = 0
    setMainCurrencyIndex(1)
    setTargetCurrencyIndex(0)
  }

  if (allCurrencies.length === 0) {
    return <div> Something went wrong </div>
  }

  return (
    <ComponentWrapper>
      <div className={'titleBody'}>
        <Title>Converter</Title>
        <p onClick={() => reset()}>RESET &#10006;</p>
      </div>
      <ConverterWrapper>

        {/*-----------------------MAIN-------------------*/}
        <ConverterBody>
          <InfoContent
            thisCurrencyIndex={mainCurrencyIndex}
            otherCurrencyIndex={targetCurrencyIndex}
            allCurrencies={allCurrencies}
          />

          <BaseInput
            min={0}
            type={'number'}
            onChange={(e) => {
              setMainValue(e.target.value)
            }}
            value={mainValue}
          />
          <GridWrapper>
           {allCurrencies.map((c, i) => {
              return <div
                className={allCurrencies[mainCurrencyIndex].name == c.name ? 'active' : ''}
                onClick={() => setMainCurrencyIndex(i)} key={i}>
                {c.name} </div>
            })}
          </GridWrapper>
        </ConverterBody>

        <BaseButton onClick={() => {
          setTargetCurrencyIndex(mainCurrencyIndex)
          setMainCurrencyIndex(targetCurrencyIndex)
        }}>
          swap
        </BaseButton>

        {/*-----------------------TARGET-------------------*/}
        <ConverterBody>
          <InfoContent
            thisCurrencyIndex={targetCurrencyIndex}
            otherCurrencyIndex={mainCurrencyIndex}
            allCurrencies={allCurrencies}
          />

          <BaseInput
            readOnly
            min={0}
            type={'text'}
            value={formatAndRoundNumber(convertedValue)}
          />
          <GridWrapper>
            {allCurrencies.map((c, i) => {
              return <div
                className={allCurrencies[targetCurrencyIndex].name == c.name ? 'active' : ''}
                onClick={() => setTargetCurrencyIndex(i)} key={i}>
                {c.name} </div>
            })}
          </GridWrapper>
        </ConverterBody>
      </ConverterWrapper>
    </ComponentWrapper>)
}


const InfoContent = ({thisCurrencyIndex, otherCurrencyIndex, allCurrencies}: {allCurrencies: Currency[], thisCurrencyIndex: number, otherCurrencyIndex: number}) => {
  if (allCurrencies[thisCurrencyIndex] == null || allCurrencies[otherCurrencyIndex] == null) return <></>
  return (
    <InfoBody>
      <p>{allCurrencies[thisCurrencyIndex].name}</p>
      <div className={'infoOneValue'}>
        1 {allCurrencies[thisCurrencyIndex]?.symbol}=
        {formatAndRoundNumber(covertCurrencyValue('1', allCurrencies[thisCurrencyIndex], allCurrencies[otherCurrencyIndex]))}
        {allCurrencies[otherCurrencyIndex].symbol}
      </div>

    </InfoBody>
  )
}

Converter.getInitialProps = async () => {
  try {
    return await converterFetcher(`${process.env.NEXT_PUBLIC_API_URL}/currencies?api_key=${process.env.NEXT_PUBLIC_API_TOKEN}&limit=10&offset=0`)
  } catch (e) {
    return {currencies: [], totalCurrencyCount: 0}
  }
};
