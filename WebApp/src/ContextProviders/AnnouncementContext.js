import {React, createContext, useState, useContext } from 'react';

const AnnouncementContext = createContext();

export const useAnnouncement = () => {
  return useContext(AnnouncementContext);
};

export const AnnouncementProvider = ({ children }) => {
  const [announcement, setAnnouncement] = useState([]);
  const [nextToken,setNextToken] =useState(null);
  const updateAnnouncement = (newAnnouncement) => {
    setAnnouncement(newAnnouncement);
  };

  return (
    <AnnouncementContext.Provider value={{ announcement,setAnnouncement,nextToken,setNextToken }}>
      {children}
    </AnnouncementContext.Provider>
  );
};