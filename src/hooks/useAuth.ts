import useAxiosInterceptor from '@/services/axios/axiosClient'
import { AuthUser, IntendingKindeUser } from '@/types/User'

export const useAuth = () => {
  const axiosClient = useAxiosInterceptor()
  const getUser = async (
    userIdentifier: string,
    intendingUser: IntendingKindeUser
  ): Promise<AuthUser> => {
    const user = await axiosClient.post(`users/${userIdentifier}`, {
      ...intendingUser
    })
    return user.data
  }

  return { getUser }
}
