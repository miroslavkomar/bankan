import { createContext, useContext, useState } from 'react';

const initialState = {
  tasks: [],
  getTasks: () => {}
};

const TaskContext = createContext(initialState);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const getTasks = async (dueDateFrom, dueDateTo) => {
    const searchParams = {};
    dueDateFrom && (searchParams.dueDateFrom = dueDateFrom);
    dueDateTo && (searchParams.dueDateTo = dueDateTo);

    const response = await fetch(
      'http://localhost:8000/task?' +
        new URLSearchParams(searchParams).toString(),
      {
        method: 'GET'
      }
    );
    const jsonResponse = await response.json();
    setTasks(jsonResponse);
    return response.status === 200;
  };

  return (
    <TaskContext.Provider value={{ tasks, getTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  return useContext(TaskContext);
};
