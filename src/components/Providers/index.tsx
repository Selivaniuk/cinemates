import NextAuthProvider from './NextAuthProvider'
import ReduxProvider from './ReduxProvider'

interface ProvidersProps {
  children: React.ReactNode
}
const Providers: React.FC<ProvidersProps> = ({ children }) => (
  <NextAuthProvider>
    <ReduxProvider>{children}</ReduxProvider>
  </NextAuthProvider>
)

export default Providers
