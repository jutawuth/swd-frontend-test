'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Provider } from 'react-redux';

import { loadState, makeStore, setupStorePersistence, setAll, setEditing } from './store';

type Props = {
  children: ReactNode;
};

export default function FormTableStoreProvider({ children }: Props) {
  const [store] = useState(() => makeStore());

  useEffect(() => {
    const saved = loadState();
    if (saved?.formTable) {
      store.dispatch(setAll(saved.formTable.users));
      store.dispatch(setEditing(saved.formTable.editing));
    }
    setupStorePersistence(store);
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}
