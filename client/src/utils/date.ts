/**
 * Format a Date as YYYY-MM-DD
 * @param date Date object
 * @returns string in YYYY-MM-DD format
 */
export const formatDate = (date = new Date()) => {
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
