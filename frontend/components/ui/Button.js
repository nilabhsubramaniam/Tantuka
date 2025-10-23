import React from 'react';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    fullWidth = false,
    ...props
}) => {

    const baseClasses = "inline-flex items-center justify-center border font-medium rounded-md focus:outline-none transition-colors";

    const variants = {
        primary: "bg-primary-600 hover:bg-primary-700 text-white border-transparent",
        secondary: "bg-secondary-600 hover:bg-secondary-700 text-white border-transparent",
        outline: "bg-transparent hover:bg-gray-50 text-primary-600 border-primary-600",
        subtle: "bg-primary-50 hover:bg-primary-100 text-primary-600 border-transparent",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
    };

    return (
        <button
            className={`
        ${baseClasses} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;