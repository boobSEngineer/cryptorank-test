import styled from "styled-components";

export const BaseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 100%;

  main {
    height: 100%;
    display: flex;
    justify-content: center;
  }
`


export const ComponentWrapper = styled.div`
  background: #fdfdfd;
  height: 100%;
  width: 100%;
  padding: 20px 75px;
  .titleBody {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1.2rem 0;
  }
  .titleBody p {
    cursor: pointer;
    font-weight: 600;
  }
  .titleBody p:hover {
    opacity: 50%;
  }
  @media (max-width: 1000px) {
    padding: 20px 30px;
  }
`

export const ConverterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  
   @media(max-width: 700px) {
    flex-direction: column;
}
`

export const ConverterBody = styled.div`
  width: 100%;
  background: gray;
  display: flex;
  flex-direction: column;
  padding: 0.6em;
  font-size: 1rem;
  color: white;
`

export const InfoBody = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  flex-direction: row;

  .infoOneValue {
    color: #bdbdbd;
    font-size: 1rem;
  }
`

export const GridWrapper = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  
  div {
    padding: 0.25rem 1rem;
    background: white;
    border-radius: 18px;
    color: #333;
    cursor: pointer;
  }
  div:hover {
    opacity: 70%;
  }
  .active {
    background: #7918ee;
    color: white;
  }
`
export const TableWrapper = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  
`

export const InfoTableBody = styled.div`
  display: flex;
  flex-direction: column;
  
  .countRows {
    display: flex;
    justify-content: end;
    align-items: center;
    margin: 1em 0;
  }
  .countRows p {
    margin-right: 1em;
    color: #333;
  }
  .countRows select {
    padding: 0.35rem 0.5rem;
    border: 1.5px solid #333;
    color: #333;
    border-radius: 10px;
  }
  
`
