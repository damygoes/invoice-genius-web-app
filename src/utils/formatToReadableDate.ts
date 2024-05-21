import { format, isDate, parseISO } from 'date-fns'

/**
 * Converts an ISO date string or Date object into a readable date format.
 *
 * @param {string | Date} dateInput - The ISO date string or Date object to convert.
 * @param {string} [dateFormat='PPP'] - The date format string (default is 'PPP' for a human-readable date).
 * @returns {string} The formatted date string.
 */
export function formatToReadableDate(
  dateInput: string | Date,
  dateFormat = 'PPP'
) {
  let date

  // Check if the input is already a Date object
  if (isDate(dateInput)) {
    date = dateInput
  } else if (typeof dateInput === 'string') {
    // Parse the ISO date string into a Date object
    date = parseISO(dateInput)
  } else {
    throw new Error(
      'Invalid date input. Must be a Date object or an ISO date string.'
    )
  }

  // Format the date using date-fns
  return format(date, dateFormat)
}
