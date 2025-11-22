import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { useCart } from '../../context/CartContext';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSareesDropdownOpen, setIsSareesDropdownOpen] = useState(false);
    const { totalItems } = useCart();
    const cartCount = totalItems || 0;
    const displayCount = cartCount > 99 ? '99+' : cartCount;
    const showCartBadge = cartCount > 0;
    const cartIconControls = useAnimation();

    // Listen for cart item added event
    useEffect(() => {
        const handleCartItemAdded = () => {
            // Bounce animation sequence
            cartIconControls.start({
                scale: [1, 1.3, 0.9, 1.1, 1],
                rotate: [0, -10, 10, -5, 0],
                transition: {
                    duration: 0.6,
                    times: [0, 0.2, 0.4, 0.6, 1],
                    ease: "easeInOut"
                }
            });
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('cart-item-added', handleCartItemAdded);
            return () => window.removeEventListener('cart-item-added', handleCartItemAdded);
        }
    }, [cartIconControls]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <motion.span
                                className="flex items-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="text-2xl font-bold bg-gradient-to-r from-accent-600 to-accent-500 bg-clip-text text-transparent">
                                    Tantuka
                                </span>
                            </motion.span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        {/* Sarees Dropdown - PRIMARY */}
                        <div
                            className="relative"
                            onMouseEnter={() => setIsSareesDropdownOpen(true)}
                            onMouseLeave={() => setIsSareesDropdownOpen(false)}
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="text-primary-900 font-semibold hover:text-accent-600 transition-colors flex items-center gap-1"
                            >
                                🧵 Sarees
                                <svg className={`w-4 h-4 transition-transform ${isSareesDropdownOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </motion.button>

                            {/* Dropdown Menu */}
                            {isSareesDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 border border-primary-100"
                                >
                                    <Link href="/sarees/explore" className="block px-4 py-2 text-primary-900 hover:bg-primary-50 hover:text-accent-600 transition-colors font-semibold">
                                        Explore All Sarees
                                    </Link>
                                    <Link href="/sarees" className="block px-4 py-2 text-primary-900 hover:bg-primary-50 hover:text-accent-600 transition-colors">
                                        Collections
                                    </Link>
                                    <hr className="my-2 border-primary-100" />
                                    <Link href="/sarees/up" className="block px-4 py-2 text-primary-900 hover:bg-primary-50 hover:text-accent-600 transition-colors">
                                        ⭐ Lucknow Chikankari
                                    </Link>
                                    <Link href="/sarees/kl" className="block px-4 py-2 text-primary-900 hover:bg-primary-50 hover:text-accent-600 transition-colors">
                                        Kerala Sarees
                                    </Link>
                                    <Link href="/sarees/tn" className="block px-4 py-2 text-primary-900 hover:bg-primary-50 hover:text-accent-600 transition-colors">
                                        Tamil Nadu Sarees
                                    </Link>
                                    <hr className="my-2 border-primary-100" />
                                    <Link href="/sarees/explore?featured=true" className="block px-4 py-2 text-primary-900 hover:bg-primary-50 hover:text-accent-600 transition-colors text-sm">
                                        New Arrivals
                                    </Link>
                                </motion.div>
                            )}
                        </div>

                        <motion.div whileHover={{ scale: 1.05 }}>
                            <Link href="/products" className="text-gray-700 hover:text-primary-600 transition-colors">
                                All Products
                            </Link>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.05 }}>
                            <Link href="/about" className="text-gray-700 hover:text-primary-600 transition-colors">
                                About
                            </Link>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.05 }}>
                            <Link href="/contact" className="text-gray-700 hover:text-primary-600 transition-colors">
                                Contact
                            </Link>
                        </motion.div>
                    </nav>

                    {/* User Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Link href="/search" className="text-gray-700 hover:text-primary-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </Link>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Link href="/account" className="text-gray-700 hover:text-primary-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </Link>
                        </motion.div>

                        <motion.div 
                            whileHover={{ scale: 1.1 }} 
                            whileTap={{ scale: 0.9 }}
                            animate={cartIconControls}
                        >
                            <Link href="/cart" className="text-gray-700 hover:text-primary-600 relative">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                {showCartBadge && (
                                    <motion.span
                                        key={displayCount}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                                        className="absolute -top-1 -right-1 bg-accent-600 text-white rounded-full text-[10px] min-w-[1.25rem] h-5 px-1 flex items-center justify-center font-bold shadow-sm"
                                        aria-label={`${cartCount} items in cart`}
                                    >
                                        {displayCount}
                                    </motion.span>
                                )}
                            </Link>
                        </motion.div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <motion.button
                            onClick={toggleMenu}
                            whileTap={{ scale: 0.9 }}
                            className="text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </motion.button>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="md:hidden mt-4 pb-3 space-y-1"
                    >
                        <Link href="/sarees/explore" className="block px-3 py-2 rounded-md text-base font-bold text-accent-600 bg-primary-50">
                            🧵 Explore All Sarees
                        </Link>
                        <Link href="/sarees" className="block px-3 py-2 rounded-md text-base font-medium text-primary-900 hover:text-accent-600 hover:bg-gray-50">
                            Collections
                        </Link>
                        <Link href="/sarees/up" className="block px-3 py-2 rounded-md text-base font-medium text-primary-900 hover:text-accent-600 hover:bg-gray-50">
                            ⭐ Lucknow Chikankari
                        </Link>
                        <Link href="/products" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50">
                            All Products
                        </Link>
                        <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50">
                            About
                        </Link>
                        <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50">
                            Contact
                        </Link>

                        {/* Mobile User Actions */}
                        <div className="border-t border-gray-200 mt-4 pt-4 flex justify-around">
                            <Link href="/search" className="text-gray-700 hover:text-primary-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </Link>
                            <Link href="/account" className="text-gray-700 hover:text-primary-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </Link>
                            <Link href="/cart" className="text-gray-700 hover:text-primary-600 relative">
                                <motion.div
                                    animate={cartIconControls}
                                    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </motion.div>
                                {showCartBadge && (
                                    <motion.span
                                        className="absolute -top-1 -right-1 bg-accent-600 text-white rounded-full text-[10px] min-w-[1.2rem] h-5 px-1 flex items-center justify-center font-bold"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                                    >
                                        {displayCount}
                                    </motion.span>
                                )}
                            </Link>
                        </div>
                    </motion.div>
                )}
            </div>
        </header>
    );
};

export default Header;