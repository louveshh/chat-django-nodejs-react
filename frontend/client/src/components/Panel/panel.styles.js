import styled from 'styled-components';
import { configDisplay } from 'config/config';
import { CommonPanel } from '../common/CommonPanel/commonPanel.styles';

export const PanelWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 20px;
  @media (max-width: 1150px) {
    justify-content: center;
    flex-direction: column;
  }
`;

export const LeftPanel = styled(CommonPanel)`
  @media (max-width: 1150px) {
    order: 2;
    width: 70%;
    align-self: center;
    min-height: unset;
    margin: 0px 0px 20px 0px;
  }
  @media (max-width: 700px) {
    width: 100%;
  }
`;
export const MainPanel = styled.div`
  position: relative;
`;

export const RightPanel = styled(CommonPanel)`
  @media (max-width: 1150px) {
    align-self: center;
    order: 3;
    align-items: center;
    width: 70%;
    min-height: ${configDisplay.RIGHT_PANEL_SCALED}px;
    padding: 10px;
    margin: 0px 0px 20px 0px;
    flex-grow: 1;
  }

  @media (max-width: 700px) {
    width: 100%;
  }
`;
