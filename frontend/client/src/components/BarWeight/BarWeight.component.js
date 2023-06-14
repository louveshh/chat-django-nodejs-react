import ToggleStyled from 'components/common/CommonToggle/CommonToggle.component';
import { useBarWeight } from './barWeight.hooks';

const BarWeight = () => {
  const { weightBar, t, handleClick, handleBar } = useBarWeight();

  return (
    <div>
      <div className="toggle-wrapper">
        <ToggleStyled
          id="toggle-weight"
          checked={weightBar}
          onChange={handleClick}
          label={t('barWeight.toggle')}
        />
      </div>
      {weightBar && (
        <>
          <label htmlFor="bar-weight">{t('barWeight.label')}</label>
          <input
            type="range"
            min={0}
            max={50}
            step={1}
            id="bar-weight"
            onChange={handleBar}
            defaultValue={0}
          />
        </>
      )}
    </div>
  );
};

export default BarWeight;
