import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import { getImagePath } from '../../utils/basePath';
import CustomSelect from '../../components/ui/CustomSelect';

// State data mapping with all information
const STATES_DATA = {
  up: {
    id: 'up',
    name: 'Uttar Pradesh',
    code: 'UP',
    sareeType: 'Lucknow Chikankari',
    count: 120,
    image: '/images/categories/kurtas.jpg',
    description: 'Hand-embroidered masterpieces from Lucknow',
    longDescription: 'Uttar Pradesh, home to the world-famous Lucknow Chikankari, is a treasure trove of exquisite hand-embroidered sarees. Our collection showcases the finest artisanal work from master craftspeople who have perfected their craft over generations.',
    colors: ['#E8DCC4', '#D4A574', '#A8826A'],
    heritage: 'Lucknow Chikankari is a UNESCO-recognized embroidery tradition dating back to the 18th century.',
  },
  tn: {
    id: 'tn',
    name: 'Tamil Nadu',
    code: 'TN',
    sareeType: 'Kanchipuram Silk',
    count: 85,
    image: '/images/categories/sarees.jpg',
    description: 'Pure silk sarees with traditional patterns',
    longDescription: 'Tamil Nadu is renowned for its Kanchipuram silk sarees, which are considered among the finest in the world. Each saree is woven with pure mulberry silk and features intricate designs inspired by temple architecture.',
    colors: ['#8B0000', '#FFD700', '#F5DEB3'],
    heritage: 'Kanchipuram sarees have been a symbol of Tamil culture for over 400 years.',
  },
  kl: {
    id: 'kl',
    name: 'Kerala',
    code: 'KL',
    sareeType: 'Kasavu Saree',
    count: 65,
    image: '/images/categories/dupattas.jpg',
    description: 'Traditional ivory and gold bordered sarees',
    longDescription: 'Kerala\'s Kasavu sarees are the epitome of elegance and simplicity. Made from cotton or silk with a distinctive ivory color and gold border, these sarees are perfect for traditional occasions.',
    colors: ['#FFFAF0', '#FFD700', '#DAA520'],
    heritage: 'Kasavu sarees are an essential part of Kerala\'s cultural identity and traditional dress code.',
  },
  ka: {
    id: 'ka',
    name: 'Karnataka',
    code: 'KA',
    sareeType: 'Mysore Silk',
    count: 50,
    image: '/images/categories/dress-materials.jpg',
    description: 'Rich silk sarees with intricate borders',
    longDescription: 'Karnataka\'s Mysore silk sarees are known for their richness and durability. Woven with pure silk, these sarees feature traditional patterns and are a staple in South Indian wardrobes.',
    colors: ['#4B0082', '#FFD700', '#8B4513'],
    heritage: 'Mysore silk has been produced in Karnataka for centuries and is known for its superior quality.',
  },
  wb: {
    id: 'wb',
    name: 'West Bengal',
    code: 'WB',
    sareeType: 'Tant Saree',
    count: 45,
    image: '/images/categories/kurtas.jpg',
    description: 'Lightweight cotton sarees with fine weave',
    longDescription: 'West Bengal\'s Tant sarees are lightweight and perfect for summer wear. Made from fine cotton, these sarees are known for their comfortable texture and elegant appearance.',
    colors: ['#FFB6C1', '#FFFFFF', '#87CEEB'],
    heritage: 'Tant sarees are integral to Bengali culture and are worn during major celebrations.',
  },
  od: {
    id: 'od',
    name: 'Odisha',
    code: 'OD',
    sareeType: 'Sambalpuri Saree',
    count: 40,
    image: '/images/categories/sarees.jpg',
    description: 'Ikat sarees with geometric patterns',
    longDescription: 'Odisha\'s Sambalpuri sarees are famous for their unique ikat weaving technique, which creates stunning geometric patterns. Each saree is a work of art crafted with precision and care.',
    colors: ['#FF6347', '#FFFFFF', '#32CD32'],
    heritage: 'Sambalpuri weaving is an ancient art form that has been preserved in Odisha for centuries.',
  },
  mh: {
    id: 'mh',
    name: 'Maharashtra',
    code: 'MH',
    sareeType: 'Paithani Saree',
    count: 38,
    image: '/images/categories/dupattas.jpg',
    description: 'Golden bordered silk sarees',
    longDescription: 'Maharashtra\'s Paithani sarees are famous for their peacock motifs and golden borders. These silk sarees are considered a symbol of wealth and are often passed down as heirlooms.',
    colors: ['#8B4513', '#FFD700', '#CD853F'],
    heritage: 'Paithani sarees have been a part of Maharashtrian culture for over 500 years.',
  },
  ap: {
    id: 'ap',
    name: 'Andhra Pradesh',
    code: 'AP',
    sareeType: 'Venkatagiri Saree',
    count: 32,
    image: '/images/categories/dress-materials.jpg',
    description: 'Embroidered cotton sarees',
    longDescription: 'Andhra Pradesh\'s Venkatagiri sarees are known for their fine embroidery and delicate work. Made from cotton, these sarees are comfortable and elegant.',
    colors: ['#FFB6C1', '#FF69B4', '#FFFFFF'],
    heritage: 'Venkatagiri embroidery is a delicate art form that requires years of training to master.',
  },
};

