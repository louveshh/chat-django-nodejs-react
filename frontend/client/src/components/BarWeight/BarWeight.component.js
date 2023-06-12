import Toggle from 'react-toggle';

import { useBarWeight } from './barWeight.hooks';

const BarWeight = () => {
  const { weightBar, handleClick, handleBar } = useBarWeight();

  return (
    <div>
      <div className="toggle-wrapper">
        <label htmlFor="toggle-weight">Add Custom Start Point</label>
        <Toggle id="toggle-weight" checked={weightBar} onChange={handleClick} />
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

export default BarWeight;
