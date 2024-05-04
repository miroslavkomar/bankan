import React, { useEffect, useState } from 'react';
import './lib/custom-ui/styles.css';
import Board from './components/Board/Board';
import Form from './components/Board/Form';
import './App.css';
import { TaskProvider } from './contexts/TaskContext';
import { PriorityProvider } from './contexts/PriorityContext';
import { TaskStateProvider } from './contexts/TaskStateContext';

function App() {
  return (
    <TaskProvider>
      <PriorityProvider>
        <TaskStateProvider>
          <Form />
          <Board />
        </TaskStateProvider>
      </PriorityProvider>
    </TaskProvider>
  );
}

export default App;
