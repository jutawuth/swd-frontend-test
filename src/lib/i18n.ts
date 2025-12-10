import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import type { Resource } from 'i18next';
import enCommon from '@/locales/en/common.json';
import thCommon from '@/locales/th/common.json';
import enHome from '@/locales/en/home.json';
import thHome from '@/locales/th/home.json';

const resources: Resource = {
  en: { common: enCommon, home: enHome },
  th: { common: thCommon, home: thHome },
};

const defaultLng = 'en';

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: defaultLng,
      fallbackLng: defaultLng,
      defaultNS: 'common',
      interpolation: {
        escapeValue: false,
      },
    })
    .catch((error) => {
      console.error('i18n init failed', error);
    });
}

export default i18n;
