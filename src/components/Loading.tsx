'use client';

import { Spin } from 'antd';
import { useEffect, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

export default function Loading({ children }: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255,255,255,0.9)',
          zIndex: 9999,
        }}
      >
        <Spin tip="Loading..." size="large" />
      </div>
    );
  }

  return <>{children}</>;
}
