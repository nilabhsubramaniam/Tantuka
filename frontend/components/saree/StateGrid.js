import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const StateGrid = () => {
    const [hoveredState, setHoveredState] = useState(null);

    // Sample states - this will be replaced with real data from backend
    const states = [
        {
            id: 'up',
            name: 'Uttar Pradesh',
            sareeType: 'Lucknow Chikankari',
            count: 120,
            image: '/images/sarees/uttar-pradesh.jpg',
            featured: true,
            description: 'Hand-embroidered masterpieces from Lucknow',
            colors: ['#E8DCC4', '#D4A574', '#A8826A']
        },
        {
            id: 'tn',
            name: 'Tamil Nadu',
            sareeType: 'Kanchipuram Silk',
            count: 85,
            image: '/images/sarees/tamil-nadu.jpg',
            featured: false,
            description: 'Pure silk sarees with traditional patterns',
            colors: ['#8B0000', '#FFD700', '#F5DEB3']
        },
        {
            id: 'kl',
            name: 'Kerala',
            sareeType: 'Kasavu Saree',
            count: 65,
            image: '/images/sarees/kerala.jpg',
            featured: false,
            description: 'Traditional ivory and gold bordered sarees',
            colors: ['#FFFAF0', '#FFD700', '#DAA520']
        },
        {
            id: 'ka',
            name: 'Karnataka',
            sareeType: 'Mysore Silk',
            count: 50,
            image: '/images/sarees/karnataka.jpg',
            featured: false,
            description: 'Rich silk sarees with intricate borders',
            colors: ['#4B0082', '#FFD700', '#8B4513']
        },
        {
            id: 'wb',
            name: 'West Bengal',
            sareeType: 'Tant Saree',
            count: 45,
            image: '/images/sarees/west-bengal.jpg',
            featured: false,
            description: 'Lightweight cotton sarees with fine weave',
            colors: ['#FFB6C1', '#FFFFFF', '#87CEEB']
        },
        {
            id: 'od',
            name: 'Odisha',
            sareeType: 'Sambalpuri Saree',
            count: 40,
            image: '/images/sarees/odisha.jpg',
            featured: false,
            description: 'Ikat sarees with geometric patterns',
            colors: ['#FF6347', '#FFFFFF', '#32CD32']
        },
        {
            id: 'mh',
            name: 'Maharashtra',
            sareeType: 'Paithani Saree',
            count: 38,
            image: '/images/sarees/maharashtra.jpg',
            featured: false,
            description: 'Golden bordered silk sarees',
            colors: ['#8B4513', '#FFD700', '#CD853F']
        },
        {
            id: 'ap',
            name: 'Andhra Pradesh',
            sareeType: 'Venkatagiri Saree',
            count: 32,
            image: '/images/categories/dress-materials.jpg',
            featured: false,
            description: 'Embroidered cotton sarees',
            colors: ['#FFB6C1', '#FF69B4', '#FFFFFF']
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
            {states.map((state, idx) => (
                <motion.div
                    key={state.id}
                    variants={itemVariants}
                    onHoverStart={() => setHoveredState(state.id)}
                    onHoverEnd={() => setHoveredState(null)}
                    className={`group cursor-pointer transition-all duration-300 ${
                        state.featured ? 'lg:col-span-2 lg:row-span-2' : ''
                    }`}
                >
                    <Link href={`/sarees/${state.id}`}>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className={`relative overflow-hidden rounded-2xl shadow-soft hover:shadow-hover transition-all ${
                                state.featured ? 'h-96' : 'h-72'
                            } bg-gradient-to-br from-primary-50 to-primary-100`}
                        >
                            {/* Background Image */}
                            <Image
                                src={state.image}
                                alt={state.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-900/30 to-transparent" />

                            {/* Featured Badge */}
                            {state.featured && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="absolute top-4 right-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white px-4 py-2 rounded-full font-semibold text-sm"
                                >
                                    ⭐ Our Specialty
                                </motion.div>
                            )}

                            {/* Color Dots */}
                            <motion.div
                                className="absolute top-4 left-4 flex gap-2"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                {state.colors.map((color, i) => (
                                    <motion.div
                                        key={i}
                                        className="w-3 h-3 rounded-full border-2 border-white shadow-md"
                                        style={{ backgroundColor: color }}
                                        whileHover={{ scale: 1.5 }}
                                    />
                                ))}
                            </motion.div>

                            {/* Content */}
                            <motion.div
                                className="absolute inset-0 flex flex-col justify-end p-6"
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                            >
                                {/* Main Info */}
                                <div>
                                    <motion.h3
                                        className="text-2xl md:text-3xl font-bold text-white mb-2 font-display"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                    >
                                        {state.name}
                                    </motion.h3>
                                    <motion.p
                                        className="text-white/90 font-semibold mb-3"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        {state.sareeType}
                                    </motion.p>
                                    <motion.p
                                        className="text-white/80 text-sm mb-4"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ delay: 0.15 }}
                                    >
                                        {state.description}
                                    </motion.p>
                                </div>

                                {/* Bottom Section - Counter and Arrow */}
                                <div className="flex items-center justify-between">
                                    <motion.div
                                        className="flex items-center gap-2"
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <span className="text-2xl font-bold text-white">{state.count}</span>
                                        <span className="text-sm text-white/70">Designs</span>
                                    </motion.div>

                                    <motion.div
                                        className="text-white text-3xl"
                                        animate={hoveredState === state.id ? { x: 5, y: -5 } : { x: 0, y: 0 }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                    >
                                        →
                                    </motion.div>
                                </div>
                            </motion.div>

                            {/* Hover Overlay */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={hoveredState === state.id ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/50 to-transparent"
                            />
                        </motion.div>
                    </Link>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default StateGrid;
