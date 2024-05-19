export enum UserType {
  Private = 'private',
  Business = 'business'
}

export type AvailableUserType = 'private' | 'business'

export type IntendingKindeUser = {
  given_name: string | null
  id: string | null
  family_name: string | null
  email: string | null
  picture: string | null
}

export type AuthUser = {
  id: string
  firstName: string
  lastName: string
  username: string | undefined
  email: string
  phone: string | undefined
  mobile: string | undefined
  profilePicture: string | undefined
  address: string | undefined
  userType: UserType
  selectedServices: ProvidedServices[]
  onboarded: boolean
  createdAt: Date
  updatedAt: Date
}

// TODO: Move later to a separate file

export type ProvidedServices =
  | 'receiptManagement'
  | 'subscriptionManagement'
  | 'invoicing'
