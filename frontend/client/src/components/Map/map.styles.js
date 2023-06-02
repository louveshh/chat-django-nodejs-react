import styled from 'styled-components';
import canvasImage from '../../assets/map.jpg';

export const BackgroundImage = styled.div`
  background-image: url('${canvasImage}');
  width: 640px;
  height: 640px;
  background-size: cover;
  background-position: center;
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
      filter: brightness(0.6) contrast(0.99) hue-rotate(2deg) sepia(10%);
        `;
    }
  }}
`;

export const CanvasMap = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  ${(props) => {
    if (props.mode !== 'combo') {
      return `
      border: 1px solid black;
      border-radius: 50%;
        `;
    }
  }}
`;
