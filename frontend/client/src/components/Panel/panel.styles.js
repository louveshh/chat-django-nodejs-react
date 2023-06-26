import styled from 'styled-components';
import { configDisplay } from 'config/config';

export const PanelWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  @media (max-width: 1150px) {
    justify-content: center;
    flex-direction: column;
  }
`;

export const LeftPanel = styled.div`
  display: flex;
  flex-flow: column;
  width: 20%;
  justify-content: start;
  flex-flow: column;
  align-self: start;
  min-height: ${configDisplay.DISPLAY_SIZE}px;
  margin: 0px 5px;
  padding: 0px 10px;
  border 1px solid ${(props) => props.theme.view.white};;
  border-radius: 5px;
  @media (max-width: 1150px) {
    order: 2;
    width: 50%;
    align-self: center;
    min-height: unset;
    margin: 0px 0px 20px 0px;
  }

`;
export const MainPanel = styled.div``;

export const RightPanel = styled.div`
  display: flex;
  flex-flow: column;
  width: 20%;
  justify-content: start;
  flex-flow: column;
  align-self: start;
  min-height: ${configDisplay.DISPLAY_SIZE}px;
  border 1px solid ${(props) => props.theme.view.white};;
  border-radius: 5px;
  margin: 0px 10px 10px 0px;
  padding: 10px;

  @media (max-width: 1150px) {
    align-self: center;
    order: 3;
    align-items: center;
    width: 50%;
    min-height: ${configDisplay.RIGHT_PANEL_SCALED}px;
    padding: 10px;
    margin: 0px 0px 20px 0px;
    flex-grow: 1;
  }

  @media (max-width: 700px) {
    width: 100%;
  }
`;
