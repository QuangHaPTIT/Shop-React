import { lazy } from 'react';
import type { ReactNode } from "react";
import { ROUTES } from "../constants/route";
import { permissions as PERMISSIONS, type Permission } from "../constants/permissions";

const Login = lazy(() => import("../pages/Auth/Login"));
const Register = lazy(() => import("../pages/Auth/Register"));
const Dashboard = lazy(() => import("../pages/Home/Dashboard"));


export interface RouteConfig {
  path: string;
  element: ReactNode;
  permission?: Permission;
  isDevOnly?: boolean;
}

export const publicRoutes: RouteConfig[] = [
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTES.REGISTER,
    element: <Register/>,
  }
];

export const protectedRoutes: RouteConfig[] = [
  {
    path: ROUTES.DASHBOARD,
    element: <Dashboard />,
    permission: PERMISSIONS.DASHBOARD
  },
];