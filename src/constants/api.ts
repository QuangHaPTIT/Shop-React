export const API_ROOT = '/api/v1';
export const API_URL = {
  LOGIN: '/auth/login',
  REFRESH_TOKEN: '/auth/refresh-token',
  ME: '/auth/me',
  LOGOUT: '/auth/logout',
  CHANGE_PASSWORD: '/auth/change-password',
  ORDER: {
    ROOT: `${API_ROOT}/orders`,
    FILTER: `${API_ROOT}/orders/filter`,
    DETAIL: `${API_ROOT}/orders/{orderId}`
  },
  PRODUCT: {
    ROOT: `${API_ROOT}/products`
  },
  USER: {
    ROOT: `${API_ROOT}/users`
  }
} as const;

