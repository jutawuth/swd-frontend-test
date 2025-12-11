'use client';

import { createContext, useContext } from 'react';
import { LSDict } from './layout-style.type';

const DictContext = createContext<LSDict | null>(null);

type ProviderProps = {
  dict: LSDict;
  children: React.ReactNode;
};

export function DictProvider({ dict, children }: ProviderProps) {
  return <DictContext.Provider value={dict}>{children}</DictContext.Provider>;
}

export function useDict(): LSDict {
  const ctx = useContext(DictContext);
  if (!ctx) {
    throw new Error('useShapeDict must be used within a ShapeDictProvider');
  }
  return ctx;
}
