import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { useTheme } from '../contexts/ThemeContext';

export const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={toggleTheme}
      accessibilityLabel={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      accessibilityRole="button"
    >
      <Image
        source={theme === 'light' ? require('../assets/images/crescent_moon.svg') : require('../assets/images/sun.svg')}
        style={styles.icon}
        contentFit="contain"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  icon: {
    width: 24,
    height: 24,
  },
});