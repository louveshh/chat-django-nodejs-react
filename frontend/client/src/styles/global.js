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
    min-height:100%;
    height: 100%;
    
    @media (max-width: 700px) {
      min-height:unset;
    }
  }


  body {
    -webkit-font-smoothing: antialiased;
    background-color: ${(props) => props.theme.color.background};
  }

`;
