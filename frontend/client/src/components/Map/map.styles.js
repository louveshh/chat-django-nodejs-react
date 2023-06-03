import styled from 'styled-components';
import canvasImage from '../../assets/map.jpg';

export const MapWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BackgroundImage = styled.div`
  margin-top: 0rem;
  margin-bottom: 2rem;
  background-image: url('${canvasImage}');
  background-size: cover;
  background-position: center;

  ${(props) => `
    width: ${props.width || 640}px;
    height: ${props.height || 640}px;
    `}
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
      filter: brightness(0.6) contrast(0.99) hue-rotate(2deg) sepia(10%) drop-shadow(10px 10px 20px #121212);
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
