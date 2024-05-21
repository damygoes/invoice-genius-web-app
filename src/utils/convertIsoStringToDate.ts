/**
 * Converts an ISO 8601 date string to a JavaScript Date object.
 * @param isoString - The ISO 8601 date string to convert.
 * @returns The corresponding Date object.
 */
export function convertIsoStringToDate(isoString: string): Date {
  return new Date(isoString)
}
