import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';
import { AuthProvider } from '../utils/auth';
import { CartProvider } from '../context/CartContext';
import { NotificationProvider } from '../context/NotificationContext';

function MyApp({ Component, pageProps }) {
    // Create a client
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                retry: 1,
            },
        },
    }));

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <NotificationProvider>
                    <CartProvider>
                        <Component {...pageProps} />
                    </CartProvider>
                </NotificationProvider>
            </AuthProvider>
        </QueryClientProvider>
    );
}

export default MyApp;