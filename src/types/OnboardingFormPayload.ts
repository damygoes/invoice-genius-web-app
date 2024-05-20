import { AuthUser, AvailableUserType, ProvidedServices } from './User'

export type OnboardingFormPayload = {
  userType: AvailableUserType
  services: ProvidedServices[]
  user: AuthUser
}
