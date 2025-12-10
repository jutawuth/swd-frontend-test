import enHome from '@/locales/en/home.json';
import enLayoutStyle from '@/locales/en/layout-style.json';
import thHome from '@/locales/th/home.json';
import thLayoutStyle from '@/locales/th/layout-style.json';

type Dicts = {
  home: typeof enHome;
  'layout-style': typeof enLayoutStyle;
};
type SupportedLocale = 'en' | 'th';

const maps: Record<SupportedLocale, Dicts> = {
  en: { home: enHome, 'layout-style': enLayoutStyle },
  th: { home: thHome, 'layout-style': thLayoutStyle },
};

function resolveLocale(locale?: string): SupportedLocale {
  return locale === 'th' ? 'th' : 'en';
}

export default function getDict(namespace: keyof Dicts, locale?: string) {
  const resolved = resolveLocale(locale);
  return maps[resolved][namespace];
}
