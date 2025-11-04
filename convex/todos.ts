import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTodos = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("todos").order("asc").collect();
  },
});

export const addTodo = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    const existingTodos = await ctx.db.query("todos").collect();
    const maxOrder = existingTodos.length > 0 ? Math.max(...existingTodos.map(t => t.order)) : 0;
    const todoId = await ctx.db.insert("todos", {
      text: args.text,
      completed: false,
      createdAt: Date.now(),
      order: maxOrder + 1,
    });
    return todoId;
  },
});

export const toggleTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) return;
    await ctx.db.patch(args.id, { completed: !todo.completed });
  },
});

export const editTodo = mutation({
  args: { id: v.id("todos"), text: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { text: args.text });
  },
});

export const deleteTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const clearCompleted = mutation({
  args: {},
  handler: async (ctx) => {
    const todos = await ctx.db.query("todos").collect();
    const completedTodos = todos.filter((todo) => todo.completed);
    await Promise.all(completedTodos.map((todo) => ctx.db.delete(todo._id)));
  },
});

export const reorderTodos = mutation({
  args: { fromIndex: v.number(), toIndex: v.number() },
  handler: async (ctx, args) => {
    const todos = await ctx.db.query("todos").order("asc").collect();

    if (args.fromIndex < 0 || args.fromIndex >= todos.length ||
        args.toIndex < 0 || args.toIndex >= todos.length) {
      return;
    }

    const reorderedTodos = [...todos];
    const [movedTodo] = reorderedTodos.splice(args.fromIndex, 1);
    reorderedTodos.splice(args.toIndex, 0, movedTodo);

    // Update order for all todos
    await Promise.all(
      reorderedTodos.map((todo, index) =>
        ctx.db.patch(todo._id, { order: index + 1 })
      )
    );
  },
});

export const seedTodos = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if todos already exist
    const existingTodos = await ctx.db.query("todos").collect();
    if (existingTodos.length > 0) {
      return; // Don't seed if todos already exist
    }

    const sampleTodos = [
      "Complete online JavaScript course",
      "Jog around the park 3x",
      "10 minutes meditation",
      "Read for 1 hour",
      "Pick up groceries",
      "Complete Todo App on Frontend Mentor",
      "Buy coffee beans",
      "Call mom",
      "Finish project proposal",
      "Clean the house",
    ];

    // Add sample todos with order
    await Promise.all(
      sampleTodos.map((text, index) =>
        ctx.db.insert("todos", {
          text,
          completed: index === 0, // First one is completed
          createdAt: Date.now() - (sampleTodos.length - index) * 3600000, // Stagger creation times
          order: index + 1,
        })
      )
    );
  },
});