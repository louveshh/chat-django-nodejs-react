import Toggle from 'react-toggle';
import { useCLick } from './click.hooks';

const Click = () => {
  const { isClickable, handleClick } = useCLick();
  return (
    <div>
      {' '}
      <div className="toggle-wrapper">
        <label htmlFor="toogle-click">Can Click</label>
        <Toggle
          id="toogle-click"
          checked={isClickable}
          value="yes"
          onChange={handleClick}
        />
      </div>
    </div>
  );
};

export default Click;
