import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, title = 'Tantuka - Exquisite Chikankari Clothing' }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content="Premium Chikankari clothing and accessories, handcrafted with love and tradition" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
            </div>
        </>
    );
};

export default Layout;