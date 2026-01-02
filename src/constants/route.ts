export const ROUTES = {
  // Auth
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  
  // Protected
  DASHBOARD: '/dashboard',
  PRODUCTS: '/products',
  ORDERS: '/orders',
  USERS: '/users',
  REPORTS: '/reports',
  
  // Error
  NOT_FOUND: '/404',
} as const;

export type RoutePath = typeof ROUTES[keyof typeof ROUTES];
