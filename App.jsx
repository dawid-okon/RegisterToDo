// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormularzRejestracji from './FormularzRejestracji';
import TodoApp from './todo';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<FormularzRejestracji />} />
      <Route path="/todo" element={<TodoApp />} />
      <Route path="/form" element={<FormularzRejestracji />} />
    </Routes>
  </Router>
);

export default App;
