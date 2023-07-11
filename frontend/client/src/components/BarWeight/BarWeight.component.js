import CommonToggle from 'components/common/CommonToggle/CommonToggle.component';
import CommonBar from 'components/common/CommonBar/CommonBar.component';
import { useBarWeight } from './barWeight.hooks';

const BarWeight = () => {
  const { weightBar, t, handleClick, handleBar } = useBarWeight();

  return (
    <>
      <CommonToggle
        id="toggle-weight"
        checked={weightBar}
        onChange={handleClick}
        label={t('barWeight.toggle')}
        aria="Toggle Add Weight"
      />
      {weightBar && (
        <CommonBar
          id="bar-weight"
          label={t('barWeight.label')}
          aria="Input Weight"
          onChange={handleBar}
          min={0}
          max={50}
          step={1}
          defaultValue={0}
          value
        />
      )}
    </>
  );
};

export default BarWeight;
