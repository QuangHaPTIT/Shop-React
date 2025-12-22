import { type AxiosResponse } from 'axios';
import { API_URL } from '../../constants/api';
import type {
  LoginRequest,
  RefreshTokenResponse,
  LoginResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
} from '../../types/auth';
import type { User } from '../../types/user';
import axiosInstance from './axios';

export const authApis = {
  login: async (data: LoginRequest): Promise<AxiosResponse<LoginResponse>> => {
    const response = await axiosInstance.post<LoginResponse>(API_URL.LOGIN, data);
    return response;
  },

  refreshToken: async (): Promise<AxiosResponse<RefreshTokenResponse>> => {
    const response = await axiosInstance.post<RefreshTokenResponse>(
      API_URL.REFRESH_TOKEN
    );
    return response;
  },

  me: async (): Promise<AxiosResponse<User>> => {
    const response = await axiosInstance.get<User>(API_URL.ME);
    return response;
  },

  logout: async (): Promise<AxiosResponse<void>> => {
    const response = await axiosInstance.post<void>(API_URL.LOGOUT);
    return response;
  },
  changePassword: async (data: ChangePasswordRequest): Promise<AxiosResponse<ChangePasswordResponse>> => {
    const response = await axiosInstance.post<ChangePasswordResponse>(API_URL.CHANGE_PASSWORD, data);
    return response;
  }
};
