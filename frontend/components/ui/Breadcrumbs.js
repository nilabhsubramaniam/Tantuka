import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Breadcrumbs = ({ items }) => {
    const router = useRouter();

    return (
        <nav className="flex items-center space-x-2 text-sm mb-6" aria-label="Breadcrumb">
            <Link 
                href="/" 
                className="text-primary-600 hover:text-accent-600 transition-colors duration-200 flex items-center gap-1"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
            </Link>

            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <svg className="w-4 h-4 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    
                    {item.href ? (
                        <Link 
                            href={item.href}
                            className="text-primary-600 hover:text-accent-600 transition-colors duration-200"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-primary-900 font-medium truncate max-w-xs md:max-w-md">
                            {item.label}
                        </span>
                    )}
                </React.Fragment>
            ))}

            {/* Back Button */}
            <button
                onClick={() => router.back()}
                className="ml-auto flex items-center gap-1 text-primary-600 hover:text-accent-600 
                         transition-colors duration-200 font-medium"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back
            </button>
        </nav>
    );
};

export default Breadcrumbs;
