export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  data: LoginResponse;
}

export interface RefreshTokenResponse {
  token: string;
}

