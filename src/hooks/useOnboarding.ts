import { OnboardingFormPayload } from '@/pages/onboarding/Onboarding'
import useAxiosInterceptor from '@/services/axios/axiosClient'
import { AuthUser } from '@/types/User'

export const useOnboarding = () => {
  const axiosClient = useAxiosInterceptor()

  const onboardUser = async (
    userToBeOnboarded: OnboardingFormPayload
  ): Promise<AuthUser> => {
    const user = await axiosClient.post('users/onboard-user', {
      ...userToBeOnboarded
    })
    return user.data.user
  }

  return { onboardUser }
}
