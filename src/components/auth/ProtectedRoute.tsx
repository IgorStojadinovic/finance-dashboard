import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../../lib/hooks/useAuth';

export const ProtectedRoute = () => {
  if (!isAuthenticated()) {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
};
