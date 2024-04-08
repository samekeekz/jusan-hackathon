import { createContext, useState, ReactNode } from "react";
import axios, { AxiosInstance } from "axios";
import inMemoryJWTService from "../services/inMemoryJWT";
import ShowErrorMessage from "../utils/showErrorMessage";
import { enqueueSnackbar } from "notistack";

export const AuthClient: AxiosInstance = axios.create({
    baseURL: "https://backend-hackaton-jusan-production.up.railway.app/auth",
    withCredentials: true,
});


export const AuthContext = createContext({});

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [data, setData] = useState<any>();

    const handleFetchProtected = () => { };

    const handleLogOut = () => { };

    const handleSignUp = (data: any) => {
        AuthClient.post("/register", data)
            .then((res) => {
                const { accessToken, accessTokenExpiration } = res.data;

                inMemoryJWTService.setToken(accessToken, accessTokenExpiration);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    };

    const handleSignIn = (data: any) => { };

    return (
        <AuthContext.Provider
            value={{
                data,
                handleFetchProtected,
                handleSignUp,
                handleSignIn,
                handleLogOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;