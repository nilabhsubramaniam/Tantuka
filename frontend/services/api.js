import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const API_URL = publicRuntimeConfig.apiUrl;

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor for authorization
api.interceptors.request.use(
    (config) => {
        // Get token from localStorage if available
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Authentication services
export const authService = {
    login: async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    },

    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },

    getCurrentUser: async () => {
        const response = await api.get('/users/me');
        return response.data;
    },
};

// Product services
export const productService = {
    getProducts: async (params = {}) => {
        const response = await api.get('/products', { params });
        return response.data;
    },

    getProductBySlug: async (slug) => {
        const response = await api.get(`/products/${slug}`);
        return response.data;
    },

    getCategories: async () => {
        const response = await api.get('/categories');
        return response.data;
    },

    getProductsByCategory: async (categorySlug, params = {}) => {
        const response = await api.get(`/categories/${categorySlug}/products`, { params });
        return response.data;
    },
};

// Cart services
export const cartService = {
    getCart: async () => {
        const response = await api.get('/cart');
        return response.data;
    },

    addToCart: async (productId, quantity, options = {}) => {
        const response = await api.post('/cart/items', { productId, quantity, ...options });
        return response.data;
    },

    updateCartItem: async (itemId, quantity) => {
        const response = await api.put(`/cart/items/${itemId}`, { quantity });
        return response.data;
    },

    removeCartItem: async (itemId) => {
        const response = await api.delete(`/cart/items/${itemId}`);
        return response.data;
    },
};

// Order services
export const orderService = {
    createOrder: async (orderData) => {
        const response = await api.post('/orders', orderData);
        return response.data;
    },

    getOrders: async () => {
        const response = await api.get('/orders');
        return response.data;
    },

    getOrder: async (orderId) => {
        const response = await api.get(`/orders/${orderId}`);
        return response.data;
    },
};

export default api;