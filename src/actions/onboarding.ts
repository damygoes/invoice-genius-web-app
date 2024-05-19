import { queryOptions } from '@tanstack/react-query'

import useAxiosInterceptor from '@/services/axios/axiosClient'
import { AuthUser, IntendingKindeUser } from '@/types/User'

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

const fetchPosts = async () => {
  const result = await axios.get('https://jsonplaceholder.typicode.com/posts')
  return result.data
}

const postsQueryOptions = queryOptions({
  queryKey: ['posts'],
  queryFn: () => fetchPosts()
})

export { postsQueryOptions }

/**
 * export const useAuth = () => {
 

  return { getUser };
 */
