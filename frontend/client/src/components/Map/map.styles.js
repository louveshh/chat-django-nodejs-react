import styled from 'styled-components';

import canvasImage from 'assets/map.jpg';
import { configDisplay } from 'config/config';

export const MapWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 1150px) {
    justify-content: center;
    flex-direction: column;
  }
`;

export const BackgroundImage = styled.div`
  opacity: 1;
  transition: opacity 1s;
  margin-top: 0rem;
  margin-bottom: 2rem;
  background-image: url('${canvasImage}');
  background-size: cover;
  background-position: center;
  width: ${configDisplay.DISPLAY_SIZE}px;
  height: ${configDisplay.DISPLAY_SIZE}px;
  ${(props) => {
    if (!props.active) {
      return `
        visibility: hidden;
          `;
    }
  }}
  ${(props) => {
    if (props.mode !== 'combo') {
      return `
      border-radius: 50%;
      filter: drop-shadow(10px 10px 20px #121212);
        `;
    }
  }}
  ${(props) => {
    if (props.theme === 'dark') {
      return `
      filter: brightness(0.6) contrast(0.99) hue-rotate(2deg) sepia(10%) drop-shadow(10px 10px 20px #121212) !important;
        `;
    }
  }}
`;

export const CanvasMap = styled.canvas`
  position: absolute;
  top: 0%;
  transform: translate(0%, 0%);
  ${(props) => {
    if (props.mode !== 'combo') {
      return `
      border: 1px solid black;
      border-radius: 100%;
        `;
    }
    return `
      border: 1px solid transparent;
      border-radius: 50%;
        `;
  }}
`;

export const RightPanel = styled.div`
  display: flex;
  padding-right: 1rem;
  flex-flow: column;
  width: 210px;
  align-self: stretch;
  justify-content: start;

  @media (max-width: 1150px) {
    flex-flow: row;
    align-self: unset;
    order: 3;
    justify-content: center;
    width: 100%;
    ${(props) => {
      if (props.mode === 'map') {
        return `
        height: 150px;
          `;
      }
    }}
  }
`;

export const StyledButton = styled.button`
  height: 50px;
`;

export const LeftPanel = styled.div`
  width: 210px;
  @media (max-width: 1150px) {
    order: 2;
  }
`;
