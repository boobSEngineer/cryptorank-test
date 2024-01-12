import styled from "styled-components";


export const BaseHeader = styled.div`
  background: #333333;
  padding: 1.25em 0;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    margin: 0 20px 0 0;
    color: #fefefe;
    font-size: 1.25rem;
    font-weight: 400;
  }

  a:hover {
    opacity: 70%;
  }

  .active {
    color: #7918ee;
  }


  @media (max-width: 420px) {
    padding: 1em 0;
    a {
      font-size: 1rem;
    }
  }

`


export const Title = styled.h1`
  font-weight: 600;
  color: #333;
  font-size: 2rem;
`

export const BaseButton = styled.button`
  background: #ffffff;
  font-size: 1em;
  margin: 1em;
  padding: 0.7em 1.4em;
  color: #333;
  border: 2px solid #333;

  &:hover {
    color: #7918ee;
    border-color: #7918ee;
  }
`;

export const BaseInput = styled.input`
  cursor: pointer;
  padding: 10px 15px;
  border: 2px solid gray;
  border-radius: 2px;
`

export const Tbody = styled.tbody`
  line-height: 1.25rem;
  cursor: default;
  
  
  th {
    background: gray;
    padding: 10px;
    color: #fdfdfd;
    text-align: left;
    font-weight: 400;
  }
  td {
    padding: 12px 10px;
  }

  tr:nth-child(even){background-color: #f2f2f2;}

  tr:hover {background-color: #ddd;}
  
`

export const BasePagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5em 0;
  padding: 1rem;
  
  p {
    cursor: default;
  }
  .startEnd {
    padding: 5px;
    color: #333;  
    text-align: center;
  }
`
export const MainPage = styled.a<{ $primary?: boolean; }>`
  min-width: 25px;
  text-align: center;
  padding: 5px;
  color : ${props => props.$primary ? "#7918ee": "#333"};
`

export const NextPrev = styled.a<{ disabled: boolean; }>`
  font-size: 1.5rem;
  margin: 0.5rem;
  color : ${props => props.disabled ? "#dcdcdc": "#333"};
  pointer-events: ${props => props.disabled ? 'none': 'all'};
`
