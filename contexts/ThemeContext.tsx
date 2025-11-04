import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';

export type ThemeType = 'light' | 'dark';

export interface ThemeColors {
  background: string;
  surface: string;
  primary: string;
  secondary: string;
  text: string;
  textSecondary: string;
  border: string;
  completed: string;
  placeholder: string;
}

const lightTheme: ThemeColors = {
  background: '#fafafa',
  surface: '#ffffff',
  primary: '#3a7bfd',
  secondary: '#e4e5f1',
  text: '#494c6b',
  textSecondary: '#9495a5',
  border: '#e3e4f1',
  completed: '#d1d2da',
  placeholder: '#9495a5',
};

const darkTheme: ThemeColors = {
  background: '#171823',
  surface: '#25273d',
  primary: '#3a7bfd',
  secondary: '#393a4b',
  text: '#c8cbe7',
  textSecondary: '#5b5e7e',
  border: '#393a4b',
  completed: '#777a92',
  placeholder: '#5b5e7e',
};

interface ThemeContextType {
  theme: ThemeType;
  colors: ThemeColors;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>('light');

  useEffect(() => {
    const systemTheme = Appearance.getColorScheme();
    setTheme(systemTheme || 'light');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const colors = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};