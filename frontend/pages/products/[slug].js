import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import Button from '../../components/ui/Button';
import { getImagePath } from '../../utils/basePath';

export default function ProductDetail() {
    const router = useRouter();
    const { slug } = router.query;

    // State for selected size and quantity
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);

    // State for active image
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    // Mock product data - would come from API
    const product = {
        id: 1,
        name: 'Hand Embroidered White Chikankari Kurta',
        slug: 'white-chikankari-kurta',
        description: `
      This exquisite white chikankari kurta is handcrafted by skilled artisans from Lucknow. 
      Made from premium cotton fabric, it features intricate hand embroidery with traditional 
      chikankari stitches including tepchi, bakhiya, and jali work.
      
      The elegant and timeless design makes it perfect for both casual and festive occasions. 
      Each piece is unique and showcases the exceptional craftsmanship that has been passed down 
      through generations.
    `,
        price: 2499,
        originalPrice: 2999,
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        images: [
            '/images/products/pexels-rajeshverma-13192034.jpg',
            '/images/products/pexels-vishalcreation-14205208.jpg',
            '/images/products/pexels-rajeshverma-13237383.jpg',
            '/images/products/pexels-darkmodecinema-19567892.jpg',
        ],
        details: [
            'Handcrafted pure cotton fabric',
            'Traditional chikankari embroidery',
            'Breathable and comfortable',
            'Straight cut with side slits',
            'Length: 40 inches',
        ],
        care: [
            'Hand wash or gentle machine wash',
            'Use mild detergent',
            'Do not bleach',
            'Iron on medium heat',
            'Dry in shade',
        ],
        inStock: true,
        stockQuantity: 10,
    };

    // Handle add to cart
    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Please select a size');
            return;
        }

        // Here we would add the product to cart
        console.log('Adding to cart:', {
            productId: product.id,
            size: selectedSize,
            quantity
        });

        // Show success message or redirect to cart
        alert('Product added to cart!');
    };

    if (router.isFallback) {
        return (
            <Layout title="Loading...">
                <div className="container mx-auto px-4 py-12 flex justify-center">
                    <p>Loading product...</p>
                </div>
            </Layout>
        );
    }

    if (!product) {
        return (
            <Layout title="Product Not Found">
                <div className="container mx-auto px-4 py-12">
                    <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
                    <p>The requested product could not be found.</p>
                    <Button
                        variant="primary"
                        className="mt-6"
                        onClick={() => router.push('/products')}
                    >
                        Browse All Products
                    </Button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout title={`${product.name} - Tantuka`}>
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Product Images */}
                    <div>
                        {/* Main Image */}
                        <div className="aspect-w-4 aspect-h-5 rounded-lg overflow-hidden bg-gray-100 mb-4">
                            <img
                                src={getImagePath(product.images[activeImageIndex])}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Thumbnail Images */}
                        <div className="grid grid-cols-4 gap-2">
                            {product.images.map((image, index) => (
                                <button
                                    key={index}
                                    className={`rounded-md overflow-hidden border-2 ${activeImageIndex === index ? 'border-primary-500' : 'border-transparent'
                                        }`}
                                    onClick={() => setActiveImageIndex(index)}
                                >
                                    <img
                                        src={getImagePath(image)}
                                        alt={`${product.name} - view ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>

                        {/* Price */}
                        <div className="mt-4 flex items-center">
                            <p className="text-2xl font-semibold text-gray-900">₹{product.price}</p>
                            {product.originalPrice && (
                                <p className="ml-3 text-lg text-gray-500 line-through">₹{product.originalPrice}</p>
                            )}
                            {product.originalPrice && (
                                <p className="ml-3 text-sm text-green-600 font-medium">
                                    {Math.round((product.originalPrice - product.price) / product.originalPrice * 100)}% off
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="mt-6">
                            <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
                        </div>

                        {/* Size Selection */}
                        <div className="mt-6">
                            <h3 className="text-sm font-medium text-gray-900">Size</h3>
                            <div className="mt-2 flex items-center space-x-3">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        className={`
                      px-3 py-1 rounded-md text-sm font-medium 
                      ${selectedSize === size
                                                ? 'bg-primary-600 text-white'
                                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}
                    `}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="mt-6">
                            <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
                            <div className="mt-2 flex items-center">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-3 py-1 border border-gray-300 rounded-l-md hover:bg-gray-100"
                                >
                                    -
                                </button>
                                <span className="px-4 py-1 border-t border-b border-gray-300 text-center min-w-[40px]">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                                    className="px-3 py-1 border border-gray-300 rounded-r-md hover:bg-gray-100"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Add to Cart */}
                        <div className="mt-8">
                            <Button
                                variant="primary"
                                size="lg"
                                fullWidth
                                onClick={handleAddToCart}
                                disabled={!product.inStock}
                            >
                                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                            </Button>
                        </div>

                        {/* Tabs for Details, Care, etc. */}
                        <div className="mt-12 border-t border-gray-200 pt-6">
                            <div className="border-b border-gray-200">
                                <div className="-mb-px flex space-x-8" aria-orientation="horizontal" role="tablist">
                                    <button
                                        className="border-b-2 border-primary-600 py-2 pr-1 text-sm font-medium text-primary-600"
                                        aria-selected="true"
                                    >
                                        Product Details
                                    </button>
                                </div>
                            </div>

                            <div className="py-6 space-y-4">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 mb-2">Features</h3>
                                    <ul className="list-disc pl-5 space-y-1">
                                        {product.details.map((detail, index) => (
                                            <li key={index} className="text-gray-700">{detail}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 mb-2">Care Instructions</h3>
                                    <ul className="list-disc pl-5 space-y-1">
                                        {product.care.map((instruction, index) => (
                                            <li key={index} className="text-gray-700">{instruction}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}