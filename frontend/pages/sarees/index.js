import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../../components/layout/Layout';

// Premium Saree Collections Data with high-quality images
const collections = [
    {
        id: 1,
        name: 'Lucknow Elegance',
        state: 'Uttar Pradesh',
        type: 'Chikankari',
        description: 'Hand-embroidered with delicate floral patterns, a masterpiece of fine craftsmanship',
        price: 2500,
        originalPrice: 3500,
        image: '/images/sarees/uttar-pradesh.jpg',
        badge: '',
        features: ['Cotton Silk', 'Handmade', 'Pure Chikankari']
    },
    {
        id: 2,
        name: 'Kerala Classic',
        state: 'Kerala',
        type: 'Tissue',
        description: 'Traditional Kasavu with shimmering golden zari borders, timeless elegance',
        price: 1800,
        originalPrice: 2500,
        image: '/images/sarees/kerala.jpg',
        badge: '',
        features: ['Tissue Cotton', 'Zari Work', 'Kasavu']
    },
    {
        id: 3,
        name: 'Kanchipuram Royal',
        state: 'Tamil Nadu',
        type: 'Silk',
        description: 'Pure silk with intricate temple patterns, a royal statement piece',
        price: 3200,
        originalPrice: 4500,
        image: '/images/sarees/tamil-nadu.jpg',
        badge: '',
        features: ['Pure Silk', 'Temple Design', 'Pure Zari']
    },
    {
        id: 4,
        name: 'Mysore Silk',
        state: 'Karnataka',
        type: 'Silk',
        description: 'Luxurious soft silk with traditional weaving motifs',
        price: 2200,
        originalPrice: 3200,
        image: '/images/sarees/karnataka.jpg',
        badge: '',
        features: ['Mulberry Silk', 'Soft Weave', 'Motifs']
    },
    {
        id: 5,
        name: 'Sambalpuri Magic',
        state: 'Odisha',
        type: 'Cotton',
        description: 'Handwoven beauty with traditional ikat patterns from master weavers',
        price: 1500,
        originalPrice: 2200,
        image: '/images/sarees/odisha.jpg',
        badge: '',
        features: ['Handwoven', 'Ikat Pattern', 'Pure Cotton']
    },
    {
        id: 6,
        name: 'Paithani Gold',
        state: 'Maharashtra',
        type: 'Silk',
        description: 'Legendary peacock patterns with luxurious 24K gold zari work',
        price: 3800,
        originalPrice: 5500,
        image: '/images/sarees/maharashtra.jpg',
        badge: '',
        features: ['Pure Silk', 'Peacock Pattern', '24K Zari']
    },
    {
        id: 7,
        name: 'Maheshwari Elegance',
        state: 'Madhya Pradesh',
        type: 'Silk Cotton',
        description: 'Lightweight yet elegant with traditional diamond weave patterns',
        price: 2000,
        originalPrice: 2800,
        image: '/images/sarees/madhya-pradesh.jpg',
        badge: '',
        features: ['Silk Cotton', 'Light Weight', 'Diamond Weave']
    },
    {
        id: 8,
        name: 'Bengal Silk',
        state: 'West Bengal',
        type: 'Raw Silk',
        description: 'Authentic tussar silk with natural color variations and eco-friendly dyes',
        price: 2400,
        originalPrice: 3400,
        image: '/images/sarees/west-bengal.jpg',
        badge: '',
        features: ['Tussar Silk', 'Natural Dyes', 'Eco-Friendly']
    }
];

