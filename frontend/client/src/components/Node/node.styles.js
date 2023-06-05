import styled from 'styled-components';

export const GridCell = styled.div`
  width: 16px;
  height: 16px;
  border: 1px solid #000000c0;
  font-size: 7px;
  text-align: center;
  display: table;
  border-radius: 35%;
  ${(props) => {
    if (props.isRunning !== 'combo') {
      return `
      border: 1px solid #000000c0;
        `;
    }
  }}
`;
