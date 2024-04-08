type Token = {
    token: string;
    tokenExpiration: number;
};

const inMemoryJWTService = () => {
    let inMemoryJWT: Token | null = null;

    const getToken = () => inMemoryJWT;

    const setToken = (token: string, tokenExpiration: number) => {
        inMemoryJWT = { token, tokenExpiration };
    };

    return { getToken, setToken };
}

export default inMemoryJWTService;