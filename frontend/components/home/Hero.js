import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { getImagePath } from '../../utils/basePath';

const Hero = () => {
    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-sage-50 min-h-[90vh]">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-10 w-72 h-72 bg-accent-200/20 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-sage-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gold-200/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="mx-auto max-w-7xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[90vh] px-4 sm:px-6 lg:px-8">
                    {/* Left Content */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="py-12 lg:py-0"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="inline-block mb-6"
                        >
                            <span className="px-4 py-2 bg-gradient-to-r from-gold-100 to-accent-100 text-accent-700 rounded-full text-sm font-medium border border-gold-300/50">
                                ✨ Handcrafted Excellence Since Generations
                            </span>
                        </motion.div>

                        {/* Heading */}
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6"
                        >
                            <span className="block text-primary-900">Timeless</span>
                            <span className="block gradient-text">Chikankari</span>
                            <span className="block text-primary-800">Elegance</span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-lg sm:text-xl text-primary-600 leading-relaxed mb-8 max-w-xl"
                        >
                            Discover the exquisite art of traditional Chikankari embroidery. 
                            Each piece is a masterpiece, handcrafted by skilled artisans who 
                            breathe life into threads with centuries-old techniques.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <Link href="/products">
                                <button className="group relative px-8 py-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Explore Collection
                                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-accent-600 to-accent-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                                </button>
                            </Link>
                            
                            <Link href="/about">
                                <button className="px-8 py-4 bg-white/80 backdrop-blur-sm text-primary-700 font-semibold rounded-xl border-2 border-primary-300 hover:border-accent-500 hover:text-accent-600 shadow-soft hover:shadow-hover transition-all duration-300 transform hover:-translate-y-1">
                                    Our Heritage
                                </button>
                            </Link>
                        </motion.div>

                        {/* Trust Indicators */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9, duration: 0.8 }}
                            className="mt-12 flex flex-wrap items-center gap-8 text-sm text-primary-500"
                        >
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="font-medium">100% Handcrafted</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="font-medium">Premium Quality</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                                <span className="font-medium">Secure Shipping</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Visual */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="relative hidden lg:block"
                    >
                        {/* Main Image Placeholder with Ornate Border */}
                        <div className="relative z-10">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                                <div className="aspect-[3/4] bg-gradient-to-br from-primary-100 via-accent-50 to-sage-100 relative">
                                    {/* Hero Image */}
                                    <img
                                        src={getImagePath("/images/hero/hero-chikankari.jpg")}
                                        alt="Exquisite Chikankari Embroidery"
                                        className="w-full h-full object-cover"
                                    />
                                    
                                    {/* Subtle overlay for better text contrast on floating cards */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/10 via-transparent to-transparent"></div>
                                </div>
                                
                                {/* Golden Border Effect */}
                                <div className="absolute inset-0 rounded-3xl border-4 border-gold-200/50 pointer-events-none"></div>
                            </div>

                            {/* Floating Accent Cards */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-gold-200/50"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-accent-400 to-accent-600 rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-primary-900">5,000+</p>
                                        <p className="text-xs text-primary-500">Happy Customers</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-gold-200/50"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-sage-400 to-sage-600 rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-primary-900">Authentic</p>
                                        <p className="text-xs text-primary-500">100% Original</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Background Decoration */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10">
                            <div className="w-full h-full bg-gradient-to-br from-accent-200/20 to-sage-200/20 rounded-full blur-3xl"></div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Wave Decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden">
                <svg className="absolute bottom-0 w-full h-24" preserveAspectRatio="none" viewBox="0 0 1440 74" fill="none">
                    <path d="M0 22L48 26.3C96 30.7 192 39.3 288 43.7C384 48 480 48 576 43.7C672 39.3 768 30.7 864 28.2C960 26 1056 30 1152 32.5C1248 35 1344 35 1392 35L1440 35V74H1392C1344 74 1248 74 1152 74C1056 74 960 74 864 74C768 74 672 74 576 74C480 74 384 74 288 74C192 74 96 74 48 74H0V22Z" fill="white" fillOpacity="0.5"/>
                    <path d="M0 37L48 39.3C96 41.7 192 46.3 288 48.8C384 51.3 480 51.7 576 48.8C672 46 768 40 864 37.5C960 35 1056 37 1152 41.5C1248 46 1344 53 1392 56.5L1440 60V74H1392C1344 74 1248 74 1152 74C1056 74 960 74 864 74C768 74 672 74 576 74C480 74 384 74 288 74C192 74 96 74 48 74H0V37Z" fill="white"/>
                </svg>
            </div>
        </div>
    );
};

export default Hero;