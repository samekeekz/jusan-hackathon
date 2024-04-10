import { AuthContext, AuthContextType } from '@/context/AuthProvider';
import { useContext } from 'react';

const useAuth = (): AuthContextType => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return authContext;
};

export default useAuth;
