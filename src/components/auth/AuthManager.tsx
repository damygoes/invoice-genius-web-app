import { useUser } from '@/hooks/useUser'
import { Navigate, useLocation } from 'react-router-dom'
// import AuthLoader from "./AuthLoader";

const AuthManager = () => {
  const { user } = useUser()
  const location = useLocation()

  if (!user) {
    return <Navigate to='/' state={{ from: location }} replace />
  }

  if (user && user.onboarded) {
    return <Navigate to='/dashboard' state={{ from: location }} replace />
  } else {
    return <Navigate to='/onboarding' state={{ from: location }} replace />
  }
}

export default AuthManager
