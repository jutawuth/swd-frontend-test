'use client';

import { createContext, useContext } from 'react';
import { LSDict } from './layout-style.type';

const ShapeDictContext = createContext<LSDict | null>(null);

type ProviderProps = {
  dict: LSDict;
  children: React.ReactNode;
};

export function ShapeDictProvider({ dict, children }: ProviderProps) {
  return <ShapeDictContext.Provider value={dict}>{children}</ShapeDictContext.Provider>;
}

export function useShapeDict(): LSDict {
  const ctx = useContext(ShapeDictContext);
  if (!ctx) {
    throw new Error('useShapeDict must be used within a ShapeDictProvider');
  }
  return ctx;
}
