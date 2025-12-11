import { cookies } from 'next/headers';

import getDict from '@/lib/getDict';

import FormTableStoreProvider from './FormTableStoreProvider';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';
import { DictProvider } from './DictContext';
import { FTDict } from './form-table.type';
import styles from './styles/page.module.scss';

export default async function Home() {
  const locale = cookies().get('i18next')?.value;
  const ftDict = getDict('form-table', locale) as FTDict;

  return (
    <div className={styles.page}>
      <h1>{ftDict.title}</h1>

      <DictProvider dict={ftDict}>
        <FormTableStoreProvider>
          <div className={styles.container}>
            <UserForm />
            <br />
            <UserTable />
          </div>
        </FormTableStoreProvider>
      </DictProvider>
    </div>
  );
}
