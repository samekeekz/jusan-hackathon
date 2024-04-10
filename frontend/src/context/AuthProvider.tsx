import { createContext, useState, ReactNode, useEffect } from "react";
import axios, { AxiosError, AxiosInstance } from "axios";
import { enqueueSnackbar } from "notistack";
import { SignUpType } from "@/pages/Registration/Register";
import { ResponseDataType } from "../types";
import { setCookie, destroyCookie, parseCookies } from "nookies";

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

    if (token && !config.url?.startsWith("/auth")) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }

    console.log("Request config:", config.headers["Authorization"]);

    return config;
}, (error: AxiosError) => {
    return Promise.reject(error);
});

export type AuthContextType = {
    handleSignUp: (data: SignUpType) => Promise<{ message: string }>;
    handleSignIn: (data: SignUpType) => Promise<{ message: string }>;
    handleLogOut: () => void;
    handleDeleteAccount: () => void;
    isUserloggedIn: boolean;
};

export const AuthContext = createContext<AuthContextType>({
    handleSignUp: async () => ({ message: "" }),
    handleSignIn: async () => ({ message: "" }),
    handleLogOut: async () => ({ message: "" }),
    handleDeleteAccount: async () => ({ message: "" }),
    isUserloggedIn: false,
});

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isUserloggedIn, setIsUserLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const token = getCookie("jwtToken");
        if (token) {
            console.log(1);
            setIsUserLoggedIn(true);
        } else {
            setIsUserLoggedIn(false);
        }
    }, []);

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
                enqueueSnackbar("Вы успешно залогинились", { variant: "success" });
                return { message: 'ok' }
            })
            .catch((error) => {
                console.log(error);
                enqueueSnackbar("Что-то пошло не так", { variant: "error" });
            });
    };

    const handleDeleteAccount = async () => {
        try {
            await AuthClient.delete("/users");
            destroyCookie(null, "jwtToken"); // Remove token from cookie
            setIsUserLoggedIn(false);
            enqueueSnackbar("Your account has been deleted", { variant: "success" });
        } catch (error) {
            console.log(error);
            enqueueSnackbar("Something went wrong", { variant: "error" });
        }
    };



    useEffect(() => {
        const handlePersistedLogOut = (event: StorageEvent) => {
            if (event.key === import.meta.env.VITE_LOGOUT_STORAGE_KEY) {
                destroyCookie(null, "jwtToken"); // Remove token from cookie
                setIsUserLoggedIn(false);
            }
        };

        const handleBeforeUnload = () => {
            destroyCookie(null, "jwtToken"); // Remove token from cookie when tab or browser is closed
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
                handleDeleteAccount,
                isUserloggedIn
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
