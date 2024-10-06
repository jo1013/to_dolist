//App.tsx
import React from 'react';
import { useTodoApp } from './useTodoApp';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction, 
  IconButton, 
  Checkbox,
  Paper,
  Box
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const API_BASE_URL = 'http://localhost:8080/api';

const App: React.FC = () => {
  const {
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
  } = useTodoApp();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`${API_BASE_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newTodo, completed: false }),
    })
      .then(response => response.json())
      .then(data => {
        addTodo(e);
      })
      .catch(error => console.error('Error adding todo:', error));
  };

  const handleDelete = (id: number) => {
    fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        deleteTodo(id);
      })
      .catch(error => console.error('Error deleting todo:', error));
  };

  const handleToggleComplete = (id: number, completed: boolean) => {
    fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: !completed }),
    })
      .then(() => {
        toggleComplete(id, completed);
      })
      .catch(error => console.error('Error updating todo:', error));
  };

  React.useEffect(() => {
    fetch(`${API_BASE_URL}/todos`)
      .then(response => response.json())
      .then(data => setTodos(data))
      .catch(error => console.error('Error fetching todos:', error));
  }, [setTodos]);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Todo List
          </Typography>
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                variant="outlined"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add new todo"
                sx={{ mb: 2 }}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Add Todo
              </Button>
            </form>
          </Paper>
          <List>
            {todos.map((todo) => (
              <ListItem key={todo.id} sx={{ mb: 1 }}>
                <Checkbox
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo.id, todo.completed)}
                />
                {editingId === todo.id ? (
                  <TextField
                    fullWidth
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={saveEdit}
                  />
                ) : (
                  <ListItemText primary={todo.title} />
                )}
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => startEdit(todo.id, todo.title)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" onClick={() => handleDelete(todo.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;