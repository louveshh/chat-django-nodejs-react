import 'react-toggle/style.css';
import Toggle from 'react-toggle';
import './toggleMode.css';
import { useToggleMode } from './toogleMode.hooks';

const ToggleMode = () => {
  const { activeMode, handleToggle } = useToggleMode();
  return (
    <div className="toogle-container">
      <div className="toggle-wrapper">
        <label htmlFor="toogle-display">display</label>
        <Toggle
          id="toogle-display"
          checked={activeMode === 'display'}
          value="yes"
          onChange={() => handleToggle('display')}
        />
      </div>
      <div className="toggle-wrapper">
        <label htmlFor="toogle-board">board</label>
        <Toggle
          id="toogle-board"
          checked={activeMode === 'board'}
          value="yes"
          onChange={() => handleToggle('board')}
        />
      </div>
      <div className="toggle-wrapper">
        <label htmlFor="toogle-map">map</label>
        <Toggle
          id="toogle-map"
          checked={activeMode === 'map'}
          value="yes"
          onChange={() => handleToggle('map')}
        />
      </div>
      <div className="toggle-wrapper">
        <label htmlFor="toogle-combo">combo</label>
        <Toggle
          id="toogle-combo"
          checked={activeMode === 'combo'}
          value="yes"
          onChange={() => handleToggle('combo')}
        />
      </div>
      <div className="toggle-wrapper">
        <label htmlFor="toogle-add">add</label>
        <Toggle
          id="toogle-add"
          checked={activeMode === 'add'}
          value="yes"
          onChange={() => handleToggle('add')}
        />
      </div>
    </div>
  );
};

export default ToggleMode;
