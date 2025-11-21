import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const SareeHero = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { clientX, clientY, currentTarget } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        setMousePosition({
            x: (clientX - left) / width,
            y: (clientY - top) / height,
        });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: 'easeOut' },
        },
    };

    const floatingVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: 'easeOut' },
        },
    };

    return (
        <div
            className="relative w-full h-screen min-h-screen overflow-hidden bg-gradient-to-br from-primary-50 via-gold-50 to-accent-50"
            onMouseMove={handleMouseMove}
        >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Gradient Orbs */}
                <motion.div
                    animate={{
                        x: mousePosition.x * 50,
                        y: mousePosition.y * 50,
                    }}
                    transition={{ type: 'spring', stiffness: 100, damping: 30 }}
                    className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-accent-200 to-accent-100 rounded-full opacity-30 blur-3xl"
                />
                <motion.div
                    animate={{
                        x: -mousePosition.x * 40,
                        y: -mousePosition.y * 40,
                    }}
                    transition={{ type: 'spring', stiffness: 100, damping: 30 }}
                    className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-gold-200 to-gold-100 rounded-full opacity-30 blur-3xl"
                />
                <motion.div
                    animate={{
                        x: mousePosition.x * 30,
                        y: -mousePosition.y * 30,
                    }}
                    transition={{ type: 'spring', stiffness: 100, damping: 30 }}
                    className="absolute top-1/2 right-1/4 w-72 h-72 bg-gradient-to-bl from-sage-200 to-sage-100 rounded-full opacity-20 blur-3xl"
                />
            </div>

            {/* Content Container */}
            <div className="relative z-10 h-full flex items-center justify-center">
                <div className="container mx-auto px-4 py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="space-y-8"
                        >
                            {/* Badge */}
                            <motion.div
                                variants={itemVariants}
                                className="inline-block"
                            >
                                <div className="px-4 py-2 bg-white/80 backdrop-blur-md border border-white/20 rounded-full inline-flex items-center gap-2">
                                    <span className="text-2xl">✨</span>
                                    <span className="text-sm font-medium text-primary-700">
                                        Our Specialty Collection
                                    </span>
                                </div>
                            </motion.div>

                            {/* Main Heading */}
                            <motion.div variants={itemVariants} className="space-y-4">
                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-primary-900">
                                    Discover Premium
                                    <br />
                                    <span className="gradient-text">Sarees</span>
                                </h1>
                            </motion.div>

                            {/* Subheading */}
                            <motion.p
                                variants={itemVariants}
                                className="text-xl text-primary-600 max-w-xl leading-relaxed"
                            >
                                Experience the timeless elegance of hand-embroidered sarees from across India. 
                                From Lucknow's intricate Chikankari to Kerala's stunning Kasavu, explore authentic 
                                craftsmanship passed down through generations.
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div
                                variants={itemVariants}
                                className="flex flex-col sm:flex-row gap-4 pt-4"
                            >
                                <Link href="/sarees/explore">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="btn-primary px-8 py-4 text-lg font-semibold flex items-center justify-center gap-2 group"
                                    >
                                        Explore Collections
                                        <motion.span
                                            className="group-hover:translate-x-2 transition-transform"
                                            animate={{ x: 0 }}
                                        >
                                            →
                                        </motion.span>
                                    </motion.button>
                                </Link>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="btn-secondary px-8 py-4 text-lg font-semibold flex items-center justify-center gap-2"
                                >
                                    Learn About Chikankari
                                    <span>🎨</span>
                                </motion.button>
                            </motion.div>

                            {/* Stats */}
                            <motion.div
                                variants={itemVariants}
                                className="grid grid-cols-3 gap-6 pt-8 border-t border-primary-200"
                            >
                                {[
                                    { number: '28+', label: 'States' },
                                    { number: '1000+', label: 'Designs' },
                                    { number: '100%', label: 'Authentic' },
                                ].map((stat, idx) => (
                                    <div key={idx}>
                                        <div className="text-2xl font-bold text-accent-600">{stat.number}</div>
                                        <div className="text-sm text-primary-600">{stat.label}</div>
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Right Content - Image with Floating Cards */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="relative h-96 lg:h-[600px] hidden lg:block"
                        >
                            {/* Hero Image */}
                            <motion.div
                                className="relative h-full rounded-2xl overflow-hidden shadow-2xl"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.4 }}
                            >
                                <Image
                                    src="/images/hero/hero-chikankari.jpg"
                                    alt="Premium Lucknow Chikankari Saree"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent" />
                            </motion.div>

                            {/* Floating Card 1 - Premium Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, delay: 0.6 }}
                                className="absolute -bottom-8 -left-16 bg-white rounded-2xl shadow-2xl p-6 w-72 backdrop-blur-sm border border-white/20"
                            >
                                <div className="text-sm text-primary-600 font-semibold mb-2">BEST SELLER</div>
                                <h3 className="text-lg font-bold text-primary-900 mb-2">
                                    Lucknow Chikankari
                                </h3>
                                <p className="text-sm text-primary-600 mb-4">
                                    Hand-embroidered masterpiece from Lucknow's finest artisans
                                </p>
                                <div className="flex items-center gap-2">
                                    <div className="flex text-yellow-400">★★★★★</div>
                                    <span className="text-sm text-primary-600">(2,450 reviews)</span>
                                </div>
                            </motion.div>

                            {/* Floating Card 2 - Collection Info */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: [0, 10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, delay: 0.8 }}
                                className="absolute top-12 -right-12 bg-white rounded-2xl shadow-2xl p-4 w-64 backdrop-blur-sm border border-white/20"
                            >
                                <div className="text-xs text-accent-600 font-bold uppercase tracking-wide mb-2">
                                    HERITAGE
                                </div>
                                <p className="text-sm text-primary-700">
                                    Every saree represents centuries of tradition and craftsmanship
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-sm text-primary-600 font-medium">Scroll to explore</span>
                    <div className="w-6 h-10 border-2 border-primary-400 rounded-full flex items-start justify-center p-2">
                        <motion.div
                            animate={{ y: [0, 4, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-1 h-2 bg-primary-400 rounded-full"
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default SareeHero;
