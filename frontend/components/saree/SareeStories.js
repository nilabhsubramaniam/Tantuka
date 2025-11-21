import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getImagePath } from '@/utils/basePath';

const SareeStories = () => {
    const [activeStory, setActiveStory] = useState(0);

    const stories = [
        {
            id: 1,
            name: 'Fatima Begum',
            role: 'Master Chikankari Artisan',
            experience: '35 years',
            community: 'Lucknow Craft Community',
            image: '/images/testimonials/testimonial-1.jpg',
            story: 'With 35 years of dedication to the Chikankari craft, Fatima has trained over 100 apprentices. Her intricate 32-stitch patterns are recognized worldwide for their precision and elegance.',
            specialization: 'Fine Chikankari Embroidery',
            productsCreated: '2,500+',
            quote: '"Every stitch tells a story of our heritage. I create not just sarees, but memories."',
        },
        {
            id: 2,
            name: 'Rajesh Kumar',
            role: 'Silk Weaver',
            experience: '28 years',
            community: 'Tamil Nadu Weavers Association',
            image: '/images/testimonials/testimonial-2.jpg',
            story: 'Rajesh comes from a family of silk weavers with a legacy spanning four generations. He specializes in traditional Kanchipuram weaving techniques that have remained unchanged for centuries.',
            specialization: 'Kanchipuram Silk Weaving',
            productsCreated: '3,200+',
            quote: '"The loom is my canvas, silk is my paint, and tradition is my inspiration."',
        },
        {
            id: 3,
            name: 'Priya Menon',
            role: 'Master Weaver',
            experience: '22 years',
            community: 'Kerala Saree Cooperative',
            image: '/images/testimonials/testimonial-3.jpg',
            story: 'Priya preserves the ancient Kerala saree traditions while innovating with contemporary designs. Her work represents the perfect balance between heritage and modernity.',
            specialization: 'Kasavu & Tissue Weaving',
            productsCreated: '1,800+',
            quote: '"Tradition is not just preserving the past; it\'s innovating for the future."',
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    return (
        <div>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
                {/* Story Cards */}
                {stories.map((story, idx) => (
                    <motion.div
                        key={story.id}
                        variants={itemVariants}
                        whileHover={{ y: -10 }}
                        onHoverStart={() => setActiveStory(idx)}
                        className="cursor-pointer"
                    >
                        <div className="card-elegant overflow-hidden h-full">
                            {/* Image */}
                            <div className="relative h-64 overflow-hidden bg-primary-100">
                                <img
                                    src={getImagePath(story.image)}
                                    alt={story.name}
                                    className="absolute w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent" />

                                {/* Experience Badge */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold text-primary-900"
                                >
                                    {story.experience}
                                </motion.div>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-4">
                                {/* Name & Role */}
                                <div>
                                    <motion.h3
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        className="text-2xl font-bold text-primary-900 mb-1"
                                    >
                                        {story.name}
                                    </motion.h3>
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ delay: 0.1 }}
                                        className="text-accent-600 font-semibold"
                                    >
                                        {story.role}
                                    </motion.p>
                                </div>

                                {/* Community */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.15 }}
                                    className="flex items-center gap-2 text-sm text-primary-600"
                                >
                                    <span>📍</span>
                                    <span>{story.community}</span>
                                </motion.div>

                                {/* Stats */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="grid grid-cols-2 gap-4 py-4 border-y border-primary-200"
                                >
                                    <div>
                                        <div className="text-2xl font-bold gradient-text">{story.productsCreated}</div>
                                        <div className="text-xs text-primary-600">Products Created</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold gradient-text">{story.experience}</div>
                                        <div className="text-xs text-primary-600">Experience</div>
                                    </div>
                                </motion.div>

                                {/* Specialization */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.25 }}
                                >
                                    <span className="inline-block text-xs font-bold text-white bg-accent-600 px-3 py-1 rounded-full">
                                        {story.specialization}
                                    </span>
                                </motion.div>

                                {/* Learn More Button */}
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="btn-secondary w-full py-2 text-sm font-semibold"
                                >
                                    Read Full Story
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Featured Story Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-16 bg-gradient-to-r from-accent-50 to-gold-50 rounded-2xl p-8 md:p-12"
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeStory}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
                    >
                        {/* Image */}
                        <div className="relative h-80 rounded-xl overflow-hidden shadow-xl">
                            <img
                                src={getImagePath(stories[activeStory].image)}
                                alt={stories[activeStory].name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Content */}
                        <div className="md:col-span-2 space-y-6">
                            {/* Quote */}
                            <motion.blockquote
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-2xl md:text-3xl font-bold text-primary-900 italic"
                            >
                                {stories[activeStory].quote}
                            </motion.blockquote>

                            {/* Story Text */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-lg text-primary-700 leading-relaxed"
                            >
                                {stories[activeStory].story}
                            </motion.p>

                            {/* Details */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="grid grid-cols-3 gap-4 pt-6 border-t border-primary-200"
                            >
                                <div>
                                    <div className="text-sm text-primary-600 font-semibold">NAME</div>
                                    <div className="text-primary-900 font-bold">{stories[activeStory].name}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-primary-600 font-semibold">ROLE</div>
                                    <div className="text-primary-900 font-bold">{stories[activeStory].role}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-primary-600 font-semibold">COMMUNITY</div>
                                    <div className="text-primary-900 font-bold text-sm">{stories[activeStory].community}</div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Dots */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-center gap-3 mt-8"
                >
                    {stories.map((_, idx) => (
                        <motion.button
                            key={idx}
                            onClick={() => setActiveStory(idx)}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className={`w-3 h-3 rounded-full transition-all ${
                                activeStory === idx
                                    ? 'bg-accent-600 w-8'
                                    : 'bg-primary-300 hover:bg-primary-400'
                            }`}
                        />
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
};

export default SareeStories;
