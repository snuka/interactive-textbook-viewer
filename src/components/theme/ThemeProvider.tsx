'use client';

import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { useReaderStore } from '@/stores/useReaderStore';

// Define the shape of the theme context
interface ThemeContextProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

// Create the context with a default value
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Define the props for the ThemeProvider
interface ThemeProviderProps {
  children: React.ReactNode;
}

// ThemeProvider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { theme, setTheme } = useReaderStore();

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);
  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
