import { SubscriptionDTO } from '@/types/Subscription'
import { formatToReadableDate } from '@/utils/formatToReadableDate'

export const extractDatesFromSubscription = (subscription: SubscriptionDTO) => {
  const subscriptionDate = formatToReadableDate(subscription.subscribedOn)
  const expiryDate = formatToReadableDate(subscription.expiresOn)
  const reminderDate = formatToReadableDate(subscription?.reminderPeriod ?? '')
  const creationDate = formatToReadableDate(subscription.createdAt)
  return { subscriptionDate, expiryDate, reminderDate, creationDate }
}
