import Image from 'next/image'
import { ReactNode } from 'react'

import styles from './AuthLayout.module.scss'

export const metadata = {
  title: 'CineMates',
}

type LayoutProps = {
  children: ReactNode
}

const AuthLayout = ({ children }: LayoutProps) => (
  <div className={styles.layout}>
    <div className={styles.modal}>
      <Image src='/Logo_light.png' alt='logo' width={286} height={54} />
      {children}
    </div>
  </div>
)

export default AuthLayout
