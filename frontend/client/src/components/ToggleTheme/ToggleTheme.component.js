import { useTranslation } from 'react-i18next';
import ToggleStyled from 'components/common/ToggleStyled/ToggleStyled.component';

import { useToggleTheme } from './toggleTheme.hooks';
import { ToggleContainer, ToggleWrapper, LabelWrapper } from './toggleTheme.styles';

const ToggleTheme = () => {
  const { theme, handleToggle } = useToggleTheme();
  const { t } = useTranslation();
  return (
    <ToggleContainer>
      <ToggleWrapper>
        <LabelWrapper>
          <ToggleStyled
            label="Mode"
            id="toggle-mode"
            checked={theme.name === 'light'}
            onChange={handleToggle}
            name="language"
          />
        </LabelWrapper>
      </ToggleWrapper>
    </ToggleContainer>
  );
};

export default ToggleTheme;
