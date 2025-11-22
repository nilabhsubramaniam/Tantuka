import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { getImagePath } from '../../utils/basePath';

const SareeProductCard = ({ product, stateInfo }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const discount = product.originalPrice 
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;
    const shippingInfo = product.inStock ? 'Ships within 3 business days' : 'Currently weaving • Dispatch in 2 weeks';

    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="group relative bg-white rounded-2xl shadow-soft hover:shadow-hover 
                     overflow-hidden transition-all duration-300"
        >
            {/* Image Container */}
            <Link href={`/products/${product.id}`}>
                <div className="relative aspect-[3/4] overflow-hidden bg-primary-50">
                    {!imageLoaded && (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-accent-50 animate-pulse" />
                    )}
                    <img
                        src={getImagePath(product.image)}
                        alt={product.name}
                        className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110
                                  ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                        onLoad={() => setImageLoaded(true)}
                    />

                    {/* Quick Action Icons - Always visible on bottom */}
                    <div className="absolute inset-x-0 bottom-0 p-3 flex items-center justify-center gap-2">
                        <motion.button
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                                e.preventDefault();
                                // Handle quick view
                            }}
                            className="w-10 h-10 flex items-center justify-center bg-white/95 backdrop-blur-sm 
                                     rounded-full shadow-md hover:bg-accent-500 hover:text-white 
                                     transition-all duration-200 group/btn"
                            title="Quick View"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </motion.button>
                        
                        <motion.button
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                                e.preventDefault();
                                // Handle add to cart
                            }}
                            className="w-10 h-10 flex items-center justify-center bg-primary-900 text-white 
                                     rounded-full shadow-md hover:bg-accent-500 transition-all duration-200"
                            title="Add to Cart"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                                e.preventDefault();
                                // Handle compare
                            }}
                            className="w-10 h-10 flex items-center justify-center bg-white/95 backdrop-blur-sm 
                                     rounded-full shadow-md hover:bg-accent-500 hover:text-white 
                                     transition-all duration-200"
                            title="Compare"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </motion.button>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {discount > 0 && (
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="px-3 py-1 bg-accent-500 text-white text-xs font-bold 
                                         rounded-full shadow-md"
                            >
                                {discount}% OFF
                            </motion.div>
                        )}
                        {!product.inStock && (
                            <div className="px-3 py-1 bg-primary-900 text-white text-xs font-bold 
                                         rounded-full shadow-md">
                                Sold Out
                            </div>
                        )}
                    </div>

                    {/* Wishlist Button */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                            e.preventDefault();
                            setIsWishlisted(!isWishlisted);
                        }}
                        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center 
                                 bg-white/90 backdrop-blur-sm rounded-full shadow-md 
                                 hover:bg-white transition-all duration-300 z-10"
                    >
                        <motion.svg
                            animate={{
                                scale: isWishlisted ? [1, 1.3, 1] : 1,
                            }}
                            transition={{ duration: 0.3 }}
                            className={`w-5 h-5 transition-colors duration-300 ${
                                isWishlisted ? 'text-red-500 fill-current' : 'text-primary-400'
                            }`}
                            fill={isWishlisted ? "currentColor" : "none"}
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </motion.svg>
                    </motion.button>
                </div>
            </Link>

            {/* Content */}
            <div className="p-5">
                {/* Subtle State Tag */}
                {stateInfo && (
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full flex items-center gap-1.5">
                            <span aria-hidden>{stateInfo.icon}</span>
                            {stateInfo.state}
                        </span>
                        {product.weave && (
                            <span className="text-xs text-primary-500 bg-primary-50/50 px-2 py-1 rounded">
                                {product.weave}
                            </span>
                        )}
                    </div>
                )}

                {/* Title */}
                <Link href={`/products/${product.id}`}>
                    <h3 className="font-display text-lg font-bold text-primary-900 mb-2 
                                 line-clamp-2 group-hover:text-accent-600 transition-colors 
                                 duration-300">
                        {product.name}
                    </h3>
                </Link>

                {/* Features */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                    {product.features?.slice(0, 3).map((feature, idx) => (
                        <span
                            key={idx}
                            className="text-xs text-primary-600 bg-primary-50/50 px-2 py-0.5 rounded"
                        >
                            {feature}
                        </span>
                    ))}
                </div>

                {/* Rating */}
                {product.rating && (
                    <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    className={`w-4 h-4 ${
                                        i < Math.floor(product.rating)
                                            ? 'text-yellow-400 fill-current'
                                            : 'text-primary-200'
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <span className="text-xs text-primary-500">
                            {product.rating} ({product.reviews})
                        </span>
                    </div>
                )}

                {/* Price */}
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-primary-900">
                        ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice && (
                        <span className="text-sm text-primary-400 line-through">
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                    )}
                </div>

                <p className="text-xs text-primary-500 mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                    {shippingInfo}
                </p>

                {/* Main CTA */}
                <Link href={`/products/${product.id}`}>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 rounded-xl font-semibold transition-all duration-300 
                                  shadow-soft hover:shadow-hover bg-primary-900 text-white hover:bg-primary-800"
                    >
                        View Details
                    </motion.button>
                </Link>
            </div>
        </motion.div>
    );
};

export default SareeProductCard;
