import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from './hooks/Users/useUser';
import { PageLoader } from './Components/PageLoader/PageLoader';

const ProtectedRoute = () => {
  const { user, loading } = useUser();

  if (loading) {
    return <PageLoader isLoading={loading} />;
  }

  return !user ? <Navigate to="/" replace /> : <Outlet />;
};

export { ProtectedRoute };
