import React, {useState} from 'react';
import './lib/custom-ui/styles.css';
import Board from './components/Board/Board';
import Form from './components/Board/Form';
import {ColumnContext} from "./ColumnContext";
import './App.css';

function App() {
  const columns = ([
    { id: 1, title: 'To do', className: 'board_column col_first'},
    { id: 2, title: 'In progress', className: 'board_column col_second'},
    { id: 3, title: 'Done', className: 'board_column col_third'},
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
            <Board/>
        </ColumnProvider>
      </>
  );
}

export default App;
