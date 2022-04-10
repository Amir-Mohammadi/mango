import { useAuthContext } from '@/app/auth-archive/AuthContext';
import { ErrorBoundary } from '@/errors';
import { Navigate } from 'react-router-dom';


export const PublicOnlyRouteGuard = ({ children }) => {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? (
    <Navigate to="/" replace />
  ) : (
    <ErrorBoundary>{children}</ErrorBoundary>
  );
};
