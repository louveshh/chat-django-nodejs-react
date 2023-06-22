import styled from 'styled-components';

export const ToggleContainer = styled.div`
  display: flex;
  width: 20%;
  justify-content: end;
  height: 50px;
  min-width: 185px;
  @media (max-width: 650px) {
    scale: 0.5;
    width: unset;
    min-width: 70px;
  }
`;

export const ToggleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  min-width: 120px;
`;

export const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  min-width: 50px;
`;
