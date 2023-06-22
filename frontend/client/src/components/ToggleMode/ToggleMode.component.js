import { mode } from 'config/config';
import { useToggleMode } from './toogleMode.hooks';
import {
  ToggleContainer,
  ToggleWrapper,
  ToggleStyled,
  ToggleStyledWrapper,
} from './toggleMode.styles';

const ToggleMode = () => {
  const { activeMode, t, handleToggle } = useToggleMode();
  return (
    <ToggleContainer>
      <ToggleWrapper>
        {Object.entries(mode).map(([_, value]) => (
          <ToggleStyledWrapper>
            <ToggleStyled
              key={`toggle-${value}`}
              label={t(`toggleMode.${value}`)}
              aria={`Toggle Mode - ${value}`}
              id={`toggle-${value}`}
              checked={activeMode === value}
              onChange={() => handleToggle(`${value}`)}
            />
          </ToggleStyledWrapper>
        ))}
      </ToggleWrapper>
    </ToggleContainer>
  );
};

export default ToggleMode;
