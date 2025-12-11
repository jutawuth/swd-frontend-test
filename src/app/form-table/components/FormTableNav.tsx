'use client';

import { Button } from 'antd';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import '@/lib/i18n';
import styles from '../styles/page.module.scss';

export default function FormTableNav() {
  const { t } = useTranslation('common');

  return (
    <div className={styles.nav}>
      <Link href="/">
        <Button>{t('nav.home')}</Button>
      </Link>
    </div>
  );
}
