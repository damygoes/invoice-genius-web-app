import useAxiosInterceptor from '@/services/axios/axiosClient'
import { OnboardingBusiness } from '@/types/OnboardingBusinessForm'
import { OnboardingFormPayload } from '@/types/OnboardingFormPayload'
import { AuthUser, AvailableUserType, ProvidedServices } from '@/types/User'
import { create } from 'zustand'

type IOnboardingStore = {
  onboardingStep: number
  onboardingOngoing: boolean
  selectedUserType: AvailableUserType
  selectedServices: Set<ProvidedServices>
  setOnboardingStep: (step: number) => void
  setSelectedUserType: (userType: AvailableUserType) => void
  setSelectedServices: (services: ProvidedServices[]) => void
  setOnboardingOngoing: (ongoing: boolean) => void
}

const onboardingStore = create<IOnboardingStore>(set => ({
  onboardingStep: 0,
  onboardingOngoing: false,
  selectedUserType: 'private',
  selectedServices: new Set(),
  setOnboardingStep: step => set({ onboardingStep: step }),
  setSelectedUserType: userType => set({ selectedUserType: userType }),
  setSelectedServices: services => set({ selectedServices: new Set(services) }),
  setOnboardingOngoing: ongoing => set({ onboardingOngoing: ongoing })
}))

export const useOnboarding = () => {
  const axiosClient = useAxiosInterceptor()

  const {
    onboardingStep,
    onboardingOngoing,
    selectedUserType,
    selectedServices,
    setOnboardingStep,
    setSelectedUserType,
    setSelectedServices,
    setOnboardingOngoing
  } = onboardingStore()

  const onboardUser = async (
    userToBeOnboarded: OnboardingFormPayload,
    businessFormData?: OnboardingBusiness
  ): Promise<AuthUser> => {
    const user = await axiosClient.post('users/onboard-user', {
      ...userToBeOnboarded,
      ...(businessFormData && { business: businessFormData })
    })
    return user.data.user
  }

  return {
    onboardingStep,
    onboardingOngoing,
    selectedUserType,
    selectedServices,
    setOnboardingStep,
    setSelectedUserType,
    setSelectedServices,
    setOnboardingOngoing,
    onboardUser
  }
}
