/**
 * Format a Date as YYYY-MM-DD
 * @param date Date object
 * @returns string in YYYY-MM-DD format
 */
export const formatDate = (date: Date) => {
  const year = date.toLocaleString('default', { year: 'numeric' });
  const month = date.toLocaleString('default', {
    month: '2-digit',
  });
  const day = date.toLocaleString('default', { day: '2-digit' });

  return [year, month, day].join('-');
};

/**
 * Check is a Date object is a valid Date instance
 * @param date Date object
 * @returns boolean
 */
export const isValidDate = (date: Date) => date instanceof Date && !isNaN(date.getTime());

/**
 * Format a Date as HH:MM:SS
 * @param date Date object
 * @returns string in HH:MM:SS format
 */
export const formatTime = (date: Date) => date.toTimeString().split(' ')[0];

/**
 * Return a date in a human readable format
 * @param date either Date or string
 * @returns string - date in a human readable format
 */
export const dateAsString = (date: Date | string) =>
  new Date(date).toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'medium',
    hour12: false,
  });
