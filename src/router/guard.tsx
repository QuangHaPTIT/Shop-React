import { useEffect } from "react";
import { STORAGE_KEYS } from "../constants/storage";
import { useAuthStore } from "../stores/authStore";
import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "../constants/route";
import type { Permission } from "../constants/permissions";
import { usePermissions } from "../hooks/usePermissions";

interface RouteGuardProps {
  children: React.ReactNode;
}

interface PermissionGuardProps extends RouteGuardProps {
  permission?: Permission;
}
// Guard for unauthenticated routes
export const UnauthenticatedGuard: React.FC<RouteGuardProps> = ({
  children,
}) => {
  const { user, getMe, logout } = useAuthStore();
  const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

  useEffect(() => {
    const checkAuth = async () => {
      if (refreshToken && !user) {
        try {
          await getMe();
        } catch {
          logout();
        }
      }
    };
    checkAuth();
  }, [refreshToken, user, getMe, logout]);

  if (user) {
    return <Navigate to={ROUTES.DASHBOARD} />;
  }

  return children;
};

// Guard for authenticated routes
export const AuthenticatedGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const { user, getMe, logout } = useAuthStore();
  const location = useLocation();
  const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

  useEffect(() => {
    const checkAuth = async () => {
      if (!refreshToken) {
        return;
      }

      if (!user) {
        try {
          await getMe();
        } catch (error: any) {
          await logout();
          if (error?.status === 401) {
            // Redirect to login page
            //toast.error(i18n.t('errors.unauthorized'));
          }
        }
      }
    };
    checkAuth();
  }, [refreshToken, user, getMe, logout]);

  if (!refreshToken || (!user && refreshToken)) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} />;
  }

  return children;
};

export const PermissionGuard: React.FC<PermissionGuardProps> = ({
    children,
    permission,
}) => {
    const { hasPermission } = usePermissions();

    if (!permission) {
        return <>{children}</>
    }

    if (!hasPermission(permission)) {
        return <Navigate to={ROUTES.DASHBOARD} replace />
    }
    return <>{children}</>
}

