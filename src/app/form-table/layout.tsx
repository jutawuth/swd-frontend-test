import { Button } from 'antd';
import Link from 'next/link';
import styles from './styles/page.module.scss';

export default function FormTableLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className={styles.nav}>
        <Link href={'/'}>
          <Button>Home</Button>
        </Link>
      </div>
      {children}
    </div>
  );
}
