import axios, { AxiosError } from 'axios';

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
        return { message: 'Invalid parameters. Please, try again.', error: message };
      } else if (statusCode === 404) {
        return { message: 'No results found matching the criteria.', error: message };
      } else {
        return { message: 'Ops! Something went wrong!', error: message };
      }
    }
  } else {
    // In case of native JavaScript error
    console.log(error);
    return { message: 'Ops! Something went wrong!', error: error.message };
  }

  // Generic error message
  return { message: 'Ops! Something went wrong!' };
};
