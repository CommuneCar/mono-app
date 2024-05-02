import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from './hooks/Users/useUser';

const ProtectedRoute = () => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export { ProtectedRoute };
