'use client';

import { createContext, useContext } from 'react';
import { FTDict } from './form-table.type';

const DictContext = createContext<FTDict | null>(null);

type ProviderProps = {
  dict: FTDict;
  children: React.ReactNode;
};

export function DictProvider({ dict, children }: ProviderProps) {
  return <DictContext.Provider value={dict}>{children}</DictContext.Provider>;
}

export function useDict(): FTDict {
  const ctx = useContext(DictContext);
  if (!ctx) {
    throw new Error('useShapeDict must be used within a ShapeDictProvider');
  }
  return ctx;
}
