import { Navigate, useLocation } from 'react-router-dom'
import RootLayout from '../layout/root-layout/RootLayout'

const AuthManager = () => {
  const user = {
    name: 'John Doe',
    isOnboarded: true
  }
  const location = useLocation()

  if (!user) return <Navigate to='/' state={{ from: location }} replace />
  if (!user.isOnboarded) {
    return <Navigate to='/onboarding' state={{ from: location }} replace />
  } else {
    return <RootLayout />
  }
}

export default AuthManager
