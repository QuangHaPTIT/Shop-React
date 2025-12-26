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
} as const;

export type RoutePath = typeof ROUTES[keyof typeof ROUTES];
