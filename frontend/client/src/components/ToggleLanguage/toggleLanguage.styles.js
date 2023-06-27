import styled from 'styled-components';
import { configDisplay } from 'config/config';

export const ToggleContainer = styled.div`
  display: flex;
  width: 20%;
  justify-content: start;
  height: 50px;
  min-width: 185px;
  margin-top: 10px;
  @media (max-width: 650px) {
    transform: scale(${configDisplay.SCALE});
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
  cursor: pointer;
`;

export const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`;

export const ToggleSpanIcons = styled.span`
  display: flex;
  justify-content: center;
  align-items: start;
  margin-top: 5px;
  height: 10px;
  width: 10px;
  font-size: 10px;
  color: white;
`;
