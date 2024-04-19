import React, {useState} from 'react';
import './App.css';
import './styles.module.css';
import Board from './components/Board/Board';
import Form from './components/Board/Form';

import {ColumnContext} from "./ColumnContext";

function App() {
  const columns = ([
    { id: 1, title: 'To do', className: 'column col_first'},
    { id: 2, title: 'In progress', className: 'column col_second'},
    { id: 3, title: 'Done', className: 'column col_third'},
  ])

  const tasksInMemory = JSON.parse(localStorage.getItem('task')) || [];
  const [tasks] = useState(tasksInMemory)

  const getNewTask = (newTask) => {
    const toDoTasks = [...tasks].filter((task) => task.columnId === 1).length
  }

  const {Provider: ColumnProvider} = ColumnContext;
  return (
      <>
        <Form getNewTask={getNewTask}/>
        <ColumnProvider value={{columns}}>
            <Board isCardModalOpened={true}/>
        </ColumnProvider>
      </>
  );
}

export default App;
