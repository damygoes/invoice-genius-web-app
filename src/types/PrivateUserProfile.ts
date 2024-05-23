export type PrivateUserProfile = {
  firstName: string
  lastName: string
  username: string
  profilePicture: string
  address: {
    number: string
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
  email: string
  phone: string
  mobile: string
}
