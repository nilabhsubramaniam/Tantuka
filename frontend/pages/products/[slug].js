import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import Button from '../../components/ui/Button';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import ProductConfigurator from '../../components/cart/ProductConfigurator';
import { getImagePath } from '../../utils/basePath';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';

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
    {
        id: 7,
        name: 'Royal Blue Silk Chikankari Kurta',
        slug: 'royal-blue-silk-kurta',
        description: `Luxurious silk kurta in royal blue with intricate white Chikankari embroidery. 
This premium piece combines the richness of silk with the delicate art of Lucknow embroidery.

Perfect for festive occasions and celebrations. The contrasting white embroidery on blue silk 
creates a stunning visual appeal that's both traditional and contemporary.`,
        price: 3799,
        originalPrice: 4599,
        sizes: ['S', 'M', 'L', 'XL'],
        images: [
            '/images/products/pexels-michaelhidaeki-34472641.jpg',
            '/images/products/pexels-rajeshverma-13031585.jpg',
            '/images/products/pexels-riad-morshed-107016858-15996827.jpg',
            '/images/products/pexels-rohit-photography-751545565-32797758.jpg',
        ],
        details: [
            'Pure silk fabric',
            'White Chikankari on blue base',
            'Premium quality embroidery',
            'Festive wear collection',
            'Regular fit',
        ],
        care: [
            'Dry clean only',
            'Do not wash',
            'Iron on low heat with cloth',
            'Store in cotton bag',
            'Keep away from moisture',
        ],
        inStock: true,
        stockQuantity: 8,
        category: 'kurtas',
    },
    {
        id: 8,
        name: 'Pastel Pink Chikankari Dress',
        slug: 'pastel-pink-dress',
        description: `Delicate pastel pink dress featuring beautiful Chikankari embroidery. 
This contemporary design is perfect for daytime events and summer gatherings.

The soft pink hue combined with white embroidery creates an ethereal and feminine look. 
Comfortable and stylish, this dress is a must-have for your ethnic wardrobe.`,
        price: 3299,
        originalPrice: 3999,
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        images: [
            '/images/products/pexels-rajeshverma-13031585.jpg',
            '/images/products/pexels-vishalcreation-14205208(1).jpg',
            '/images/products/pexels-michaelhidaeki-34472641.jpg',
            '/images/products/pexels-shahin134053-10397381.jpg',
        ],
        details: [
            'Soft cotton blend fabric',
            'Delicate Chikankari work',
            'A-line silhouette',
            'Perfect for daywear',
            'Length: 42 inches',
        ],
        care: [
            'Hand wash in cold water',
            'Use mild detergent',
            'Do not bleach',
            'Iron on medium heat',
            'Dry in shade',
        ],
        inStock: true,
        stockQuantity: 10,
        category: 'dresses',
    },
    {
        id: 9,
        name: 'Traditional White Chikankari Saree',
        slug: 'traditional-white-saree',
        description: `Classic white-on-white Chikankari saree that epitomizes the elegance of Lucknow embroidery. 
This timeless piece is perfect for weddings, festivals, and special occasions.

The intricate threadwork covers the entire saree creating a rich texture. Comes with a matching 
blouse piece that can be customized to your measurements.`,
        price: 6499,
        originalPrice: 8999,
        sizes: ['One Size'],
        images: [
            '/images/products/pexels-riad-morshed-107016858-15996827.jpg',
            '/images/products/pexels-vishalcreation-14205208.jpg',
            '/images/products/pexels-rajeshverma-13237383.jpg',
            '/images/products/pexels-shahin134053-10397381.jpg',
        ],
        details: [
            'Pure cotton fabric',
            'White-on-white embroidery',
            'All-over Chikankari work',
            'Length: 6.5 meters',
            'Includes blouse piece',
        ],
        care: [
            'Gentle hand wash only',
            'Use mild detergent',
            'Dry flat in shade',
            'Iron with cloth on reverse',
            'Store rolled in muslin',
        ],
        inStock: true,
        stockQuantity: 4,
        category: 'sarees',
    },
    {
        id: 10,
        name: 'Contemporary Chikankari Top',
        slug: 'contemporary-chikankari-top',
        description: `Modern short top with traditional Chikankari embroidery, perfect for fusion styling. 
Pair it with jeans, palazzos, or skirts for a contemporary ethnic look.

This versatile piece bridges traditional craftsmanship with modern fashion sensibilities, 
making it perfect for casual outings and semi-formal occasions.`,
        price: 1999,
        originalPrice: 2499,
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        images: [
            '/images/products/pexels-rohit-photography-751545565-32797758.jpg',
            '/images/products/pexels-darkmodecinema-19567892.jpg',
            '/images/products/pexels-rajeshverma-13192034.jpg',
            '/images/products/pexels-vishalcreation-14205208(1).jpg',
        ],
        details: [
            'Cotton voile fabric',
            'Modern cut with traditional work',
            'Versatile fusion wear',
            'Comfortable relaxed fit',
            'Length: 24 inches',
        ],
        care: [
            'Machine wash gentle cycle',
            'Cold water recommended',
            'Do not bleach',
            'Tumble dry low or hang dry',
            'Iron on medium heat',
        ],
        inStock: true,
        stockQuantity: 20,
        category: 'kurtas',
    },
    {
        id: 11,
        name: 'Mint Green Chikankari Kurta Set',
        slug: 'mint-green-kurta-set',
        description: `Refreshing mint green kurta set with delicate Chikankari embroidery and matching pants. 
This complete set offers effortless style and comfort.

The cool mint color is perfect for summer events and daytime celebrations. The coordinated 
set takes the guesswork out of styling while ensuring you look put-together and elegant.`,
        price: 4299,
        originalPrice: 5299,
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        images: [
            '/images/products/pexels-vishalcreation-14205208(1).jpg',
            '/images/products/pexels-shahin134053-10397381.jpg',
            '/images/products/pexels-rajeshverma-13237383.jpg',
            '/images/products/pexels-michaelhidaeki-34472641.jpg',
        ],
        details: [
            'Premium cotton fabric',
            'Includes kurta and pants',
            'All-over Chikankari work',
            'Straight cut kurta',
            'Matching straight pants',
        ],
        care: [
            'Hand wash or gentle machine wash',
            'Use mild detergent',
            'Do not bleach',
            'Iron on medium heat',
            'Dry in shade',
        ],
        inStock: true,
        stockQuantity: 7,
        category: 'kurtas',
    },
    {
        id: 12,
        name: 'Elegant Chikankari Shawl',
        slug: 'elegant-chikankari-shawl',
        description: `Luxurious wool blend shawl adorned with fine Chikankari embroidery. 
This versatile accessory adds warmth and elegance to any outfit.

Perfect for evening events or cooler weather. The intricate embroidery elevates this from 
a simple wrap to a statement piece that complements both ethnic and western wear.`,
        price: 2499,
        originalPrice: null,
        sizes: ['One Size'],
        images: [
            '/images/products/pexels-rajeshverma-13031585.jpg',
            '/images/products/pexels-riad-morshed-107016858-15996827.jpg',
            '/images/products/pexels-rohit-photography-751545565-32797758.jpg',
            '/images/products/pexels-darkmodecinema-19567892.jpg',
        ],
        details: [
            'Premium wool blend fabric',
            'Delicate Chikankari borders',
            'Size: 100cm x 200cm',
            'Lightweight and warm',
            'Versatile styling options',
        ],
        care: [
            'Dry clean recommended',
            'Or gentle hand wash in cold water',
            'Do not wring',
            'Lay flat to dry',
            'Store folded with moth repellent',
        ],
        inStock: true,
        stockQuantity: 15,
        category: 'accessories',
    },
];

export default function ProductDetail() {
    const router = useRouter();
    const { slug } = router.query;
    const { addItem } = useCart();
    const { notify } = useNotification();

    // State for configurator modal
    const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(false);

    // State for active image
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    // Find product by slug or id
    const product = allProducts.find(p => 
        p.slug === slug || p.id === parseInt(slug)
    );

    // Handle all loading and error states first
    if (router.isFallback) {
        return (
            <Layout title="Loading...">
                <div className="container mx-auto px-4 py-12 flex justify-center">
                    <p>Loading product...</p>
                </div>
            </Layout>
        );
    }

    if (!slug || !product) {
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

    // Handle add to cart - defined after all early returns
    const handleAddToCart = () => {
        setIsConfiguratorOpen(true);
    };

    const handleConfiguratorConfirm = (config) => {
        if (product) {
            addItem(product, {
                ...config,
                image: product.images?.[activeImageIndex] || product.images?.[0],
            });
            setIsConfiguratorOpen(false);
        }
    };

    const handleConfiguratorClose = () => {
        setIsConfiguratorOpen(false);
    };

    return (
        <Layout title={`${product.name} - Tantuka`}>
            <div className="container mx-auto px-4 py-8">
                {/* Breadcrumbs */}
                <Breadcrumbs 
                    items={[
                        { label: 'Products', href: '/products' },
                        { label: product.name }
                    ]} 
                />

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

            {/* Product Configurator Modal */}
            <ProductConfigurator
                product={product}
                isOpen={isConfiguratorOpen}
                onClose={handleConfiguratorClose}
                onConfirm={handleConfiguratorConfirm}
            />
        </Layout>
    );
}