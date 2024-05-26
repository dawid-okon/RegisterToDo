import React, { useState, useEffect } from 'react';
import { Typography, Container, TextField, Button, Grid, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { Delete, Check } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function TodoApp() {
  const [taskList, setTaskList] = useState([]);
  const [newTaskText, setNewTaskText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if (storedUserData && storedUserData.tasks) {
      setTaskList(storedUserData.tasks);
    }
  }, []);

  const saveTasksToLocalStorage = (tasks) => {
    const storedUserData = JSON.parse(localStorage.getItem('userData')) || {};
    const updatedUserData = { ...storedUserData, tasks };
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
  };

  const handleAddTask = () => {
    if (newTaskText.trim() !== '') {
      const newTask = { id: Date.now(), text: newTaskText, done: false };
      setTaskList([...taskList, newTask]);
      saveTasksToLocalStorage([...taskList, newTask]);
      setNewTaskText('');
    }
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = taskList.filter(task => task.id !== taskId);
    setTaskList(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const handleToggleDone = (taskId) => {
    const updatedTasks = taskList.map(task =>
      task.id === taskId ? { ...task, done: !task.done } : task
    );
    setTaskList(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const handleLogout = () => {
    navigate('/form');
  };

  const activeTasksCount = taskList.filter(task => !task.done).length;
  const doneTasksCount = taskList.filter(task => task.done).length;

  return (
    <Container maxWidth="md">
      <Typography variant="h3" gutterBottom>
        Lista zadań do wykonania
      </Typography>
      <Typography variant="subtitle1">
        Aktywne zadania: {activeTasksCount}
      </Typography>
      <Typography variant="subtitle1">
        Zadania wykonane: {doneTasksCount}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Dodaj nowe zadanie"
            variant="outlined"
            fullWidth
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
          />
          <Button onClick={handleAddTask} variant="contained" color="success">
            Dodaj zadanie
          </Button>
          <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
          <Button onClick={handleLogout} variant="contained" color="error">
            Wyloguj
          </Button>
          </div>
        </Grid>
        <Grid item xs={12}>
          <List>
            {taskList.map(task => (
              <ListItem key={task.id} button onClick={() => handleToggleDone(task.id)} style={{ color: task.done ? 'green' : 'initial', textDecoration: task.done ? 'line-through' : 'initial' }}>
                <ListItemText primary={task.text} />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => handleDeleteTask(task.id)}>
                    <Delete />
                  </IconButton>
                  <IconButton onClick={() => handleToggleDone(task.id)}>
                    <Check />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
}

export default TodoApp;
