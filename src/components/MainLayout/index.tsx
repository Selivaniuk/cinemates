import MotionMain from './MotionMain'

import SidebarProvider from './SidebarProvider'

import Header from 'components/Header'
import Sidebar from 'components/Sidebar'

const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <SidebarProvider>
    <Header />
    <Sidebar />
    <MotionMain>{children}</MotionMain>
  </SidebarProvider>
)

export default MainLayout
