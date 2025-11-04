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

  const todos: Todo[] = useQuery(api.todos.getTodos) || [];
  const addTodoMutation = useMutation(api.todos.addTodo);
  const toggleTodoMutation = useMutation(api.todos.toggleTodo);
  const editTodoMutation = useMutation(api.todos.editTodo);
  const deleteTodoMutation = useMutation(api.todos.deleteTodo);
  const clearCompletedMutation = useMutation(api.todos.clearCompleted);
  const reorderTodosMutation = useMutation(api.todos.reorderTodos);

  const addTodo = (text: string) => {
    addTodoMutation({ text: text.trim() });
  };

  const toggleTodo = (id: string) => {
    toggleTodoMutation({ id: id as any });
  };

  const editTodo = (id: string, newText: string) => {
    editTodoMutation({ id: id as any, text: newText.trim() });
  };

  const deleteTodo = (id: string) => {
    deleteTodoMutation({ id: id as any });
  };

  const clearCompleted = () => {
    clearCompletedMutation({});
  };

  const reorderTodos = (fromIndex: number, toIndex: number) => {
    reorderTodosMutation({ fromIndex, toIndex });
  };

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
  };
};