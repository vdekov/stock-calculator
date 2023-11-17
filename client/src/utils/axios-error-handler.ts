import axios, { AxiosError } from 'axios';
import { ERROR_MESSAGES } from './constants';

type ErrorType = {
  message: string;
  error?: string | string[];
};

export const axiosErrorHandler = (e: unknown): ErrorType => {
  const error = e as Error | AxiosError;

  // Handle server response errors
  if (axios.isAxiosError(error)) {
    if (error.response?.data) {
      const { statusCode, message } = error.response.data;
      if (statusCode === 400) {
        return { message: ERROR_MESSAGES.BAD_PARAMETERS, error: message };
      } else if (statusCode === 404) {
        return { message: ERROR_MESSAGES.NOT_FOUND, error: message };
      } else {
        return { message: ERROR_MESSAGES.GENERIC_ERROR, error: message };
      }
    }
  } else {
    // In case of native JavaScript error
    return { message: ERROR_MESSAGES.GENERIC_ERROR, error: error.message };
  }

  // Generic error message
  return { message: ERROR_MESSAGES.GENERIC_ERROR };
};
