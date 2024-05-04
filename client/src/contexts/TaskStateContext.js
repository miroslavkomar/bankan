import { createContext, useContext, useState } from 'react';

const initialState = {
  taskStates: [],
  getTaskStates: () => {}
};

const TaskStateContext = createContext(initialState);

export const TaskStateProvider = ({ children }) => {
  const [taskStates, setTaskStates] = useState([]);

  const getTaskStates = async () => {
    const response = await fetch('http://localhost:8000/state', {
      method: 'GET'
    });
    const jsonResponse = await response.json();
    setTaskStates(jsonResponse);
    return response.status === 200;
  };

  return (
    <TaskStateContext.Provider value={{ taskStates, getTaskStates }}>
      {children}
    </TaskStateContext.Provider>
  );
};

export const useTaskStates = () => {
  return useContext(TaskStateContext);
};
