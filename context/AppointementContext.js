// src/context/state.js
import { createContext, useContext } from 'react';
import { useState, useEffect } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {

    
    const [temporary_appointment, setTemporary_appointment] = useState({});

    const setUserTemporary = (data) => {
        localStorage.setItem("temporary_appointment", JSON.stringify(data));
        setTemporary_appointment(data);
    }

    useEffect(() => {
    let existingtemporary_appointment = localStorage.getItem("temporary_appointment");

    existingtemporary_appointment = (existingtemporary_appointment != "undefined") ? JSON.parse(existingtemporary_appointment) : {};

    setTemporary_appointment(existingtemporary_appointment);
        return () => {
            
        }
    }, [])
 
      
  return (
    <AppContext.Provider value={{ temporary_appointment, setUserTemporary }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
