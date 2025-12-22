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
  isInitialized: boolean;
  login: (loginRequest: LoginRequest, shouldRemember: boolean) => Promise<void>;
  logout: () => Promise<void>;
  getMe: () => Promise<User>;
  rememberMe: (loginRequest: LoginRequest, shouldRemember: boolean) => void;
  saveTokenId: (token: string) => void;
  initialize: () => Promise<void>;
  cleanup: () => void;
}

// Cleanup functions storage
let storageListener: ((e: StorageEvent) => void) | null = null;
let authChannel: BroadcastChannel | null = null;
let loginPromise: Promise<void> | null = null;

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  tokenId: null,
  isLoggingIn: false,
  isInitialized: false,

  saveTokenId: (token: string) => {
    try {
      const id = jwtUtil.getTokenIdFromToken(token);
      set({ tokenId: id });
    } catch (error) {
      console.error('Failed to extract token ID:', error);
    }
  },

  rememberMe: (loginRequest: LoginRequest, shouldRemember: boolean) => {
    try {
      if (shouldRemember && loginRequest?.username) {
        localStorage.setItem(STORAGE_KEYS.SAVED_USERNAME, loginRequest.username.trim());
      } else {
        localStorage.removeItem(STORAGE_KEYS.SAVED_USERNAME);
      }
    } catch (error) {
      console.error('Failed to save remember me preference:', error);
    }
  },

  getMe: async (): Promise<User> => {
    try {
      const response = await authApis.me();
      const user = response.data;
      set({ user });
      return user;
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      throw error;
    }
  },

  initialize: async () => {
    if (get().isInitialized) {
      return;
    }

    get().cleanup();

    const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (accessToken) {
      get().saveTokenId(accessToken);
      try {
        await get().getMe();
      } catch (error) {
        console.error('Failed to restore session:', error);
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      }
    }

    storageListener = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.LOGIN_BROADCAST) {
        const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
        if (accessToken) {
          get().saveTokenId(accessToken);
          get().getMe().catch(console.error);
        }
      } else if (e.key === STORAGE_KEYS.ACCESS_TOKEN && !e.newValue) {
        set({ user: null, tokenId: null });
      }
    };

    window.addEventListener('storage', storageListener);

    if (typeof BroadcastChannel !== 'undefined') {
      try {
        authChannel = new BroadcastChannel('auth-events');
        authChannel.onmessage = (event) => {
          if (event.data === 'logged-in') {
            const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
            if (accessToken) {
              get().saveTokenId(accessToken);
              get().getMe().catch(console.error);
            }
          } else if (event.data === 'logged-out') {
            set({ user: null, tokenId: null });
          }
        };
      } catch (error) {
        console.error('Failed to setup BroadcastChannel:', error);
      }
    }

    set({ isInitialized: true });
  },

  cleanup: () => {
    if (storageListener) {
      window.removeEventListener('storage', storageListener);
      storageListener = null;
    }

    if (authChannel) {
      try {
        authChannel.close();
      } catch (error) {
        console.error('Failed to close BroadcastChannel:', error);
      }
      authChannel = null;
    }
  },

  login: async (loginRequest: LoginRequest, shouldRemember: boolean) => {
    if (loginPromise) {
      return loginPromise;
    }

    if (!loginRequest?.username?.trim() || !loginRequest?.password) {
      throw new Error('Username and password are required');
    }

    set({ isLoggingIn: true });

    loginPromise = (async () => {
      try {
        const response = await authApis.login({
          username: loginRequest.username.trim(),
          password: loginRequest.password,
        });

        const loginData = response.data;
        
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, loginData.accessToken);
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, loginData.refreshToken);

        try {
          localStorage.setItem(STORAGE_KEYS.LOGIN_BROADCAST, String(Date.now()));
          
          if (typeof BroadcastChannel !== 'undefined') {
            const tempChannel = new BroadcastChannel('auth-events');
            tempChannel.postMessage('logged-in');
            tempChannel.close();
          }
        } catch (error) {
          console.warn('Failed to broadcast login event:', error);
        }

        get().saveTokenId(loginData.accessToken);
        get().rememberMe(loginRequest, shouldRemember);
        await get().getMe();

      } catch (error: any) {
        const _error = error as { status?: number; response?: { data?: ErrorResponse } };
        
        if (_error.status === 401 || _error.status === 400) {
          const errorCode = _error.response?.data?.errorCode;
          throw errorCode || 'AUTHENTICATION_FAILED';
        }
        
        throw error;
      } finally {
        set({ isLoggingIn: false });
        loginPromise = null;
      }
    })();

    return loginPromise;
  },

  logout: async () => {
    try {
      set({ user: null, tokenId: null });

      await authApis.logout();

      // Broadcast logout event to other tabs
      try {
        if (typeof BroadcastChannel !== 'undefined') {
          const tempChannel = new BroadcastChannel('auth-events');
          tempChannel.postMessage('logged-out');
          tempChannel.close();
        }
      } catch (error) {
        console.warn('Failed to broadcast logout event:', error);
      }

    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      // Always clear local storage even if API fails
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.LOGIN_BROADCAST);

      // TODO: Handle comparison store reset if needed
      // TODO: Handle navigation
    }
  },
}));

if (typeof window !== 'undefined') {
  useAuthStore.getState().initialize();
  
  window.addEventListener('beforeunload', () => {
    useAuthStore.getState().cleanup();
  });
}