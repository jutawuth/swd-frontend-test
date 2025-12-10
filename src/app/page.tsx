'use client';

import { Card, Flex } from 'antd';
import { useTranslation } from 'react-i18next';

import LanguageSwitcher from '@/components/LanguageSwitcher';

import '@/lib/i18n';
import { useRouter } from 'next/navigation';
import { Menu } from './home.type';
import styles from './page.module.scss';

export default function Home() {
  const router = useRouter();

  const { t } = useTranslation(['home', 'common']);
  const menus = t('menus', { returnObjects: true }) as Menu[];

  function handleCardClick(path: string) {
    router.push(`/${path}`);
  }

  return (
    <div className={styles.page}>
      <Flex className={styles.header} vertical align="flex-end" justify="end">
        <LanguageSwitcher className={styles.languageSwitch} />
      </Flex>

      <main className={styles.main}>
        <div className={styles.menus}>
          {menus.map((menu) => (
            <Card
              key={menu.key}
              title={t(`${menu.title}`)}
              variant="borderless"
              className={styles.card}
              onClick={() => handleCardClick(menu.key)}
            >
              {t(`${menu.description}`)}
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
