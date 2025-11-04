import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { useTheme } from '../contexts/ThemeContext';

interface TodoInputProps {
  onAddTodo: (text: string) => void;
  isLoading?: boolean;
}

export const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo, isLoading = false }) => {
  const { colors } = useTheme();
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text.trim()) {
      onAddTodo(text);
      setText('');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <TouchableOpacity
        style={[styles.checkbox, { borderColor: colors.border }]}
        onPress={handleSubmit}
        disabled={isLoading}
        accessibilityLabel="Add todo"
        accessibilityRole="button"
        accessibilityState={{ disabled: isLoading }}
      />
      <TextInput
        style={[styles.input, { color: colors.text }]}
        placeholder="Create a new todo..."
        placeholderTextColor={colors.placeholder}
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleSubmit}
        returnKeyType="done"
        accessibilityLabel="Todo input field"
      />
      {text.trim() && (
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => setText('')}
          accessibilityLabel="Clear input"
          accessibilityRole="button"
        >
          <Image
            source={require('../assets/images/cancel.svg')}
            style={styles.cancelIcon}
            contentFit="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    height: 48,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 18,
    fontWeight: '400',
  },
  cancelButton: {
    padding: 4,
    marginLeft: 8,
  },
  cancelIcon: {
    width: 16,
    height: 16,
  },
});
