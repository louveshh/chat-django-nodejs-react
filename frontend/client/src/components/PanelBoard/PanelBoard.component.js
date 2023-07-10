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
    t,
    handleClearGrid,
    handleAlgorithm,
  } = usePanelBoard();
  return (
    <>
      {current && (
        <CommonButton
          type="button"
          onClick={() => handleAlgorithm()}
          inProgress={pathingInProgress}
          disabled={disabled}
        >
          {t('panelBoard.runButton')}
        </CommonButton>
      )}
      {clearing && (
        <CommonButton type="button" onClick={handleClearGrid}>
          {t('panelBoard.clearButton')}
        </CommonButton>
      )}
      {active && (
        <>
          <SelectBoardAlgorithm />
          <SelectBoardDraw />
        </>
      )}
    </>
  );
};

export default PanelBoard;
