import React, { useState } from 'react';
import Button from '../ui/Button';

const NewsletterSignup = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setMessage('Please enter a valid email address');
            setMessageType('error');
            return;
        }

        setIsSubmitting(true);
        setMessage('');

        // Mock API call - replace with actual API integration
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Success response
            setMessage('Thank you for subscribing!');
            setMessageType('success');
            setEmail('');
        } catch (error) {
            setMessage('Something went wrong. Please try again.');
            setMessageType('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="bg-primary-600 py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Subscribe to Our Newsletter
                    </h2>
                    <p className="text-primary-100 text-lg mb-8">
                        Stay updated on new arrivals, exclusive offers, and the latest in Chikankari fashion.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <div className="flex-grow">
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full min-w-0 px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-400"
                                placeholder="Enter your email"
                            />
                        </div>
                        <Button
                            type="submit"
                            variant="secondary"
                            size="lg"
                            disabled={isSubmitting}
                            className="flex-none shadow-md"
                        >
                            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                        </Button>
                    </form>

                    {message && (
                        <p
                            className={`mt-4 text-sm ${messageType === 'error' ? 'text-red-200' : 'text-green-200'
                                }`}
                        >
                            {message}
                        </p>
                    )}

                    <p className="text-primary-100 text-sm mt-6">
                        We respect your privacy. Unsubscribe at any time.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default NewsletterSignup;