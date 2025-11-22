import React from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../../components/layout/Layout';
import Button from '../../components/ui/Button';
import { useCart } from '../../context/CartContext';
import { getImagePath } from '../../utils/basePath';

const formatCurrency = (value = 0) => `₹${value.toLocaleString('en-IN')}`;

const CartPage = () => {
    const router = useRouter();
    const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();

    const shipping = items.length === 0 ? 0 : subtotal >= 5000 ? 0 : 199;
    const total = subtotal + shipping;

    if (items.length === 0) {
        return (
            <Layout title="Your Cart - Tantuka">
                <div className="container mx-auto px-4 py-16 max-w-4xl">
                    <div className="rounded-3xl border border-dashed border-primary-200 bg-white/60 px-6 py-16 text-center">
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
                            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2m0 0L7 13h10l1.6-6H5.4z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 16a2 2 0 104 0 2 2 0 00-4 0zM7 16a2 2 0 104 0 2 2 0 00-4 0z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-display font-semibold text-primary-900">Your cart is waiting to be filled</h1>
                        <p className="mt-2 text-sm text-primary-600">
                            Handpicked sarees and outfits await you. Browse the collections and add your favourites.
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                            <Button onClick={() => router.push('/products')}>
                                Browse All Products
                            </Button>
                            <Button variant="outline" onClick={() => router.push('/sarees/explore')}>
                                Explore Sarees
                            </Button>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout title="Your Cart - Tantuka">
            <div className="container mx-auto px-4 py-12 max-w-6xl">
                <div className="flex flex-col gap-2 pb-6">
                    <p className="text-xs uppercase tracking-[0.35em] text-primary-400">Shopping Bag</p>
                    <h1 className="text-3xl font-display font-semibold text-primary-900">You picked beautiful pieces</h1>
                    <p className="text-sm text-primary-500">Review your selections, adjust quantities, and proceed to checkout.</p>
                </div>

                <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
                    <div className="space-y-4">
                        <AnimatePresence initial={false}>
                            {items.map((item) => {
                                const imageSrc = getImagePath(item.image || '/images/products/placeholder.jpg');
                                const colorLabel = item.color || 'Default';
                                const sizeLabel = item.size || 'Free Size';
                                return (
                                    <motion.div
                                        key={item.key}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.2 }}
                                        className="rounded-3xl border border-primary-100 bg-white/70 p-4 shadow-soft"
                                    >
                                        <div className="flex flex-col gap-4 md:flex-row">
                                            <div className="w-full overflow-hidden rounded-2xl bg-primary-50 md:w-48">
                                                <img
                                                    src={imageSrc}
                                                    alt={item.name}
                                                    className="h-48 w-full object-cover"
                                                />
                                            </div>
                                            <div className="flex flex-1 flex-col gap-4">
                                                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                                    <div>
                                                        <p className="text-sm uppercase tracking-[0.2em] text-primary-400">{item.state || 'Artisan creation'}</p>
                                                        <h2 className="text-lg font-semibold text-primary-900">{item.name}</h2>
                                                        <div className="mt-1 flex flex-wrap gap-3 text-sm text-primary-600">
                                                            <span>Color: {colorLabel}</span>
                                                            <span>Size: {sizeLabel}</span>
                                                        </div>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeItem(item.key)}
                                                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 hover:border-red-300 transition-all"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                        Remove
                                                    </button>
                                                </div>
                                                <div className="flex flex-wrap items-center justify-between gap-4">
                                                    <div className="flex items-center rounded-full border border-primary-200">
                                                        <button
                                                            type="button"
                                                            onClick={() => updateQuantity(item.key, Math.max(1, item.quantity - 1))}
                                                            className="h-10 w-10 text-primary-600 transition hover:bg-primary-50"
                                                        >
                                                            −
                                                        </button>
                                                        <span className="w-12 text-center font-semibold text-primary-900">{item.quantity}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => updateQuantity(item.key, item.quantity + 1)}
                                                            className="h-10 w-10 text-primary-600 transition hover:bg-primary-50"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <p className="text-lg font-semibold text-primary-900">
                                                        {formatCurrency(item.price * item.quantity)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                        <div className="flex items-center justify-between rounded-2xl border border-primary-100 bg-primary-50/40 px-4 py-3">
                            <span className="text-sm text-primary-600">{items.length} {items.length === 1 ? 'item' : 'items'} in cart</span>
                            <button
                                type="button"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-primary-700 bg-white border border-primary-200 hover:bg-primary-50 hover:border-primary-300 transition-all"
                                onClick={clearCart}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Clear Cart
                            </button>
                        </div>
                    </div>

                    <div className="lg:sticky lg:top-24">
                        <div className="rounded-3xl border border-primary-100 bg-white/80 p-6 shadow-soft">
                            <h2 className="text-xl font-semibold text-primary-900">Order summary</h2>
                            <div className="mt-4 space-y-3 text-sm text-primary-600">
                                <div className="flex items-center justify-between">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-primary-900">{formatCurrency(subtotal)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Shipping</span>
                                    <span className="font-medium text-primary-900">
                                        {shipping === 0 ? 'Free' : formatCurrency(shipping)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between border-t border-dashed border-primary-100 pt-3 text-base font-semibold text-primary-900">
                                    <span>Total</span>
                                    <span>{formatCurrency(total)}</span>
                                </div>
                            </div>
                            <div className="mt-6 space-y-3">
                                <Button fullWidth size="lg" onClick={() => router.push('/checkout')}>
                                    Proceed to Checkout
                                </Button>
                                <Button
                                    variant="outline"
                                    fullWidth
                                    onClick={() => router.push('/products')}
                                >
                                    Continue Shopping
                                </Button>
                            </div>
                            <p className="mt-4 text-xs text-primary-500">
                                Taxes and duties will be calculated at checkout. We currently ship pan-India within 3-5 business days.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CartPage;
