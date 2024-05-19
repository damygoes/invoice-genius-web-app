import { ENV_VARIABLES } from '@/lib/env'
import { KindeProvider } from '@kinde-oss/kinde-auth-react'
import { ReactNode } from 'react'

interface KindeAuthProviderProps {
  children: ReactNode
}
const KindeAuthProvider = ({ children }: KindeAuthProviderProps) => (
  <KindeProvider
    clientId={ENV_VARIABLES.KINDE_CLIENT_ID}
    domain={ENV_VARIABLES.KINDE_DOMAIN}
    logoutUri={ENV_VARIABLES.KINDE_LOGOUT_REDIRECT_URI}
    redirectUri={ENV_VARIABLES.KINDE_REDIRECT_URI}
  >
    {children}
  </KindeProvider>
)

export default KindeAuthProvider
