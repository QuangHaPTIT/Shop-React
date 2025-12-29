import type { User } from "./user";

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  typeError?: string;
  data: {
    user: User;
    access_token: string;    
    refresh_token: string;    
  };
  message?: string;
  status?: string;
}


export interface AuthResponse {
  data: LoginResponse;
}

export interface RefreshTokenResponse {
  token: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordResponse {
  message: string;
  success: boolean;
}

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean
}
