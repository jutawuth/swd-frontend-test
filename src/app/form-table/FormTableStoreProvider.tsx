'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Provider } from 'react-redux';

import { loadState, makeStore, setupStorePersistence } from './store';

type Props = {
  children: ReactNode;
};

export default function FormTableStoreProvider({ children }: Props) {
  const [store] = useState(() => makeStore(loadState()));

  useEffect(() => {
    setupStorePersistence(store);
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}
