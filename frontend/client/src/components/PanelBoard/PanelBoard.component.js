import SelectBoardDraw from 'components/SelectBoardDraw/SelectBoardDraw';
import SelectBoardAlgorithm from 'components/SelectBoardAlgorithm/SelectBoardAlgorithm.component';
import CommonButton from 'components/common/CommonButton/CommonButton';

import { usePanelBoard } from './panelBoard.hooks';

const PanelBoard = () => {
  const { pathingInProgress, activeMode, algorithm, toClear, handleClearGrid, handleAlgorithm } =
    usePanelBoard();
  return (
    <>
      {!pathingInProgress && toClear && activeMode === 'board' && (
        <CommonButton type="button" onClick={handleClearGrid}>
          Clear Grid
        </CommonButton>
      )}
      {!toClear && !pathingInProgress && activeMode === 'board' && (
        <>
          <SelectBoardAlgorithm />
          <SelectBoardDraw />
        </>
      )}

      {activeMode === 'board' && (
        <CommonButton
          type="button"
          onClick={() => handleAlgorithm()}
          pathingInProgress={pathingInProgress}
          disabled={!algorithm || pathingInProgress || toClear}
        >
          Run Board
        </CommonButton>
      )}
    </>
  );
};

export default PanelBoard;
