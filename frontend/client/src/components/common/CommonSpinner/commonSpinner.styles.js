import styled, { keyframes } from 'styled-components';

const ldsDualRing = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Loader = styled.div`
  position: absolute;
  display: inline-block;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);

  &:after {
    content: ' ';
    display: block;
    width: 32px;
    height: 32px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: ${ldsDualRing} 1.2s linear infinite;
  }
`;
