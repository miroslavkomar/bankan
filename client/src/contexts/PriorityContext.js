import { createContext, useContext, useEffect, useState } from 'react';

const initialState = {
  priorities: [],
  getPriorities: () => {}
};

const PriorityContext = createContext(initialState);

export const PriorityProvider = ({ children }) => {
  const [priorities, setPriorities] = useState([]);

  useEffect(() => {
    getPriorities();
  }, []);

  const getPriorities = async () => {
    const response = await fetch('http://localhost:8000/priority', {
      method: 'GET'
    });
    const jsonResponse = await response.json();
    if (response.status < 400) {
      setPriorities(jsonResponse);
    } else {
      throw new Error(JSON.stringify(jsonResponse, null, 2));
    }
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
