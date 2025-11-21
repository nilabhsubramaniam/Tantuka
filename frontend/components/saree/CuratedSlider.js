import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getImagePath } from '../../utils/basePath';

const CuratedSlider = () => {
    const scrollRef = useRef(null);

    const curatedCollections = [
        {
            id: 1,
            title: 'Wedding Collection',
            description: 'Exquisite silk sarees perfect for your special day',
            count: 24,
            image: '/images/sarees/tamil-nadu.jpg',
            tag: 'Premium',
            colors: ['#8B0000', '#FFD700', '#FFFFFF']
        },
        {
            id: 2,
            title: 'Festive Elegance',
            description: 'Vibrant designs for celebrations and festivities',
            count: 32,
            image: '/images/sarees/maharashtra.jpg',
            tag: 'Bestseller',
            colors: ['#228B22', '#FFD700', '#FF6347']
        },
        {
            id: 3,
            title: 'Cotton Comfort',
            description: 'Lightweight and breathable for everyday elegance',
            count: 28,
            image: '/images/sarees/kerala.jpg',
            tag: 'Handwoven',
            colors: ['#FFFAF0', '#DAA520', '#8B4513']
        },
        {
            id: 4,
            title: 'Heritage Silk',
            description: 'Traditional weaves celebrating Indian craftsmanship',
            count: 18,
            image: '/images/sarees/uttar-pradesh.jpg',
            tag: 'Exclusive',
            colors: ['#E8DCC4', '#D4A574', '#A8826A']
        },
        {
            id: 5,
            title: 'Modern Classics',
            description: 'Contemporary designs with traditional roots',
            count: 22,
            image: '/images/sarees/west-bengal.jpg',
            tag: 'New',
            colors: ['#F5F5DC', '#CD853F', '#8B4513']
        }
    ];

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 400;
            const newPosition = direction === 'left'
                ? scrollRef.current.scrollLeft - scrollAmount
                : scrollRef.current.scrollLeft + scrollAmount;

            scrollRef.current.scrollTo({
                left: newPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="py-10 md:py-14 bg-primary-50/20">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                >
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="font-display text-3xl md:text-4xl font-bold text-primary-900 mb-3"
                    >
                        Curated Collections
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-base text-primary-600 max-w-2xl mx-auto"
                    >
                        Handpicked selections for every occasion and celebration
                    </motion.p>
                </motion.div>

                {/* Slider Container */}
                <div className="relative">
                    {/* Navigation Buttons - Closer to content */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => scroll('left')}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 
                                 w-10 h-10 bg-white rounded-full shadow-lg 
                                 flex items-center justify-center text-primary-900 
                                 hover:bg-accent-500 hover:text-white transition-all duration-250
                                 hidden md:flex"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => scroll('right')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 
                                 w-10 h-10 bg-white rounded-full shadow-lg 
                                 flex items-center justify-center text-primary-900 
                                 hover:bg-accent-500 hover:text-white transition-all duration-250
                                 hidden md:flex"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </motion.button>

                    {/* Slider */}
                    <div
                        ref={scrollRef}
                        className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-3"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                            WebkitOverflowScrolling: 'touch'
                        }}
                    >
                        {curatedCollections.map((collection, index) => (
                            <motion.div
                                key={collection.id}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="flex-shrink-0 w-72 md:w-80 snap-start"
                            >
                                <Link href="/sarees/explore">
                                    <motion.div
                                        whileHover={{ y: -8 }}
                                        transition={{ duration: 0.25, ease: "easeOut" }}
                                        className="group relative bg-white rounded-2xl shadow-soft 
                                                 hover:shadow-hover overflow-hidden h-[450px] 
                                                 transition-all duration-300"
                                    >
                                        {/* Background Image */}
                                        <div className="relative h-full overflow-hidden">
                                            <img
                                                src={getImagePath(collection.image)}
                                                alt={collection.title}
                                                className="absolute w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />

                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t 
                                                          from-primary-900/90 via-primary-900/40 to-transparent" />
                                        </div>

                                        {/* Tag */}
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.3 + index * 0.1 }}
                                            className="absolute top-6 right-6 px-4 py-2 
                                                     bg-accent-500 text-white rounded-full 
                                                     font-semibold text-sm shadow-lg"
                                        >
                                            {collection.tag}
                                        </motion.div>

                                        {/* Color Palette */}
                                        <div className="absolute top-6 left-6 flex gap-2">
                                            {collection.colors.map((color, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ delay: 0.4 + i * 0.1 }}
                                                    whileHover={{ scale: 1.3 }}
                                                    className="w-4 h-4 rounded-full border-2 border-white shadow-md"
                                                    style={{ backgroundColor: color }}
                                                />
                                            ))}
                                        </div>

                                        {/* Content */}
                                        <div className="absolute bottom-0 inset-x-0 p-8">
                                            <motion.div
                                                initial={{ y: 20, opacity: 0 }}
                                                whileInView={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                <h3 className="font-display text-3xl font-bold text-white mb-3">
                                                    {collection.title}
                                                </h3>
                                                <p className="text-white/90 mb-4 text-sm leading-relaxed">
                                                    {collection.description}
                                                </p>

                                                <div className="flex items-center justify-between">
                                                    <span className="text-white/80 text-sm">
                                                        {collection.count} Designs
                                                    </span>
                                                    <motion.div
                                                        whileHover={{ x: 5 }}
                                                        className="flex items-center gap-2 text-white font-semibold"
                                                    >
                                                        <span>Explore</span>
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </motion.div>
                                                </div>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-center mt-8"
                >
                    <Link href="/sarees/explore">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 
                                     text-white rounded-full font-semibold shadow-soft 
                                     hover:shadow-md transition-all duration-250 text-sm"
                        >
                            View All Collections
                        </motion.button>
                    </Link>
                </motion.div>
            </div>

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
};

export default CuratedSlider;
