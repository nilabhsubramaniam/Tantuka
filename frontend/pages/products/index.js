import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import ProductCard from '../../components/product/ProductCard';

export default function Products() {
    // Mock categories for filter
    const categories = [
        { id: 'all', name: 'All Products' },
        { id: 'kurtas', name: 'Kurtas' },
        { id: 'sarees', name: 'Sarees' },
        { id: 'dupattas', name: 'Dupattas' },
        { id: 'dresses', name: 'Dresses' },
        { id: 'accessories', name: 'Accessories' },
    ];

    // Mock products - to be replaced with API data
    const mockProducts = [
        {
            id: 1,
            name: 'Hand Embroidered White Chikankari Kurta',
            slug: 'white-chikankari-kurta',
            images: ['/images/product-placeholder.jpg'],
            price: 2499,
            originalPrice: 2999,
            category: 'kurtas',
        },
        {
            id: 2,
            name: 'Elegant Cotton Chikankari Saree',
            slug: 'cotton-chikankari-saree',
            images: ['/images/product-placeholder.jpg'],
            price: 5999,
            originalPrice: 7499,
            category: 'sarees',
        },
        {
            id: 3,
            name: 'Chikankari Embroidered Palazzo Set',
            slug: 'chikankari-palazzo-set',
            images: ['/images/product-placeholder.jpg'],
            price: 3499,
            originalPrice: 3999,
            category: 'kurtas',
        },
        {
            id: 4,
            name: 'Pure Georgette Chikankari Dupatta',
            slug: 'georgette-chikankari-dupatta',
            images: ['/images/product-placeholder.jpg'],
            price: 1899,
            originalPrice: 2199,
            category: 'dupattas',
        },
        {
            id: 5,
            name: 'Embroidered Chikankari Linen Kurta',
            slug: 'linen-chikankari-kurta',
            images: ['/images/product-placeholder.jpg'],
            price: 2899,
            originalPrice: null,
            category: 'kurtas',
        },
        {
            id: 6,
            name: 'Designer Chikankari Anarkali Suit',
            slug: 'chikankari-anarkali-suit',
            images: ['/images/product-placeholder.jpg'],
            price: 4999,
            originalPrice: 6299,
            category: 'dresses',
        },
    ];

    const [activeCategory, setActiveCategory] = useState('all');
    const [sortBy, setSortBy] = useState('featured');

    // Filter products based on active category
    const filteredProducts = activeCategory === 'all'
        ? mockProducts
        : mockProducts.filter(product => product.category === activeCategory);

    // Sort products based on selected sorting
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'newest':
                return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
            default:
                return 0; // featured - no sorting
        }
    });

    return (
        <Layout title="All Products - Tantuka">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">All Products</h1>

                {/* Filters and Sorting */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map(category => (
                            <button
                                key={category.id}
                                className={`px-4 py-2 text-sm rounded-full ${activeCategory === category.id
                                        ? 'bg-primary-600 text-white'
                                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                    }`}
                                onClick={() => setActiveCategory(category.id)}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>

                    {/* Sort Dropdown */}
                    <div>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded-md text-sm"
                        >
                            <option value="featured">Featured</option>
                            <option value="newest">Newest Arrivals</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                    {sortedProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Empty State */}
                {sortedProducts.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No products found in this category.</p>
                    </div>
                )}

                {/* Pagination - Basic Version */}
                <div className="mt-12 flex justify-center">
                    <nav className="flex items-center gap-1">
                        <button className="px-3 py-1 rounded border border-gray-300 text-gray-500 hover:bg-gray-50">
                            Previous
                        </button>
                        <button className="px-3 py-1 rounded border border-primary-600 bg-primary-600 text-white">
                            1
                        </button>
                        <button className="px-3 py-1 rounded border border-gray-300 text-gray-500 hover:bg-gray-50">
                            2
                        </button>
                        <button className="px-3 py-1 rounded border border-gray-300 text-gray-500 hover:bg-gray-50">
                            3
                        </button>
                        <button className="px-3 py-1 rounded border border-gray-300 text-gray-500 hover:bg-gray-50">
                            Next
                        </button>
                    </nav>
                </div>
            </div>
        </Layout>
    );
}