import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const NotificationContext = createContext();

const DEFAULT_DURATION = 3000; // 3 seconds - quick and readable

const typeStyles = {
  success: {
    badge: 'bg-emerald-50 text-emerald-600',
    border: 'border-emerald-200',
    bg: 'bg-gradient-to-r from-emerald-50 to-green-50',
  },
  error: {
    badge: 'bg-red-50 text-red-600',
    border: 'border-red-200',
    bg: 'bg-gradient-to-r from-red-50 to-rose-50',
  },
  info: {
    badge: 'bg-primary-100 text-primary-700',
    border: 'border-primary-200',
    bg: 'bg-gradient-to-r from-primary-50 to-accent-50',
  },
};

function getTypeStyles(type = 'success') {
  return typeStyles[type] || typeStyles.success;
}

function Icon({ type }) {
  switch (type) {
    case 'error':
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 3h4l7 7-7 7h-4l-7-7 7-7z" />
        </svg>
      );
    case 'info':
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18a6 6 0 100-12 6 6 0 000 12z" />
        </svg>
      );
    default:
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
  }
}

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const timeoutsRef = useRef({});

  useEffect(() => () => {
    Object.values(timeoutsRef.current).forEach(clearTimeout);
    timeoutsRef.current = {};
  }, []);

  const dismiss = useCallback((id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    if (timeoutsRef.current[id]) {
      clearTimeout(timeoutsRef.current[id]);
      delete timeoutsRef.current[id];
    }
  }, []);

  const notify = useCallback(
    ({ title, message, type = 'success', duration = DEFAULT_DURATION, image, actions }) => {
      const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      setNotifications((prev) => [...prev, { id, title, message, type, image, actions }]);

      if (duration !== null && duration !== 0) {
        const timeout = setTimeout(() => {
          dismiss(id);
        }, duration);
        timeoutsRef.current[id] = timeout;
      }

      return id;
    },
    [dismiss]
  );

  const value = useMemo(() => ({ notify, dismiss }), [notify, dismiss]);

  return (
    <NotificationContext.Provider value={value}>
      {children}

      {/* 
        Toast notification container - top-right, small and crisp
      */}
      <div 
        className="pointer-events-none fixed top-20 right-4 z-[100] flex flex-col items-end gap-2"
      >
        <AnimatePresence mode="popLayout">
          {notifications.map((notification) => {
            const styles = getTypeStyles(notification.type);
            return (
              <motion.div
                key={notification.id}
                layout
                initial={{ opacity: 0, y: -50, x: 100, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 200, scale: 0.8 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 30,
                  mass: 0.8
                }}
                className={`pointer-events-auto rounded-2xl border-2 ${styles.border} ${styles.bg} shadow-2xl backdrop-blur-sm min-w-[280px]`}
              >
                <div className="flex items-center gap-3 p-4">
                    {/* Icon Badge - themed and larger */}
                    {!notification.image && (
                      <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${styles.badge} shadow-sm`}>
                        <Icon type={notification.type} />
                      </div>
                    )}
                    
                    {/* Product Image - rounded */}
                    {notification.image && (
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden bg-white shadow-md ring-2 ring-primary-100">
                        <img 
                          src={notification.image} 
                          alt="" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    {/* Message - themed typography */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-primary-900 line-clamp-1">
                        {notification.title || notification.message}
                      </p>
                      {notification.title && notification.message && (
                        <p className="text-xs text-primary-600 line-clamp-1 mt-1">{notification.message}</p>
                      )}
                    </div>
                    
                    {/* Close button - themed */}
                    <button
                      type="button"
                      onClick={() => dismiss(notification.id)}
                      className="flex-shrink-0 text-primary-400 hover:text-primary-700 transition-colors hover:bg-primary-100 rounded-lg p-1"
                      aria-label="Dismiss notification"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}
