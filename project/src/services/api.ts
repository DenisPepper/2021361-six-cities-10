import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import { BASE_URL, REQUEST_TIMEOUT } from '../settings';
import { getToken } from './token';
import { StatusCodes } from 'http-status-codes';
import { AppErrorHandler } from './app-error-handler';

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true,
};

const shouldDisplayError = (response: AxiosResponse) =>
  !!StatusCodeMapping[response.status];

export const createHTTPClient = (): AxiosInstance => {
  const api = axios.create({ baseURL: BASE_URL, timeout: REQUEST_TIMEOUT });

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    config.headers['x-token'] = getToken();
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response && shouldDisplayError(error.response)) {
        AppErrorHandler(error.response.data.error);
      }
      throw error;
    }
  );

  return api;
};
