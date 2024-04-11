import useAuth from '@/hooks/useAuth';
import { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';


interface ProtectedRouteProps {
  redirectPath?: string;
  returnBack?: boolean;
}

const ProtectedRoute: React.FC<PropsWithChildren<ProtectedRouteProps>> = ({
  children,
  redirectPath = '/login',
  returnBack = false
}) => {

  const { isUserloggedIn } = useAuth();
  const location = useLocation();

  return isUserloggedIn ? children : <Navigate to={`${returnBack ? `/login?redirect=${location.pathname}` : `${redirectPath}`}`} replace />;
};

export default ProtectedRoute;
