import 'react-toggle/style.css';
import Toggle from 'react-toggle';
import { useTranslation } from 'react-i18next';

import './toggleLanguage.styles.css';
import { useToggleLangauge } from './toggleLanguage.hooks';

const ToggleLanguage = () => {
  const { language, handleToggle } = useToggleLangauge();
  return (
    <div className="toogle-container">
      <div className="toggle-wrapper">
        <span>en</span>
        <label htmlFor="toogle-theme">'</label>
        <Toggle
          id="toogle-theme"
          checked={language === 'pl'}
          onChange={() => handleToggle()}
        />
        <span>pl</span>
      </div>
    </div>
  );
};

export default ToggleLanguage;
