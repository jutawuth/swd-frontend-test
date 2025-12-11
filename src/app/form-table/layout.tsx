import type { Metadata } from 'next';

import FormTableNav from './components/FormTableNav';

export const metadata: Metadata = {
  title: 'Form & Table',
  description: 'Form & Table Demo',
};

export default function FormTableLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <FormTableNav />
      {children}
    </div>
  );
}
