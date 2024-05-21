const RecurringInterval = {
  monthly: 'monthly',
  quarterly: 'quarterly',
  yearly: 'yearly'
} as const

export type RecurringIntervalType =
  (typeof RecurringInterval)[keyof typeof RecurringInterval]

export const RECURRENCE_INTERVALS = Object.values(RecurringInterval)
