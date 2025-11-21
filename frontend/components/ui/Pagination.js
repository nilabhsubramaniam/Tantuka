import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 7;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 4) {
                for (let i = 1; i <= 5; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 3) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    const handlePageChange = (page) => {
        if (page !== currentPage && page >= 1 && page <= totalPages) {
            onPageChange(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex items-center justify-center gap-2 py-6">
            {/* Previous Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`
                    flex items-center gap-1.5 px-3 py-2 rounded-xl font-medium text-sm
                    transition-all duration-250 shadow-soft
                    ${currentPage === 1
                        ? 'bg-primary-100 text-primary-300 cursor-not-allowed'
                        : 'bg-white text-primary-700 hover:bg-primary-50 hover:shadow-md'
                    }
                `}
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="hidden sm:inline">Previous</span>
            </motion.button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1.5">
                <AnimatePresence mode="wait">
                    {pageNumbers.map((page, index) => {
                        if (page === '...') {
                            return (
                                <span
                                    key={`ellipsis-${index}`}
                                    className="px-2 text-primary-400"
                                >
                                    ...
                                </span>
                            );
                        }

                        const isActive = page === currentPage;

                        return (
                            <motion.button
                                key={page}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                whileHover={{ scale: isActive ? 1 : 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handlePageChange(page)}
                                className={`
                                    w-9 h-9 rounded-xl font-semibold text-sm transition-all duration-250
                                    ${isActive
                                        ? 'bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-md scale-105'
                                        : 'bg-white text-primary-700 hover:bg-primary-50 shadow-soft hover:shadow-md'
                                    }
                                `}
                            >
                                {page}
                            </motion.button>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Next Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`
                    flex items-center gap-1.5 px-3 py-2 rounded-xl font-medium text-sm
                    transition-all duration-250 shadow-soft
                    ${currentPage === totalPages
                        ? 'bg-primary-100 text-primary-300 cursor-not-allowed'
                        : 'bg-white text-primary-700 hover:bg-primary-50 hover:shadow-md'
                    }
                `}
            >
                <span className="hidden sm:inline">Next</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </motion.button>

            {/* Page Info */}
            <div className="hidden md:flex items-center gap-1.5 ml-3 text-xs text-primary-600">
                <span>Page</span>
                <span className="font-semibold text-primary-900">{currentPage}</span>
                <span>of</span>
                <span className="font-semibold text-primary-900">{totalPages}</span>
            </div>
        </div>
    );
};

export default Pagination;
