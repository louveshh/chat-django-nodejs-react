import CommonButton from 'components/common/CommonButton/CommonButton.component';
import { usePanelCombo } from './panelCombo.hooks';
import { SelectMultiCities } from '../SelectMultiCities/SelectMultiCities.component';

const PanelCombo = ({ canvasRef }) => {
  const {
    clearingMap,
    clearingBoard,
    active,
    disabled,
    pathingInProgress,
    t,
    handleAlgorithm,
    handleClearMap,
    handleClearBoard,
  } = usePanelCombo(canvasRef);
  return (
    <>
      <CommonButton
        onClick={handleAlgorithm}
        disabled={disabled}
        inProgress={pathingInProgress}
      >
        {t('panelCombo.runButton')}
      </CommonButton>
      {clearingMap && (
        <CommonButton onClick={handleClearMap}>
          {t('panelCombo.clearMapButton')}
        </CommonButton>
      )}
      {clearingBoard && (
        <CommonButton onClick={() => handleClearBoard(false)}>
          {t('panelCombo.clearBoardButton')}
        </CommonButton>
      )}
      {active && <SelectMultiCities />}
    </>
  );
};

export default PanelCombo;
