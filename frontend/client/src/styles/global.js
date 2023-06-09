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
    background-color: ${(props) => props.theme.view.background};
  }
  :root {
    --board-start: ${(props) => props.theme.board.start};
    --board-finish: ${(props) => props.theme.board.finish};
    --board-wall: ${(props) => props.theme.board.wall};
    --board-visited0: ${(props) => props.theme.board.visited0};
    --board-visited25: ${(props) => props.theme.board.visited25};
    --board-visited100: ${(props) => props.theme.board.visited100};
    --board-shortest0: ${(props) => props.theme.board.shortest0};
    --board-shortest50: ${(props) => props.theme.board.shortest50};
    --board-shortest100: ${(props) => props.theme.board.shortest100};
  }

`;
