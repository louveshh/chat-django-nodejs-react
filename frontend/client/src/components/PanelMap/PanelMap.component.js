import CommonButton from 'components/common/CommonButton/CommonButton.component';
import Click from 'components/ToggleClick/ToggleClick.component';
import SelectCity from 'components/SelectCity/SelectCity.component';
import SelectMapAlgorithm from 'components/SelectMapAlgorithm/SelectMapAlgorithm.component';
import BarWeight from 'components/BarWeight/BarWeight.component';
import { usePanelMap } from './panelMap.hooks';

const PanelMap = ({ canvasRef }) => {
  const {
    pathingInProgress,
    algorithm,
    current,
    active,
    clickTsg,
    clickSort,
    clearing,
    disabled,
    handleAlgorithm,
    handleClear,
  } = usePanelMap(canvasRef);
  return (
    <>
      {active && (
        <>
          <SelectMapAlgorithm />
          {algorithm && <Click />}
          {clickTsg && <SelectCity />}
          {clickSort && <BarWeight />}
        </>
      )}
      {clearing && <CommonButton onClick={handleClear}>CLEAR MAP</CommonButton>}
      {current && (
        <CommonButton
          type="button"
          onClick={handleAlgorithm()}
          pathingInProgress={pathingInProgress}
          disabled={disabled}
        >
          RUN
        </CommonButton>
      )}
    </>
  );
};

export default PanelMap;
