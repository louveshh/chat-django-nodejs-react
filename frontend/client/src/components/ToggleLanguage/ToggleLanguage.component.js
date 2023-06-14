import ToggleStyled from 'components/common/CommonToggle/CommonToggle.component';
import { useToggleLangauge } from './toggleLanguage.hooks';
import {
  ToggleContainer,
  ToggleWrapper,
  LabelWrapper,
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
          <ToggleStyled
            label="language"
            id="toggle-language"
            checked={language === 'pl'}
            onChange={handleToggle}
            name="language"
            icons={toggleIcons}
          />
        </LabelWrapper>
      </ToggleWrapper>
    </ToggleContainer>
  );
};

export default ToggleLanguage;
