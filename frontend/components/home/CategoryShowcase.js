import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CategoryShowcase = () => {
    const categories = [
        {
            id: 1,
            name: 'Kurtas',
            slug: 'kurtas',
            image: '/images/category-kurtas.jpg',
            description: 'Elegant daily wear & occasion kurtas with exquisite Chikankari work',
        },
        {
            id: 2,
            name: 'Sarees',
            slug: 'sarees',
            image: '/images/category-sarees.jpg',
            description: 'Traditional & contemporary Chikankari sarees for every occasion',
        },
        {
            id: 3,
            name: 'Dupattas',
            slug: 'dupattas',
            image: '/images/category-dupattas.jpg',
            description: 'Light & elegant dupattas featuring intricate Chikankari embroidery',
        },
        {
            id: 4,
            name: 'Dress Materials',
            slug: 'dress-materials',
            image: '/images/category-dress-materials.jpg',
            description: 'Unstitched fabrics with beautiful Chikankari patterns',
        },
    ];

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Shop by Category</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/categories/${category.slug}`}
                            className="group"
                        >
                            <div className="relative overflow-hidden rounded-lg aspect-w-1 aspect-h-1 bg-gray-100">
                                <div className="h-72 w-full relative">
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity group-hover:bg-opacity-30"></div>
                                </div>
                                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black to-transparent">
                                    <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                                    <p className="text-sm text-white text-opacity-80 mt-1">{category.description}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryShowcase;