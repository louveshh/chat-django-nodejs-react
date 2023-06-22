import ToggleStyled from 'components/common/CommonToggle/CommonToggle.component';
import { useToggleLangauge } from './toggleLanguage.hooks';
import {
  ToggleContainer,
  ToggleWrapper,
  LabelWrapper,
  ToggleSpanIcons,
} from './toggleLanguage.styles';

const ToggleLanguage = () => {
  const { t, language, handleToggle } = useToggleLangauge();
  const toggleIcons = {
    checked: (
      <ToggleSpanIcons aria-label={t('toggleLanguage.pl')}>
        {t('toggleLanguage.pl')}
      </ToggleSpanIcons>
    ),
    unchecked: (
      <ToggleSpanIcons aria-label={t('toggleLanguage.en')}>
        {t('toggleLanguage.en')}
      </ToggleSpanIcons>
    ),
  };
  return (
    <ToggleContainer>
      <ToggleWrapper>
        <LabelWrapper>
          <ToggleStyled
            label={t('toggleLanguage.label')}
            aria="Toggle Language"
            id="toggle-language"
            checked={language === 'pl'}
            onChange={handleToggle}
            icons={toggleIcons}
          />
        </LabelWrapper>
      </ToggleWrapper>
    </ToggleContainer>
  );
};

export default ToggleLanguage;
