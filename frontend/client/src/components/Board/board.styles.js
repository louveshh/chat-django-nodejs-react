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
  position: absolute;
  top: 96%;
  height: 50px;
  display: flex;
  align-items: end;
  left: 50%;
  @media (max-width: 1100px) {
    top: 76%;
  }
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
