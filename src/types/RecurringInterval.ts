const RecurringInterval = {
  monthly: 'monthly',
  quarterly: 'quarterly',
  yearly: 'yearly'
}

export type RecurringInterval =
  (typeof RecurringInterval)[keyof typeof RecurringInterval]

export const RECURRENCE_INTERVALS = Object.values(RecurringInterval)
