import React from 'react';
import './lib/custom-ui/styles.css';
import Board from './components/Board/Board';
import Form from './components/Board/Form';
import './App.css';
import { TaskProvider } from './contexts/TaskContext';
import { PriorityProvider } from './contexts/PriorityContext';
import { TaskStateProvider } from './contexts/TaskStateContext';
import { DueDateProvider } from './contexts/DueDateContext';

function App() {
  return (
    <TaskProvider>
      <PriorityProvider>
        <TaskStateProvider>
          <DueDateProvider>
            <Form />
            <Board />
          </DueDateProvider>
        </TaskStateProvider>
      </PriorityProvider>
    </TaskProvider>
  );
}

export default App;
