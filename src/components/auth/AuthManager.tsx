import useAuth from '@/hooks/useAuth'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const AuthManager = () => {
  const user = useAuth()
  const location = useLocation()

  if (!user || user === null) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }
  if (user && user.isOnboarded === false) {
    return <Navigate to='/onboarding' state={{ from: location }} replace />
  }
  return <Outlet />
}

export default AuthManager
