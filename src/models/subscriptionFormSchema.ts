import { z } from 'zod'

export const subscriptionFormSchema = z.object({
  subscriptionName: z.string().min(2, {
    message: 'Subscription name is required'
  }),
  subscriptionCategory: z.string().min(2, {
    message: 'Subscription category is required'
  }),
  recurringInterval: z.enum(['monthly', 'quarterly', 'yearly']).optional(),
  subscribedOn: z.date(),
  expiresOn: z.date(),
  setReminder: z.boolean().default(false),
  reminderPeriod: z.date().optional()
})
