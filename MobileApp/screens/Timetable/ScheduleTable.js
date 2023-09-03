import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Dimensions, Alert, Button, TextInput, StyleSheet } from "react-native";
import { Agenda } from "react-native-calendars";
import { Card } from "react-native-paper";
import { API, Auth } from 'aws-amplify'
import { listStudents, listInstitutions } from "../../graphql/queries"
import { createStudent } from "../../graphql/mutations";
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import Icon from 'react-native-vector-icons/FontAwesome';



const ScheduleTable = ({ navigation }) => {

  const [activities, setActivities] = useState([])
  const [schedule, setSchedule] = useState(null)

  var scheduleArray = {}

  useEffect(() => {
    // Customize the header of the page using navigation options
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={generatePdf}>
          <Icon name="download" size={24} color="grey" />
        </TouchableOpacity>
      ),
    });
  }, [activities]);

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


    // Loop through each month of the year
    for (month; month < 12; month++) {
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

  const fetchActivities = async () => {
    try {
      let user = await Auth.currentAuthenticatedUser()
      let studentEmail = user.attributes.email;

      let act = []

      let stu = await API.graphql({
        query: listStudents,
        variables: {
          filter: {
            email: {
              eq: studentEmail
            }
          }
        },
        authMode: "AMAZON_COGNITO_USER_POOLS"
      })


      let found = false
      for (let i = 0; i < stu.data.listStudents.items.length; i++) {
        if (stu.data.listStudents.items[i].owner === user.attributes.sub) {
          stu = stu.data.listStudents.items[i]
          found = true
          break
        }
      }
      // //Student does not exist so create them
      if (found === false) {
        let domain = studentEmail.split("@")[1]

        //   //Find Institution via domain
        let institution = await API.graphql({
          query: listInstitutions,
          variables: {
            filter: {
              domains: {
                contains: domain
              }
            }
          },
          authMode: "AMAZON_COGNTIO_USER_POOLS",
        })

        //Institution not found
        if (institution.data.listInstitutions.items.length === 0) {
          error = "Could not determine institution"
          throw Error()
        }

        institution = institution.data.listInstitutions.items[0]

        //Create student
        let newStudent = {
          institutionId: institution.id,
          firstname: user.attributes.name,
          lastname: user.attributes.family_name,
          userRole: "Student",
          email: studentEmail
        }

        let create = await API.graphql({
          query: createStudent,
          variables: { input: newStudent },
          authMode: "AMAZON_COGNITO_USER_POOLS"
        })
        stu = create.data.createStudent
      }

      //Student  found
      else {

        let c = []
        for (let i = 0; i < stu.enrollments.items.length; i++) {
          c.push(stu.enrollments.items[i].course)
        }
        if (stu.timetable !== null) {
          for (let i = 0; i < stu.timetable.activityId.length; i++) {
            for (let j = 0; j < c.length; j++) {
              let index = c[j].activity.items.find(item => item.id === stu.timetable.activityId[i])
              if (index !== undefined) {
                act.push(index)
                break;
              }
            }
          }
          act = act.sort((a, b) => {
            if (a.start <= b.start)
              return -1
            else
              return 1
          })

          let changed = false
          if (act.length === activities.length) {
            for (let i = 0; i < act.length; i++) {
              if (act[i].id !== activities[i].id) {
                changed = true
                break
              }
            }

          }
          else {
            changed = true
          }

          act = act.filter((value, index, self) =>
            index === self.findIndex((t) => (
              t.id === value.id
            )))
          if (changed === true) {
            setActivities(act)
            createScheduleArray(act)
          }
        }

      }

    } catch (e) {
      Alert.alert(error)
    }
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
        let t = modules[moduleKey].start + "-" + modules[moduleKey].end
        scheduleArray[date].push({
          id: modules[moduleKey].id,
          code: modules[moduleKey].course.coursecode,
          time: t,
          frequency: 1,
          venue: modules[moduleKey].venue,
          day: modules[moduleKey].day,
          height: 50,
        });

      });
    }

    setSchedule(scheduleArray)
  }

  const renderItem = (module) => {
    return (
      <TouchableOpacity style={{ marginRight: 20, marginTop: 30 }}>
        <Card style={{ backgroundColor: "white" }}>
          <Card.Content>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text>{module.code}</Text>
              <Text>{module.venue}</Text>
              <Text>{module.time}</Text>
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
          //         //further styling options if needed
          //         //  textDisabledColor: "#e32f45",
          //         //   agendaTodayColor: "#e32f45", // today in list
          //         //   monthTextColor: "#e32f45", // name in calendar
          //         //    textDefaultColor: "#e32f45",
          //         // todayBackgroundColor: "#e32f45",
          //         // selectedDayTextColor: "#e32f45", // calendar sel date
          //         //  dayTextColor: "#e32f45", // calendar day
          //         //  textSectionTitleColor: "#e32f45",
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
  }
});
