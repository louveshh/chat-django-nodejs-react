import styled from 'styled-components';
import { configDisplay } from '../../config/config';

export const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  @media (max-width: 700px) {
    transform: scale(${configDisplay.SCALE});
    position: absolute;
    top: 10%;
    max-height: 300px;
  }
`;

export const PanelWrapper = styled.div`
  width: 100%;
  position: relative;
  @media (max-width: 700px) {
    position: absolute;
    top: 100%;
  }
`;
