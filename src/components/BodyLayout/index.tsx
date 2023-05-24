import MotionMain from './MotionMain'

import SidebarProvider from './SidebarProvider'

import Header from 'components/Header'
import Sidebar from 'components/Sidebar'

interface BodyLayoutProps {
  children: React.ReactNode
}

const BodyLayout: React.FC<BodyLayoutProps> = ({ children }) => (
  <SidebarProvider>
    <Header />
    <Sidebar />
    <MotionMain>{children}</MotionMain>
  </SidebarProvider>
)

export default BodyLayout
