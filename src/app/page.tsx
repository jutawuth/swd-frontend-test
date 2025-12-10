import { Card } from 'antd';
import { cookies } from 'next/headers';
import Link from 'next/link';

import getDict from '@/lib/getDict';
import type { IHomeDict, IMenu } from './interface/home.interface';
import styles from './styles/page.module.scss';

export default async function Home() {
  const locale = cookies().get('i18next')?.value;
  const { menus } = getDict('home', locale) as IHomeDict;

  return (
    <div className={styles.page}>
      <div className={styles.menus}>
        {menus.map((menu: IMenu) => (
          <Link key={menu.key} href={`/${menu.key}`} className={styles.cardLink}>
            <Card title={menu.title} variant="borderless" className={styles.card} hoverable>
              {menu.description}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
