import { z } from 'zod'

export const businessUserProfileFormSchema = z.object({
  businessName: z.string().min(2, {
    message: 'Business name is required'
  }),
  businessLogo: z.string().optional(),
  businessAddress: z.object({
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
  businessWebsite: z.string().optional(),
  businessInfo: z.string().optional(),
  businessEmail: z.string().email({
    message: 'Invalid email format'
  }),
  businessPhone: z.string().optional(),
  businessMobile: z.string().min(2, {
    message: 'Mobile is required'
  }),
  industry: z.string().min(2, {
    message: 'Industry is required'
  })
})

export const onboardingBusinessUserProfileFormSchema = z.object({
  businessName: z.string().min(2, {
    message: 'Business name is required'
  }),
  businessAddress: z.object({
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
  businessEmail: z.string().email({
    message: 'Invalid email format'
  }),
  industry: z.string().min(2, {
    message: 'Industry is required'
  })
})

export type businessUserProfileFormSchemaType = z.infer<
  typeof businessUserProfileFormSchema
>

export type onboardingBusinessUserProfileFormSchemaType = z.infer<
  typeof onboardingBusinessUserProfileFormSchema
>
