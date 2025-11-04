import { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';

export interface Todo {
  _id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  order: number;
}

export type FilterType = 'all' | 'active' | 'completed';

export const useTodos = () => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const todosQuery = useQuery(api.todos.getTodos);
  const todos: Todo[] = todosQuery || [];
  const addTodoMutation = useMutation(api.todos.addTodo);
  const toggleTodoMutation = useMutation(api.todos.toggleTodo);
  const editTodoMutation = useMutation(api.todos.editTodo);
  const deleteTodoMutation = useMutation(api.todos.deleteTodo);
  const clearCompletedMutation = useMutation(api.todos.clearCompleted);
  const reorderTodosMutation = useMutation(api.todos.reorderTodos);

  // Input validation
  const validateTodoText = (text: string): string | null => {
    const trimmed = text.trim();
    if (!trimmed) return 'Todo text cannot be empty';
    if (trimmed.length > 200) return 'Todo text must be less than 200 characters';
    return null;
  };

  const addTodo = async (text: string) => {
    const validationError = validateTodoText(text);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await addTodoMutation({ text: text.trim() });
    } catch (err) {
      setError('Failed to add todo. Please try again.');
      console.error('Add todo error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTodo = async (id: string) => {
    if (!id) {
      setError('Invalid todo ID');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await toggleTodoMutation({ id: id as any });
    } catch (err) {
      setError('Failed to update todo. Please try again.');
      console.error('Toggle todo error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const editTodo = async (id: string, newText: string) => {
    const validationError = validateTodoText(newText);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!id) {
      setError('Invalid todo ID');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await editTodoMutation({ id: id as any, text: newText.trim() });
    } catch (err) {
      setError('Failed to edit todo. Please try again.');
      console.error('Edit todo error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTodo = async (id: string) => {
    if (!id) {
      setError('Invalid todo ID');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await deleteTodoMutation({ id: id as any });
    } catch (err) {
      setError('Failed to delete todo. Please try again.');
      console.error('Delete todo error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearCompleted = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await clearCompletedMutation({});
    } catch (err) {
      setError('Failed to clear completed todos. Please try again.');
      console.error('Clear completed error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const reorderTodos = async (fromIndex: number, toIndex: number) => {
    if (fromIndex < 0 || toIndex < 0 || fromIndex >= todos.length || toIndex >= todos.length) {
      setError('Invalid reorder indices');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await reorderTodosMutation({ fromIndex, toIndex });
    } catch (err) {
      setError('Failed to reorder todos. Please try again.');
      console.error('Reorder todos error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const filteredTodos = todos.filter((todo: Todo) => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const activeCount = todos.filter((todo: Todo) => !todo.completed).length;

  return {
    todos: filteredTodos,
    allTodos: todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    editTodo,
    deleteTodo,
    clearCompleted,
    reorderTodos,
    activeCount,
    error,
    isLoading,
  };
};