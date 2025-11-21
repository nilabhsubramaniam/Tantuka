/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Chikankari-inspired elegant palette
                primary: {
                    50: '#fdfcfb',    // Ivory white
                    100: '#faf8f5',   // Cream
                    200: '#f5f1eb',   // Light beige
                    300: '#e8dfd4',   // Soft sand
                    400: '#d4c4b0',   // Warm beige
                    500: '#b8a089',   // Medium tan
                    600: '#9d7e5f',   // Bronze
                    700: '#7a6049',   // Deep bronze
                    800: '#5a4738',   // Rich brown
                    900: '#3d2f26',   // Dark chocolate
                },
                accent: {
                    50: '#fef9f3',    // Soft peach
                    100: '#fef0e0',   // Light peach
                    200: '#fddcbc',   // Peach
                    300: '#fbc498',   // Golden peach
                    400: '#f9a974',   // Coral gold
                    500: '#f78d50',   // Terracotta
                    600: '#e06b32',   // Deep terracotta
                    700: '#b85426',   // Rich terracotta
                    800: '#8f401d',   // Deep rust
                    900: '#662d15',   // Dark rust
                },
                sage: {
                    50: '#f8faf9',    // Mint cream
                    100: '#f0f5f2',   // Light sage
                    200: '#e1ebe5',   // Pale sage
                    300: '#c9ddd1',   // Soft sage
                    400: '#a8c9b5',   // Medium sage
                    500: '#7fb096',   // Sage green
                    600: '#5e9278',   // Deep sage
                    700: '#47725c',   // Forest sage
                    800: '#335343',   // Dark sage
                    900: '#23382e',   // Deep forest
                },
                gold: {
                    50: '#fffef5',    // Champagne
                    100: '#fefce8',   // Light gold
                    200: '#fef9c3',   // Soft gold
                    300: '#fef08a',   // Pale gold
                    400: '#fde047',   // Golden yellow
                    500: '#eab308',   // Rich gold
                    600: '#ca8a04',   // Deep gold
                    700: '#a16207',   // Antique gold
                    800: '#854d0e',   // Dark gold
                    900: '#713f12',   // Bronze gold
                },
            },
            fontFamily: {
                serif: ['Playfair Display', 'Georgia', 'serif'],
                sans: ['Inter', 'sans-serif'],
                display: ['Cormorant Garamond', 'serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in',
                'fade-in-up': 'fadeInUp 0.6s ease-out',
                'slide-in-right': 'slideInRight 0.5s ease-out',
                'float': 'float 3s ease-in-out infinite',
                'shimmer': 'shimmer 2s infinite',
                'scale-in': 'scaleIn 0.3s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideInRight: {
                    '0%': { opacity: '0', transform: 'translateX(-20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-1000px 0' },
                    '100%': { backgroundPosition: '1000px 0' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.9)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
            },
            boxShadow: {
                'soft': '0 2px 15px rgba(0, 0, 0, 0.05)',
                'hover': '0 10px 40px rgba(0, 0, 0, 0.1)',
                'inner-glow': 'inset 0 0 20px rgba(255, 255, 255, 0.5)',
            },
        },
    },
    plugins: [],
}