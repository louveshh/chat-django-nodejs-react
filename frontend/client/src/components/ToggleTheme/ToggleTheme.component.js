import 'react-toggle/style.css';
import Toggle from 'react-toggle';
import { useTranslation } from 'react-i18next';
import { useToggleTheme } from './toggleTheme.hooks';

import './toggleTheme.styles.css';

const ToggleTheme = () => {
  const { theme, handleToggle } = useToggleTheme();
  const { t } = useTranslation();
  return (
    <div className="toogle-container">
      <div className="toggle-wrapper">
        <label htmlFor="toogle-theme">{t('theme')}</label>
        <Toggle
          id="toogle-theme"
          checked={theme.name === 'light'}
          value="yes"
          onChange={() => handleToggle('add')}
        />
      </div>
    </div>
  );
};

export default ToggleTheme;
