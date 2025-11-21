import React, { useState, useRef, useEffect } from 'react';
import ProductCard from '../product/ProductCard';
import Button from '../ui/Button';

const FeaturedProducts = ({ products = [] }) => {
    const sliderRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    // Check if scroll buttons should be visible
    const checkForScrollPosition = () => {
        if (sliderRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10); // 10px buffer
        }
    };

    useEffect(() => {
        const slider = sliderRef.current;
        if (slider) {
            checkForScrollPosition();
            slider.addEventListener('scroll', checkForScrollPosition);
            window.addEventListener('resize', checkForScrollPosition);
        }

        return () => {
            if (slider) {
                slider.removeEventListener('scroll', checkForScrollPosition);
                window.removeEventListener('resize', checkForScrollPosition);
            }
        };
    }, [products]);

    const scroll = (direction) => {
        if (sliderRef.current) {
            const scrollAmount = 340; // Approximate card width + gap
            sliderRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    // Mock data for featured products if not provided
    const mockProducts = products.length > 0 ? products : [
        {
            id: 1,
            name: 'Hand Embroidered White Chikankari Kurta',
            slug: 'white-chikankari-kurta',
            images: ['/images/products/product-1.jpg'],
            price: 2499,
            originalPrice: 2999,
        },
        {
            id: 2,
            name: 'Elegant Cotton Chikankari Saree',
            slug: 'cotton-chikankari-saree',
            images: ['/images/products/product-2.jpg'],
            price: 5999,
            originalPrice: 7499,
        },
        {
            id: 3,
            name: 'Chikankari Embroidered Palazzo Set',
            slug: 'chikankari-palazzo-set',
            images: ['/images/products/product-3.jpg'],
            price: 3499,
            originalPrice: 3999,
        },
        {
            id: 4,
            name: 'Pure Georgette Chikankari Dupatta',
            slug: 'georgette-chikankari-dupatta',
            images: ['/images/products/product-4.jpg'],
            price: 1899,
            originalPrice: 2199,
        },
        {
            id: 5,
            name: 'Embroidered Chikankari Linen Kurta',
            slug: 'linen-chikankari-kurta',
            images: ['/images/products/product-5.jpg'],
            price: 2899,
            originalPrice: null,
        },
        {
            id: 6,
            name: 'Designer Chikankari Anarkali Suit',
            slug: 'chikankari-anarkali-suit',
            images: ['/images/products/product-6.jpg'],
            price: 4999,
            originalPrice: 6299,
        },
    ];

    return (
        <section className="bg-white py-16">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Featured Collection</h2>
                    <Button variant="outline" as="a" href="/products">
                        View All
                    </Button>
                </div>

                <div className="relative">
                    {/* Left scroll button */}
                    {canScrollLeft && (
                        <button
                            onClick={() => scroll('left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100"
                            aria-label="Scroll left"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )}

                    {/* Product slider */}
                    <div
                        ref={sliderRef}
                        className="flex overflow-x-auto scrollbar-hide gap-6 pb-4 -mx-4 px-4 snap-x"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {mockProducts.map((product) => (
                            <div key={product.id} className="min-w-[270px] max-w-[270px] snap-start">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>

                    {/* Right scroll button */}
                    {canScrollRight && (
                        <button
                            onClick={() => scroll('right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100"
                            aria-label="Scroll right"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;