import {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    border: 0;
  }
  *, *:before, *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  :focus, :active {
    outline: none;
  }
  a:focus, a:active {
    outline: none;
  }
  nav, footer, header, aside {
    display: block;
  }
  html, body {
    height: 100%;
    width: 100%;
    line-height: 1;
    font-size: 14px;
    letter-spacing: 0.15rem;
    -ms-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    font-family: Verdana;
  }
  input, button, textarea {
    font-family: inherit;
  }
  input::-ms-clear {
    display: none;
  }
  button {
    cursor: pointer;
  }
  button::-moz-focus-inner {
    padding: 0;
    border: 0;
  }
  a, a:visited {
    text-decoration: none;
  }
  a:hover {
    text-decoration: none;
  }
  ul li {
    list-style: none;
  }
  img {
    vertical-align: top;
  }

  .prettyScroll::-webkit-scrollbar {
    width: 20px;
  }

  .prettyScroll::-webkit-scrollbar-track {
    background-color: transparent;
  }

  .prettyScroll::-webkit-scrollbar-thumb {
    background-color: gray;
    border-radius: 20px;
    border: 6px solid transparent;
    background-clip: content-box;
  }

  .prettyScroll::-webkit-scrollbar-thumb:hover {
    background-color: #333;
  }
`;
