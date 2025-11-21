import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import { getImagePath } from '../utils/basePath';

const About = () => {
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
                            Our Story
                        </h1>
                        <p className="text-xl text-gray-700 leading-relaxed">
                            Preserving the timeless art of Chikankari embroidery while empowering artisans 
                            and bringing authentic Indian craftsmanship to the world.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Our Mission */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl font-bold text-primary-900 mb-6">
                                Our Mission
                            </h2>
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                                <p>
                                    At Tantuka, we are dedicated to preserving and promoting the centuries-old 
                                    tradition of Chikankari embroidery from Lucknow. Our mission extends beyond 
                                    just selling beautiful sarees – we aim to create a sustainable ecosystem that 
                                    empowers artisans and their families.
                                </p>
                                <p>
                                    Every piece in our collection is handcrafted by skilled artisans who have 
                                    inherited this craft through generations. By choosing Tantuka, you're not 
                                    just purchasing a garment; you're supporting a legacy, preserving cultural 
                                    heritage, and directly improving the lives of artisan families.
                                </p>
                                <p>
                                    We work closely with artisan cooperatives across India, ensuring fair wages, 
                                    safe working conditions, and opportunities for skill development. Our commitment 
                                    to ethical practices means every thread tells a story of empowerment and dignity.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative h-96 rounded-xl overflow-hidden shadow-2xl"
                        >
                            <img
                                src={getImagePath("/images/brand/chikankari-craft.jpg")}
                                alt="Artisan at work"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-16 bg-gradient-to-br from-sage-50 to-primary-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-primary-900 mb-4">
                            Our Values
                        </h2>
                        <p className="text-gray-700 max-w-2xl mx-auto">
                            The principles that guide everything we do
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: "🎨",
                                title: "Authenticity",
                                description: "Every piece is 100% handcrafted using traditional techniques passed down through generations. We never compromise on quality or authenticity."
                            },
                            {
                                icon: "🤝",
                                title: "Fair Trade",
                                description: "We ensure fair wages and dignified working conditions for all our artisans. Direct partnerships mean more money reaches the hands that create the magic."
                            },
                            {
                                icon: "🌿",
                                title: "Sustainability",
                                description: "We use natural fabrics, eco-friendly dyes, and sustainable practices. Our slow fashion approach respects both people and planet."
                            },
                            {
                                icon: "💎",
                                title: "Quality",
                                description: "Each garment undergoes rigorous quality checks. We take pride in delivering pieces that last for generations, not just seasons."
                            },
                            {
                                icon: "🏛️",
                                title: "Heritage",
                                description: "We are custodians of India's rich textile heritage. Every stitch preserves centuries of cultural knowledge and artistic excellence."
                            },
                            {
                                icon: "❤️",
                                title: "Community",
                                description: "We build lasting relationships with artisan communities, investing in their education, healthcare, and future prosperity."
                            }
                        ].map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white rounded-xl p-6 shadow-soft hover:shadow-hover transition-shadow"
                            >
                                <div className="text-4xl mb-4">{value.icon}</div>
                                <h3 className="text-xl font-semibold text-primary-900 mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-gray-700 leading-relaxed">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Craft */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl font-bold text-primary-900 mb-4">
                                The Art of Chikankari
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                Chikankari is a 400-year-old embroidery tradition that originated in Lucknow 
                                during the Mughal era. This delicate white-on-white embroidery technique 
                                involves intricate needlework creating beautiful floral and geometric patterns.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6 text-gray-700 leading-relaxed"
                        >
                            <p>
                                Each Chikankari piece requires days or even weeks to complete, depending on 
                                the complexity of the design. The process involves blocking the fabric, 
                                printing the design, and then painstakingly embroidering each motif by hand.
                            </p>
                            <p>
                                Traditional Chikankari employs 36 different types of stitches, each with its 
                                own name and purpose. From the raised 'murri' and 'phanda' stitches to the 
                                shadow work of 'tepchi', every technique adds a unique dimension to the fabric.
                            </p>
                            <p>
                                What makes Chikankari truly special is that no two pieces are ever exactly 
                                alike. Each artisan brings their own touch to the work, making every garment 
                                a unique work of wearable art.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 bg-gradient-to-br from-accent-50 to-primary-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h2 className="text-3xl font-bold text-primary-900 mb-6">
                            Join Our Journey
                        </h2>
                        <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                            Every purchase helps preserve traditional craftsmanship and supports 
                            artisan communities. Be part of the story.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.a
                                href="/sarees"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn-primary"
                            >
                                Explore Our Collection
                            </motion.a>
                            <motion.a
                                href="/contact"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn-secondary"
                            >
                                Get in Touch
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
};

export default About;
