import { Suspense } from "react";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthenticatedGuard, PermissionGuard, UnauthenticatedGuard } from "./guard";
import AuthLayout from "../components/layout/AuthLayout";
import { protectedRoutes, publicRoutes } from "./routes.config";
import MainLayout from "../components/layout/MainLayout";
import { ROUTES } from "../constants/route";

export const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route
          element={
            <UnauthenticatedGuard>
              <AuthLayout />
            </UnauthenticatedGuard>
          }
        >
          {publicRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>

        <Route
          element={
            <AuthenticatedGuard>
              <MainLayout />
            </AuthenticatedGuard>
          }
        >
          {protectedRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <PermissionGuard permission={route.permission}>
                  {route.element}
                </PermissionGuard>
              }
            />
          ))}
        </Route>

        <Route path="/" element={<Navigate to={ROUTES.DASHBOARD}/>}/>
        <Route path="*" element={<Navigate to="/404" replace/>} />
      </Routes>
    </Suspense>
  );
};
