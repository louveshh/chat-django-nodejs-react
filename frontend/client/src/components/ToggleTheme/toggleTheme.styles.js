import styled from 'styled-components';
import { configDisplay } from 'config/config';

export const ToggleContainer = styled.div`
  display: flex;
  width: 20%;
  justify-content: end;
  height: 50px;
  min-width: 185px;
  margin-top: 10px;
  @media (max-width: 650px) {
    transform: scale(${configDisplay.SCALE});
    width: unset;
    min-width: 70px;
    margin-top: 0px;
  }
`;

export const ToggleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  min-width: 120px;
  cursor: pointer;
`;

export const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  min-width: 50px;
`;
