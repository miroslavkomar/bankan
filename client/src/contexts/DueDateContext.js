import { createContext, useContext, useState } from 'react';

const initialState = {
  dueDate: {},
  setDueDate: () => {},
  getDueDate: () => {}
};

const DueDateContext = createContext(initialState);

export const DueDateProvider = ({ children }) => {
  const [dueDate, setDate] = useState({});

  const setDueDate = (dueDate) => {
    setDate(dueDate);
  };

  const getDueDate = () => {
    return dueDate;
  };

  return (
    <DueDateContext.Provider value={{ dueDate, setDueDate, getDueDate }}>
      {children}
    </DueDateContext.Provider>
  );
};

export const useDueDate = () => {
  return useContext(DueDateContext);
};
