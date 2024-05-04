import { createContext, useContext, useState } from 'react';

const initialState = {
  priorities: [],
  getPriorities: () => {}
};

const PriorityContext = createContext(initialState);

export const PriorityProvider = ({ children }) => {
  const [priorities, setPriorities] = useState([]);

  const getPriorities = async () => {
    const response = await fetch('http://localhost:8000/priority', {
      method: 'GET'
    });
    const jsonResponse = await response.json();
    setPriorities(jsonResponse);
    return response.status === 200;
  };

  return (
    <PriorityContext.Provider value={{ priorities, getPriorities }}>
      {children}
    </PriorityContext.Provider>
  );
};

export const usePriorities = () => {
  return useContext(PriorityContext);
};
