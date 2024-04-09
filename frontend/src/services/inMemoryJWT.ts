type JWTService = {
    getToken: () => string | null;
    setToken: (token: string) => void;
    deleteToken: () => void;
};

const inMemoryJWTService = (): JWTService => {
    let inMemoryJWT: string | null = null;

    const getToken = (): string | null => inMemoryJWT;

    const setToken = (token: string): void => {
        inMemoryJWT = token
    };

    const deleteToken = (): void => {
        inMemoryJWT = null;
        localStorage.setItem(import.meta.env.VITE_LOGOUT_STORAGE_KEY, Date.now().toString());

    }

    return { getToken, setToken, deleteToken };
}

export default inMemoryJWTService();