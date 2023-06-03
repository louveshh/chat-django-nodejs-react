import styled from 'styled-components';
import Select from 'react-select';

export const BoardWrapper = styled.div`
  ${(props) => {
    if (!props.active) {
      return `
    visibility: hidden;
      `;
    }
  }}
`;

export const ButtonsWrapper = styled.div`
  height: 50px;
  display: flex;
  align-items: end;
`;

export const StyledSelect = styled(Select)`
  width: 100px;
`;

export const GridContainer = styled.div`
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 640px;
  height: 640px;
  display: grid;
  grid-template-columns: repeat(40, 16px);
  grid-template-rows: repeat(40, 16px);
  border: 1px solid black;
`;
