import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';
import Head from 'next/head';
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
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
                <meta name="theme-color" content="#8B4513" />
                <meta name="description" content="Discover authentic handloom sarees from across India - Banarasi, Kanjeevaram, Chanderi, and more" />
                <meta name="application-name" content="Tantuka" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content="Tantuka" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="mobile-web-app-capable" content="yes" />
                <link rel="manifest" href="/Tantuka/manifest.json" />
                <link rel="apple-touch-icon" href="/Tantuka/icons/icon-192x192.svg" />
                <link rel="icon" type="image/svg+xml" sizes="32x32" href="/Tantuka/icons/icon-192x192.svg" />
            </Head>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <NotificationProvider>
                        <CartProvider>
                            <Component {...pageProps} />
                        </CartProvider>
                    </NotificationProvider>
                </AuthProvider>
            </QueryClientProvider>
        </>
    );
}

export default MyApp;