export default function SareesPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    const bookVariants = {
        enter: (dir) => ({
            rotateY: dir > 0 ? 90 : -90,
            opacity: 0,
        }),
        center: {
            rotateY: 0,
            opacity: 1,
        },
        exit: (dir) => ({
            rotateY: dir < 0 ? 90 : -90,
            opacity: 0,
        }),
    };

    const paginate = (newDirection) => {
        setDirection(newDirection);
        setCurrentIndex((prev) => (prev + newDirection + collections.length) % collections.length);
    };

    if (isLoading) {
        return (
            <Layout>
                <div className="flex items-center justify-center h-96">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="w-12 h-12 border-4 border-accent-300 border-t-accent-600 rounded-full"
                    />
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            {/* Book Page-Turn Collection Slider */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-8"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                            Curated Saree Collections
                        </h2>
                        <p className="text-primary-600 max-w-2xl mx-auto text-sm md:text-base">
                            Flip through to discover your perfect saree from across India.
                        </p>
                    </motion.div>

                    {/* Book Slider Container */}
                    <div className="relative w-full max-w-5xl mx-auto" style={{ perspective: '2000px' }}>
                        {/* Book Wrapper */}
                        <div className="relative h-[520px] md:h-[480px] bg-white rounded-2xl shadow-2xl overflow-hidden"
                            style={{
                                transformStyle: 'preserve-3d',
                                border: '6px solid #f5f5f0',
                            }}
                        >
                            {/* Book Spine Effect - Center divider */}
                            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-primary-200 to-transparent z-10 transform -translate-x-1/2" />
                            
                            <AnimatePresence initial={false} custom={direction} mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    custom={direction}
                                    variants={bookVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{
                                        rotateY: { type: 'tween', ease: 'easeInOut', duration: 0.6 },
                                        opacity: { duration: 0.3 },
                                    }}
                                    className="absolute inset-0 w-full h-full"
                                    style={{ transformStyle: 'preserve-3d' }}
                                >
                                    <div className="grid grid-cols-2 h-full">
                                        {/* LEFT PAGE - Image */}
                                        <div className="bg-primary-50 flex items-center justify-center p-8 overflow-hidden">
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.3, duration: 0.6 }}
                                                className="w-full h-full flex items-center justify-center"
                                            >
                                                <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg">
                                                    <img
                                                        src={collections[currentIndex].image}
                                                        alt={collections[currentIndex].name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    {/* Gradient overlay on image */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                                                </div>
                                            </motion.div>
                                        </div>

                                        {/* RIGHT PAGE - Content */}
                                        <div className="bg-white flex flex-col justify-between p-6 overflow-y-auto">
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                {/* State Tag */}
                                                <motion.div
                                                    initial={{ opacity: 0, x: 10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.25 }}
                                                    className="inline-flex items-center space-x-2 mb-3"
                                                >
                                                    <span className="text-accent-500 font-bold text-xs">🗺️ {collections[currentIndex].state}</span>
                                                </motion.div>

                                                {/* Title */}
                                                <motion.h3
                                                    initial={{ opacity: 0, y: 5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.3 }}
                                                    className="text-2xl md:text-3xl font-bold text-primary-900 mb-1 leading-tight"
                                                >
                                                    {collections[currentIndex].name}
                                                </motion.h3>

                                                {/* Type */}
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.35 }}
                                                    className="text-accent-600 font-semibold text-xs mb-3"
                                                >
                                                    {collections[currentIndex].type} Saree
                                                </motion.div>

                                                {/* Description */}
                                                <motion.p
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.4 }}
                                                    className="text-primary-600 text-xs leading-relaxed mb-4"
                                                >
                                                    {collections[currentIndex].description}
                                                </motion.p>

                                                {/* Features */}
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.45 }}
                                                    className="flex flex-wrap gap-1.5 mb-4"
                                                >
                                                    {collections[currentIndex].features.map((feature, idx) => (
                                                        <motion.span
                                                            key={idx}
                                                            initial={{ opacity: 0, scale: 0.8 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ delay: 0.5 + idx * 0.03 }}
                                                            className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium"
                                                        >
                                                            ✓ {feature}
                                                        </motion.span>
                                                    ))}
                                                </motion.div>
                                            </motion.div>

                                            {/* Pricing Section */}
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.55 }}
                                                className="border-t border-primary-200 pt-4"
                                            >
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="flex items-baseline space-x-1.5">
                                                        <span className="text-xl font-bold text-primary-900">
                                                            ₹{collections[currentIndex].price.toLocaleString()}
                                                        </span>
                                                        <span className="text-xs text-primary-400 line-through">
                                                            ₹{collections[currentIndex].originalPrice.toLocaleString()}
                                                        </span>
                                                    </div>
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
                                                        className="px-2 py-1 bg-green-100 text-green-700 rounded-lg font-semibold text-xs"
                                                    >
                                                        Save ₹{(collections[currentIndex].originalPrice - collections[currentIndex].price).toLocaleString()}
                                                    </motion.div>
                                                </div>

                                                {/* CTA Buttons */}
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.65 }}
                                                    className="flex gap-2"
                                                >
                                                    <motion.button
                                                        whileHover={{ scale: 1.05, y: -2 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className="flex-1 btn-primary py-2 text-xs font-semibold rounded-lg shadow-md hover:shadow-lg transition-shadow"
                                                    >
                                                        Add to Cart
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className="px-3 py-2 border-2 border-accent-500 text-accent-600 font-semibold rounded-lg hover:bg-accent-50 transition-colors text-lg"
                                                    >
                                                        💜
                                                    </motion.button>
                                                </motion.div>
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Navigation Controls */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="flex items-center justify-center gap-5 mt-6"
                    >
                        <motion.button
                            whileHover={{ scale: 1.15, x: -3 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => paginate(-1)}
                            className="p-2.5 rounded-full bg-accent-500 text-white shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </motion.button>

                        {/* Pagination Dots */}
                        <div className="flex gap-1.5">
                            {collections.map((_, idx) => (
                                <motion.button
                                    key={idx}
                                    onClick={() => {
                                        setDirection(idx > currentIndex ? 1 : -1);
                                        setCurrentIndex(idx);
                                    }}
                                    whileHover={{ scale: 1.25 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`rounded-full transition-all ${
                                        idx === currentIndex
                                            ? 'bg-accent-500 w-8 h-2'
                                            : 'bg-primary-300 w-2 h-2 hover:bg-primary-400'
                                    }`}
                                />
                            ))}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.15, x: 3 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => paginate(1)}
                            className="p-2.5 rounded-full bg-accent-500 text-white shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </motion.button>
                    </motion.div>

                    {/* Counter */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="text-center mt-3 text-primary-600 font-semibold text-xs"
                    >
                        {currentIndex + 1} of {collections.length}
                    </motion.div>
                </div>
            </section>

            {/* Browse by State Section - Enhanced */}
            <section className="py-14 bg-gradient-to-b from-white via-primary-50 to-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-10"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                            Explore by State
                        </h2>
                        <p className="text-primary-600 max-w-2xl mx-auto text-sm md:text-base">
                            Discover distinctive regional weaves and traditions from across India's rich textile heritage.
                        </p>
                    </motion.div>

                    {/* Enhanced State Grid with Better Animations */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { name: 'Lucknow', state: 'up', type: 'Chikankari', desc: 'Delicate embroidery', color: 'from-orange-400 to-red-500' },
                            { name: 'Kerala', state: 'kl', type: 'Kasavu', desc: 'Golden borders', color: 'from-green-400 to-teal-500' },
                            { name: 'Kanchipuram', state: 'tn', type: 'Silk', desc: 'Temple patterns', color: 'from-purple-400 to-pink-500' },
                            { name: 'Mysore', state: 'ka', type: 'Silk', desc: 'Soft weaves', color: 'from-blue-400 to-cyan-500' },
                            { name: 'Sambalpuri', state: 'od', type: 'Ikat', desc: 'Handwoven', color: 'from-yellow-400 to-orange-500' },
                            { name: 'Paithani', state: 'mh', type: 'Silk', desc: 'Peacock patterns', color: 'from-rose-400 to-pink-500' },
                            { name: 'Maheshwari', state: 'mp', type: 'Silk Cotton', desc: 'Diamond weave', color: 'from-indigo-400 to-blue-500' },
                            { name: 'Bengal', state: 'wb', type: 'Tussar', desc: 'Natural dyes', color: 'from-amber-400 to-orange-500' }
                        ].map((region, idx) => (
                            <motion.a
                                key={idx}
                                href={`/sarees/${region.state}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05, duration: 0.4 }}
                                whileHover={{ y: -5 }}
                                className="group relative h-56 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer"
                            >
                                {/* Background Gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${region.color} opacity-90 group-hover:opacity-100 transition-opacity`} />
                                
                                {/* Content */}
                                <div className="absolute inset-0 flex flex-col justify-between p-5 text-white">
                                    {/* Top Content */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.05 + 0.1, duration: 0.4 }}
                                    >
                                        <h3 className="text-xl md:text-2xl font-bold mb-1">{region.name}</h3>
                                        <p className="text-xs md:text-sm font-semibold opacity-90">{region.type}</p>
                                    </motion.div>

                                    {/* Bottom Content */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.05 + 0.15, duration: 0.4 }}
                                    >
                                        <p className="text-xs md:text-sm opacity-85 mb-3">{region.desc}</p>
                                        <motion.div
                                            whileHover={{ x: 5 }}
                                            className="inline-flex items-center space-x-2 text-sm font-semibold"
                                        >
                                            <span>Explore</span>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </motion.div>
                                    </motion.div>

                                    {/* Hover Arrow Effect */}
                                    <motion.div
                                        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                                        initial={{ scale: 0 }}
                                        whileHover={{ scale: 1.2, rotate: 45 }}
                                    >
                                        <div className="text-2xl">→</div>
                                    </motion.div>
                                </div>

                                {/* Overlay Shine Effect */}
                                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section - Compact */}
            <section className="py-10 bg-gradient-to-r from-accent-50 to-gold-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { number: '28+', label: 'States', icon: '🇮🇳' },
                            { number: '1000+', label: 'Designs', icon: '👗' },
                            { number: '500+', label: 'Artisans', icon: '👩‍🎨' },
                            { number: '100%', label: 'Authentic', icon: '✨' }
                        ].map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: idx * 0.08 }}
                                className="text-center p-4 bg-white rounded-xl shadow-soft hover:shadow-hover transition-shadow"
                            >
                                <div className="text-3xl mb-2">{stat.icon}</div>
                                <div className="text-xl md:text-2xl font-bold gradient-text mb-1">{stat.number}</div>
                                <div className="text-primary-600 font-medium text-xs md:text-sm">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
}
