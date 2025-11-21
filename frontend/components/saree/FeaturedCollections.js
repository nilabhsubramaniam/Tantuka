import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getImagePath } from '../../utils/basePath';

const FeaturedCollections = () => {
    const [activeFilter, setActiveFilter] = useState('all');

    const featuredSarees = [
        {
            id: 1,
            name: 'Pure White Lucknow Chikankari',
            type: 'Lucknow Chikankari',
            price: 8999,
            originalPrice: 12999,
            image: '/images/products/product-1.jpg',
            rating: 4.9,
            reviews: 342,
            badge: 'Best Seller',
            colors: ['#FFFFFF', '#F5DEB3'],
        },
        {
            id: 2,
            name: 'Colored Chikankari with Gold',
            type: 'Lucknow Chikankari',
            price: 10999,
            originalPrice: 15999,
            image: '/images/products/product-2.jpg',
            rating: 4.8,
            reviews: 285,
            badge: 'Featured',
            colors: ['#FFB6C1', '#FFD700'],
        },
        {
            id: 3,
            name: 'Mukaish Chikankari Saree',
            type: 'Lucknow Chikankari',
            price: 14999,
            originalPrice: 20999,
            image: '/images/products/product-3.jpg',
            rating: 5.0,
            reviews: 198,
            badge: 'Premium',
            colors: ['#FFD700', '#C0C0C0'],
        },
        {
            id: 4,
            name: 'Kasavu with Gold Border',
            type: 'Kerala Saree',
            price: 7999,
            originalPrice: 11999,
            image: '/images/products/product-4.jpg',
            rating: 4.7,
            reviews: 156,
            colors: ['#FFFAF0', '#FFD700'],
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    const discountPercent = (original, current) => {
        return Math.round(((original - current) / original) * 100);
    };

    return (
        <div>
            {/* Filter Tabs */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-wrap justify-center gap-3 mb-12"
            >
                {['all', 'lucknow', 'kerala', 'bestseller'].map((filter) => (
                    <motion.button
                        key={filter}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                            activeFilter === filter
                                ? 'bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-lg'
                                : 'bg-white text-primary-700 border-2 border-primary-200 hover:border-accent-500'
                        }`}
                    >
                        {filter === 'all' && 'All Collections'}
                        {filter === 'lucknow' && 'Lucknow Chikankari'}
                        {filter === 'kerala' && 'Kerala Sarees'}
                        {filter === 'bestseller' && 'Best Sellers'}
                    </motion.button>
                ))}
            </motion.div>

            {/* Sarees Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
                {featuredSarees.map((saree, idx) => (
                    <motion.div
                        key={saree.id}
                        variants={itemVariants}
                        whileHover={{ y: -10 }}
                        className="group cursor-pointer"
                    >
                        <Link href={`/sarees/up/lucknow-chikankari/${saree.id}`}>
                            <div className="card-elegant overflow-hidden">
                                {/* Image Container */}
                                <div className="relative h-72 overflow-hidden bg-primary-100">
                                    <img
                                        src={getImagePath(saree.image)}
                                        alt={saree.name}
                                        className="absolute w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />

                                    {/* Badge */}
                                    {saree.badge && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.2 }}
                                            className="absolute top-3 right-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white px-3 py-1 rounded-full text-xs font-bold"
                                        >
                                            {saree.badge}
                                        </motion.div>
                                    )}

                                    {/* Discount Badge */}
                                    {saree.originalPrice && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.15 }}
                                            className="absolute top-3 left-3 bg-accent-600 text-white px-2 py-1 rounded-lg text-sm font-bold"
                                        >
                                            -{discountPercent(saree.originalPrice, saree.price)}%
                                        </motion.div>
                                    )}

                                    {/* Color Palette */}
                                    <motion.div
                                        className="absolute bottom-3 left-3 flex gap-2"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        {saree.colors.map((color, i) => (
                                            <motion.div
                                                key={i}
                                                className="w-4 h-4 rounded-full border-2 border-white shadow-md cursor-pointer"
                                                style={{ backgroundColor: color }}
                                                whileHover={{ scale: 1.2 }}
                                                whileTap={{ scale: 0.9 }}
                                            />
                                        ))}
                                    </motion.div>

                                    {/* Quick View Button */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary-900/90 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                                    >
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="w-full btn-primary text-sm font-semibold py-2"
                                        >
                                            Quick View
                                        </motion.button>
                                    </motion.div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    {/* Type Badge */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        className="inline-block mb-2"
                                    >
                                        <span className="text-xs font-semibold text-accent-600 uppercase tracking-wide">
                                            {saree.type}
                                        </span>
                                    </motion.div>

                                    {/* Name */}
                                    <motion.h3
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ delay: 0.1 }}
                                        className="text-lg font-bold text-primary-900 mb-3 line-clamp-2 group-hover:text-accent-600 transition-colors"
                                    >
                                        {saree.name}
                                    </motion.h3>

                                    {/* Rating */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ delay: 0.15 }}
                                        className="flex items-center gap-2 mb-3"
                                    >
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className={i < Math.floor(saree.rating) ? '★' : '☆'}>
                                                    {i < Math.floor(saree.rating) ? '★' : '☆'}
                                                </span>
                                            ))}
                                        </div>
                                        <span className="text-xs text-primary-600">
                                            {saree.rating} ({saree.reviews})
                                        </span>
                                    </motion.div>

                                    {/* Price */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="flex items-baseline gap-2"
                                    >
                                        <span className="text-2xl font-bold text-primary-900">
                                            ₹{saree.price.toLocaleString()}
                                        </span>
                                        {saree.originalPrice && (
                                            <span className="text-sm line-through text-primary-500">
                                                ₹{saree.originalPrice.toLocaleString()}
                                            </span>
                                        )}
                                    </motion.div>

                                    {/* Add to Cart Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full mt-4 btn-secondary py-2 text-sm font-semibold"
                                    >
                                        Add to Cart
                                    </motion.button>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>

            {/* View All Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex justify-center mt-16"
            >
                <Link href="/sarees/explore">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-primary px-12 py-4 text-lg font-semibold"
                    >
                        View All Collections →
                    </motion.button>
                </Link>
            </motion.div>
        </div>
    );
};

export default FeaturedCollections;
