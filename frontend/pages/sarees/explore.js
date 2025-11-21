import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../../components/layout/Layout';
import FilterSidebar from '../../components/saree/FilterSidebar';
import FilterBar from '../../components/saree/FilterBar';
import SareeProductCard from '../../components/saree/SareeProductCard';
import CuratedSlider from '../../components/saree/CuratedSlider';
import Pagination from '../../components/ui/Pagination';

// Sample product data - replace with API call
const allProducts = [
    {
        id: 1,
        name: 'Lucknow Chikankari Elegance',
        state: 'Uttar Pradesh',
        fabric: 'Cotton Silk',
        occasion: 'Festive',
        price: 2500,
        originalPrice: 3500,
        image: '/images/sarees/uttar-pradesh.jpg',
        weave: 'Handwoven',
        colors: ['Ivory', 'Gold'],
        inStock: true,
        rating: 4.8,
        reviews: 124
    },
    {
        id: 2,
        name: 'Kerala Kasavu Classic',
        state: 'Kerala',
        fabric: 'Cotton',
        occasion: 'Traditional',
        price: 1800,
        originalPrice: 2500,
        image: '/images/sarees/kerala.jpg',
        weave: 'Handwoven',
        colors: ['Ivory', 'Gold'],
        inStock: true,
        rating: 4.7,
        reviews: 98
    },
    {
        id: 3,
        name: 'Kanchipuram Royal Silk',
        state: 'Tamil Nadu',
        fabric: 'Pure Silk',
        occasion: 'Wedding',
        price: 3200,
        originalPrice: 4500,
        image: '/images/sarees/tamil-nadu.jpg',
        weave: 'Temple Weave',
        colors: ['Maroon', 'Gold'],
        inStock: true,
        rating: 4.9,
        reviews: 156
    },
    {
        id: 4,
        name: 'Mysore Silk Heritage',
        state: 'Karnataka',
        fabric: 'Mulberry Silk',
        occasion: 'Festive',
        price: 2200,
        originalPrice: 3200,
        image: '/images/sarees/karnataka.jpg',
        weave: 'Plain Weave',
        colors: ['Purple', 'Gold'],
        inStock: true,
        rating: 4.6,
        reviews: 87
    },
    {
        id: 5,
        name: 'Sambalpuri Ikat Magic',
        state: 'Odisha',
        fabric: 'Cotton',
        occasion: 'Casual',
        price: 1500,
        originalPrice: 2200,
        image: '/images/sarees/odisha.jpg',
        weave: 'Ikat',
        colors: ['Red', 'White', 'Green'],
        inStock: true,
        rating: 4.5,
        reviews: 72
    },
    {
        id: 6,
        name: 'Paithani Gold Zari',
        state: 'Maharashtra',
        fabric: 'Pure Silk',
        occasion: 'Wedding',
        price: 3800,
        originalPrice: 5500,
        image: '/images/sarees/maharashtra.jpg',
        weave: 'Tapestry',
        colors: ['Green', 'Gold'],
        inStock: false,
        rating: 4.9,
        reviews: 142
    },
    {
        id: 7,
        name: 'Maheshwari Diamond Weave',
        state: 'Madhya Pradesh',
        fabric: 'Silk Cotton',
        occasion: 'Festive',
        price: 2000,
        originalPrice: 2800,
        image: '/images/sarees/madhya-pradesh.jpg',
        weave: 'Handwoven',
        colors: ['Pink', 'Gold'],
        inStock: true,
        rating: 4.4,
        reviews: 65
    },
    {
        id: 8,
        name: 'Bengal Tussar Silk',
        state: 'West Bengal',
        fabric: 'Tussar Silk',
        occasion: 'Traditional',
        price: 2400,
        originalPrice: 3400,
        image: '/images/sarees/west-bengal.jpg',
        weave: 'Plain Weave',
        colors: ['Beige', 'Brown'],
        inStock: true,
        rating: 4.7,
        reviews: 91
    },
];

