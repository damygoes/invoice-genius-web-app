import { useAuth } from '@/hooks/useAuth'
import { useAuthedAppUser } from '@/hooks/useUser'
import { useKindeAuth } from '@kinde-oss/kinde-auth-react'
import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import AuthLoader from './AuthLoader'

const AuthManager = () => {
  const { user, isAuthenticated, isLoading } = useKindeAuth()
  const { getUser } = useAuth()
  const { authedAppUser, setAuthedAppUser } = useAuthedAppUser()
  const location = useLocation()
  const [userChecked, setUserChecked] = useState(false)

  useEffect(() => {
    const getIntendingAppUser = async () => {
      if (!user) return
      const intendingAppUser = await getUser(user.email as string, user)
      setAuthedAppUser(intendingAppUser)
      setUserChecked(true)
    }
    if (!isLoading && isAuthenticated) {
      getIntendingAppUser()
    }
  }, [user, isAuthenticated, isLoading, getUser, setAuthedAppUser, location])

  if (isLoading || !userChecked) {
    return <AuthLoader />
  }

  if (!isLoading && !isAuthenticated) {
    return <Navigate to='/' state={{ from: location }} replace />
  }

  if (userChecked && authedAppUser?.onboarded) {
    return <Navigate to='/dashboard' state={{ from: location }} replace />
  } else {
    return <Navigate to='/onboarding' state={{ from: location }} replace />
  }
}

export default AuthManager
