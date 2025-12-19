import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { ENV } from '../../constants/env';
import { API_URL } from '../../constants/api';
import { useGlobalStore } from '../../stores/globalStore';
import type { ErrorResponse } from '../../types/response';
import type { RefreshTokenResponse } from '../../types/auth';
import { toast } from 'react-toastify';
import { STORAGE_KEYS } from '../../constants/storage';
import { useAuthStore } from '../../stores/authStore';
import i18n from '../../plugins/i18n';

const axiosInstance = axios.create({
  baseURL: ENV.API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    const globalStore = useGlobalStore.getState();
    const skip = (config as any).skipLoading;

    if (!skip) {
      globalStore.setIsLoading(true);
    }

    return config;
  },
  (error: AxiosError) => {
    const globalStore = useGlobalStore.getState();
    globalStore.setIsLoading(false);
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  async (response: AxiosResponse) => {
    const globalStore = useGlobalStore.getState();
    globalStore.clearNetworkError();
    globalStore.setIsLoading(false);
    return response;
  },
  async (error: AxiosError<ErrorResponse>) => {
    const status = error.response?.status;
    const globalStore = useGlobalStore.getState();
    globalStore.setIsLoading(false);

    if (error.code === 'ERR_NETWORK') {
      globalStore.handleNetworkError(() => {
        toast.error(i18n.t('errors.network_error'));
      });
      return Promise.reject(error);
    }

    switch (status) {
      case 401: {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
          _retry?: boolean;
        };

        const isAuthApi = [API_URL.LOGIN, API_URL.REFRESH_TOKEN].some((url) =>
          originalRequest.url?.includes(url)
        );

        if (status === 401 && !isAuthApi && !originalRequest._retry) {
          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            })
              .then(() => {
                return axiosInstance(originalRequest);
              })
              .catch((err) => {
                return Promise.reject(err);
              });
          }

          originalRequest._retry = true;
          isRefreshing = true;

          try {
            const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
            if (!refreshToken) {
              throw new Error('No refresh token');
            }

            const response = await axiosInstance.post<RefreshTokenResponse>(
              API_URL.REFRESH_TOKEN,
              refreshToken,
              {
                headers: {
                  'Content-Type': 'text/plain',
                },
              }
            );

            const newAccessToken = response.data.token;
            localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, newAccessToken);

            processQueue(null);

            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            }
            return axiosInstance(originalRequest);
          } catch (err) {
            processQueue(err);
            const authStore = useAuthStore.getState();
            await authStore.logout();
            toast.error(i18n.t('errors.unauthorized'));
            return Promise.reject(err);
          } finally {
            isRefreshing = false;
          }
        }

        return Promise.reject(error);
      }

      default:
        return Promise.reject(error);
    }
  }
);

export default axiosInstance;

