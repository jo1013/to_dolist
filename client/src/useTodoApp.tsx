//useTodoApp.tsx
import { useState, useCallback } from 'react';

// interface Todo {
//   id: number;
//   title: string;
//   description?: string;
//   completed: boolean;
// }
interface Todo {
  id: number;
  title: string;
  description?: string;  
  completed: boolean;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
 }

interface TodoFilters {
  showCompleted: boolean;
  priority: string;
 }
 


// const API_BASE_URL = 'http://localhost:8080/api';
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';
const API_BASE_URL = `${API_URL}/api`;

const useTodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [filters, setFilters] = useState<TodoFilters>({
    showCompleted: true,
    priority: ''
  });
  const [newTodoPriority, setNewTodoPriority] = useState<Todo['priority']>('MEDIUM');
 // Fetch todos with filters

const fetchTodos = useCallback(async () => {
  try {
      const params = new URLSearchParams();
      
      if (!filters.showCompleted) {
          params.append('completed', 'false');
      }
      if (filters.priority) {
          params.append('priority', filters.priority);
      }

      const response = await fetch(`${API_BASE_URL}/todos${params.toString() ? `?${params.toString()}` : ''}`);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTodos(data);
  } catch (error) {
      console.error('Error fetching todos:', error);
  }
}, [filters, API_BASE_URL]);


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
          priority: newTodoPriority
        }),
      });
      const data = await response.json();
      
      // 현재 필터 조건과 새로 추가된 todo가 일치하는지 확인
      const matchesFilter = (
        filters.showCompleted || !data.completed
      ) && (
        !filters.priority || data.priority === filters.priority
      );

      // 필터 조건과 일치하면 목록에 추가, 아니면 fetchTodos 호출
      if (matchesFilter) {
        setTodos([...todos, data]);
      } else {
        await fetchTodos();
      }
      
      setNewTodo('');
      setNewTodoPriority('MEDIUM');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }
};
  // DELETE
  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setTodos(todos.filter((todo) => todo.id !== id));
      } else {
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // UPDATE completion status
  // const toggleComplete = async (id: number, completed: boolean) => {
  //   try {
  //     const todo = todos.find(t => t.id === id);
  //     if (!todo) return;

  //     const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         ...todo,
  //         completed: !completed,
  //       }),
  //     });
  //     const updatedTodo = await response.json();
  //     setTodos(todos.map((todo) => 
  //       todo.id === id ? { ...todo, completed: !completed } : todo
  //     ));
  //   } catch (error) {
  //     console.error('Error updating todo:', error);
  //   }
  // };

  const updatePriority = async (id: number, priority: Todo['priority']) => {
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
          priority,
        }),
      });
      if (response.ok) {
        const updatedTodo = await response.json();
        setTodos(todos.map((todo) => 
          todo.id === id ? updatedTodo : todo
        ));
      } else {
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      console.error('Error updating priority:', error);
    }
  };


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
      if (response.ok) {
        const updatedTodo = await response.json();
        setTodos(todos.map((todo) => 
          todo.id === id ? updatedTodo : todo
        ));
      } else {
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  // Start editing
//   const startEdit = (id: number, title: string) => {
//     setEditingId(id);
//     setEditText(title);
//   };

//   // Save edit
//   const saveEdit = async () => {
//     if (editingId === null) return;

//     try {
//       const todo = todos.find(t => t.id === editingId);
//       if (!todo) return;

//       const response = await fetch(`${API_BASE_URL}/todos/${editingId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ...todo,
//           title: editText,
//         }),
//       });
//       const updatedTodo = await response.json();
//       setTodos(todos.map((todo) => 
//         todo.id === editingId ? { ...todo, title: editText } : todo
//       ));
//       setEditingId(null);
//       setEditText('');
//     } catch (error) {
//       console.error('Error saving todo:', error);
//     }
//   };

//   return {
//     todos,
//     newTodo,
//     editingId,
//     editText,
//     setNewTodo,
//     setEditText,
//     addTodo,
//     deleteTodo,
//     toggleComplete,
//     startEdit,
//     saveEdit,
//     setEditingId,
//     setTodos,
//   };
// };

// export { useTodoApp };
// export type { Todo };

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
    if (response.ok) {
      const updatedTodo = await response.json();
      setTodos(todos.map((todo) => 
        todo.id === editingId ? updatedTodo : todo
      ));
      setEditingId(null);
      setEditText('');
    } else {
      const error = await response.json();
      throw new Error(error.message);
    }
  } catch (error) {
    console.error('Error saving todo:', error);
  }
};

return {
  todos,
  newTodo,
  editingId,
  editText,
  filters,
  newTodoPriority,
  setNewTodo,
  setEditText,
  setFilters,
  setNewTodoPriority,
  addTodo,
  deleteTodo,
  toggleComplete,
  updatePriority,
  startEdit,
  saveEdit,
  setEditingId,
  fetchTodos,
  setTodos,
};
};

export { useTodoApp };
export type { Todo, TodoFilters };