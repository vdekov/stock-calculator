import { axiosErrorHandler } from '@/utils/axios-error-handler';

const ERROR_MESSAGES = {
  BAD_PARAMETERS: 'Invalid parameters. Please, try again.',
  NOT_FOUND: 'No results found matching the criteria.',
  GENERIC_ERROR: 'Ops! Something went wrong!',
};

describe('axiosErrorHandler', () => {
  test('handles AxiosError with status code 400 (bad parameters)', () => {
    const axiosError = {
      isAxiosError: true,
      response: {
        data: {
          statusCode: 400,
          message: 'Server error message',
        },
      },
    };

    const result = axiosErrorHandler(axiosError);

    expect(result).toEqual({
      message: ERROR_MESSAGES.BAD_PARAMETERS,
      error: 'Server error message',
    });
  });

  test('handles AxiosError with status code 404 (not found)', () => {
    const axiosError = {
      isAxiosError: true,
      response: {
        data: {
          statusCode: 404,
          message: 'Not Found',
        },
      },
    };

    const result = axiosErrorHandler(axiosError);

    expect(result).toEqual({
      message: ERROR_MESSAGES.NOT_FOUND,
      error: 'Not Found',
    });
  });

  test('handles AxiosError with any kind of status code different than 400 and 404', () => {
    const axiosError = {
      isAxiosError: true,
      response: {
        data: {
          statusCode: 500,
          message: 'Internal Server Error',
        },
      },
    };

    const result = axiosErrorHandler(axiosError);

    expect(result).toEqual({
      message: ERROR_MESSAGES.GENERIC_ERROR,
      error: 'Internal Server Error',
    });
  });

  test('handles AxiosError with no response data', () => {
    const axiosError = {
      isAxiosError: true,
      message: 'Axios error',
    };

    const result = axiosErrorHandler(axiosError);

    expect(result).toEqual({
      message: ERROR_MESSAGES.GENERIC_ERROR,
    });
  });

  test('handles native JavaScript error', () => {
    const jsError = new Error('Custom error message');
    const result = axiosErrorHandler(jsError);

    expect(result).toEqual({
      message: ERROR_MESSAGES.GENERIC_ERROR,
      error: 'Custom error message',
    });
  });

  test('handles generic error', () => {
    const genericError = { message: 'Generic error message' };
    const result = axiosErrorHandler(genericError);

    expect(result).toEqual({
      message: ERROR_MESSAGES.GENERIC_ERROR,
      error: 'Generic error message',
    });
  });
});
