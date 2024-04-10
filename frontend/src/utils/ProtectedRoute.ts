import { AuthContext } from "@/context/AuthProvider";
import { PropsWithChildren, useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: PropsWithChildren) => {
    const { isUserloggedIn } = useContext(AuthContext);
    const navigate = useNavigate();


    useEffect(() => {
        if (!isUserloggedIn) {
            navigate("/login", { replace: true });
        }
    }, [navigate, isUserloggedIn])

    return children
};

export default ProtectedRoute;