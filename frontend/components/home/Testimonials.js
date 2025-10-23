import React, { useState } from 'react';
import Image from 'next/image';

const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: 'Priya Sharma',
            role: 'Fashion Influencer',
            content: 'The craftsmanship in Tantuka\'s Chikankari pieces is unparalleled. The attention to detail and quality of the fabric is something I haven\'t found elsewhere. Truly a work of art!',
            image: '/images/testimonial-1.jpg',
        },
        {
            id: 2,
            name: 'Aisha Patel',
            role: 'Customer',
            content: 'I ordered a kurta for my sister\'s wedding and was blown away by the quality. The embroidery is so intricate and beautiful. I\'ve received countless compliments and will definitely be ordering again.',
            image: '/images/testimonial-2.jpg',
        },
        {
            id: 3,
            name: 'Raj Malhotra',
            role: 'Fashion Designer',
            content: 'As someone who works in the fashion industry, I appreciate the effort that goes into preserving traditional craftsmanship. Tantuka is doing an amazing job supporting artisans while creating gorgeous contemporary pieces.',
            image: '/images/testimonial-3.jpg',
        },
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    const goToPrevious = () => {
        const newIndex = activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1;
        setActiveIndex(newIndex);
    };

    const goToNext = () => {
        const newIndex = activeIndex === testimonials.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(newIndex);
    };

    return (
        <section className="py-16 bg-primary-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What Our Customers Say</h2>

                <div className="relative max-w-4xl mx-auto">
                    {/* Navigation buttons */}
                    <button
                        onClick={goToPrevious}
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 z-10 md:-left-8"
                        aria-label="Previous testimonial"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={goToNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 z-10 md:-right-8"
                        aria-label="Next testimonial"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Testimonial */}
                    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                        <div className="flex flex-col md:flex-row items-center">
                            <div className="md:w-1/3 mb-6 md:mb-0">
                                <div className="relative h-32 w-32 mx-auto rounded-full overflow-hidden border-4 border-primary-100">
                                    <Image
                                        src={testimonials[activeIndex].image || '/images/avatar-placeholder.jpg'}
                                        alt={testimonials[activeIndex].name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            <div className="md:w-2/3 md:pl-8">
                                <svg className="h-8 w-8 text-primary-300 mb-4" fill="currentColor" viewBox="0 0 32 32">
                                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                                </svg>

                                <p className="text-gray-600 text-lg mb-6">{testimonials[activeIndex].content}</p>

                                <div>
                                    <p className="font-medium text-gray-900">{testimonials[activeIndex].name}</p>
                                    <p className="text-primary-600">{testimonials[activeIndex].role}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dots */}
                    <div className="flex justify-center mt-6 space-x-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`w-3 h-3 rounded-full ${index === activeIndex ? 'bg-primary-600' : 'bg-gray-300'
                                    }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            ></button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;