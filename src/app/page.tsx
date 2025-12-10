import { Card } from 'antd';
import { cookies } from 'next/headers';
import Link from 'next/link';

import LanguageSwitcher from '@/components/LanguageSwitcher';
import getDict from '@/lib/getDict';
import type { Menu } from './home.type';
import styles from './page.module.scss';

export default async function Home() {
  const locale = cookies().get('i18next')?.value;
  const { menus } = getDict(locale);

  return (
    <div className={styles.page}>
      {/* <Flex className={styles.header} vertical align="flex-end" justify="end">
        <LanguageSwitcher />
      </Flex> */}
      <div className={styles.header}>
        <LanguageSwitcher />
      </div>

      <main className={styles.main}>
        <div className={styles.menus}>
          {menus.map((menu: Menu) => (
            <Link key={menu.key} href={`/${menu.key}`} className={styles.cardLink}>
              <Card title={menu.title} variant="borderless" className={styles.card}>
                {menu.description}
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
