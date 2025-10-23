import { useState, useEffect, createContext, useContext } from 'react';
import { useRouter } from 'next/router';
import { authService } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    // Check if user is authenticated on initial load
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const userData = await authService.getCurrentUser();
                    setUser(userData);
                }
            } catch (err) {
                console.error('Authentication check failed:', err);
                localStorage.removeItem('token');
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    // Login function
    const login = async (email, password) => {
        setError(null);
        try {
            const response = await authService.login(email, password);
            localStorage.setItem('token', response.access_token);

            // Get user data
            const userData = await authService.getCurrentUser();
            setUser(userData);

            return userData;
        } catch (err) {
            setError(err.response?.data?.detail || 'Login failed');
            throw err;
        }
    };

    // Register function
    const register = async (userData) => {
        setError(null);
        try {
            await authService.register(userData);

            // Auto-login after registration
            return await login(userData.email, userData.password);
        } catch (err) {
            setError(err.response?.data?.detail || 'Registration failed');
            throw err;
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        router.push('/');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                error,
                login,
                register,
                logout,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// HOC to protect routes that require authentication
export const withAuth = (Component) => {
    const AuthenticatedComponent = (props) => {
        const { user, loading, isAuthenticated } = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (!loading && !isAuthenticated) {
                router.replace('/login?redirect=' + router.asPath);
            }
        }, [loading, isAuthenticated, router]);

        if (loading) {
            return <div>Loading...</div>;
        }

        return isAuthenticated ? <Component {...props} /> : null;
    };

    return AuthenticatedComponent;
};