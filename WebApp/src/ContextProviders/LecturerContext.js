import { React,createContext, useState, useContext } from 'react';

const LecturerContext = createContext();

export const useLecturer = () => {
  return useContext(LecturerContext);
};

export const LecturerProvider = ({ children }) => {
  const [lecturer, setLecturer] = useState(null);

 /* const updateLecturer = (newLecturer) => {
    setLecturer(newLecturer);
  };*/

  return (
    <LecturerContext.Provider value={{ lecturer, setLecturer }}>
      {children}
    </LecturerContext.Provider>
  );
};
