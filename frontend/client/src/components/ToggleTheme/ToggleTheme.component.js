import 'react-toggle/style.css';
import Toggle from 'react-toggle';
import { useTranslation } from 'react-i18next';
import { useToggleTheme } from './toggleTheme.hooks';
import { ToggleContainer, ToggleWrapper } from './toggleTheme.styles';

const ToggleTheme = () => {
  const { theme, handleToggle } = useToggleTheme();
  const { t } = useTranslation();
  return (
    <ToggleContainer>
      <ToggleWrapper>
        <label htmlFor="toogle-theme">{t('theme')}</label>
        <Toggle
          id="toogle-theme"
          checked={theme.name === 'light'}
          value="yes"
          onChange={() => handleToggle('add')}
        />
      </ToggleWrapper>
    </ToggleContainer>
  );
};

export default ToggleTheme;
