import styled from 'styled-components';

export const SVGWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  max-height: 100%;
  bottom: 0%;
  z-index: -1;
  overflow: hidden;
  @media (max-width: 700px) {
    height: 90%;
  }
  background-color: ${(props) => props.theme.view.background};
`;

export const StyledSVG = styled.svg`
  position: fixed;
  width: 100%;
  height: 100%;
  max-height: 100%;
  bottom: 0%;
  z-index: -1;
  overflow: hidden;
  @media (max-width: 700px) {
    height: 90%;
  }
  background-color: ${(props) => props.theme.view.background};
`;

export const StyledG = styled.g`
  & > use {
    animation: move-forever 40s cubic-bezier(0.75, 0.3, 0.3, 0.75) infinite;
  }
  & > use:nth-child(1) {
    animation-delay: -2s;
    animation-duration: 30s;
  }
  & > use:nth-child(2) {
    animation-delay: -3s;
    animation-duration: 50s;
  }
  & > use:nth-child(3) {
    animation-delay: -4s;
    animation-duration: 70s;
  }
  & > use:nth-child(4) {
    animation-delay: -5s;
    animation-duration: 90s;
  }
  @keyframes move-forever {
    0% {
      transform: translate3d(-90px, 0, 0);
    }
    100% {
      transform: translate3d(85px, 0, 0);
    }
  }
`;

export const StyledDefs = styled.defs``;
export const StyledPath = styled.path``;
