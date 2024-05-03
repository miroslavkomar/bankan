import React, { useEffect, useState } from 'react';
import './lib/custom-ui/styles.css';
import Board from './components/Board/Board';
import Form from './components/Board/Form';
import './App.css';
import { TaskProvider } from './contexts/TaskContext';

function App() {
  return (
    <TaskProvider>
      <Form />
      <Board />
    </TaskProvider>
  );
}

export default App;
