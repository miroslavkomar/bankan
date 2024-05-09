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
    if (response.status < 400) {
      setTaskStates(jsonResponse);
    } else {
      throw new Error(JSON.stringify(jsonResponse, null, 2));
    }
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
