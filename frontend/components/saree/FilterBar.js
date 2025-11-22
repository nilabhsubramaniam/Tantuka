import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FilterBar = ({ 
    onFilterClick, 
    activeFilters, 
    onRemoveFilter, 
    onClearAll, 
    sortBy, 
    onSortChange,
    resultsCount,
    filterSummary
}) => {
    const sortOptions = [
        { value: 'featured', label: 'Featured' },
        { value: 'newest', label: 'Newest First' },
        { value: 'price-low', label: 'Price: Low to High' },
        { value: 'price-high', label: 'Price: High to Low' },
        { value: 'rating', label: 'Highest Rated' }
    ];

    return (
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-primary-100 shadow-sm">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="py-3 flex flex-col sm:flex-row sm:items-center gap-3">
                    {/* Left: Filter Button + Results */}
                    <div className="flex items-center gap-3 flex-wrap">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onFilterClick}
                            className="flex items-center gap-2 px-4 py-2.5 bg-accent-500 text-white 
                                     rounded-lg hover:bg-accent-600 transition-all duration-250 
                                     shadow-soft hover:shadow-md font-medium text-sm"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" 
                                />
                            </svg>
                            <span>Filters</span>
                            {activeFilters.length > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 bg-white 
                                             text-accent-600 text-xs rounded-full font-bold"
                                >
                                    {activeFilters.length}
                                </motion.span>
                            )}
                        </motion.button>

                        {/* Results Count */}
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary-50 text-primary-700 text-xs font-medium whitespace-nowrap">
                            <svg className="w-3.5 h-3.5 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
                            </svg>
                            <span className="hidden xs:inline">{filterSummary}</span>
                            <span className="xs:hidden">{resultsCount} items</span>
                        </div>
                    </div>

                    {/* Middle: Active Filter Chips */}
                    <div className="flex-1 flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 
                                  scrollbar-thin scrollbar-thumb-primary-300 scrollbar-track-primary-100">
                        <AnimatePresence mode="popLayout">
                            {activeFilters.map((filter, index) => (
                                <motion.div
                                    key={`${filter.type}-${filter.value}`}
                                    initial={{ opacity: 0, scale: 0.8, x: -10 }}
                                    animate={{ opacity: 1, scale: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.8, x: -10 }}
                                    transition={{ duration: 0.25, ease: "easeInOut" }}
                                    className="flex items-center gap-1.5 px-3 py-1 bg-accent-50 
                                             text-accent-700 rounded-full text-xs font-medium 
                                             border border-accent-200 whitespace-nowrap shadow-sm"
                                >
                                    <span>{filter.value}</span>
                                    <motion.button
                                        whileHover={{ scale: 1.2, rotate: 90 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => onRemoveFilter(filter.type, filter.value)}
                                        className="text-accent-600 hover:text-accent-800 transition-colors"
                                    >
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </motion.button>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {activeFilters.length > 0 && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onClearAll}
                                className="px-3 py-1 text-xs text-primary-600 hover:text-primary-800 
                                         font-medium transition-colors whitespace-nowrap underline"
                            >
                                Clear All
                            </motion.button>
                        )}
                    </div>

                    {/* Right: Sort Dropdown & Results Count */}
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-primary-600 whitespace-nowrap">
                            <span className="font-semibold text-primary-900">{resultsCount}</span> Results
                        </span>
                        
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => onSortChange(e.target.value)}
                                className="appearance-none pl-3 pr-8 py-2 bg-white border border-primary-200 
                                         rounded-full text-xs text-primary-700 font-medium
                                         focus:ring-2 focus:ring-accent-200 focus:border-accent-500 
                                         transition-all cursor-pointer hover:border-primary-300 
                                         shadow-sm hover:shadow-md"
                            >
                                {sortOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
