import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ product }) => {
    const { id, name, slug, images, price, originalPrice } = product;

    // Calculate discount percentage
    const discountPercentage = originalPrice ? Math.round((originalPrice - price) / originalPrice * 100) : 0;

    return (
        <div className="group relative">
            <div className="aspect-h-4 aspect-w-3 overflow-hidden rounded-lg bg-gray-100">
                <Link href={`/products/${slug}`} className="block h-full w-full relative">
                    {/* Main product image */}
                    <div className="h-72 w-full relative overflow-hidden">
                        {images && images.length > 0 ? (
                            <Image
                                src={images[0]}
                                alt={name}
                                className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                                width={300}
                                height={400}
                            />
                        ) : (
                            <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-400">No image</span>
                            </div>
                        )}
                    </div>

                    {/* Hover overlay with secondary image */}
                    {images && images.length > 1 && (
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Image
                                src={images[1]}
                                alt={`${name} - alternate view`}
                                className="h-full w-full object-cover object-center"
                                width={300}
                                height={400}
                            />
                        </div>
                    )}

                    {/* Discount tag */}
                    {discountPercentage > 0 && (
                        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
                            {discountPercentage}% OFF
                        </span>
                    )}
                </Link>
            </div>

            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm font-medium text-gray-900">
                        <Link href={`/products/${slug}`}>
                            {name}
                        </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">Chikankari</p>
                </div>
                <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">₹{price}</p>
                    {originalPrice && originalPrice > price && (
                        <p className="text-sm text-gray-500 line-through">₹{originalPrice}</p>
                    )}
                </div>
            </div>

            {/* Quick add button that appears on hover */}
            <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    className="relative w-full rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
                >
                    Quick Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;