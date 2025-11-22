import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import Button from '../../components/ui/Button';
import { getImagePath } from '../../utils/basePath';

// Mock products database - in a real app, this would come from an API
const allProducts = [
    {
        id: 1,
        name: 'Hand Embroidered White Chikankari Kurta',
        slug: 'white-chikankari-kurta',
        description: `This exquisite white chikankari kurta is handcrafted by skilled artisans from Lucknow. 
Made from premium cotton fabric, it features intricate hand embroidery with traditional 
chikankari stitches including tepchi, bakhiya, and jali work.

The elegant and timeless design makes it perfect for both casual and festive occasions. 
Each piece is unique and showcases the exceptional craftsmanship that has been passed down 
through generations.`,
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
        category: 'kurtas',
    },
    {
        id: 2,
        name: 'Elegant Cotton Chikankari Saree',
        slug: 'cotton-chikankari-saree',
        description: `A stunning cotton saree adorned with delicate Chikankari embroidery from the heart of Lucknow. 
This saree combines traditional craftsmanship with contemporary elegance.

Perfect for festive occasions and special celebrations. The lightweight cotton fabric ensures 
comfort while the intricate embroidery adds a touch of sophistication and grace.`,
        price: 5999,
        originalPrice: 7499,
        sizes: ['One Size'],
        images: [
            '/images/products/pexels-vishalcreation-14205208.jpg',
            '/images/products/pexels-rajeshverma-13192034.jpg',
            '/images/products/pexels-rajeshverma-13237383.jpg',
            '/images/products/pexels-shahin134053-10397381.jpg',
        ],
        details: [
            'Pure cotton fabric',
            'Hand-embroidered Chikankari work',
            'Length: 6.5 meters',
            'Includes unstitched blouse piece',
            'Traditional Lucknowi craftsmanship',
        ],
        care: [
            'Gentle hand wash recommended',
            'Use mild detergent',
            'Dry in shade',
            'Iron on reverse side',
            'Store in a muslin cloth',
        ],
        inStock: true,
        stockQuantity: 5,
        category: 'sarees',
    },
    {
        id: 3,
        name: 'Chikankari Embroidered Palazzo Set',
        slug: 'chikankari-palazzo-set',
        description: `Contemporary palazzo set featuring exquisite Chikankari embroidery. 
This modern ensemble combines traditional art with contemporary design for the perfect fusion wear.

The flowing palazzo pants paired with an embroidered kurta create an elegant and comfortable outfit 
suitable for both casual and semi-formal occasions.`,
        price: 3499,
        originalPrice: 3999,
        sizes: ['S', 'M', 'L', 'XL'],
        images: [
            '/images/products/pexels-rajeshverma-13237383.jpg',
            '/images/products/pexels-darkmodecinema-19567892.jpg',
            '/images/products/pexels-rajeshverma-13192034.jpg',
            '/images/products/pexels-vishalcreation-14205208.jpg',
        ],
        details: [
            'Premium cotton blend fabric',
            'Chikankari embroidered kurta',
            'Matching palazzo pants',
            'Contemporary fusion design',
            'Comfortable fit',
        ],
        care: [
            'Machine wash on gentle cycle',
            'Use cold water',
            'Do not bleach',
            'Iron on medium heat',
            'Dry in shade',
        ],
        inStock: true,
        stockQuantity: 8,
        category: 'kurtas',
    },
    {
        id: 4,
        name: 'Pure Georgette Chikankari Dupatta',
        slug: 'georgette-chikankari-dupatta',
        description: `An elegant georgette dupatta embellished with fine Chikankari embroidery. 
This versatile piece can elevate any outfit with its delicate craftsmanship.

The lightweight fabric drapes beautifully while the intricate embroidery adds a touch of 
traditional elegance to your ensemble.`,
        price: 1899,
        originalPrice: 2199,
        sizes: ['One Size'],
        images: [
            '/images/products/pexels-darkmodecinema-19567892.jpg',
            '/images/products/pexels-shahin134053-10397381.jpg',
            '/images/products/pexels-rajeshverma-13192034.jpg',
            '/images/products/pexels-vishalcreation-14205208.jpg',
        ],
        details: [
            'Pure georgette fabric',
            'Hand-embroidered Chikankari',
            'Length: 2.5 meters',
            'Lightweight and airy',
            'Versatile styling options',
        ],
        care: [
            'Dry clean recommended',
            'Or gentle hand wash',
            'Do not wring',
            'Iron on low heat',
            'Store folded in muslin',
        ],
        inStock: true,
        stockQuantity: 15,
        category: 'dupattas',
    },
    {
        id: 5,
        name: 'Embroidered Chikankari Linen Kurta',
        slug: 'linen-chikankari-kurta',
        description: `A premium linen kurta featuring beautiful Chikankari embroidery. 
Perfect for summer wear with its breathable fabric and elegant design.

The natural linen fabric combined with traditional embroidery creates a sophisticated 
look that's perfect for both casual and formal occasions.`,
        price: 2899,
        originalPrice: null,
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        images: [
            '/images/products/pexels-shahin134053-10397381.jpg',
            '/images/products/pexels-rajeshverma-13192034.jpg',
            '/images/products/pexels-vishalcreation-14205208.jpg',
            '/images/products/pexels-darkmodecinema-19567892.jpg',
        ],
        details: [
            'Premium linen fabric',
            'Traditional Chikankari work',
            'Breathable and comfortable',
            'Perfect for summer',
            'Classic straight cut',
        ],
        care: [
            'Hand wash or gentle machine wash',
            'Use mild detergent',
            'Do not bleach',
            'Iron while slightly damp',
            'Dry in shade',
        ],
        inStock: true,
        stockQuantity: 12,
        category: 'kurtas',
    },
    {
        id: 6,
        name: 'Designer Chikankari Anarkali Suit',
        slug: 'chikankari-anarkali-suit',
        description: `A stunning designer Anarkali suit with intricate Chikankari embroidery. 
This elegant ensemble is perfect for weddings, festivals, and special celebrations.

The flowing Anarkali silhouette combined with delicate embroidery creates a regal look 
that's sure to make you stand out at any occasion.`,
        price: 4999,
        originalPrice: 6299,
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        images: [
            '/images/products/pexels-rajeshverma-13192185(1).jpg',
            '/images/products/pexels-vishalcreation-14205208.jpg',
            '/images/products/pexels-rajeshverma-13237383.jpg',
            '/images/products/pexels-darkmodecinema-19567892.jpg',
        ],
        details: [
            'Premium georgette fabric',
            'Heavy Chikankari embroidery',
            'Includes dupatta and churidar',
            'Floor-length Anarkali',
            'Designer collection',
        ],
        care: [
            'Dry clean only',
            'Store in a garment bag',
            'Do not bleach',
            'Iron on reverse side',
            'Keep away from direct sunlight',
        ],
        inStock: true,
        stockQuantity: 6,
        category: 'dresses',
    },
];

export default function ProductDetail() {
    const router = useRouter();
    const { slug } = router.query;

    // State for selected size and quantity
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);

    // State for active image
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    // Find product by slug or id
    const product = allProducts.find(p => 
        p.slug === slug || p.id === parseInt(slug)
    );

    // If product not found, show error
    if (!product && slug) {
        return (
            <Layout title="Product Not Found">
                <div className="container mx-auto px-4 py-16 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
                    <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
                    <Button onClick={() => router.push('/products')}>
                        Back to Products
                    </Button>
                </div>
            </Layout>
        );
    }

    // Show loading state while router is initializing
    if (!slug || !product) {
        return (
            <Layout title="Loading...">
                <div className="container mx-auto px-4 py-16 text-center">
                    <p className="text-gray-600">Loading...</p>
                </div>
            </Layout>
        );
    }

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