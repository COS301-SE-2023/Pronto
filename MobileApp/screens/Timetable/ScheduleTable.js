import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Dimensions, StyleSheet, Image } from "react-native";
import { Agenda } from "react-native-calendars";
import { Card } from "react-native-paper";
import { API, Auth,DataStore } from 'aws-amplify'
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import downloadIcon from '../../assets/icons/downloadicon.png';
import { getStudent } from "../../graphql/queries"
import { useStudent } from "../../ContextProviders/StudentContext";
import { Student } from "../../models";
import '@azure/core-asynciterator-polyfill';



const ScheduleTable = ({ navigation, route }) => {
  const [activities, setActivities] = useState([]);
  const [schedule, setSchedule] = useState(null);
  const { student, updateStudent } = useStudent();
  const [timetableLoaded, setTimetableLoaded] = useState(false);
  const [agendaKey, setAgendaKey] = useState(0);

  let param = route.params;
  var scheduleArray = {}

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        timetableLoaded && (
          <TouchableOpacity onPress={generatePdf} style={styles.downloadIcon}>
            <Image source={downloadIcon} style={[styles.iconImage, { tintColor: '#e32f45' }]} />
          </TouchableOpacity>
        )
      ),
    });
  }, [activities, timetableLoaded]);

  //function to take in a day, and give all dates of the year that a day occurs
  const getDatesForDayOfWeek = (dayOfWeek) => {
    const date = new Date();
    const year = date.getFullYear();
    const dayIndex = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ].indexOf(dayOfWeek);
    const results = [];
    let month = date.getMonth()
    let limit = month + 2

    // Loop through each month of the year
    for (month; month < limit; month++) {
      // Create a new date object for the first day of the month
      const firstDayOfMonth = new Date(year, month, 1);

      // Find the first occurrence of the specified day of the week
      const diff = dayIndex - firstDayOfMonth.getDay();
      let dayOfMonth = diff >= 0 ? diff + 1 : diff + 8;

      // Loop through the rest of the month, adding dates for the specified day of the week
      while (dayOfMonth <= new Date(year, month + 1, 0).getDate()) {
        const dateString = `${year}-${(month + 1)
          .toString()
          .padStart(2, "0")}-${dayOfMonth.toString().padStart(2, "0")}`;
        results.push(dateString);
        dayOfMonth += 7;
      }
    }
    return results;
  }

  let error = "There appear to be network issues.Please try again later";
 const loadTimetable= async()=>{
  try {
      let stu = student;
          const user = await Auth.currentAuthenticatedUser();
          stu = await API.graphql({
            query: getStudent,
            variables: { id: user.attributes.sub }
          })
          stu = stu.data.getStudent;
      

      
      if (stu === null || stu.studentTimetableId === null) {
          return;
        }

      let act = [];
      let courses = [];

      for (let i = 0; i < stu.enrollments.items.length; i++) {
        if(stu.enrollments.items[i]._deleted===null){
            courses.push(stu.enrollments.items[i].course)
        }
       
      }
   

      //console.log(stu.timetable);
      for (let i = 0; i < stu.timetable.activityId.length; i++) {
        for (let j = 0; j < courses.length; j++) {
          try {
            let index = courses[j].activity.items.find(item => item.id === stu.timetable.activityId[i])
             
            if (index !== undefined) {
              act.push(index)
              break;
            }
          } catch (e) {

          }
        }
      }

      act = act.sort((a, b) => {
        if (a.start <= b.start)
          return -1;
        else
          return 1;
      })

      let changed = false;
      if (act.length === activities.length) {
        for (let i = 0; i < act.length; i++) {
          if (act[i].id !== activities[i].id) {
            changed = true;
            break;
          }
        }
      }
      else {
        changed = true;
      }
   
        createScheduleArray(act);
       
      


    } catch (e) {
      
     
    }
  }

  const fetchActivities = async () => {
    try {
      
     const user = await Auth.currentAuthenticatedUser();
     const id=user.attributes.sub;
    
     stu = await DataStore.query(Student, id);
    
    
    if(stu===undefined){
      await loadTimetable(); 
      return;
    }
    const enrollmentList=await stu.enrollments.values;
   
    const enrollment=enrollmentList.filter((item)=>item._deleted===null);
  
    let c=[];
    const studentTimetable= await stu.timetable;
    
    if(studentTimetable===undefined)
      return;
    const activity=studentTimetable.activityId;
    const activityList=removeDuplicates(activity);
    for(let i=0;i<enrollment.length;i++){
      const course=await enrollment[i].course;
      if(course._deleted===null){
        const activity=await course.activity.values;
        for(let j=0;j<activity.length;j++){
          let saveActivity= activity[j];
          saveActivity.course={
            coursecode:course.coursecode
          }
          if(saveActivity._deleted===null && activityList.includes(saveActivity.id)){
            c.push(saveActivity);
          }
        }
      }
    }
    let act=c;
    
    if(act.length===0){
     setActivities([]);
     createScheduleArray(act);
    }

    
     stu.enrollments=enrollment,
     stu.timetable=studentTimetable;
     updateStudent(stu);
      act = act.sort((a, b) => {
        if (a.start <= b.start)
          return -1;
        else
          return 1;
      })
      
      let changed = false;
      if (act.length === activities.length) {
        for (let i = 0; i < act.length; i++) {
          if (act[i].id !== activities[i].id) {
            changed = true;
            break;
          }
        }
      }
      else {
        changed = true;
      }
    
      createScheduleArray(act);
    
    } catch (e) {
         
    }
  }

function removeDuplicates(arr) { 
    let unique = []; 
    arr.forEach(element => { 
        if (!unique.includes(element)) { 
            unique.push(element); 
        } 
    }); 
    return unique; 
} 

useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchActivities()
    });


    return unsubscribe
  }, [navigation])

  const createScheduleArray = async (modules) => {
    scheduleArray = {};

    for (const moduleKey in modules) {
      const dates = getDatesForDayOfWeek(modules[moduleKey].day);
      dates.forEach((date) => {
        if (!scheduleArray[date]) {
          scheduleArray[date] = [];
        }
        let t = modules[moduleKey].start + "-" + modules[moduleKey].end;
        scheduleArray[date].push({
          id: modules[moduleKey].id,
          code: modules[moduleKey].course.coursecode,
          time: t,
          frequency: 1,
          venue: modules[moduleKey].venue,
          day: modules[moduleKey].day,
          height: 50,
          coordinates: modules[moduleKey].coordinates
        });
      });
    }

    // Identify and mark clashes
    Object.keys(scheduleArray).forEach((date) => {
      const modulesOnDate = scheduleArray[date];

      const timeSlots = {}; // Store modules by time slot
      const clashes = {}; // Store clashes by time slot

      modulesOnDate.forEach((module) => {
        const timeSlot = module.time;

        if (!timeSlots[timeSlot]) {
          timeSlots[timeSlot] = [];
        }

        timeSlots[timeSlot].push(module);
      });

      Object.keys(timeSlots).forEach((timeSlot) => {
        const modulesInSlot = timeSlots[timeSlot];

        if (modulesInSlot.length > 1) {
          modulesInSlot.forEach((module) => {
            if (!clashes[timeSlot]) {
              clashes[timeSlot] = [];
            }
            clashes[timeSlot].push(module.id);
          });
        }
      });

      // Mark clashes within the scheduleArray
      scheduleArray[date].forEach((module) => {
        const timeSlot = module.time;

        if (clashes[timeSlot] && clashes[timeSlot].includes(module.id)) {
          module.isClash = true;
          setAgendaKey(agendaKey + 1);  //refreshes the agenda component to display clash immediately
        } else {
          module.isClash = false;
        }
      });
    });


    setSchedule(scheduleArray);
    setTimetableLoaded(true);
  };


  const renderItem = (module) => {
    const cardStyle = module.isClash
      ? { backgroundColor: "white", borderColor: "#e32f45", borderWidth: 1, borderStyle: "dashed" } // Apply clash styling
      : { backgroundColor: "white" }; // Default styling

    const textStyle = module.isClash
      ? { fontStyle: "italic" } // Apply italic style for clashes
      : {}; // Default style

    return (
      <TouchableOpacity style={{ marginRight: 20, marginTop: 30 }}>
        <Card style={[cardStyle, { elevation: module.isClash ? 4 : 2 }]}>
          <Card.Content>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={textStyle}>{module.code}</Text>
              <Text style={textStyle}>{module.venue}</Text>
              <Text style={textStyle}>{module.time}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };



  const renderEmptyDate = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          paddingBottom: "50%",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 25,
            color: "#748c94",
          }}
        // #1E90FF
        >
          No events today
        </Text>
      </View>
    );
  };

  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();


  //functions for generating pdf


  const generatePdf = async () => {
    const pdfOptions = {
      html: html,
      base64: false,
    };

    const file = await printToFileAsync(pdfOptions);

    // Rename the file to 'ProntoTimetable.pdf'
    const renamedFileUri = `${FileSystem.cacheDirectory}ProntoTimetable.pdf`;

    await FileSystem.moveAsync({
      from: file.uri,
      to: renamedFileUri,
    });

    await shareAsync(renamedFileUri);
  };

  const generateTimetableRows = (modules) => {
    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    // Create a dictionary to store lecture data by day and time
    const timetableData = {};

    // Populate the timetableData dictionary with lecture data
    modules.forEach((module) => {
      const { day, start, end, course, venue } = module; // Include 'venue' here
      const dayIndex = daysOfWeek.indexOf(day);

      if (!timetableData[start]) {
        timetableData[start] = {};
      }

      if (!timetableData[start][dayIndex]) {
        timetableData[start][dayIndex] = [];
      }

      timetableData[start][dayIndex].push({
        courseCode: course.coursecode,
        start,
        end,
        venue, // Include 'venue' here
      });
    });

    let tableHTML = `
      <tr>
        <th></th>
    `;

    daysOfWeek.forEach((day) => {
      tableHTML += `<th>${day}</th>`;
    });

    tableHTML += `</tr>`;

    const sortedTimes = Object.keys(timetableData).sort();
    sortedTimes.forEach((timeslot) => {
      tableHTML += `
        <tr>
          <td>${timeslot}</td>
      `;

      daysOfWeek.forEach((_, dayIndex) => {
        if (timetableData[timeslot][dayIndex]) {
          const lectures = timetableData[timeslot][dayIndex];
          let cellContent = '';

          lectures.forEach((lecture) => {
            const { courseCode, start, end, venue } = lecture;
            cellContent += `<div>${courseCode}<br>${start}-${end}<br>(${venue})</div>`; // Include 'venue' here
          });

          tableHTML += `<td>${cellContent}</td>`;
        } else {
          tableHTML += `<td></td>`;
        }
      });

      tableHTML += `</tr>`;
    });

    return tableHTML;
  };




  const html = `
  <html>
    <head>
    <style>
    @import url('https://fonts.googleapis.com/css?family=Roboto');

    table {
      width: 80%;
      margin: 0 auto; /* Center the table horizontally */
      border-collapse: collapse;
      overflow: hidden; /* Hide overflowing content inside rounded edges */
      box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2); /* Add a shadow effect */
      transform: translateY(5px); /* Adjust the table's vertical position */
      font-family: 'Roboto', sans-serif; 
    }

    th, td {
      border: 1px solid black;
      padding: 8px;
      text-align: center;
    }

    th {
      background-color: #eb6d7c;
      color: black;
    }

    h1 {
      text-align: center; /* Center the heading horizontally */
    }

    /* Define CSS styles for odd and even rows */
    tr:nth-child(odd) {
      background-color: #fceaec; /* Light gray shade for odd rows */
    }

    tr:nth-child(even) {
      background-color: #ffffff; /* White background for even rows */
    }
  </style>
    </head>
    <body>
      <h1 style="font-family: 'Roboto', sans-serif;">Pronto Offline Timetable</h1>
      <table>
        ${generateTimetableRows(activities)}
      </table>
    </body>
  </html>
`;




  return (
    <View style={{ height: windowHeight, width: windowWidth }}>
      <Agenda
        key={agendaKey}
        items={schedule}
        selected={year + "-" + month + "-" + date}
        renderItem={renderItem}
        showOnlySelectedDayItems={true}
        renderEmptyData={renderEmptyDate}
        theme={{
          todayTextColor: "#e32f45", // today in calendar
          selectedDayBackgroundColor: "#e32f45", // calendar sel date
          dotColor: "#e32f45", // dots
          agendaDayTextColor: "#e32f45",
          agendaDayNumColor: "#e32f45",
          agendaTodayColor: "#e32f45",
         
        }}
      />
    </View>
  );
};

export default ScheduleTable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    alignSelf: "stretch",
    padding: 8,
    margin: 8
  },
  iconImage: {
    width: 24, // Adjust the width and height to fit your design
    height: 24,
    marginRight: 30,
  },
});
