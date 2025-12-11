'use client';

import { Select } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import '@/lib/i18n';
import styles from './LanguageSwitcher.module.css';

type Props = {
  className?: string;
};

const LanguageSwitcher = ({ className }: Props) => {
  const { t, i18n } = useTranslation('common');
  const router = useRouter();

  useEffect(() => {
    const cookieLangMatch = document.cookie.match(/(?:^|;\s*)i18next=([^;]+)/);
    const cookieLang = cookieLangMatch?.[1];
    if (cookieLang && cookieLang !== i18n.language) {
      i18n.changeLanguage(cookieLang);
    }
  }, [i18n]);

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const handleChange = (locale: 'en' | 'th') => {
    if (locale !== i18n.language) {
      document.cookie = `i18next=${locale}; path=/`;
      i18n.changeLanguage(locale);
      router.refresh();
    }
  };

  return (
    <Select
      className={`${styles.select} ${className ?? ''}`}
      value={i18n.language as 'en' | 'th'}
      onChange={handleChange}
      options={[
        { value: 'en', label: t('english') },
        { value: 'th', label: t('thai') },
      ]}
    />
  );
};

export default LanguageSwitcher;
