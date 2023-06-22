import styled from 'styled-components';
import Toggle from 'react-toggle';

export const StyledToggle = styled(Toggle)`
  touch-action: pan-x;
  display: inline-block;
  position: relative;
  cursor: pointer;
  background-color: transparent;
  border: 0;
  padding: 0;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  margin-bottom: 10px;

  &.react-toggle--disabled {
    cursor: not-allowed;
    opacity: 0.5;
    -webkit-transition: opacity 0.25s;
    transition: opacity 0.25s;
  }

  & .react-toggle-track {
    width: 50px;
    height: 24px;
    padding: 0;
    border-radius: 30px;
    background-color: ${(props) => props.theme.toggle.background1};
    -webkit-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    transition: all 0.2s ease;

    &:hover:not(.react-toggle--disabled) {
      background-color: ${(props) => props.theme.toggle.hover};
    }
  }

  &.react-toggle--checked .react-toggle-track {
    background-color: ${(props) => props.theme.toggle.enabled};

    &:hover:not(.react-toggle--disabled) {
      background-color: ${(props) => props.theme.toggle.hover};
    }
  }

  & .react-toggle-track-check {
    position: absolute;
    width: 10px;
    height: 10px;
    top: 0;
    bottom: 0;
    margin-top: auto;
    margin-bottom: auto;
    line-height: 0;
    left: 10px;
    opacity: 1;
    -webkit-transition: opacity 0.25s ease;
    -moz-transition: opacity 0.25s ease;
    transition: opacity 0.25s ease;
  }

  &.react-toggle--checked .react-toggle-track-check {
    opacity: 1;
    -webkit-transition: opacity 0.25s ease;
    -moz-transition: opacity 0.25s ease;
    transition: opacity 0.25s ease;
  }

  & .react-toggle-track-x {
    position: absolute;
    width: 10px;
    height: 10px;
    top: 0;
    bottom: 0;
    margin-top: auto;
    margin-bottom: auto;
    line-height: 0;
    right: 10px;
    opacity: 1;
    -webkit-transition: opacity 0.25s ease;
    -moz-transition: opacity 0.25s ease;
    transition: opacity 0.25s ease;
  }

  &.react-toggle--checked .react-toggle-track-x {
    opacity: 0;
  }

  & .react-toggle-thumb {
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1) 0ms;
    position: absolute;
    top: 1px;
    left: 1px;
    min-width: 22px;
    max-width: 22px;
    height: 22px;
    border: 1px solid ${(props) => props.theme.toggle.background1};
    border-radius: 50%;
    background-color: ${(props) => props.theme.toggle.background2};
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-transition: all 0.25s ease;
    -moz-transition: all 0.25s ease;
    transition: all 0.25s ease;
  }

  &.react-toggle--checked .react-toggle-thumb {
    left: 27px;
  }

  & .react-toggle-screenreader-only {
    /* Hide the screen reader only element */
    display: none;
  }
`;

export const StyledLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: start;
  margin-bottom: 10px;
  height: 10px;
  min-width: 80px;
  color: ${(props) => props.theme.view.white};
`;

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
