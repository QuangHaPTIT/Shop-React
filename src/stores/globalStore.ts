import { create } from 'zustand';

interface GlobalState {
  isLoading: boolean;
  networkError: boolean;
  setIsLoading: (loading: boolean) => void;
  clearNetworkError: () => void;
  handleNetworkError: (callback: () => void) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  isLoading: false,
  networkError: false,

  setIsLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  clearNetworkError: () => {
    set({ networkError: false });
  },

  handleNetworkError: (callback: () => void) => {
    set({ networkError: true });
    callback();
  },
}));

