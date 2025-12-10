import enHome from '@/locales/en/home.json';
import thHome from '@/locales/th/home.json';

type Dict = typeof enHome;
type SupportedLocale = 'en' | 'th';

const maps: Record<SupportedLocale, Dict> = {
  en: enHome,
  th: thHome,
};

function resolveLocale(locale?: string): SupportedLocale {
  return locale === 'th' ? 'th' : 'en';
}

export default function getDict(locale?: string): Dict {
  const resolved = resolveLocale(locale);
  return maps[resolved];
}
