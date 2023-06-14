import CommonButton from 'components/common/CommonButton/CommonButton.component';
import Click from 'components/ToggleClick/ToggleClick.component';
import SelectCity from 'components/SelectCity/SelectCity.component';
import SelectMapAlgorithm from 'components/SelectMapAlgorithm/SelectMapAlgorithm.component';
import BarWeight from 'components/BarWeight/BarWeight.component';
import { usePanelMap } from './panelMap.hooks';

const PanelMap = ({ canvasRef }) => {
  const {
    toClear,
    pathingInProgress,
    activeMode,
    algorithm,
    clickPossible,
    handleAlgorithm,
    handleClear,
  } = usePanelMap(canvasRef);
  return (
    <>
      {!toClear && !pathingInProgress && activeMode === 'map' && (
        <>
          <SelectMapAlgorithm />
          {algorithm && <Click />}
          {algorithm === 'tsg' && clickPossible && <SelectCity />}
          {algorithm === 'sort' && clickPossible && <BarWeight />}
        </>
      )}
      {!pathingInProgress && toClear && activeMode === 'map' && (
        <CommonButton type="button" onClick={handleClear}>
          CLEAR MAP
        </CommonButton>
      )}
      {activeMode === 'map' && (
        <CommonButton
          type="button"
          onClick={handleAlgorithm()}
          pathingInProgress={pathingInProgress}
          disabled={!algorithm || pathingInProgress || toClear}
        >
          RUN
        </CommonButton>
      )}
    </>
  );
};

export default PanelMap;
