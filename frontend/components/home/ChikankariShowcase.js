import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../ui/Button';

const ChikankariShowcase = () => {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900">The Art of Chikankari</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        A centuries-old craft from Lucknow, featuring delicate white thread embroidery on fine fabrics.
                        Each piece is a testament to the skilled hands that create them.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="relative h-96 lg:h-[600px] rounded-lg overflow-hidden">
                        <Image
                            src="/images/brand/chikankari-craft.jpg"
                            alt="Artisan working on Chikankari embroidery"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Hand Embroidered Excellence</h3>
                            <p className="text-gray-700">
                                Each Chikankari piece takes days or even weeks to complete, with artisans carefully
                                crafting intricate patterns using traditional techniques passed down through generations.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Traditional Stitches</h3>
                            <p className="text-gray-700">
                                Chikankari features over 32 different types of stitches, including tepchi, bakhiya,
                                phanda, murri, and jali work, each adding unique texture and dimension to the fabric.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Sustainable Craftsmanship</h3>
                            <p className="text-gray-700">
                                We work directly with artisan communities, ensuring fair wages and sustainable practices
                                while preserving this precious heritage craft for future generations.
                            </p>
                        </div>

                        <div className="pt-4">
                            <Link href="/about/chikankari">
                                <Button variant="primary" size="lg">
                                    Explore the Craft
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChikankariShowcase;