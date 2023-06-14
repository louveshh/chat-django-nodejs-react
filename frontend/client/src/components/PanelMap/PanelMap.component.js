import CommonButton from 'components/common/CommonButton/CommonButton';

import { usePanelMap } from './panelMap.hooks';

import { StyledButton } from '../Map/map.styles';
import Click from '../ToggleClick/ToggleClick.component';
import SelectCity from '../SelectCity/SelectCity.component';
import SelectMapAlgorithm from '../SelectMapAlgorithm/SelectMapAlgorithm';
import BarWeight from '../BarWeight/BarWeight.component';

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
