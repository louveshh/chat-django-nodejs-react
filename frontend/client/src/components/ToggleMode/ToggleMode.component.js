import 'react-toggle/style.css';
import Toggle from 'react-toggle';
import { useToggleMode } from './toogleMode.hooks';
import { ToggleContainer, ToggleWrapper } from './toggleMode.styles';

const ToggleMode = () => {
  const { activeMode, handleToggle } = useToggleMode();
  return (
    <ToggleContainer>
      <ToggleWrapper>
        <label htmlFor="toogle-display">display</label>
        <Toggle
          id="toogle-display"
          checked={activeMode === 'display'}
          value="yes"
          onChange={() => handleToggle('display')}
        />
      </ToggleWrapper>
      <ToggleWrapper>
        <label htmlFor="toogle-board">board</label>
        <Toggle
          id="toogle-board"
          checked={activeMode === 'board'}
          value="yes"
          onChange={() => handleToggle('board')}
        />
      </ToggleWrapper>
      <ToggleWrapper>
        <label htmlFor="toogle-map">map</label>
        <Toggle
          id="toogle-map"
          checked={activeMode === 'map'}
          value="yes"
          onChange={() => handleToggle('map')}
        />
      </ToggleWrapper>
      <ToggleWrapper>
        <label htmlFor="toogle-combo">combo</label>
        <Toggle
          id="toogle-combo"
          checked={activeMode === 'combo'}
          value="yes"
          onChange={() => handleToggle('combo')}
        />
      </ToggleWrapper>
      <ToggleWrapper>
        <label htmlFor="toogle-add">add</label>
        <Toggle
          id="toogle-add"
          checked={activeMode === 'add'}
          value="yes"
          onChange={() => handleToggle('add')}
        />
      </ToggleWrapper>
    </ToggleContainer>
  );
};

export default ToggleMode;
