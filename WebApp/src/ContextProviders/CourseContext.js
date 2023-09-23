import {React, createContext, useState, useContext } from 'react';

const CourseContext = createContext();

export const useCourse = () => {
  return useContext(CourseContext);
};

export const CourseProvider = ({ children }) => {
  const [course, setCourse] = useState([]);

  return (
    <CourseContext.Provider value={{ course,setCourse }}>
      {children}
    </CourseContext.Provider>
  );
};