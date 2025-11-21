import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { getImagePath } from '../../utils/basePath';

const SareeProductCard = ({ product }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const discount = product.originalPrice 
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

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

                    {/* Overlay on Hover */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-primary-900/20 to-transparent 
                                 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />

                    {/* Quick View Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 
                                 transition-all duration-300"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full py-3 bg-white text-primary-900 rounded-xl font-semibold 
                                     hover:bg-accent-500 hover:text-white transition-all duration-300 
                                     shadow-lg"
                        >
                            Quick View
                        </motion.button>
                    </motion.div>

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
                {/* State Tag */}
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-accent-600 bg-accent-50 
                                   px-3 py-1 rounded-full">
                        {product.state}
                    </span>
                    {product.weave && (
                        <span className="text-xs text-primary-500 bg-primary-50 px-3 py-1 rounded-full">
                            {product.weave}
                        </span>
                    )}
                </div>

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

                {/* Add to Cart Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!product.inStock}
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 
                              shadow-soft hover:shadow-hover ${
                                  product.inStock
                                      ? 'bg-primary-900 text-white hover:bg-primary-800'
                                      : 'bg-primary-100 text-primary-400 cursor-not-allowed'
                              }`}
                >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </motion.button>
            </div>
        </motion.div>
    );
};

export default SareeProductCard;
