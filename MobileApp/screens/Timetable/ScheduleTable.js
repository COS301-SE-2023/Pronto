import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Dimensions, Alert } from "react-native";
import { Agenda } from "react-native-calendars";
import { Card } from "react-native-paper";
import { API, Auth } from 'aws-amplify'
import { listStudents } from "../../graphql/queries"
import { createStudent } from "../../graphql/mutations";

const ScheduleTable = () => {

  // const[student,setStudent]=useState(null)
  const [activities, setActivities] = useState([])
  const [schedule, setSchedule] = useState(null)
  var scheduleArray = {}

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

  let error = "There seem to be network problems. Try again later";

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

      //Student does not exist so create them
      if (stu.data.listStudents.items.length === 0) {
        let domain = studentEmail.split("@")[1]

        //Find Institution via domain
        let institution = await API.graphql({
          query: listInstitutions,
          variables: {
            filter: {
              domains: {
                contains: domain
              }
            }
          },
          authMode: "API_KEY",
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
        stu = stu.data.listStudents.items[0]
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

          if (changed) {
            //setStudent(stu)
            setActivities(act)
            createScheduleArray(act)
          }
        }
        console.log(act)
      }
    } catch (e) {
      console.log("From fetch activivties")
      console.log(e)
      Alert.alert(error)
    }
  }


  useEffect(() => {
    fetchActivities()
  }, [])

  fetchActivities()

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
