import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { getImagePath } from '../../utils/basePath';
import { useNotification } from '../../context/NotificationContext';

const defaultColors = [
  { name: 'Classic White', value: '#f8f4ef', code: 'white', image: null },
  { name: 'Royal Gold', value: '#f1d7a3', code: 'gold', image: null },
  { name: 'Emerald Teal', value: '#1e6c64', code: 'teal', image: null },
];

const defaultSizes = ['Standard 5.5m'];

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const panelVariants = {
  hidden: { y: '100%', opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const normalizeColorKey = (value) => {
  if (!value) return null;
  return String(value).trim().toLowerCase().replace(/\s+/g, '-');
};

const resolveImageSource = (input) => {
  if (!input) return null;
  if (typeof input === 'string') return input;
  if (Array.isArray(input)) return resolveImageSource(input[0]);
  if (typeof input === 'object') {
    return input.src || input.url || input.image || null;
  }
  return null;
};

export default function ProductConfigurator({ product, isOpen, onClose, onConfirm }) {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const { notify } = useNotification();

  const colorOptions = useMemo(() => {
    if (product?.colorOptions?.length) {
      return product.colorOptions.map((option, index) => ({
        key: normalizeColorKey(option.code || option.value || option.name || index),
        name: option.name || option.label || `Color ${index + 1}`,
        swatch: option.value || option.hex || defaultColors[index % defaultColors.length].value,
      }));
    }

    if (product?.colors?.length) {
      return product.colors.map((entry, index) => {
        if (typeof entry === 'string') {
          return {
            key: normalizeColorKey(entry),
            name: entry,
            swatch: defaultColors[index % defaultColors.length].value,
          };
        }
        return {
          key: normalizeColorKey(entry.code || entry.name || index),
          name: entry.name || `Color ${index + 1}`,
          swatch: entry.value || entry.hex || defaultColors[index % defaultColors.length].value,
        };
      });
    }

    return defaultColors.map((color) => ({
      key: normalizeColorKey(color.code),
      name: color.name,
      swatch: color.value,
    }));
  }, [product]);

  const sizeOptions = useMemo(() => {
    if (product?.sizeOptions?.length) {
      return product.sizeOptions;
    }
    if (product?.sizes?.length) {
      return product.sizes.map((size, index) =>
        typeof size === 'string' ? size : size.label || size.name || `Size ${index + 1}`
      );
    }
    return defaultSizes;
  }, [product]);

  const imagesByColor = useMemo(() => {
    if (!product?.imagesByColor) return {};
    return Object.entries(product.imagesByColor).reduce((acc, [key, value]) => {
      const normalizedKey = normalizeColorKey(key);
      const resolved = resolveImageSource(value);
      if (normalizedKey && resolved) {
        acc[normalizedKey] = resolved;
      }
      return acc;
    }, {});
  }, [product]);

  const defaultImage = useMemo(() => {
    return (
      resolveImageSource(product?.image) ||
      resolveImageSource(product?.images?.[0]) ||
      '/images/products/placeholder.jpg'
    );
  }, [product]);

  const previewImage = useMemo(() => {
    const colorImage = selectedColor ? imagesByColor[selectedColor] : null;
    return getImagePath(colorImage || defaultImage);
  }, [defaultImage, imagesByColor, selectedColor]);

  useEffect(() => {
    if (isOpen) {
      const firstColor = colorOptions[0]?.key || null;
      const firstSize = sizeOptions[0] || null;
      setSelectedColor(firstColor);
      setSelectedSize(firstSize);
      setQuantity(1);
      setError(null);
    }
  }, [isOpen, colorOptions, sizeOptions]);

  const handleConfirm = () => {
    if (!selectedColor || !selectedSize) {
      setError('Please select a color and size to continue.');
      notify({
        title: 'Select options first',
        message: 'Choose both color and size before adding to cart.',
        type: 'info',
      });
      return;
    }
    const colorMeta = colorOptions.find((option) => option.key === selectedColor);
    setError(null);
    onConfirm({
      color: colorMeta?.name || selectedColor,
      size: selectedSize,
      quantity,
      image: previewImage,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-end md:items-center justify-center p-0 md:p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
          
          {/* Modal Panel */}
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full md:max-w-3xl bg-white rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] md:max-h-[85vh] flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur shadow-lg flex items-center justify-center text-primary-700 hover:bg-white hover:text-accent-600 transition-all"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1">
              <div className="grid md:grid-cols-2">
                {/* Left Panel - Image & Product Info */}
                <div className="bg-gradient-to-br from-primary-50/80 to-accent-50/40 p-4 md:p-6 flex flex-col gap-4">
                  {/* Product Image */}
                  <div className="aspect-square md:aspect-auto md:h-64 rounded-2xl overflow-hidden bg-white shadow-lg ring-1 ring-primary-100">
                    <img 
                      src={previewImage} 
                      alt={product?.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Product Info */}
                  <div>
                    <p className="text-xs uppercase tracking-wider text-accent-600 font-semibold mb-1">
                      Configure Your Selection
                    </p>
                    <h3 className="text-xl md:text-2xl font-display font-bold text-primary-900 leading-tight">
                      {product?.name}
                    </h3>
                    <p className="text-primary-600 text-sm mt-2 leading-relaxed">
                      Select your preferred color, size and quantity below.
                    </p>
                  </div>
                </div>

                {/* Right Panel - Configuration Options */}
                <div className="p-4 md:p-6 space-y-5">
                  {/* Color Selection */}
                  <div>
                    <p className="text-xs font-bold text-primary-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <span className="w-1 h-4 bg-accent-500 rounded-full"></span>
                      Color
                    </p>
                    <div className="grid grid-cols-3 gap-2 md:gap-3">
                      {colorOptions.map((option) => (
                        <button
                          key={option.key}
                          onClick={() => setSelectedColor(option.key)}
                          className={`rounded-xl border-2 p-2 md:p-3 text-left transition-all ${
                            selectedColor === option.key
                              ? 'border-accent-500 shadow-md bg-accent-50/50 scale-105'
                              : 'border-primary-200 hover:border-accent-300 hover:shadow-sm'
                          }`}
                        >
                          <span
                            className="block w-8 h-8 md:w-10 md:h-10 rounded-lg border-2 border-white shadow-md mb-2"
                            style={{ backgroundColor: option.swatch || '#f5f5f5' }}
                          />
                          <span className="text-xs md:text-sm font-semibold text-primary-900 block leading-tight">
                            {option.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size Selection */}
                  <div>
                    <p className="text-xs font-bold text-primary-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <span className="w-1 h-4 bg-accent-500 rounded-full"></span>
                      Size
                    </p>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {sizeOptions.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                            selectedSize === size
                              ? 'bg-primary-900 text-white border-primary-900 shadow-lg scale-105'
                              : 'border-primary-200 text-primary-800 hover:border-primary-400 hover:shadow-sm'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity & Price */}
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <p className="text-xs font-bold text-primary-700 uppercase tracking-wider mb-2">
                        Quantity
                      </p>
                      <div className="flex items-center border-2 border-primary-200 rounded-full overflow-hidden shadow-sm">
                        <button
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          className="w-10 h-10 flex items-center justify-center text-primary-700 hover:bg-primary-100 font-bold transition-colors"
                          disabled={quantity <= 1}
                        >
                          −
                        </button>
                        <span className="w-12 text-center font-bold text-primary-900">{quantity}</span>
                        <button
                          onClick={() => setQuantity((q) => Math.min(5, q + 1))}
                          className="w-10 h-10 flex items-center justify-center text-primary-700 hover:bg-primary-100 font-bold transition-colors"
                          disabled={quantity >= 5}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-primary-500 uppercase tracking-wider font-semibold">Total</p>
                      <p className="text-2xl md:text-3xl font-display font-bold text-accent-600">
                        ₹{((product?.price || 0) * quantity).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl border border-red-200 flex items-center gap-2"
                    >
                      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {error}
                    </motion.p>
                  )}
                </div>
              </div>
            </div>

            {/* Fixed Bottom Actions */}
            <div className="border-t border-primary-100 bg-white p-4 md:p-6 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 h-12 md:h-14 rounded-xl border-2 border-primary-200 text-primary-700 font-semibold hover:bg-primary-50 hover:border-primary-300 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 h-12 md:h-14 rounded-xl bg-gradient-to-r from-accent-600 to-accent-500 text-white font-bold shadow-lg hover:shadow-xl hover:from-accent-700 hover:to-accent-600 transition-all transform hover:scale-105"
              >
                Add to Cart
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
