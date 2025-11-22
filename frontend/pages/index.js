import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/layout/Layout';
import Testimonials from '../components/home/Testimonials';
import NewsletterSignup from '../components/home/NewsletterSignup';
import { getImagePath } from '../utils/basePath';

export default function Home() {
    return (
        <Layout title="Tantuka - India's Premium Saree Destination">
            {/* Premium Saree Hero Section */}
            <SareeHero />

            {/* Featured Saree Collections */}
            <FeaturedSarees />

            {/* Browse by State */}
            <StateShowcase />

            {/* Saree Heritage & Craftsmanship */}
            <SareeHeritage />

            {/* Why Choose Tantuka */}
            <WhyTantuka />

            {/* Customer Testimonials */}
            <Testimonials />

            {/* Newsletter */}
            <NewsletterSignup />
        </Layout>
    );
}

// Premium Saree Hero Section
function SareeHero() {
    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-sage-50 min-h-screen pt-4 md:pt-8">
            {/* Decorative Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-10 w-96 h-96 bg-gold-200/15 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-10 left-20 w-80 h-80 bg-accent-200/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/3 -right-20 w-72 h-72 bg-sage-200/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center min-h-[calc(100vh-4rem)] md:min-h-screen">{/*Left Content */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="py-12 lg:py-0"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="inline-block mb-6"
                        >
                            <span className="px-4 py-2 bg-gradient-to-r from-gold-100 to-accent-100 text-accent-700 rounded-full text-sm font-semibold border border-gold-300/50">
                                👗 India's Most Exquisite Sarees
                            </span>
                        </motion.div>

                        {/* Main Heading */}
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6"
                        >
                            <span className="block text-primary-900">Discover the</span>
                            <span className="block gradient-text">Art of Sarees</span>
                            <span className="block text-primary-800">Reimagined</span>
                        </motion.h1>

                        {/* Subheading */}
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-lg sm:text-xl text-primary-600 leading-relaxed mb-8 max-w-2xl"
                        >
                            Handwoven sarees from across India. Each piece tells a story of centuries-old craftsmanship, 
                            traditional techniques, and the hands of master artisans. From Lucknow's delicate Chikankari 
                            to Kerala's golden Kasavu, experience authentic Indian heritage.
                        </motion.p>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex gap-8 mb-10"
                        >
                            <div>
                                <div className="text-3xl font-bold gradient-text">28+</div>
                                <div className="text-sm text-primary-600">States Represented</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold gradient-text">500+</div>
                                <div className="text-sm text-primary-600">Master Artisans</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold gradient-text">1000+</div>
                                <div className="text-sm text-primary-600">Unique Designs</div>
                            </div>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <Link href="/sarees/explore" className="w-full sm:w-auto">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full px-8 py-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transform transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    Explore All Sarees
                                    <span>→</span>
                                </motion.button>
                            </Link>
                            <Link href="/sarees/up" className="w-full sm:w-auto">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full px-8 py-4 border-2 border-primary-300 text-primary-900 font-semibold rounded-xl hover:border-accent-500 hover:text-accent-600 transition-colors duration-300"
                                >
                                    Lucknow Chikankari
                                </motion.button>
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Right - Hero Image */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative h-full hidden lg:block"
                    >
                        <div className="relative w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src={getImagePath("/images/categories/sarees.jpg")}
                                alt="Premium Sarees Collection"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/30 to-transparent"></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

// Featured Saree Collections
function FeaturedSarees() {
    const [activeFilter, setActiveFilter] = useState('all');

    const sarees = [
        {
            id: 1,
            name: 'Lucknow Elegance',
            state: 'Uttar Pradesh',
            price: 2500,
            originalPrice: 3500,
            image: '/images/categories/sarees.jpg',
            badge: 'Best Seller',
            description: 'Delicate Chikankari embroidery on fine cotton'
        },
        {
            id: 2,
            name: 'Kerala Classic',
            state: 'Kerala',
            price: 1800,
            originalPrice: 2500,
            image: '/images/categories/dupattas.jpg',
            description: 'Traditional Kasavu with golden border'
        },
        {
            id: 3,
            name: 'Kanchipuram Royal',
            state: 'Tamil Nadu',
            price: 3500,
            originalPrice: 4800,
            image: '/images/categories/kurtas.jpg',
            badge: 'Premium',
            description: 'Pure silk saree with intricate patterns'
        },
        {
            id: 4,
            name: 'Mysore Silk',
            state: 'Karnataka',
            price: 2800,
            originalPrice: 3800,
            image: '/images/categories/dress-materials.jpg',
            description: 'Rich, lustrous Mysore silk saree'
        },
        {
            id: 5,
            name: 'Sambalpuri Magic',
            state: 'Odisha',
            price: 2200,
            originalPrice: 3000,
            image: '/images/categories/sarees.jpg',
            badge: 'Featured',
            description: 'Ikat-patterned saree with geometric designs'
        },
        {
            id: 6,
            name: 'Paithani Gold',
            state: 'Maharashtra',
            price: 3000,
            originalPrice: 4200,
            image: '/images/categories/kurtas.jpg',
            description: 'Peacock motifs with golden border'
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">
                        Featured Saree Collections
                    </h2>
                    <p className="text-lg text-primary-600 max-w-2xl mx-auto">
                        Handpicked selections from across India's most renowned saree regions
                    </p>
                </motion.div>

                {/* Saree Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.1 }
                        }
                    }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {sarees.map((saree) => (
                        <motion.div
                            key={saree.id}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            whileHover={{ y: -8 }}
                            className="group bg-white rounded-xl shadow-soft hover:shadow-hover transition-all duration-300 overflow-hidden"
                        >
                            {/* Image */}
                            <div className="relative h-80 bg-primary-100 overflow-hidden">
                                <img
                                    src={getImagePath(saree.image)}
                                    alt={saree.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                {saree.badge && (
                                    <div className="absolute top-4 right-4 bg-accent-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                        {saree.badge}
                                    </div>
                                )}
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-accent-600">
                                    {saree.state}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-primary-900 mb-2">{saree.name}</h3>
                                <p className="text-sm text-primary-600 mb-4">{saree.description}</p>

                                {/* Price */}
                                <div className="mb-6">
                                    <div className="flex items-baseline gap-3 mb-2">
                                        <span className="text-2xl font-bold text-accent-600">₹{saree.price.toLocaleString()}</span>
                                        <span className="text-lg text-primary-400 line-through">₹{saree.originalPrice.toLocaleString()}</span>
                                    </div>
                                    <span className="text-sm font-semibold text-green-600">
                                        Save {Math.round(((saree.originalPrice - saree.price) / saree.originalPrice) * 100)}%
                                    </span>
                                </div>

                                {/* CTA */}
                                <button className="w-full px-4 py-3 bg-accent-600 text-white rounded-lg font-semibold hover:bg-accent-700 transition-colors">
                                    Add to Cart
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* View All CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-center mt-16"
                >
                    <Link href="/sarees/explore">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all"
                        >
                            Explore All Collections
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

// Browse by State Section
function StateShowcase() {
    const states = [
        { name: 'Uttar Pradesh', sareeType: 'Lucknow Chikankari', code: 'up', featured: true },
        { name: 'Kerala', sareeType: 'Kasavu Saree', code: 'kl' },
        { name: 'Tamil Nadu', sareeType: 'Kanchipuram Silk', code: 'tn' },
        { name: 'Karnataka', sareeType: 'Mysore Silk', code: 'ka' },
        { name: 'Odisha', sareeType: 'Sambalpuri Saree', code: 'od' },
    ];

    return (
        <section className="py-20 bg-primary-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">
                        Sarees by State
                    </h2>
                    <p className="text-lg text-primary-600 max-w-2xl mx-auto">
                        Each Indian state has a unique saree tradition. Explore the heritage and craftsmanship of each region.
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                    }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {states.map((state) => (
                        <Link key={state.code} href={`/sarees/${state.code}`}>
                            <motion.div
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                                    state.featured
                                        ? 'bg-gradient-to-br from-accent-500 to-accent-600 text-white shadow-lg'
                                        : 'bg-white text-primary-900 shadow-soft hover:shadow-hover'
                                }`}
                            >
                                <h3 className={`text-lg font-semibold mb-2 ${state.featured ? 'text-white' : ''}`}>
                                    {state.name}
                                </h3>
                                <p className={`text-sm mb-4 ${state.featured ? 'text-white/90' : 'text-primary-600'}`}>
                                    {state.sareeType}
                                </p>
                                <div className="flex items-center gap-2 text-sm font-semibold">
                                    Explore <span>→</span>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

// Saree Heritage Section
function SareeHeritage() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">
                        The Art of Saree Crafting
                    </h2>
                    <p className="text-lg text-primary-600 max-w-2xl mx-auto">
                        Behind every saree is a story of tradition, skill, and passion
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: '🧵',
                            title: 'Traditional Techniques',
                            description: 'Hand-loomed and hand-embroidered using century-old methods passed down through generations of artisans.'
                        },
                        {
                            icon: '👩‍🎨',
                            title: 'Master Artisans',
                            description: 'Each saree is crafted by skilled masters who have dedicated their lives to perfecting this ancient craft.'
                        },
                        {
                            icon: '✨',
                            title: '100% Authentic',
                            description: 'Every piece is genuinely handmade, ensuring uniqueness and authenticity that machines cannot replicate.'
                        }
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.6 }}
                            className="p-8 bg-primary-50 rounded-xl text-center"
                        >
                            <div className="text-5xl mb-4">{item.icon}</div>
                            <h3 className="text-xl font-semibold text-primary-900 mb-4">{item.title}</h3>
                            <p className="text-primary-600 leading-relaxed">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Why Choose Tantuka
function WhyTantuka() {
    return (
        <section className="py-20 bg-gradient-to-r from-accent-50 to-gold-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">
                        Why Choose Tantuka?
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { icon: '🎯', title: 'Curated Selection', desc: 'Handpicked sarees from authentic sources' },
                        { icon: '🛡️', title: 'Quality Assured', desc: 'Each piece inspected for quality & authenticity' },
                        { icon: '💙', title: 'Artisan Support', desc: 'Direct support to traditional craftspeople' },
                        { icon: '🚚', title: 'Fast Delivery', desc: 'Free delivery on orders above ₹5000' }
                    ].map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white p-6 rounded-xl text-center shadow-soft hover:shadow-hover transition-shadow"
                        >
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className="font-semibold text-primary-900 mb-2">{feature.title}</h3>
                            <p className="text-sm text-primary-600">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}