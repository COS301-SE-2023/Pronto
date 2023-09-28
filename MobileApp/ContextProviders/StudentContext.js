import {React, createContext, useState, useContext } from 'react';

const StudentContext = createContext();

export const useStudent = () => {
  return useContext(StudentContext);
};

export const StudentProvider = ({ children }) => {
  const [student, setStudent] = useState(null);
  
  const updateStudent = async (newStudent) => {
    setStudent(newStudent);
  };

  return (
    <StudentContext.Provider value={{ student,updateStudent}}>
      {children}
    </StudentContext.Provider>
  );
};