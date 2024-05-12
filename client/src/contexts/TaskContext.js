import { createContext, useContext, useEffect, useState } from 'react';

const initialState = {
  tasks: [],
  tasksDueDate: {},
  setTasksDueDate: () => {},
  getTasks: () => {}
};

const TaskContext = createContext(initialState);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [tasksDueDate, setDueDate] = useState({});

  const setTasksDueDate = (dueDate) => {
    setDueDate((prevDueDate) => ({ ...prevDueDate, ...dueDate }));
  };

  useEffect(() => {
    getTasks();
  }, [tasksDueDate]);

  const getTasks = async () => {
    const response = await fetch(
      'http://localhost:8000/task?' +
        new URLSearchParams(tasksDueDate).toString(),
      {
        method: 'GET'
      }
    );
    const jsonResponse = await response.json();
    if (response.status < 400) {
      setTasks(jsonResponse);
    } else {
      throw new Error(JSON.stringify(jsonResponse, null, 2));
    }
  };

  return (
    <TaskContext.Provider
      value={{ tasks, tasksDueDate, setTasksDueDate, getTasks }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  return useContext(TaskContext);
};
