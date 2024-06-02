import { z } from 'zod'

export const clientFormSchema = z.object({
  firstName: z.string().min(2, {
    message: 'First name is required'
  }),
  lastName: z.string().min(2, {
    message: 'Last name is required'
  }),
  email: z.string().email({
    message: 'Invalid email format'
  }),
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
  phone: z.string().optional(),
  mobile: z.string().optional()
})

export type clientFormSchemaType = z.infer<typeof clientFormSchema>
