import { useRef } from 'react';
import { useSelector } from 'react-redux';

import { configPanel } from 'config/config';

export const usePanel = () => {
  const { activeMode } = useSelector((state) => state.toggle);
  const canvasRef = useRef(null);
  const isMapActive = configPanel.mapModes.includes(activeMode);
  const isBoardActive = configPanel.boardModes.includes(activeMode);
  const isComboActive = configPanel.comboModes.includes(activeMode);
  const isAddActive = configPanel.addModes.includes(activeMode);
  return { canvasRef, isMapActive, isBoardActive, isComboActive, isAddActive };
};
