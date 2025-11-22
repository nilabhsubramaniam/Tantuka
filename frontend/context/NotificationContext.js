import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const NotificationContext = createContext();

const DEFAULT_DURATION = 4000;

const typeStyles = {
  success: {
    badge: 'bg-emerald-100 text-emerald-700',
    border: 'border-emerald-100',
  },
  error: {
    badge: 'bg-red-100 text-red-700',
    border: 'border-red-100',
  },
  info: {
    badge: 'bg-blue-100 text-blue-700',
    border: 'border-blue-100',
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
    ({ title, message, type = 'success', duration = DEFAULT_DURATION }) => {
      const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      setNotifications((prev) => [...prev, { id, title, message, type }]);

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
        Responsive notification container:
        - On small screens: bottom-centered (better for thumb reach)
        - On medium+ screens: top-right
      */}
      <div className="pointer-events-none fixed inset-x-0 z-[200] flex justify-center sm:justify-end sm:top-6 sm:pr-4 bottom-6 sm:bottom-auto">
        <div className="w-full max-w-sm px-4 sm:px-0">
          <AnimatePresence>
            {notifications.map((notification) => {
              const styles = getTypeStyles(notification.type);
              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`pointer-events-auto rounded-2xl border ${styles.border} bg-white/95 p-4 shadow-lg backdrop-blur mb-3`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${styles.badge}`}>
                      <Icon type={notification.type} />
                    </div>
                    <div className="flex-1">
                      {notification.title && (
                        <p className="text-sm font-semibold text-primary-900">{notification.title}</p>
                      )}
                      {notification.message && (
                        <p className="mt-0.5 text-sm text-primary-600">{notification.message}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => dismiss(notification.id)}
                      className="text-primary-300 transition hover:text-primary-500"
                      aria-label="Dismiss notification"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
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
