import Toggle from 'react-toggle';

import { useWeightBar } from './weightbar.hooks';

const WeightBar = () => {
  const { weightBar, inputValue, handleClick, handleBar } = useWeightBar();

  return (
    <div>
      <div className="toggle-wrapper">
        <label htmlFor="toggle-weight">Add Custom Start Point</label>
        <Toggle
          id="toggle-weight"
          checked={weightBar}
          value="yes"
          onChange={handleClick}
        />
      </div>
      {weightBar && (
        <>
          <label htmlFor="bar-weight">range</label>
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

export default WeightBar;