export default function ExploreAllSarees() {
    const [filters, setFilters] = useState({
        fabric: [],
        state: [],
        occasion: [],
        priceRange: [0, 10000],
        colors: [],
        weave: [],
        inStock: false
    });
    const [activeFilters, setActiveFilters] = useState([]);
    const [sortBy, setSortBy] = useState('featured');
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState(allProducts);
    const itemsPerPage = 12;

    // Filter and sort products
    useEffect(() => {
        let products = [...allProducts];

        // Apply filters
        if (filters.fabric.length > 0) {
            products = products.filter(p => filters.fabric.includes(p.fabric));
        }
        if (filters.state.length > 0) {
            products = products.filter(p => filters.state.includes(p.state));
        }
        if (filters.occasion.length > 0) {
            products = products.filter(p => filters.occasion.includes(p.occasion));
        }
        if (filters.weave.length > 0) {
            products = products.filter(p => filters.weave.includes(p.weave));
        }
        if (filters.inStock) {
            products = products.filter(p => p.inStock);
        }
        products = products.filter(p => 
            p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
        );

        // Apply sorting
        switch (sortBy) {
            case 'price-low':
                products.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                products.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                products.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                products.sort((a, b) => b.id - a.id);
                break;
            default:
                break;
        }

        setFilteredProducts(products);
        setCurrentPage(1);
    }, [filters, sortBy]);

    // Update active filters display
    useEffect(() => {
        const active = [];
        if (filters.fabric.length > 0) {
            filters.fabric.forEach(f => active.push({ type: 'fabric', value: f }));
        }
        if (filters.state.length > 0) {
            filters.state.forEach(s => active.push({ type: 'state', value: s }));
        }
        if (filters.occasion.length > 0) {
            filters.occasion.forEach(o => active.push({ type: 'occasion', value: o }));
        }
        if (filters.weave.length > 0) {
            filters.weave.forEach(w => active.push({ type: 'weave', value: w }));
        }
        setActiveFilters(active);
    }, [filters]);

    const removeFilter = (type, value) => {
        setFilters(prev => ({
            ...prev,
            [type]: prev[type].filter(item => item !== value)
        }));
    };

    const clearAllFilters = () => {
        setFilters({
            fabric: [],
            state: [],
            occasion: [],
            priceRange: [0, 10000],
            colors: [],
            weave: [],
            inStock: false
        });
    };

    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    return (
        <Layout>
            <div className="min-h-screen bg-white">
                {/* Hero Section - Compact */}
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="relative overflow-hidden py-6 md:py-8 bg-gradient-to-br from-primary-50/30 via-white to-accent-50/20 border-b border-primary-100"
                >
                    <div className="container mx-auto px-4 relative z-10 max-w-7xl">
                        <div className="max-w-4xl mx-auto">
                            <h1 className="font-display text-2xl md:text-3xl font-bold text-primary-900 mb-2 text-center">
                                Explore All Sarees
                            </h1>
                            <p className="text-sm md:text-base text-primary-600 text-center mb-3">
                                Discover handcrafted sarees from across India, each telling a story of tradition, 
                                heritage, and timeless elegance
                            </p>
                            <div className="flex items-center justify-center gap-3 text-xs md:text-sm text-primary-500">
                                <span className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 bg-accent-500 rounded-full"></span>
                                    {filteredProducts.length} Designs
                                </span>
                                <span className="text-primary-300">•</span>
                                <span className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 bg-accent-500 rounded-full"></span>
                                    8 States
                                </span>
                                <span className="text-primary-300">•</span>
                                <span className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 bg-accent-500 rounded-full"></span>
                                    Handcrafted
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Filter Bar */}
                <FilterBar
                    onFilterClick={() => setShowFilters(!showFilters)}
                    activeFilters={activeFilters}
                    onRemoveFilter={removeFilter}
                    onClearAll={clearAllFilters}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                    resultsCount={filteredProducts.length}
                />

                {/* Main Content */}
                <div className="container mx-auto px-4 py-6 max-w-7xl">
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Sidebar Filters */}
                        <FilterSidebar
                            filters={filters}
                            onFilterChange={setFilters}
                            show={showFilters}
                            onClose={() => setShowFilters(false)}
                        />

                        {/* Products Grid */}
                        <div className={`flex-1 transition-all duration-300 ${!showFilters ? 'lg:max-w-full' : ''}`}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentPage}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className={`grid gap-5 mb-8 ${
                                        showFilters 
                                            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                                            : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                                    }`}
                                >
                                    {currentProducts.map((product, index) => (
                                        <motion.div
                                            key={product.id}
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ 
                                                duration: 0.4, 
                                                delay: index * 0.05,
                                                ease: "easeOut"
                                            }}
                                        >
                                            <SareeProductCard product={product} />
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={setCurrentPage}
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* Featured Curated Slider */}
                <CuratedSlider />

                {/* SEO Footer Section */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-primary-50/30 py-12 md:py-16"
                >
                    <div className="container mx-auto px-4 max-w-6xl">
                        <div className="max-w-5xl mx-auto">
                            <motion.h2
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="font-display text-3xl md:text-4xl font-bold text-primary-900 mb-6 text-center"
                            >
                                The Art of Indian Sarees
                            </motion.h2>
                            
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="prose prose-lg max-w-none text-primary-700 space-y-5"
                            >
                                <p className="leading-relaxed">
                                    Welcome to Tantuka's exquisite collection of handcrafted sarees, where tradition meets 
                                    timeless elegance. Each saree in our collection is a masterpiece, meticulously woven by 
                                    skilled artisans who have inherited their craft through generations. From the delicate 
                                    Chikankari work of Lucknow to the opulent silk weaves of Kanchipuram, every piece tells 
                                    a story of India's rich textile heritage.
                                </p>

                                <p className="leading-relaxed">
                                    Our collection spans across India's most celebrated weaving traditions, featuring the 
                                    shimmering Kasavu sarees of Kerala with their iconic golden borders, the intricate temple 
                                    designs of Tamil Nadu's Kanchipuram silk, the luxurious Paithani from Maharashtra with 
                                    its peacock motifs in pure gold zari, and the geometric brilliance of Odisha's Sambalpuri 
                                    ikat. Each state contributes its unique artistic expression, creating a diverse tapestry 
                                    of colors, patterns, and techniques that celebrate India's cultural diversity.
                                </p>

                                <p className="leading-relaxed">
                                    At Tantuka, we are committed to preserving traditional craftsmanship while making these 
                                    timeless pieces accessible to modern connoisseurs. Every saree undergoes rigorous quality 
                                    checks to ensure authenticity and excellence. Whether you're seeking a regal silk saree 
                                    for a wedding, a lightweight cotton for daily elegance, or a statement piece for festive 
                                    celebrations, our curated collection offers unparalleled choice. Experience the luxury 
                                    of wearing art, support local artisans, and be part of a movement that keeps India's 
                                    textile heritage alive for future generations.
                                </p>
                            </motion.div>

                            {/* Keywords */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="mt-8 pt-8 border-t border-primary-200"
                            >
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {[
                                        'Kanchipuram Silk Sarees',
                                        'Chikankari Sarees',
                                        'Banarasi Silk',
                                        'Paithani Sarees',
                                        'Kasavu Sarees',
                                        'Sambalpuri Ikat',
                                        'Handwoven Sarees',
                                        'Pure Silk Sarees',
                                        'Cotton Sarees',
                                        'Wedding Sarees',
                                        'Traditional Sarees',
                                        'Designer Sarees'
                                    ].map((keyword, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1.5 bg-white rounded-full text-xs text-primary-600 
                                                     shadow-soft hover:shadow-hover transition-shadow duration-300"
                                        >
                                            {keyword}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>
            </div>
        </Layout>
    );
}
