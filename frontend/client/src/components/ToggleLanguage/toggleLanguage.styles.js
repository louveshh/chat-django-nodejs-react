import styled from 'styled-components';
import Toggle from 'react-toggle';

export const ToggleContainer = styled.div`
  display: flex;
  width: 20%;
  justify-content: start;
  height: 50px;
`;

export const ToggleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

export const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  min-width: 200px;
`;

export const StyledToggle = styled(Toggle)`
  transform: scale(0.7);
  .react-toggle-track {
    background-color: #ccc;
  }

  .react-toggle-thumb {
    background-color: #ccc;
  }

  &.react-toggle--checked .react-toggle-track {
    background-color: #888;
  }

  &.react-toggle--checked .react-toggle-thumb {
    background-color: #888;
    transform: translateX(10px);
  }

  &:hover .react-toggle-track {
    background-color: #888;
  }

  &:hover .react-toggle-thumb {
    background-color: #888;
  }

  &:hover .react-toggle-track.react-toggle--checked {
    background-color: #ff0;
  }

  &:hover .react-toggle-thumb.react-toggle--checked {
    background-color: #f80;
  }
  &:hover:not(.react-toggle--disabled) .react-toggle-track {
    background-color: white;
  }
  .react-toggle-track {
    width: 60px; /* Adjust the width as per your preference */
  }
`;

export const ToggleSpanIcons = styled.span`
  display: flex;
  justify-content: center;
  align-items: start;
  margin-top: 5px;
  height: 10px;
`;
