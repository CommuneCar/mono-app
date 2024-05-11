import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from './hooks/Users/useUser';

const ProtectedRoute = () => {
  const { user } = useUser();

  return !user ? <Navigate to="/" replace /> : <Outlet />;
};

export { ProtectedRoute };
