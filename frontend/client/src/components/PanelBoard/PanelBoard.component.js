import SelectBoardDraw from 'components/SelectBoardDraw/SelectBoardDraw';
import SelectBoardAlgorithm from 'components/SelectBoardAlgorithm/SelectBoardAlgorithm.component';
import CommonButton from 'components/common/CommonButton/CommonButton.component';
import { usePanelBoard } from './panelBoard.hooks';

const PanelBoard = () => {
  const {
    pathingInProgress,
    clearing,
    active,
    current,
    disabled,
    handleClearGrid,
    handleAlgorithm,
  } = usePanelBoard();
  return (
    <>
      {clearing && (
        <CommonButton type="button" onClick={handleClearGrid}>
          Clear Grid
        </CommonButton>
      )}
      {active && (
        <>
          <SelectBoardAlgorithm />
          <SelectBoardDraw />
        </>
      )}

      {current && (
        <CommonButton
          type="button"
          onClick={() => handleAlgorithm()}
          pathingInProgress={pathingInProgress}
          disabled={disabled}
        >
          Run Board
        </CommonButton>
      )}
    </>
  );
};

export default PanelBoard;
