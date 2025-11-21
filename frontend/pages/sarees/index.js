import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '../../components/layout/Layout';
import SareeHero from '../../components/saree/SareeHero';
import StateGrid from '../../components/saree/StateGrid';
import FeaturedCollections from '../../components/saree/FeaturedCollections';
import SareeStories from '../../components/saree/SareeStories';

export default function SareesPage() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);

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
            {/* Hero Section */}
            <SareeHero />

            {/* Featured Lucknow Chikankari Collections */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
                            Our Specialty: Lucknow Chikankari
                        </h2>
                        <p className="text-lg text-primary-600 max-w-2xl mx-auto">
                            Experience the timeless elegance of hand-embroidered sarees crafted by artisans in Lucknow, 
                            the heart of Chikankari tradition.
                        </p>
                    </motion.div>
                    <FeaturedCollections />
                </div>
            </section>

            {/* Browse by State Section */}
            <section className="py-20 bg-primary-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">
                            Explore Sarees by State
                        </h2>
                        <p className="text-lg text-primary-600 max-w-2xl mx-auto">
                            Each Indian state has its own unique saree tradition. Discover the craftsmanship and heritage 
                            of traditional sarees from across India.
                        </p>
                    </motion.div>

                    <StateGrid />
                </div>
            </section>

            {/* Artisan Stories Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">
                            Meet Our Artisans
                        </h2>
                        <p className="text-lg text-primary-600 max-w-2xl mx-auto">
                            Every saree tells a story. Meet the master craftspeople who create these wearable works of art.
                        </p>
                    </motion.div>

                    <SareeStories />
                </div>
            </section>

            {/* Trust & Heritage Section */}
            <section className="py-20 bg-gradient-to-r from-accent-50 to-gold-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { number: '28+', label: 'Indian States', icon: '🇮🇳' },
                            { number: '1000+', label: 'Saree Designs', icon: '👗' },
                            { number: '500+', label: 'Master Artisans', icon: '👩‍🎨' },
                            { number: '100%', label: 'Authentic & Handmade', icon: '✨' }
                        ].map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                className="text-center p-8 bg-white rounded-2xl shadow-soft hover:shadow-hover transition-shadow"
                            >
                                <div className="text-5xl mb-4">{stat.icon}</div>
                                <div className="text-3xl font-bold gradient-text mb-2">{stat.number}</div>
                                <div className="text-primary-600 font-medium">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">
                            Ready to Find Your Perfect Saree?
                        </h2>
                        <p className="text-lg text-primary-600 mb-8 max-w-2xl mx-auto">
                            Start your journey through India's most beautiful and authentic sarees
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn-primary text-lg px-12 py-4"
                        >
                            Shop Now
                        </motion.button>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
}
