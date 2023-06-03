import 'react-toggle/style.css';

import { useToggleLangauge } from './toggleLanguage.hooks';
import {
  ToggleContainer,
  ToggleWrapper,
  LabelWrapper,
  StyledToggle,
  ToggleSpanIcons,
} from './toggleLanguage.styles';

const toggleIcons = {
  checked: <ToggleSpanIcons aria-label="PL">PL</ToggleSpanIcons>,
  unchecked: <ToggleSpanIcons aria-label="EN">EN</ToggleSpanIcons>,
};

const ToggleLanguage = () => {
  const { t, language, handleToggle } = useToggleLangauge();
  return (
    <ToggleContainer>
      <ToggleWrapper>
        <LabelWrapper>
          <label htmlFor="toogle-language">{t('language')}</label>
          <StyledToggle
            id="toogle-language"
            checked={language === 'pl'}
            onChange={() => handleToggle()}
            name="language"
            icons={toggleIcons}
          />
        </LabelWrapper>
      </ToggleWrapper>
    </ToggleContainer>
  );
};

export default ToggleLanguage;
