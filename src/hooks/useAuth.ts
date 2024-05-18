import { AuthUser } from '@/types/User'

const useAuth = (): AuthUser => {
  // const user: AuthUser = null;
  const user: AuthUser = {
    name: 'John Doe',
    isOnboarded: true
  }
  return user
}

export default useAuth
