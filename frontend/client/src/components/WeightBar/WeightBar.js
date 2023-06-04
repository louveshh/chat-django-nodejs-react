import { useState } from 'react';

const WeightBar = () => {
  const [inputValue, setInputValue] = useState(0);

  const handleChange = (event) => {
    if (event.target.value === '0') {
      setInputValue(-Infinity);
    } else if (event.target.value === '50') {
      setInputValue(Infinity);
    } else {
      setInputValue(event.target.value);
    }
  };

  return (
    <div>
      <input type="range" min={0} max={50} step={1} onChange={handleChange} />
      <span>{inputValue}</span>
    </div>
  );
};

export default WeightBar;
