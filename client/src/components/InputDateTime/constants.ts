/**
 * Full Date Validation (YYYY-MM-DD)  
 * Checks that
    1) the year is numeric and starts with 19 or 20,
    2) the month is numeric and between 01-12, and
    3) the day is numeric between 01-29, or
      - 30 if the month value is anything other than 02, or
      - 31 if the month value is one of 01,03,05,07,08,10, or 12.
 */
export const inputDatePattern =
  '(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))';

export const inputDatePlaceholder = 'YYYY-MM-DD';

/**
 * Format: HH:MM:SS
 */
export const inputTimePattern = '(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}';

export const inputTimePlaceholder = 'HH:MM:SS';
