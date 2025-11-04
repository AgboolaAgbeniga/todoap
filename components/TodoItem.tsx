import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { Todo } from '../hooks/useTodos';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onDelete: (id: string) => void;
  drag?: () => void;
  isActive?: boolean;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onEdit, onDelete, drag, isActive }) => {
  const { colors } = useTheme();

  const containerStyle = {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 5,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    height: 52,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.surface,
    opacity: isActive ? 0.8 : 1,
    transform: [{ scale: isActive ? 1.02 : 1 }],
  };
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEditSubmit = () => {
    if (editText.trim() && editText !== todo.text) {
      onEdit(todo._id, editText);
    }
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  return (
    <TouchableOpacity
      style={containerStyle}
      onLongPress={drag}
      delayLongPress={500}
      activeOpacity={0.7}
    >
      <TouchableOpacity
        style={[
          styles.checkbox,
          { borderColor: colors.primary },
          todo.completed && { backgroundColor: colors.primary },
        ]}
        onPress={() => onToggle(todo._id)}
        accessibilityLabel={todo.completed ? "Mark as incomplete" : "Mark as complete"}
        accessibilityRole="button"
      >
        {todo.completed && (
          <Text style={styles.checkmark}>✓</Text>
        )}
      </TouchableOpacity>

      {isEditing ? (
        <TextInput
          style={[styles.input, { color: colors.text }]}
          value={editText}
          onChangeText={setEditText}
          onSubmitEditing={handleEditSubmit}
          onBlur={handleEditCancel}
          autoFocus
          returnKeyType="done"
          accessibilityLabel="Edit todo text"
        />
      ) : (
        <TouchableOpacity
          style={styles.textContainer}
          onPress={() => setIsEditing(true)}
          accessibilityLabel="Edit todo"
          accessibilityRole="button"
        >
          <Text
            style={[
              styles.text,
              { color: todo.completed ? colors.completed : colors.text },
              todo.completed && styles.completedText,
            ]}
          >
            {todo.text}
          </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(todo._id)}
        accessibilityLabel="Delete todo"
        accessibilityRole="button"
      >
        <Text style={[styles.deleteIcon, { color: colors.textSecondary }]}>✕</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 5,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    height: 52,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    fontWeight: '400',
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
  input: {
    flex: 1,
    fontSize: 18,
    fontWeight: '400',
    borderBottomWidth: 1,
    borderBottomColor: '#3a7bfd',
    paddingVertical: 4,
  },
  deleteButton: {
    padding: 4,
  },
  deleteIcon: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
