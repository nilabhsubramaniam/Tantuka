import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getImagePath } from '../../utils/basePath';

const ProductCard = ({ product }) => {
    const { id, name, slug, images, price, originalPrice } = product;
    const [isHovered, setIsHovered] = useState(false);

    // Calculate discount percentage
    const discountPercentage = originalPrice ? Math.round((originalPrice - price) / originalPrice * 100) : 0;

    // Check if image exists and is valid
    const hasValidImage = images && images.length > 0 && !images[0].includes('product-placeholder');

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -8 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="group relative bg-white rounded-2xl shadow-soft hover:shadow-hover transition-all duration-500"
        >
            <Link href={`/products/${slug}`}>
                <div className="relative overflow-hidden rounded-t-2xl">
                    {/* Image Container */}
                    <div className="relative aspect-[3/4] bg-gradient-to-br from-primary-50 to-sage-50">
                        {hasValidImage ? (
                            <>
                                <img
                                    src={getImagePath(images[0])}
                                    alt={name}
                                    className="h-full w-full object-cover object-center transition-all duration-700 group-hover:scale-110"
                                />
                                {/* Gradient Overlay on Hover */}
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: isHovered ? 1 : 0 }}
                                    className="absolute inset-0 bg-gradient-to-t from-primary-900/40 via-transparent to-transparent"
                                />
                            </>
                        ) : (
                            <div className="h-full w-full flex flex-col items-center justify-center">
                                <motion.svg 
                                    animate={{ 
                                        y: isHovered ? [-5, 5, -5] : 0,
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="w-20 h-20 mb-3 text-accent-300" 
                                    fill="currentColor" 
                                    viewBox="0 0 20 20"
                                >
                                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </motion.svg>
                                <p className="text-sm text-primary-400 font-medium">Beautiful Chikankari</p>
                            </div>
                        )}

                        {/* Decorative pattern overlay */}
                        <div 
                            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                            style={{
                                backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(184, 160, 137, 0.3) 1px, transparent 0)',
                                backgroundSize: '24px 24px'
                            }}
                        ></div>
                    </div>

                    {/* Discount Badge */}
                    {discountPercentage > 0 && (
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="absolute top-4 right-4 z-10"
                        >
                            <div className="bg-gradient-to-br from-accent-500 to-accent-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                                {discountPercentage}% OFF
                            </div>
                        </motion.div>
                    )}

                    {/* New Badge */}
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="absolute top-4 left-4 z-10"
                    >
                        <div className="bg-white/90 backdrop-blur-sm text-primary-700 px-3 py-1.5 rounded-full text-xs font-semibold shadow-md border border-gold-200">
                            New
                        </div>
                    </motion.div>

                    {/* Quick View Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        className="absolute inset-x-4 bottom-4 z-10"
                    >
                        <button className="w-full py-3 bg-white/95 backdrop-blur-sm text-primary-900 font-semibold rounded-xl shadow-lg hover:bg-white transition-all duration-300 transform hover:scale-105">
                            Quick View
                        </button>
                    </motion.div>
                </div>

                {/* Product Info */}
                <div className="p-5">
                    {/* Category */}
                    <p className="text-xs uppercase tracking-wider text-accent-500 font-semibold mb-2">
                        Chikankari Embroidery
                    </p>

                    {/* Product Name */}
                    <h3 className="text-lg font-bold text-primary-900 mb-3 line-clamp-2 group-hover:text-accent-600 transition-colors duration-300">
                        {name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                            <svg 
                                key={i} 
                                className={`w-4 h-4 ${i < 4 ? 'text-gold-500' : 'text-primary-200'}`} 
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                        <span className="text-xs text-primary-500 ml-2">(124 reviews)</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-3">
                        <span className="text-2xl font-bold text-primary-900">
                            ₹{price.toLocaleString()}
                        </span>
                        {originalPrice && originalPrice > price && (
                            <>
                                <span className="text-sm text-primary-400 line-through">
                                    ₹{originalPrice.toLocaleString()}
                                </span>
                                <span className="text-xs text-accent-600 font-semibold">
                                    Save ₹{(originalPrice - price).toLocaleString()}
                                </span>
                            </>
                        )}
                    </div>

                    {/* Add to Cart Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-4 w-full py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                    >
                        <svg className="w-5 h-5 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Add to Cart
                    </motion.button>
                </div>

                {/* Wishlist Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors z-20 group/heart"
                >
                    <svg className="w-5 h-5 text-primary-400 group-hover/heart:text-accent-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </motion.button>
            </Link>
        </motion.div>
    );
};

export default ProductCard;
