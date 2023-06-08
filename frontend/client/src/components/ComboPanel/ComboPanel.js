import { useComboPanel } from './comboPanel.hooks';
import { configMap } from '../../config/config';
import { StyledButton } from './comboPanel.styles';
import { MultiSelectSort } from '../SortableMultiSelect/SortableMultiSelectSort';

const ComboPanel = ({ canvasRef }) => {
  const {
    toClear,
    pathingInProgress,
    activeMode,
    handleAlgorithm,
    handleClear,
  } = useComboPanel(canvasRef);
  return (
    <div>
      {!pathingInProgress &&
        toClear &&
        configMap.clearButton.includes(activeMode) && (
          <StyledButton type="button" className="button" onClick={handleClear}>
            CLEAR
          </StyledButton>
        )}
      <MultiSelectSort />
      <StyledButton type="button" onClick={handleAlgorithm}>
        RUN ALGO
      </StyledButton>
    </div>
  );
};

export default ComboPanel;
