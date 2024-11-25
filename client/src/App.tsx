//App.tsx
import React, { useEffect } from 'react';
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
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Switch
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const App: React.FC = () => {
  const {
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
    fetchTodos,
  } = useTodoApp();

  // 컴포넌트 마운트시와 필터 변경시 todos 가져오기
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos, filters]);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Todo List
          </Typography>

          {/* 필터 컨트롤 */}
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={filters.showCompleted}
                    onChange={(e) => setFilters({...filters, showCompleted: e.target.checked})}
                  />
                }
                label="Show Completed"
              />
              <FormControl fullWidth size="small">
                <InputLabel>Priority Filter</InputLabel>
                <Select
                  value={filters.priority}
                  label="Priority Filter"
                  onChange={(e) => setFilters({...filters, priority: e.target.value})}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="HIGH">High</MenuItem>
                  <MenuItem value="MEDIUM">Medium</MenuItem>
                  <MenuItem value="LOW">Low</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Paper>

          {/* 새 Todo 입력 폼 */}
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            <form onSubmit={addTodo}>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="Add new todo"
                />
                <FormControl sx={{ minWidth: 120 }} size="small">
                  <InputLabel>Priority</InputLabel>
                  <Select
                    value={newTodoPriority}
                    label="Priority"
                    onChange={(e) => setNewTodoPriority(e.target.value as 'HIGH' | 'MEDIUM' | 'LOW')}
                  >
                    <MenuItem value="HIGH">High</MenuItem>
                    <MenuItem value="MEDIUM">Medium</MenuItem>
                    <MenuItem value="LOW">Low</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Add Todo
              </Button>
            </form>
          </Paper>

          {/* Todo 리스트 */}
          <List>
            {todos.map((todo) => (
              <ListItem 
                key={todo.id} 
                sx={{ 
                  mb: 1,
                  bgcolor: 'background.paper',
                  borderLeft: 6,
                  borderColor: todo.priority === 'HIGH' 
                    ? 'error.main' 
                    : todo.priority === 'MEDIUM' 
                    ? 'warning.main' 
                    : 'success.main'
                }}
              >
                <Checkbox
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id, todo.completed)}
                />
                {editingId === todo.id ? (
                  <TextField
                    fullWidth
                    size="small"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={saveEdit}
                    onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                  />
                ) : (
                  <ListItemText 
                    primary={todo.title}
                    sx={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                  />
                )}
                <ListItemSecondaryAction>
                  <FormControl size="small" sx={{ mr: 1, minWidth: 100 }}>
                    <Select
                      value={todo.priority}
                      onChange={(e) => updatePriority(todo.id, e.target.value as 'HIGH' | 'MEDIUM' | 'LOW')}
                    >
                      <MenuItem value="HIGH">High</MenuItem>
                      <MenuItem value="MEDIUM">Medium</MenuItem>
                      <MenuItem value="LOW">Low</MenuItem>
                    </Select>
                  </FormControl>
                  <IconButton 
                    edge="end" 
                    onClick={() => startEdit(todo.id, todo.title)}
                    sx={{ mr: 1 }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" onClick={() => deleteTodo(todo.id)}>
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