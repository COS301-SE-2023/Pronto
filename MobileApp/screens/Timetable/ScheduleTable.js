import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Dimensions, Alert } from "react-native";
import { Agenda } from "react-native-calendars";
import { Card } from "react-native-paper";
import { API, Auth } from 'aws-amplify'
import { listStudents } from "../../graphql/queries"
import { useStudent } from "../../ContextProviders/StudentContext";


const ScheduleTable = ({ navigation }) => {


  const [activities, setActivities] = useState([]);
  const [schedule, setSchedule] = useState(null);
  const {student,updateStudent} =useStudent();
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

  let error = "There appear to be network issues.Please try again later";

  const fetchActivities = async () => {
    try {
      //console.log(student);
      if(student===null){
        console.log("fetch")
        let user = await Auth.currentAuthenticatedUser()
        let studentEmail = user.attributes.email;

        let stu = await API.graphql({
          query: listStudents,
          variables: {
            filter: {
              email: {
                eq: studentEmail
              }
            }
          },
        })

        let found = false
        for (let i = 0; i < stu.data.listStudents.items.length; i++) {
          if (stu.data.listStudents.items[i].owner === user.attributes.sub) {
            stu = stu.data.listStudents.items[i]
            found = true
            break
          }
        }
        if(found===false){
          throw Error();
        }
       
        let act=[];
        let courses=[];
        for (let i = 0; i < stu.enrollments.items.length; i++) {
         courses.push(stu.enrollments.items[i].course)
       }

      for (let i = 0; i < stu.timetable.activityId.length; i++) {
        for (let j = 0; j < courses.length; j++) {
          let index = courses[j].activity.items.find(item => item.id === stu.timetable.activityId[i])
          if (index !== undefined) {
            act.push(index)
            break;
          }
        }
      }
      act = act.sort((a, b) => {
                      if (a.start <= b.start)
                        return -1;
                      else
                        return 1;
                    })

        updateStudent(stu)
        setActivities(act);
        createScheduleArray(act);
        setActivities(act);
      
      }
      else{
        console.log("Not fetching");
          let changed = false
          let act=student.timetable.activities;
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
          
          if (changed === true) {
            setActivities(act)
            createScheduleArray(act)
          }
        }
    } catch (e) {
      Alert.alert(error)
      console.log(e);
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
        let t = modules[moduleKey].start + "-" + modules[moduleKey].end;
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
        } else {
          module.isClash = false;
        }
      });
    });

    setSchedule(scheduleArray);
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