// Sample saree products for each state
const SAMPLE_SAREES = {
  up: [
    { id: 1, name: 'Lucknow Elegance', price: 2500, originalPrice: 3500, rating: 4.8, reviews: 145, image: '/images/categories/sarees.jpg', badge: 'Best Seller' },
    { id: 2, name: 'Chikankari Heritage', price: 3000, originalPrice: 4200, rating: 4.9, reviews: 98, image: '/images/categories/kurtas.jpg', badge: 'Featured' },
    { id: 3, name: 'Royal Lucknow', price: 2800, originalPrice: 3800, rating: 4.7, reviews: 76, image: '/images/categories/dupattas.jpg', badge: 'Premium' },
    { id: 4, name: 'Vintage Chikankari', price: 3500, originalPrice: 4800, rating: 4.9, reviews: 112, image: '/images/categories/dress-materials.jpg', badge: 'Featured' },
    { id: 5, name: 'Modern Lucknow', price: 2200, originalPrice: 3000, rating: 4.6, reviews: 89, image: '/images/categories/sarees.jpg' },
    { id: 6, name: 'Traditional Embroidery', price: 2900, originalPrice: 3900, rating: 4.8, reviews: 134, image: '/images/categories/kurtas.jpg', badge: 'Best Seller' },
  ],
  kl: [
    { id: 1, name: 'Kerala Classic', price: 1800, originalPrice: 2500, rating: 4.7, reviews: 98, image: '/images/categories/sarees.jpg', badge: 'Best Seller' },
    { id: 2, name: 'Gold Border Kasavu', price: 2200, originalPrice: 3000, rating: 4.9, reviews: 145, image: '/images/categories/dupattas.jpg', badge: 'Featured' },
    { id: 3, name: 'Traditional Kerala', price: 2000, originalPrice: 2800, rating: 4.8, reviews: 112, image: '/images/categories/kurtas.jpg' },
    { id: 4, name: 'Premium Kasavu', price: 2500, originalPrice: 3500, rating: 4.9, reviews: 156, image: '/images/categories/dress-materials.jpg', badge: 'Premium' },
  ],
  tn: [
    { id: 1, name: 'Kanchipuram Royal', price: 3500, originalPrice: 4800, rating: 4.9, reviews: 178, image: '/images/categories/sarees.jpg', badge: 'Best Seller' },
    { id: 2, name: 'Pure Silk Kanchi', price: 4000, originalPrice: 5500, rating: 4.9, reviews: 201, image: '/images/categories/kurtas.jpg', badge: 'Premium' },
    { id: 3, name: 'Traditional Kanchi', price: 3200, originalPrice: 4400, rating: 4.8, reviews: 134, image: '/images/categories/dupattas.jpg' },
  ],
  ka: [
    { id: 1, name: 'Mysore Silk', price: 2800, originalPrice: 3800, rating: 4.8, reviews: 112, image: '/images/categories/sarees.jpg', badge: 'Featured' },
    { id: 2, name: 'Premium Mysore', price: 3200, originalPrice: 4400, rating: 4.9, reviews: 145, image: '/images/categories/dress-materials.jpg', badge: 'Premium' },
  ],
  wb: [
    { id: 1, name: 'Tant Cotton', price: 1500, originalPrice: 2200, rating: 4.6, reviews: 78, image: '/images/categories/sarees.jpg' },
    { id: 2, name: 'Bengal Tant', price: 1800, originalPrice: 2500, rating: 4.7, reviews: 95, image: '/images/categories/kurtas.jpg', badge: 'Featured' },
  ],
  od: [
    { id: 1, name: 'Sambalpuri Magic', price: 2200, originalPrice: 3000, rating: 4.8, reviews: 98, image: '/images/categories/sarees.jpg', badge: 'Best Seller' },
    { id: 2, name: 'Ikat Pattern', price: 2500, originalPrice: 3500, rating: 4.7, reviews: 76, image: '/images/categories/dupattas.jpg' },
  ],
  mh: [
    { id: 1, name: 'Paithani Gold', price: 3000, originalPrice: 4200, rating: 4.9, reviews: 134, image: '/images/categories/sarees.jpg', badge: 'Best Seller' },
    { id: 2, name: 'Peacock Paithani', price: 3500, originalPrice: 4800, rating: 4.9, reviews: 167, image: '/images/categories/kurtas.jpg', badge: 'Premium' },
  ],
  ap: [
    { id: 1, name: 'Venkatagiri Embroidery', price: 2000, originalPrice: 2800, rating: 4.7, reviews: 89, image: '/images/categories/sarees.jpg' },
    { id: 2, name: 'Fine Venkatagiri', price: 2400, originalPrice: 3300, rating: 4.8, reviews: 112, image: '/images/categories/dupattas.jpg', badge: 'Featured' },
  ],
};

