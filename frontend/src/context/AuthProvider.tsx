import { createContext, useState, ReactNode } from "react";
import axios, { AxiosError, AxiosInstance } from "axios";
import { enqueueSnackbar } from "notistack";
import { SignUpType } from "@/pages/Registration/Register";
import { setCookie, destroyCookie, parseCookies } from "nookies";

export const getCookie = (key: string) => {
  const cookies = parseCookies();
  return cookies[key];
};

export const AuthClient: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  withCredentials: true,
});

AuthClient.interceptors.request.use(
  (config) => {
    const token = getCookie("jwtToken");

    if (token && !config.url?.startsWith("/auth")) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    console.log("Request config:", config.headers["Authorization"]);

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export type AuthContextType = {
  handleSignUp: (
    data: SignUpType
  ) => Promise<{ success?: boolean; error?: string }>;
  handleSignIn: (
    data: SignUpType
  ) => Promise<{ success?: boolean; error?: string }>;
  handleLogOut: () => void;
  handleDeleteAccount: () => void;
  isUserloggedIn: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  handleSignUp: async () => ({ success: false, error: "" }),
  handleSignIn: async () => ({ success: false, error: "" }),
  handleLogOut: async () => ({ message: "" }),
  handleDeleteAccount: async () => ({ message: "" }),
  isUserloggedIn: false,
});

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isUserloggedIn, setIsUserLoggedIn] = useState<boolean>(
    !!getCookie("jwtToken")
  );

  const handleLogOut = () => {
    destroyCookie(null, "jwtToken", { path: "/" });
    setIsUserLoggedIn(false);
  };

  const handleSignUp = async (data: SignUpType) => {
    try {
      const res = await AuthClient.post("/auth/register", data);
      const token = res.data.token || "";

      if (token) {
        setCookie(null, "jwtToken", token, { path: "/" });
        enqueueSnackbar("Вы успешно зарегистрировались", {
          variant: "success",
        });
        return { success: true };
      }
    } catch (error) {
      if (
        (error as AxiosError).response &&
        (error as AxiosError).response?.status === 409
      ) {
        return { error: "Пользователь уже существует" };
      } else {
        return { error: "Что-то пошло не так" };
      }
    }
  };

  const handleSignIn = async (data: SignUpType) => {
    try {
      const res = await AuthClient.post("/auth/authenticate", data);
      const token = res.data.token || "";

      if (token) {
        setCookie(null, "jwtToken", token, { path: "/" });
        setIsUserLoggedIn(true);
        enqueueSnackbar("Вы успешно вошли", { variant: "success" });
        return { success: true };
      }
    } catch (error) {
      if (
        (error as AxiosError).response &&
        (error as AxiosError).response?.status === 400
      ) {
        return { error: "Неправильный пароль" };
      } else {
        return { error: "Что-то пошло не так" };
      }
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await AuthClient.delete("/users");
      destroyCookie(null, "jwtToken", { path: "/" });
      setIsUserLoggedIn(false);
      enqueueSnackbar("Your account has been deleted", { variant: "success" });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        handleSignUp,
        handleSignIn,
        handleLogOut,
        handleDeleteAccount,
        isUserloggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
