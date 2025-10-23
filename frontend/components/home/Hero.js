import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '../ui/Button';

const Hero = () => {
    return (
        <div className="relative overflow-hidden bg-white">
            <div className="mx-auto max-w-7xl">
                <div className="relative z-10 bg-white pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
                    {/* Create a diagonal cutout effect */}
                    <svg
                        className="absolute right-0 top-0 -mr-12 h-full w-48 text-white transform translate-x-1/2 lg:hidden"
                        fill="currentColor"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                    >
                        <polygon points="50,0 100,0 50,100 0,100" />
                    </svg>

                    <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                        <div className="sm:text-center lg:text-left">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                                <span className="block xl:inline">Exquisite </span>
                                <span className="block text-primary-600 xl:inline">Chikankari Craftsmanship</span>
                            </h1>
                            <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                                Discover the timeless elegance of traditional Chikankari embroidery,
                                handcrafted by skilled artisans. Each piece tells a story of heritage
                                and craftsmanship that has been passed down through generations.
                            </p>
                            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                <div className="rounded-md shadow">
                                    <Link href="/products">
                                        <Button
                                            variant="primary"
                                            size="lg"
                                            className="w-full"
                                        >
                                            Shop Collection
                                        </Button>
                                    </Link>
                                </div>
                                <div className="mt-3 sm:mt-0 sm:ml-3">
                                    <Link href="/about/chikankari">
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            className="w-full"
                                        >
                                            Explore the Art
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                <div className="h-56 w-full sm:h-72 md:h-96 lg:h-full lg:w-full relative">
                    {/* Replace with actual hero image */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary-100 z-10"></div>
                    <Image
                        src="/images/hero-chikankari.jpg"
                        alt="Elegant Chikankari dress"
                        className="h-full w-full object-cover"
                        width={1000}
                        height={1000}
                        priority
                    />
                </div>
            </div>
        </div>
    );
};

export default Hero;