import {React, createContext, useState, useContext } from 'react';

const StudentContext = createContext();

export const useStudent = () => {
  return useContext(StudentContext);
};

export const StudentProvider = ({ children }) => {
  const [student, setStudent] = useState(null);
  const updateStudent = (newStudent) => {
    if(newStudent.timetable==-null){
      newStudent.timetable={
        activities:[],
        activityId:[]
      };
    }
    else{
      let activities=[];
      let courses=[];
      for (let i = 0; i < newStudent.enrollments.items.length; i++) {
        courses.push(newStudent.enrollments.items[i].course)
      }

      for (let i = 0; i < newStudent.timetable.activityId.length; i++) {
        for (let j = 0; j < courses.length; j++) {
          let index = courses[j].activity.items.find(item => item.id === newStudent.timetable.activityId[i])
          if (index !== undefined) {
            activities.push(index)
            break;
          }
        }
      }
      activities = activities.sort((a, b) => {
                      if (a.start <= b.start)
                        return -1;
                      else
                        return 1;
                    })
      newStudent.timetable.activities=activities;              
  }
    setStudent(newStudent);
  };

  return (
    <StudentContext.Provider value={{ student,updateStudent}}>
      {children}
    </StudentContext.Provider>
  );
};