//useTodoApp.tsx
import { useState } from 'react';

interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

const API_BASE_URL = 'http://localhost:8080/api';

const useTodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  // CREATE
  const addTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTodo.trim() !== '') {
      try {
        const response = await fetch(`${API_BASE_URL}/todos`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: newTodo,
            description: '',
            completed: false,
          }),
        });
        const data = await response.json();
        setTodos([...todos, data]);
        setNewTodo('');
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  // DELETE
  const deleteTodo = async (id: number) => {
    try {
      await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'DELETE',
      });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // UPDATE completion status
  const toggleComplete = async (id: number, completed: boolean) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (!todo) return;

      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...todo,
          completed: !completed,
        }),
      });
      const updatedTodo = await response.json();
      setTodos(todos.map((todo) => 
        todo.id === id ? { ...todo, completed: !completed } : todo
      ));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  // Start editing
  const startEdit = (id: number, title: string) => {
    setEditingId(id);
    setEditText(title);
  };

  // Save edit
  const saveEdit = async () => {
    if (editingId === null) return;

    try {
      const todo = todos.find(t => t.id === editingId);
      if (!todo) return;

      const response = await fetch(`${API_BASE_URL}/todos/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...todo,
          title: editText,
        }),
      });
      const updatedTodo = await response.json();
      setTodos(todos.map((todo) => 
        todo.id === editingId ? { ...todo, title: editText } : todo
      ));
      setEditingId(null);
      setEditText('');
    } catch (error) {
      console.error('Error saving todo:', error);
    }
  };

  return {
    todos,
    newTodo,
    editingId,
    editText,
    setNewTodo,
    setEditText,
    addTodo,
    deleteTodo,
    toggleComplete,
    startEdit,
    saveEdit,
    setEditingId,
    setTodos,
  };
};

export { useTodoApp };
export type { Todo };