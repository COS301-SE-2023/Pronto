import {React, createContext, useState, useContext } from 'react';

const LecturerListContext = createContext();

export const useLecturerList = () => {
  return useContext(LecturerListContext);
};

export const LecturerListProvider = ({ children }) => {
  const [lecturerList, setLecturerList] = useState([]);
  const [nextToken,setNextToken] = useState(null);

  /*const updateLecturerList = (newLecturerList) => {
    setLecturerList(newLecturerList);
  };*/

  return (
    <LecturerListContext.Provider value={{ lecturerList, setLecturerList, nextToken,setNextToken }}>
      {children}
    </LecturerListContext.Provider>
  );
};
