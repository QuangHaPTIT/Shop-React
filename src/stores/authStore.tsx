import { create } from 'zustand';
import type { User } from '../types/user';
import type { LoginRequest } from '../types/auth';
import type { ErrorResponse } from '../types/response';
import { authApis } from '../services/apis/auth';
import { STORAGE_KEYS } from '../constants/storage';
import { jwtUtil } from '../utils/jwt';

interface AuthState {
  user: User | null;
  tokenId: string | null;
  isLoggingIn: boolean;
  login: (loginRequest: LoginRequest, shouldRemember: boolean) => Promise<void>;
  logout: () => Promise<void>;
  getMe: () => Promise<User>;
  rememberMe: (loginRequest: LoginRequest, shouldRemember: boolean) => void;
  saveTokenId: (token: string) => void;
  initialize: () => Promise<void>;
}

declare global {
  interface Window {
    __isLoggingIn?: boolean;
  }
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  tokenId: null,
  isLoggingIn: false,

  saveTokenId: (token: string) => {
    const id = jwtUtil.getTokenIdFromToken(token);
    set({ tokenId: id });
  },

  rememberMe: (loginRequest: LoginRequest, shouldRemember: boolean) => {
    if (shouldRemember) {
      localStorage.setItem(STORAGE_KEYS.SAVED_USERNAME, loginRequest.username.trim());
    } else {
      localStorage.removeItem(STORAGE_KEYS.SAVED_USERNAME);
    }
  },

  getMe: async (): Promise<User> => {
    const response = await authApis.me();
    // AxiosResponse<User> có structure: { data: User }
    const user = response.data;
    set({ user });
    return user;
  },

  initialize: async () => {
    const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (accessToken) {
      get().saveTokenId(accessToken);
      try {
        await get().getMe();
      } catch {
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      }
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.LOGIN_BROADCAST) {
        const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
        if (accessToken) {
          get().saveTokenId(accessToken);
          get().getMe();
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    if (typeof BroadcastChannel !== 'undefined') {
      const authChannel = new BroadcastChannel('auth-events');
      authChannel.onmessage = (event) => {
        if (event.data === 'logged-in') {
          const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
          if (accessToken) {
            get().saveTokenId(accessToken);
            get().getMe();
          }
        }
      };
    }
  },

  login: async (loginRequest: LoginRequest, shouldRemember: boolean) => {
    window.__isLoggingIn = true;
    set({ isLoggingIn: true });

    try {
      const response = await authApis.login({
        username: loginRequest.username.trim(),
        password: loginRequest.password,
      });

      // AxiosResponse<LoginResponse> có structure: { data: LoginResponse }
      const loginData = response.data;
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, loginData.accessToken);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, loginData.refreshToken);

      try {
        localStorage.setItem(STORAGE_KEYS.LOGIN_BROADCAST, String(Date.now()));
        if (typeof BroadcastChannel !== 'undefined') {
          const authChannel = new BroadcastChannel('auth-events');
          authChannel.postMessage('logged-in');
          authChannel.close();
        }
      } catch (_) {
        // Ignore errors
      }

      get().saveTokenId(loginData.accessToken);
      get().rememberMe(loginRequest, shouldRemember);
      await get().getMe();

    } catch (error: any) {
      const _error = error as { status?: number; response?: { data?: ErrorResponse } };
      if (_error.status === 401 || _error.status === 400) {
        throw _error.response?.data?.errorCode;
      }
      throw error;
    } finally {
      window.__isLoggingIn = false;
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    set({ user: null });
    try {
      await authApis.logout();
      set({ tokenId: null });
    } finally {
      // TODO: Handle comparison store reset if needed

      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);

      // TODO: Handle navigation
    }
  },
}));

if (typeof window !== 'undefined') {
  useAuthStore.getState().initialize();
}