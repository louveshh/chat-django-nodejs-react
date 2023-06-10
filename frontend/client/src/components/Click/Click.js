import Toggle from 'react-toggle';
import { useCLick } from './click.hooks';

const Click = () => {
  const { clickPossible, handleClick } = useCLick();
  return (
    <div>
      <div className="toggle-wrapper">
        <label htmlFor="toggle-click">Add Custom Start Point</label>
        <Toggle id="toggle-click" checked={clickPossible} value="yes" onChange={handleClick} />
      </div>
    </div>
  );
};

export default Click;
