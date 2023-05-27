import { ReactNode } from 'react'

import MainLayout from 'components/MainLayout'

export const metadata = {
  title: 'CineMates',
}

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => <MainLayout>{children}</MainLayout>

export default Layout
