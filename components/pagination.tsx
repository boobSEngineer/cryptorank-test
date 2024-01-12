import {BasePagination, MainPage, NextPrev} from "@/styles/components/components";
import Link from "next/link";

interface IPagination {
  curPage: number,
  maxPage: number,
  setPageOffset: (v: number) => void,
  pageOffset: number,
  pageSize: number
}
export function Pagination ({curPage, maxPage, setPageOffset, pageOffset, pageSize}: IPagination) {
  return (
    <BasePagination>
      {/*-----------prev---------*/}
      <NextPrev disabled={curPage == 1} onClick={()=>{
        setPageOffset(pageOffset-pageSize)
      }} href="#">&laquo;</NextPrev>

      {/*-----------start---------*/}
      {curPage >= 4 && <Link className={'startEnd'} href='' onClick={(e) => setPageOffset(0)}>1</Link>}
      {curPage > 4 && <p>...</p>}

      {/*-----------main---------*/}
      {[-2, -1, 0, 1, 2].map(c=> {
        if (curPage + c < 1) return null
        if (curPage + c > maxPage) return null
        return <MainPage $primary={curPage === c + curPage} key={c} onClick={() => {
          setPageOffset(((curPage + c) - 1) * pageSize)
        }} href="#"> {curPage + c} </MainPage>
      })}

      {/*-----------end---------*/}
      {curPage < maxPage - 3 && <p>...</p>}
      {curPage <= maxPage - 3 && <Link className={'startEnd'} href='#'
          onClick={() => setPageOffset(pageSize * (maxPage - 1))}>
        {maxPage}</Link>}

      {/*-----------next---------*/}
      <NextPrev disabled={curPage == maxPage} onClick={() => {
        setPageOffset(pageOffset + pageSize)
      }} href="#">&raquo;</NextPrev>
    </BasePagination>
  )
}