const StateDetailPage = () => {
  const router = useRouter();
  const { state } = router.query;
  const [selectedPrice, setSelectedPrice] = useState([1000, 5000]);
  const [sortBy, setSortBy] = useState('popular');

  // Get state data
  const stateData = state ? STATES_DATA[state.toLowerCase()] : null;
  const sarees = state ? SAMPLE_SAREES[state.toLowerCase()] || [] : [];

  if (!stateData) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-display text-primary-900 mb-4">State Not Found</h1>
            <p className="text-primary-700 mb-8">Sorry, this state collection is not available.</p>
            <Link href="/sarees" className="inline-block px-6 py-3 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors">
              Back to Sarees
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-br from-primary-50 to-sage-50 pt-20 pb-12"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-primary-600 mb-6">
            <Link href="/" className="hover:text-accent-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/sarees" className="hover:text-accent-600 transition-colors">Sarees</Link>
            <span>/</span>
            <span className="text-accent-600 font-semibold">{stateData.name}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left: State Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="text-5xl md:text-6xl font-display text-primary-900 mb-4">
                {stateData.name}
              </h1>
              <h2 className="text-2xl text-accent-600 font-semibold mb-6">
                {stateData.sareeType}
              </h2>
              <p className="text-lg text-primary-700 mb-6 leading-relaxed">
                {stateData.longDescription}
              </p>
              <div className="bg-white rounded-lg p-6 border-l-4 border-accent-500">
                <p className="text-primary-900 font-semibold mb-2">Heritage & Craft:</p>
                <p className="text-primary-700">{stateData.heritage}</p>
              </div>
              <div className="mt-6 flex items-center gap-4">
                <div className="text-center">
                  <p className="text-4xl font-bold text-accent-600">{sarees.length}</p>
                  <p className="text-sm text-primary-600">Products Available</p>
                </div>
                <div className="w-px h-12 bg-primary-300"></div>
                <div className="flex gap-3">
                  <p className="text-sm text-primary-600">Colors:</p>
                  <div className="flex gap-2">
                    {stateData.colors.map((color, idx) => (
                      <div
                        key={idx}
                        className="w-6 h-6 rounded-full border-2 border-primary-300"
                        style={{ backgroundColor: color }}
                        title={color}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Featured Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-96 rounded-lg overflow-hidden shadow-2xl"
            >
              <img
                src={getImagePath(stateData.image)}
                alt={stateData.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Filter & Sort Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white border-b border-primary-200 py-6"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <label className="text-sm font-semibold text-primary-900 font-display whitespace-nowrap">Sort By:</label>
              <CustomSelect
                value={sortBy}
                onChange={(value) => setSortBy(value)}
                options={[
                  { value: 'popular', label: 'Most Popular' },
                  { value: 'price-low', label: 'Price: Low to High' },
                  { value: 'price-high', label: 'Price: High to Low' },
                  { value: 'rating', label: 'Highest Rated' },
                  { value: 'newest', label: 'Newest First' }
                ]}
                className="flex-1 sm:w-64"
              />
            </div>
            <div className="text-sm text-primary-600">
              Showing <span className="font-semibold text-accent-600">{sarees.length}</span> products
            </div>
          </div>
        </div>
      </motion.div>

      {/* Products Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        {sarees.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            initial="hidden"
            whileInView="visible"
          >
            {sarees.map((saree, idx) => (
              <motion.div
                key={saree.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-xl shadow-soft hover:shadow-hover transition-all duration-300"
              >
                {/* Product Image */}
                <div className="relative h-72 rounded-t-xl overflow-hidden bg-primary-100">
                  <img
                    src={getImagePath(saree.image)}
                    alt={saree.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {saree.badge && (
                    <div className="absolute top-4 right-4 bg-accent-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {saree.badge}
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-accent-600">
                    {stateData.code}
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-primary-900 mb-2 line-clamp-2">
                    {saree.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-lg ${
                            i < Math.floor(saree.rating)
                              ? 'text-yellow-400'
                              : 'text-primary-300'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-primary-900">{saree.rating}</span>
                    <span className="text-sm text-primary-600">({saree.reviews})</span>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-2xl font-bold text-accent-600">
                        ₹{saree.price.toLocaleString()}
                      </span>
                      <span className="text-lg text-primary-400 line-through">
                        ₹{saree.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-green-600">
                      {Math.round(((saree.originalPrice - saree.price) / saree.originalPrice) * 100)}% Off
                    </span>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-3 bg-accent-600 text-white rounded-lg font-semibold hover:bg-accent-700 transition-colors">
                      Add to Cart
                    </button>
                    <button className="px-4 py-3 border-2 border-primary-300 text-primary-900 rounded-lg hover:border-accent-500 hover:text-accent-600 transition-colors">
                      ❤️
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-primary-700">No sarees found for this state.</p>
          </div>
        )}
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-accent-600 to-accent-700 text-white py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-display mb-4">
            Discover the Beauty of {stateData.name}
          </h2>
          <p className="text-lg mb-8 text-white/90">
            Explore more collections or customize your saree
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sarees"
              className="inline-block px-8 py-3 bg-white text-accent-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              Explore All States
            </Link>
            <button className="inline-block px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Contact Us for Custom Orders
            </button>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default StateDetailPage;
