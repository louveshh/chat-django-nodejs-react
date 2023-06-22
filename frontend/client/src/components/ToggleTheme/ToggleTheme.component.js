import ToggleStyled from 'components/common/CommonToggle/CommonToggle.component';
import { pallete } from 'config/config';
import { useToggleTheme } from './toggleTheme.hooks';
import {
  ToggleContainer,
  ToggleWrapper,
  LabelWrapper,
} from './toggleTheme.styles';

const ToggleTheme = () => {
  const { theme, t, handleToggle } = useToggleTheme();
  return (
    <ToggleContainer>
      <ToggleWrapper>
        <LabelWrapper>
          <ToggleStyled
            label={t('toggleTheme.label')}
            aria="Toggle Theme"
            id="toggle-mode"
            checked={theme.name === pallete.light}
            onChange={handleToggle}
          />
        </LabelWrapper>
      </ToggleWrapper>
    </ToggleContainer>
  );
};

export default ToggleTheme;
