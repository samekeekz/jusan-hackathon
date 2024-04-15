import useAuth from "@/hooks/useAuth";
import { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  redirectPath?: string;
}

const ProtectedRoute: React.FC<PropsWithChildren<ProtectedRouteProps>> = ({
  children,
  redirectPath = "/signup",
}) => {
  const { isUserloggedIn } = useAuth();
  const { pathname } = useLocation();

  return isUserloggedIn ? (
    children
  ) : (
    <Navigate to={redirectPath} state={{ returnPath: pathname }} replace />
  );
};

export default ProtectedRoute;
