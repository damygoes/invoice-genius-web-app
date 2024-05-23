import { z } from 'zod'

export const privateUserProfileFormSchema = z.object({
  firstName: z.string().min(2, {
    message: 'First name is required'
  }),
  lastName: z.string().min(2, {
    message: 'Last name is required'
  }),
  username: z.string().optional(),
  profilePicture: z.string().optional(),
  address: z.object({
    number: z.string().min(2, {
      message: 'Number is required'
    }),
    street: z.string().min(2, {
      message: 'Street is required'
    }),
    city: z.string().min(2, {
      message: 'City is required'
    }),
    state: z.string().min(2, {
      message: 'State is required'
    }),
    zip: z.string().min(2, {
      message: 'Zip is required'
    }),
    country: z.string().min(2, {
      message: 'Country is required'
    })
  }),
  email: z.string().email({
    message: 'Invalid email format'
  }),
  phone: z.string().optional(),
  mobile: z.string().optional()
})

export type privateUserProfileFormSchemaType = z.infer<
  typeof privateUserProfileFormSchema
>
