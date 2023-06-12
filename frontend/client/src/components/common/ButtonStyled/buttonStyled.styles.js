import styled from 'styled-components';

export const CustomButtonWrapper = styled.button`
  position: relative;
  box-sizing: border-box;
  border: 0;
  background: none;
  transition: all 600ms;

  &:before,
  .button-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &:before {
    content: '';
    box-sizing: border-box;
    border: 3px solid #333;
  }

  .top,
  .right,
  .bottom,
  .left {
    transition: all 600ms;
    stroke: #fff;
    stroke-width: 6px;
    stroke-dashoffset: ${({ width }) => width}px;
    stroke-dasharray: ${({ width }) => width}px;
  }

  &:hover .top,
  &:hover .right,
  &:hover .bottom,
  &:hover .left {
    stroke-dashoffset: 0 !important;
  }

  &:hover {
    .top,
    .right,
    .bottom,
    .left {
      transition: all var(--initial-transition);
    }
  }

  &:hover .top {
    stroke-dashoffset: 0 !important;
  }

  &:hover .right {
    stroke-dashoffset: ${({ height }) => height}px;
  }

  &:hover .bottom {
    stroke-dashoffset: ${({ width }) => width}px;
  }

  &:hover .left {
    stroke-dashoffset: 0 !important;
  }
`;

export const CustomSvg = styled.svg`
  position: absolute;
  left: 0;
  top: 0;
  fill: none;
  stroke: #000000;
  stroke-dasharray: 00 500;
  stroke-dashoffset: 300;
  transition: 1s ease-in-out;
`;
