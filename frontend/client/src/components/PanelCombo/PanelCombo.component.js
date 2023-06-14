import CommonButton from 'components/common/CommonButton/CommonButton.component';
import { usePanelCombo } from './panelCombo.hooks';
import { MultiSelectSort } from '../SortableMultiSelect/SortableMultiSelectSort.component';

const PanelCombo = ({ canvasRef }) => {
  const {
    clearingMap,
    clearingBoard,
    active,
    disabled,
    pathingInProgress,
    handleAlgorithm,
    handleClearMap,
    handleClearBoard,
  } = usePanelCombo(canvasRef);
  return (
    <>
      <CommonButton
        onClick={handleAlgorithm}
        disabled={disabled}
        pathingInProgress={pathingInProgress}
      >
        RUN
      </CommonButton>
      {clearingMap && (
        <CommonButton onClick={handleClearMap}>Clear Map</CommonButton>
      )}
      {clearingBoard && (
        <CommonButton onClick={() => handleClearBoard(false)}>
          Clear Board
        </CommonButton>
      )}
      {active && <MultiSelectSort />}
    </>
  );
};

export default PanelCombo;
