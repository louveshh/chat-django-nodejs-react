import styled from 'styled-components';
import Select from 'react-select';

import { configDisplay } from 'config/config';

export const ButtonsWrapper = styled.div`
  height: 200px;
  display: flex;
  align-items: start;
`;

export const CommonSelect = styled(Select)`
  width: 100px;
`;

export const GridContainer = styled.div`
  ${(props) => {
    if (!props.active) {
      return `
        visibility: hidden;
    `;
    }
  }}
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 0%);
  width: ${configDisplay.DISPLAY_SIZE}px;
  height: ${configDisplay.DISPLAY_SIZE}px;
  display: grid;
  cursor: pointer;
  grid-template-columns: repeat(
    ${configDisplay.AMOUNT_OF_CELLS},
    ${configDisplay.NODE_SIZE()}px
  );
  grid-template-rows: repeat(
    ${configDisplay.AMOUNT_OF_CELLS},
    ${configDisplay.NODE_SIZE()}px
  );
`;
