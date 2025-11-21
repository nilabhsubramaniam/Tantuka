import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FilterSidebar = ({ filters, onFilterChange, show, onClose }) => {
    const [expandedSections, setExpandedSections] = useState(['fabric', 'state', 'price']);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const toggleSection = (section) => {
        setExpandedSections(prev =>
            prev.includes(section)
                ? prev.filter(s => s !== section)
                : [...prev, section]
        );
    };

    const handleCheckboxChange = (category, value) => {
        const currentValues = filters[category] || [];
        const newValues = currentValues.includes(value)
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value];
        
        onFilterChange({
            ...filters,
            [category]: newValues
        });
    };

    const filterSections = [
        {
            id: 'fabric',
            title: 'Fabric',
            options: [
                { value: 'Pure Silk', label: 'Pure Silk', count: 24 },
                { value: 'Cotton Silk', label: 'Cotton Silk', count: 18 },
                { value: 'Cotton', label: 'Cotton', count: 32 },
                { value: 'Tussar Silk', label: 'Tussar Silk', count: 12 },
                { value: 'Mulberry Silk', label: 'Mulberry Silk', count: 15 },
                { value: 'Silk Cotton', label: 'Silk Cotton', count: 10 }
            ]
        },
        {
            id: 'state',
            title: 'State',
            options: [
                { value: 'Uttar Pradesh', label: 'Uttar Pradesh', count: 28 },
                { value: 'Tamil Nadu', label: 'Tamil Nadu', count: 22 },
                { value: 'Karnataka', label: 'Karnataka', count: 18 },
                { value: 'West Bengal', label: 'West Bengal', count: 16 },
                { value: 'Maharashtra', label: 'Maharashtra', count: 14 },
                { value: 'Kerala', label: 'Kerala', count: 12 },
                { value: 'Odisha', label: 'Odisha', count: 10 },
                { value: 'Madhya Pradesh', label: 'Madhya Pradesh', count: 8 }
            ]
        },
        {
            id: 'occasion',
            title: 'Occasion',
            options: [
                { value: 'Wedding', label: 'Wedding', count: 35 },
                { value: 'Festive', label: 'Festive', count: 42 },
                { value: 'Traditional', label: 'Traditional', count: 28 },
                { value: 'Casual', label: 'Casual', count: 20 },
                { value: 'Party', label: 'Party', count: 18 }
            ]
        },
        {
            id: 'weave',
            title: 'Weave Type',
            options: [
                { value: 'Handwoven', label: 'Handwoven', count: 45 },
                { value: 'Temple Weave', label: 'Temple Weave', count: 12 },
                { value: 'Ikat', label: 'Ikat', count: 15 },
                { value: 'Plain Weave', label: 'Plain Weave', count: 22 },
                { value: 'Tapestry', label: 'Tapestry', count: 8 }
            ]
        }
    ];

    const colorOptions = [
        { name: 'Ivory', hex: '#FFFAF0' },
        { name: 'Gold', hex: '#FFD700' },
        { name: 'Maroon', hex: '#8B0000' },
        { name: 'Purple', hex: '#4B0082' },
        { name: 'Red', hex: '#FF0000' },
        { name: 'Green', hex: '#228B22' },
        { name: 'Pink', hex: '#FFB6C1' },
        { name: 'Blue', hex: '#1E90FF' },
        { name: 'Beige', hex: '#F5F5DC' },
        { name: 'Brown', hex: '#8B4513' }
    ];

    return (
        <>
            {/* Mobile/Tablet Overlay */}
            <AnimatePresence>
                {show && isMobile && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 bg-primary-900/60 backdrop-blur-sm z-40 lg:hidden"
                        onClick={onClose}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar - Desktop: Collapsible, Mobile: Bottom Sheet */}
            <AnimatePresence>
                {show && (
                    <motion.aside
                        initial={isMobile ? { y: '100%' } : { x: -280, opacity: 0 }}
                        animate={isMobile ? { y: 0 } : { x: 0, opacity: 1 }}
                        exit={isMobile ? { y: '100%' } : { x: -280, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className={`
                            ${isMobile 
                                ? 'fixed bottom-0 left-0 right-0 max-h-[85vh] rounded-t-3xl' 
                                : 'lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)] lg:w-72'
                            }
                            bg-white shadow-hover p-5 z-50 overflow-y-auto border border-primary-100/50
                        `}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-primary-100">
                            <h3 className="font-display text-lg font-bold text-primary-900">Filters</h3>
                            <button
                                onClick={onClose}
                                className="text-primary-400 hover:text-primary-600 transition-colors p-1"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Filter Sections */}
                <div className="space-y-3">
                    {/* Checkbox Filters */}
                    {filterSections.map((section) => (
                        <div key={section.id} className="border-b border-primary-100 pb-3">
                            <button
                                onClick={() => toggleSection(section.id)}
                                className="w-full flex items-center justify-between py-1.5 text-left group"
                            >
                                <span className="font-semibold text-sm text-primary-900 group-hover:text-accent-600 transition-colors">
                                    {section.title}
                                </span>
                                <motion.svg
                                    animate={{ rotate: expandedSections.includes(section.id) ? 180 : 0 }}
                                    transition={{ duration: 0.25, ease: "easeInOut" }}
                                    className="w-4 h-4 text-primary-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </motion.svg>
                            </button>

                            <AnimatePresence>
                                {expandedSections.includes(section.id) && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pt-2 space-y-1.5">
                                            {section.options.map((option) => (
                                                <label
                                                    key={option.value}
                                                    className="flex items-center gap-2.5 py-1 cursor-pointer group"
                                                >
                                                    <div className="relative">
                                                        <input
                                                            type="checkbox"
                                                            checked={filters[section.id]?.includes(option.value) || false}
                                                            onChange={() => handleCheckboxChange(section.id, option.value)}
                                                            className="w-3.5 h-3.5 rounded border-2 border-primary-300 text-accent-500 
                                                                     focus:ring-2 focus:ring-accent-200 focus:ring-offset-0 
                                                                     transition-all cursor-pointer"
                                                        />
                                                    </div>
                                                    <span className="flex-1 text-xs text-primary-700 group-hover:text-primary-900 transition-colors">
                                                        {option.label}
                                                    </span>
                                                    <span className="text-xs text-primary-400">
                                                        {option.count}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}                    {/* Price Range Slider */}
                    <div className="border-b border-primary-100 pb-3">
                        <button
                            onClick={() => toggleSection('price')}
                            className="w-full flex items-center justify-between py-1.5 text-left group"
                        >
                            <span className="font-semibold text-sm text-primary-900 group-hover:text-accent-600 transition-colors">
                                Price Range
                            </span>
                            <motion.svg
                                animate={{ rotate: expandedSections.includes('price') ? 180 : 0 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                className="w-4 h-4 text-primary-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </motion.svg>
                        </button>

                        <AnimatePresence>
                            {expandedSections.includes('price') && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.25, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-3 space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1">
                                                <label className="block text-xs text-primary-600 mb-1">Min</label>
                                                <input
                                                    type="number"
                                                    value={filters.priceRange[0]}
                                                    onChange={(e) => onFilterChange({
                                                        ...filters,
                                                        priceRange: [parseInt(e.target.value) || 0, filters.priceRange[1]]
                                                    })}
                                                    className="w-full px-2 py-1.5 border border-primary-200 rounded-lg 
                                                             focus:ring-2 focus:ring-accent-200 focus:border-accent-500 
                                                             transition-all text-xs"
                                                />
                                            </div>
                                            <span className="text-primary-400 pt-5">-</span>
                                            <div className="flex-1">
                                                <label className="block text-xs text-primary-600 mb-1">Max</label>
                                                <input
                                                    type="number"
                                                    value={filters.priceRange[1]}
                                                    onChange={(e) => onFilterChange({
                                                        ...filters,
                                                        priceRange: [filters.priceRange[0], parseInt(e.target.value) || 10000]
                                                    })}
                                                    className="w-full px-2 py-1.5 border border-primary-200 rounded-lg 
                                                             focus:ring-2 focus:ring-accent-200 focus:border-accent-500 
                                                             transition-all text-xs"
                                                />
                                            </div>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="10000"
                                            step="100"
                                            value={filters.priceRange[1]}
                                            onChange={(e) => onFilterChange({
                                                ...filters,
                                                priceRange: [filters.priceRange[0], parseInt(e.target.value)]
                                            })}
                                            className="w-full accent-accent-500"
                                        />
                                        <div className="flex justify-between text-xs text-primary-500">
                                            <span>₹0</span>
                                            <span>₹10,000</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Color Picker */}
                    <div className="border-b border-primary-100 pb-3">
                        <button
                            onClick={() => toggleSection('colors')}
                            className="w-full flex items-center justify-between py-1.5 text-left group"
                        >
                            <span className="font-semibold text-sm text-primary-900 group-hover:text-accent-600 transition-colors">
                                Colors
                            </span>
                            <motion.svg
                                animate={{ rotate: expandedSections.includes('colors') ? 180 : 0 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                className="w-4 h-4 text-primary-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </motion.svg>
                        </button>

                        <AnimatePresence>
                            {expandedSections.includes('colors') && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.25, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-2 grid grid-cols-5 gap-2">
                                        {colorOptions.map((color) => (
                                            <motion.button
                                                key={color.name}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handleCheckboxChange('colors', color.name)}
                                                className={`
                                                    w-9 h-9 rounded-full border-2 transition-all duration-250
                                                    ${filters.colors?.includes(color.name)
                                                        ? 'border-accent-500 ring-2 ring-accent-200'
                                                        : 'border-primary-200 hover:border-accent-300'
                                                    }
                                                `}
                                                style={{ backgroundColor: color.hex }}
                                                title={color.name}
                                            >
                                                {filters.colors?.includes(color.name) && (
                                                    <svg className="w-4 h-4 text-white mx-auto drop-shadow-md" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </motion.button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* In Stock Toggle */}
                    <div className="pt-2">
                        <label className="flex items-center gap-2.5 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={filters.inStock}
                                onChange={(e) => onFilterChange({ ...filters, inStock: e.target.checked })}
                                className="w-3.5 h-3.5 rounded border-2 border-primary-300 text-accent-500 
                                         focus:ring-2 focus:ring-accent-200 focus:ring-offset-0 
                                         transition-all cursor-pointer"
                            />
                            <span className="text-xs text-primary-700 group-hover:text-primary-900 transition-colors">
                                In Stock Only
                            </span>
                        </label>
                    </div>
                </div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
};

export default FilterSidebar;
