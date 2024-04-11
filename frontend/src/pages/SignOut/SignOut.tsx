import useAuth from "@/hooks/useAuth"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

const SignOut = () => {
    const { handleLogOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("SignOut")
        handleLogOut();
        navigate("/")
    }, [navigate, handleLogOut]);

    return null
}

export default SignOut