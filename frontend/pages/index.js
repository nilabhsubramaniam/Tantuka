import React from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import CategoryShowcase from '../components/home/CategoryShowcase';
import ChikankariShowcase from '../components/home/ChikankariShowcase';
import Testimonials from '../components/home/Testimonials';
import NewsletterSignup from '../components/home/NewsletterSignup';

export default function Home() {
    return (
        <Layout title="Tantuka - Exquisite Chikankari Clothing">
            <Hero />
            <FeaturedProducts />
            <CategoryShowcase />
            <ChikankariShowcase />
            <Testimonials />
            <NewsletterSignup />
        </Layout>
    );
}