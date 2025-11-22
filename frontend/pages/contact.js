import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import CustomSelect from '../components/ui/CustomSelect';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [formStatus, setFormStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Implement form submission logic
        setFormStatus('success');
        setTimeout(() => {
            setFormStatus(null);
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
        }, 3000);
    };

    return (
        <Layout>
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary-50 via-white to-sage-50 py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
                            Get in Touch
                        </h1>
                        <p className="text-xl text-gray-700 leading-relaxed">
                            We'd love to hear from you. Whether you have questions about our products, 
                            need help with an order, or just want to say hello, we're here to help.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Information & Form */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Contact Information */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="lg:col-span-1 space-y-8"
                        >
                            <div>
                                <h2 className="text-2xl font-bold text-primary-900 mb-6">
                                    Contact Information
                                </h2>
                                <div className="space-y-6">
                                    {/* Address */}
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-primary-900 mb-1">Address</h3>
                                            <p className="text-gray-700">
                                                Vaishali<br />
                                                Delhi, India<br />
                                                110096
                                            </p>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-primary-900 mb-1">Email</h3>
                                            <a href="mailto:info@tantuka.com" className="text-accent-600 hover:text-accent-700">
                                                info@tantuka.com
                                            </a>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-primary-900 mb-1">Phone</h3>
                                            <a href="tel:+911234567890" className="text-accent-600 hover:text-accent-700">
                                                +91 123 456 7890
                                            </a>
                                        </div>
                                    </div>

                                    {/* WhatsApp */}
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-primary-900 mb-1">WhatsApp</h3>
                                            <a href="https://wa.me/911234567890" className="text-accent-600 hover:text-accent-700" target="_blank" rel="noopener noreferrer">
                                                Chat with us
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Business Hours */}
                            <div className="bg-gradient-to-br from-primary-50 to-sage-50 rounded-xl p-6">
                                <h3 className="font-semibold text-primary-900 mb-4">Business Hours</h3>
                                <div className="space-y-2 text-gray-700">
                                    <div className="flex justify-between">
                                        <span>Monday - Friday:</span>
                                        <span className="font-medium">10:00 AM - 7:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Saturday:</span>
                                        <span className="font-medium">10:00 AM - 6:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Sunday:</span>
                                        <span className="font-medium">Closed</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="lg:col-span-2"
                        >
                            <div className="bg-gradient-to-br from-sage-50 to-primary-50 rounded-2xl p-8">
                                <h2 className="text-2xl font-bold text-primary-900 mb-6">
                                    Send us a Message
                                </h2>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                                                placeholder="Your name"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                                                placeholder="your.email@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                                                placeholder="+91 1234567890"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-medium text-primary-900 font-display mb-2">
                                                Subject *
                                            </label>
                                            <CustomSelect
                                                value={formData.subject}
                                                onChange={(value) => setFormData({ ...formData, subject: value })}
                                                options={[
                                                    { value: '', label: 'Select a subject' },
                                                    { value: 'product-inquiry', label: 'Product Inquiry' },
                                                    { value: 'order-status', label: 'Order Status' },
                                                    { value: 'custom-order', label: 'Custom Order' },
                                                    { value: 'wholesale', label: 'Wholesale Inquiry' },
                                                    { value: 'collaboration', label: 'Collaboration' },
                                                    { value: 'feedback', label: 'Feedback' },
                                                    { value: 'other', label: 'Other' }
                                                ]}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                            Message *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={6}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all resize-none"
                                            placeholder="Tell us how we can help you..."
                                        />
                                    </div>

                                    {formStatus === 'success' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg"
                                        >
                                            Thank you for your message! We'll get back to you soon.
                                        </motion.div>
                                    )}

                                    <div className="flex justify-end">
                                        <motion.button
                                            type="submit"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="btn-primary"
                                        >
                                            Send Message
                                        </motion.button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-gradient-to-br from-primary-50 to-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-primary-900 mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-gray-700 max-w-2xl mx-auto">
                            Quick answers to common questions
                        </p>
                    </motion.div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {[
                            {
                                question: "Do you ship internationally?",
                                answer: "Yes, we ship worldwide! Shipping costs and delivery times vary by location. Contact us for specific shipping quotes."
                            },
                            {
                                question: "How long does it take to make a custom order?",
                                answer: "Custom orders typically take 3-4 weeks, depending on the complexity of the design and embroidery work required."
                            },
                            {
                                question: "What is your return policy?",
                                answer: "We accept returns within 7 days of delivery for unused items in original packaging. Custom orders are non-returnable."
                            },
                            {
                                question: "Are your products really handmade?",
                                answer: "Yes! Every piece is 100% handcrafted by skilled artisans. Each garment comes with a certificate of authenticity."
                            },
                            {
                                question: "Do you offer bulk/wholesale orders?",
                                answer: "Yes, we work with boutiques and retailers. Please contact us for wholesale pricing and minimum order quantities."
                            }
                        ].map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white rounded-xl p-6 shadow-soft"
                            >
                                <h3 className="font-semibold text-primary-900 mb-2">
                                    {faq.question}
                                </h3>
                                <p className="text-gray-700">
                                    {faq.answer}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Contact;
