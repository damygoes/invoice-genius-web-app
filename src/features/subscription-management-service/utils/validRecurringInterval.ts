import { RecurringIntervalType } from '@/types/RecurringInterval'

export const validateRecurringInterval = (
  interval: string | undefined
): RecurringIntervalType => {
  if (interval && ['monthly', 'quarterly', 'yearly'].includes(interval)) {
    return interval as RecurringIntervalType
  }
  return 'monthly'
}
