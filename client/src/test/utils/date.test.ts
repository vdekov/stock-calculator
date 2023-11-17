import * as dateUtils from '@/utils/date';

describe('Date utils', () => {
  test('formatDate formats the date correctly', () => {
    const mockDate = new Date('2023-11-16T12:34:56');
    const formattedDate = dateUtils.formatDate(mockDate);

    // Check if the result matches the expected format (YYYY-MM-DD)
    expect(formattedDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(formattedDate).toBe('2023-11-16');
  });

  test('isValidDate returns true for a valid Date object', () => {
    const validDate = new Date('2023-11-16T12:34:56');
    const result = dateUtils.isValidDate(validDate);
    expect(result).toBe(true);
  });

  test('isValidDate returns false for an invalid Date object', () => {
    const invalidDate = new Date('2023-00-00 00:00:00');
    const result = dateUtils.isValidDate(invalidDate);
    expect(result).toBe(false);
  });

  test('dateAsString formats the date correctly when provided a Date object', () => {
    const mockDate = new Date('2023-11-16T12:34:56');
    const formattedDate = dateUtils.dateAsString(mockDate);
    expect(formattedDate).toBe('Thursday, November 16, 2023 at 12:34:56');
  });

  test('formatTime formats the time correctly', () => {
    const mockDate = new Date('2023-11-16T12:34:56');
    const formattedTime = dateUtils.formatTime(mockDate);

    // Check if the result matches the expected time format (HH:MM:SS)
    expect(formattedTime).toMatch(/^\d{2}:\d{2}:\d{2}$/);
  });

  test('dateAsString formats the date correctly when provided a string', () => {
    const dateString = '2023-11-16T12:34:56';
    const formattedDate = dateUtils.dateAsString(dateString);
    expect(formattedDate).toBe('Thursday, November 16, 2023 at 12:34:56');
  });
});
