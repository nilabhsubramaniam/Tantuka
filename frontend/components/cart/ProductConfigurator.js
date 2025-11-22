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
  hidden: { y: 40, opacity: 0 },
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
          className="fixed inset-0 z-[120] flex items-end md:items-center justify-center"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full md:max-w-3xl bg-white rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="grid md:grid-cols-2">
              <div className="bg-primary-50/60 p-6 flex flex-col gap-4">
                <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-inner">
                  <img src={previewImage} alt={product?.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-primary-500 mb-1">You are configuring</p>
                  <h3 className="text-2xl font-display font-semibold text-primary-900">{product?.name}</h3>
                  <p className="text-primary-600 text-sm mt-2">Select your preferred color, size and quantity to continue.</p>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <p className="text-xs font-semibold text-primary-500 uppercase tracking-wide mb-2">Color</p>
                  <div className="grid grid-cols-3 gap-3">
                    {colorOptions.map((option) => (
                      <button
                        key={option.key}
                        onClick={() => setSelectedColor(option.key)}
                        className={`rounded-2xl border p-3 text-left transition-all ${
                          selectedColor === option.key
                            ? 'border-accent-500 shadow-lg bg-accent-50'
                            : 'border-primary-200 hover:border-accent-400'
                        }`}
                      >
                        <span
                          className="block w-10 h-10 rounded-xl border border-white shadow-inner mb-2"
                          style={{ backgroundColor: option.swatch || '#f5f5f5' }}
                        />
                        <span className="text-sm font-semibold text-primary-900 block">{option.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-primary-500 uppercase tracking-wide mb-2">Size</p>
                  <div className="flex flex-wrap gap-3">
                    {sizeOptions.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                          selectedSize === size
                            ? 'bg-primary-900 text-white border-primary-900 shadow-lg'
                            : 'border-primary-200 text-primary-800 hover:border-primary-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-primary-500 uppercase tracking-wide mb-1">Quantity</p>
                    <div className="flex items-center border border-primary-200 rounded-full overflow-hidden">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="w-10 h-10 flex items-center justify-center text-primary-700 hover:bg-primary-50"
                      >
                        −
                      </button>
                      <span className="w-12 text-center font-semibold text-primary-900">{quantity}</span>
                      <button
                        onClick={() => setQuantity((q) => Math.min(5, q + 1))}
                        className="w-10 h-10 flex items-center justify-center text-primary-700 hover:bg-primary-50"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-primary-500">Total</p>
                    <p className="text-2xl font-display font-semibold text-primary-900">
                      ₹{((product?.price || 0) * quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>

                {error && <p className="text-sm text-red-500 bg-red-50 px-4 py-2 rounded-xl">{error}</p>}

                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="flex-1 h-12 rounded-xl border border-primary-200 text-primary-700 font-semibold hover:bg-primary-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="flex-1 h-12 rounded-xl bg-accent-600 text-white font-semibold shadow-lg hover:bg-accent-700 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
