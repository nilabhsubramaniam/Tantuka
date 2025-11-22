import { createContext, useContext, useReducer, useEffect, useMemo } from 'react';
import { useNotification } from './NotificationContext';

const CartContext = createContext();

const initialState = {
  items: [],
};

function variantKey({ id, color, size }) {
  return [id, color || 'default', size || 'free-size'].join('::');
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'HYDRATE': {
      return { ...state, ...action.payload };
    }
    case 'ADD_ITEM': {
      const { item } = action.payload;
      const key = variantKey(item);
      const existing = state.items.find((cartItem) => cartItem.key === key);

      if (existing) {
        return {
          ...state,
          items: state.items.map((cartItem) =>
            cartItem.key === key
              ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
              : cartItem
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { ...item, key }],
      };
    }
    case 'UPDATE_QUANTITY': {
      const { key, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.key !== key),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.key === key ? { ...item, quantity } : item
        ),
      };
    }
    case 'REMOVE_ITEM': {
      const { key } = action.payload;
      return {
        ...state,
        items: state.items.filter((item) => item.key !== key),
      };
    }
    case 'CLEAR_CART': {
      return initialState;
    }
    default:
      return state;
  }
}

const storageKey = 'tantuka-cart';

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  // notification hook (NotificationProvider should wrap CartProvider)
  const { notify } = useNotification();

  // hydrate from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.items) {
          dispatch({ type: 'HYDRATE', payload: parsed });
        }
      }
    } catch (error) {
      console.error('Failed to read cart from storage', error);
    }
  }, []);

  // persist to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state]);

  const cartSummary = useMemo(() => {
    const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = state.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    return { totalItems, subtotal };
  }, [state.items]);

  const addItem = (product, options = {}) => {
    const item = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      image: options.image || product.image,
      price: product.price,
      state: product.state,
      color: options.color,
      size: options.size,
      quantity: options.quantity || 1,
      metadata: options.metadata,
    };
    dispatch({ type: 'ADD_ITEM', payload: { item } });

    // Friendly notification with product image and actions
    try {
      const labelParts = [];
      if (item.color) labelParts.push(item.color);
      if (item.size) labelParts.push(item.size);
      const label = labelParts.length ? ` (${labelParts.join(' • ')})` : '';
      
      notify({
        title: '✓ Added to cart',
        message: `${item.name}${label} × ${item.quantity}`,
        type: 'success',
        duration: 4000,
        image: item.image,
        actions: [
          {
            label: 'View Cart',
            primary: true,
            onClick: () => {
              if (typeof window !== 'undefined') {
                window.location.href = '/cart';
              }
            },
          },
          {
            label: 'Continue Shopping',
            primary: false,
            onClick: () => {
              // Just dismiss the notification
            },
          },
        ],
      });
      
      // Trigger cart icon animation
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('cart-item-added'));
      }
    } catch (err) {
      // ignore if notification system isn't available
      console.warn('Notify failed', err);
    }
  };

  const updateQuantity = (key, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { key, quantity } });
  };

  const removeItem = (key) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { key } });
  };

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const value = {
    items: state.items,
    ...cartSummary,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
