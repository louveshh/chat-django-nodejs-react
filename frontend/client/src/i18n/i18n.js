import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en.json';
import translationPL from './locales/pl.json';
import { store } from '../store/store';

const resources = {
  en: {
    translation: translationEN,
  },
  pl: {
    translation: translationPL,
  },
};

const initI18n = () => {
  const lng = store?.getState()?.toggle?.language || 'en';

  return i18n.use(initReactI18next).init({
    fallbackLng: 'en',
    debug: true,
    resources,
    lng,
  });
};

export default initI18n;
