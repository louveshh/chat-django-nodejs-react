import { useCallback } from 'react';

import {
  setStart,
  setFinish,
  setGrid,
  setToggleRunning,
  setSelectedOption,
  setAlgorithm,
} from '../../store/slices/board';

const updateStart = useCallback((payload) => {
  dispatch(setStart(payload));
}, []);
const updateFinish = useCallback((payload) => {
  dispatch(setFinish(payload));
}, []);
const updateGrid = useCallback((payload) => {
  dispatch(setGrid(payload));
}, []);
const updateToggleRunning = useCallback(() => {
  dispatch(setToggleRunning());
}, []);
const updateSelectedOption = useCallback((payload) => {
  dispatch(setSelectedOption(payload));
}, []);
const updateAlgorithm = useCallback((payload) => {
  dispatch(setAlgorithm(payload));
}, []);
