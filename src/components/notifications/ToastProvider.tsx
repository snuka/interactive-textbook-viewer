'use client';

import { Toaster } from 'react-hot-toast';

/**
 * Provides a global container for toast notifications.
 * This component should be placed near the root of your application layout.
 */
const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        // Define default options
        className: '',
        duration: 5000,
        style: {
          background: '#363636',
          color: '#fff',
        },

        // Default options for specific types
        success: {
          duration: 3000,
        },
        error: {
          duration: 5000,
        },
      }}
    />
  );
};

export default ToastProvider;
