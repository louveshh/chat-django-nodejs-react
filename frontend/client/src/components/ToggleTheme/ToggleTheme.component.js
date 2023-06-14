import { useTranslation } from 'react-i18next';
import ToggleStyled from 'components/common/CommonToggle/CommonToggle.component';

import { useToggleTheme } from './toggleTheme.hooks';
import {
  ToggleContainer,
  ToggleWrapper,
  LabelWrapper,
} from './toggleTheme.styles';

const ToggleTheme = () => {
  const { theme, handleToggle } = useToggleTheme();
  const { t } = useTranslation();
  return (
    <ToggleContainer>
      <ToggleWrapper>
        <LabelWrapper>
          <ToggleStyled
            label={t('theme')}
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
