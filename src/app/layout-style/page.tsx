import { cookies } from 'next/headers';

import getDict from '@/lib/getDict';
import { LSDict } from './layout-style.type';

import ShapeSection from './components/ShapeSection';
import { DictProvider } from './DictContext';
import styles from './styles/page.module.scss';

export default async function Home() {
  const locale = cookies().get('i18next')?.value;
  const lsDict = getDict('layout-style', locale) as LSDict;

  return (
    <div className={styles.page}>
      <h1>{lsDict.title}</h1>

      <DictProvider dict={lsDict}>
        <ShapeSection />
      </DictProvider>
    </div>
  );
}
