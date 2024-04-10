import { createContext, useState, ReactNode, useEffect } from "react";
import axios, { AxiosError, AxiosInstance } from "axios";
import { enqueueSnackbar } from "notistack";
import { SignUpType } from "@/pages/Registration/Register";
import { ResponseDataType } from "../types";
import { setCookie, destroyCookie, parseCookies } from "nookies"; // Import nookies for cookie management

export const getCookie = (key: string) => {
    const cookies = parseCookies();
    return cookies[key];
};

export const AuthClient: AxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    withCredentials: true,
});

AuthClient.interceptors.request.use((config) => {
    const token = getCookie("jwtToken"); // Retrieve token from cookie

    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }

    console.log("Request config:", config.headers["Authorization"]);

    return config;
}, (error: AxiosError) => {
    return Promise.reject(error);
});

type AuthContextType = {
    handleSignUp: (data: SignUpType) => Promise<{ message: string }>;
    handleSignIn: (data: SignUpType) => Promise<{ message: string }>;
    handleLogOut: () => void;
    isUserloggedIn: boolean;
};

export const AuthContext = createContext<AuthContextType>({
    handleSignUp: async () => ({ message: "" }),
    handleSignIn: async () => ({ message: "" }),
    handleLogOut: async () => ({ message: "" }),
    isUserloggedIn: false,
});

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isUserloggedIn, setIsUserLoggedIn] = useState<boolean>(false);

    const handleLogOut = () => {
        destroyCookie(null, "jwtToken"); // Remove token from cookie
        setIsUserLoggedIn(false);
    };

    const handleSignUp = async (data: SignUpType) => {
        return AuthClient.post("/auth/register", data)
            .then((res: { data: ResponseDataType }) => {
                const { token } = res.data;

                setCookie(null, "jwtToken", token, { path: "/" }); // Store token in cookie
                console.log(res.data);

                return enqueueSnackbar("Вы успешно зарегистрировались", { variant: "success" });
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    const { message } = error.response.data;
                    if (message === 'Неверный пароль') {
                        return { message };
                    }
                    enqueueSnackbar(message, { variant: "error" });
                }
                enqueueSnackbar("Что-то пошло не так", { variant: "error" });
                return Promise.reject(error);
            });
    };

    const handleSignIn = async (data: SignUpType) => {
        return AuthClient.post("/auth/authenticate", data)
            .then((res: { data: ResponseDataType }) => {
                const { token } = res.data;

                setCookie(null, "jwtToken", token, { path: "/" }); // Store token in cookie
                console.log(res.data);
                setIsUserLoggedIn(true);
                return enqueueSnackbar("Вы успешно залогинились", { variant: "success" });
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    const { token } = error.response.data;
                    if (token) {
                        console.log("Token in error response:", token);
                    }
                    enqueueSnackbar(error.response.data as string, { variant: "error" });
                }
                enqueueSnackbar("Что-то пошло не так", { variant: "error" });
            });
    };

    const handleSaveAccountDetails = async (data: { name: string, email: string }) => {
        return AuthClient.post("/users/update/general", data)
            .then((res: { data: { name: string, email: string } }) => {
                return res.data;
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    enqueueSnackbar(error.response.data as string, { variant: "error" });
                }
                enqueueSnackbar("Что-то пошло не так", { variant: "error" });
            });
    }

    useEffect(() => {
        const handlePersistedLogOut = (event: StorageEvent) => {
            if (event.key === import.meta.env.VITE_LOGOUT_STORAGE_KEY) {
                destroyCookie(null, "jwtToken"); // Remove token from cookie
                setIsUserLoggedIn(false);
            }
        };

        window.addEventListener("storage", handlePersistedLogOut);

        return () => {
            window.removeEventListener("storage", handlePersistedLogOut);
        };
    }, []);

    return (
        <AuthContext.Provider
            value={{
                handleSignUp,
                handleSignIn,
                handleLogOut,
                handleSaveAccountDetails,
                isUserloggedIn
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
