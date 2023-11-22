import axios, { AxiosResponse } from 'axios';
import { GetStockHistoryParams, GetStockHistoryResponse } from './typings';
import { axiosErrorHandler } from './utils/axios-error-handler';

export const getStockHistory = async (from: Date, to: Date) => {
  try {
    const { data } = await axios.post<
      GetStockHistoryResponse,
      AxiosResponse<GetStockHistoryResponse>,
      GetStockHistoryParams
    >(`http://${window.location.hostname}:3000/api/stock/history`, {
      from,
      to,
    });
    return Promise.resolve(data);
  } catch (e) {
    const { message, error } = axiosErrorHandler(e);

    // Log the specific error in the dev console
    if (error) {
      console.warn(error);
    }

    return Promise.reject(message);
  }
};
