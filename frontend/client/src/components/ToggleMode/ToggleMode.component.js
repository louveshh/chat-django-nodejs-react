import ToggleStyled from 'components/common/CommonToggle/CommonToggle.component';
import { mode } from 'config/config';
import { useToggleMode } from './toogleMode.hooks';
import { ToggleContainer, ToggleWrapper } from './toggleMode.styles';

const ToggleMode = () => {
  const { activeMode, handleToggle } = useToggleMode();
  return (
    <ToggleContainer>
      <ToggleWrapper>
        {Object.entries(mode).map(([_, value]) => (
          <ToggleStyled
            key={`toggle-${value}`}
            label={value}
            id={`toggle-${value}`}
            checked={activeMode === value}
            onChange={() => handleToggle(`${value}`)}
          />
        ))}
      </ToggleWrapper>
    </ToggleContainer>
  );
};

export default ToggleMode;
