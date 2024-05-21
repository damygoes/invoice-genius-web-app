import { RecurringIntervalType } from './RecurringInterval'

export type SubscriptionPayload = {
  subscriptionName: string
  subscriptionCategory: string
  recurringInterval?: RecurringIntervalType
  subscribedOn: Date
  expiresOn: Date
  setReminder: boolean
  reminderPeriod?: Date | undefined
}
export type SubscriptionDTO = {
  id: string
  userId: string
  subscriptionName: string
  subscriptionCategory: string
  recurringInterval?: RecurringIntervalType
  subscribedOn: Date
  expiresOn: Date
  setReminder: boolean
  reminderPeriod?: Date
  createdAt: Date
  updatedAt: Date
}
