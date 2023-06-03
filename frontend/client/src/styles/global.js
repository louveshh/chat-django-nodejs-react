import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    height:100%;
    min-height:100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
    background-color: ${(props) => props.theme.color.background};
  }

`;
