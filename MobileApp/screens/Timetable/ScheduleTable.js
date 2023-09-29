import React, {useEffect, useState} from "react";
import {View, TouchableOpacity, Text, Dimensions, Alert, StyleSheet, Image} from "react-native";
import {Agenda} from "react-native-calendars";
import {Card} from "react-native-paper";
import {API, Auth} from 'aws-amplify'
import {printToFileAsync} from 'expo-print';
import {shareAsync} from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import downloadIcon from '../../assets/icons/downloadicon.png';
import '../../assets/data/mock/global.js';
import {useFocusEffect} from "@react-navigation/native";
//import { getStudent } from "../../graphql/queries"
//import { useStudent } from "../../ContextProviders/StudentContext";


const ScheduleTable = ({navigation, route}) => {

    const getStudent = async () => ({
        id: "1", enrollments: {
            items: [{
                course: {
                    activity: {
                        items: [{
                            id: "1", start: "08:00 AM", end: "09:30 AM", course: {
                                coursecode: "IMY 210",
                            }, venue: "Thuto 2-1", day: "Monday", coordinates: "1,2",
                        }, {
                            id: "2", start: "10:00 AM", end: "11:30 AM", course: {
                                coursecode: "COS301",
                            }, venue: "Centenary", day: "Tuesday", coordinates: "3,4",
                        }, // Add more mock activities as needed
                            {
                                id: "3", start: "08:00 AM", end: "09:30 AM", course: {
                                    coursecode: "COS301",
                                }, venue: "IT 4-26", day: "Monday", coordinates: "5,6",
                            }, {
                                id: "4", start: "08:00 AM", end: "09:30 AM", course: {
                                    coursecode: "COS333",
                                }, venue: "IT 4-4", day: "Wednesday", coordinates: "7,8",
                            }, {
                                id: "5", start: "02:00 PM", end: "03:30 PM", course: {
                                    coursecode: "COS326",
                                }, venue: "HB 3-3", day: "Friday", coordinates: "9,10",
                            }, {
                                id: "6", start: "09:00 AM", end: "10:30 AM", course: {
                                    coursecode: "WTW285",
                                }, venue: "EMS 1-152", day: "Monday", coordinates: "11,12",
                            }, {
                                id: "7", start: "11:00 AM", end: "12:30 PM", course: {
                                    coursecode: "IMY 330",
                                }, venue: "SIT Labs", day: "Thursday", coordinates: "13,14",
                            }, {
                                id: "8", start: "10:00 AM", end: "11:30 AM", course: {
                                    coursecode: "COS314",
                                }, venue: "IT 4-4", day: "Friday", coordinates: "15,16",
                            }, {
                                id: "9", start: "03:00 PM", end: "04:30 PM", course: {
                                    coursecode: "COS201",
                                }, venue: "IT 2-27", day: "Wednesday", coordinates: "17,18",
                            }, {
                                id: "10", start: "09:30 AM", end: "11:00 AM", course: {
                                    coursecode: "INF 354",
                                }, venue: "Brown Lab", day: "Wednesday", coordinates: "19,20",
                            }],
                    },
                },
            },],
        }, timetable: {
            activityId: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"], // Use the IDs of the activities from above
        },
    });


    const getStudent2 = async () => ({
        id: "1", enrollments: {
            items: [{
                course: {
                    activity: {
                        items: [{
                            id: "1", start: "08:00 AM", end: "09:30 AM", course: {
                                coursecode: "IMY 210",
                            }, venue: "Thuto 2-1", day: "Monday", coordinates: "1,2",
                        }, {
                            id: "1", start: "17:00 AM", end: "09:30 AM", course: {
                                coursecode: "WTW 134",
                            }, venue: "Thuto 2-1", day: "Wednesday", coordinates: "1,2",
                        }, {
                            id: "2", start: "10:00 AM", end: "11:30 AM", course: {
                                coursecode: "COS301",
                            }, venue: "Centenary", day: "Tuesday", coordinates: "3,4",
                        }, // Add more mock activities as needed
                            {
                                id: "3", start: "08:00 AM", end: "09:30 AM", course: {
                                    coursecode: "COS301",
                                }, venue: "IT 4-26", day: "Monday", coordinates: "5,6",
                            }, {
                                id: "4", start: "08:00 AM", end: "09:30 AM", course: {
                                    coursecode: "COS333",
                                }, venue: "IT 4-4", day: "Wednesday", coordinates: "7,8",
                            }, {
                                id: "5", start: "02:00 PM", end: "03:30 PM", course: {
                                    coursecode: "COS326",
                                }, venue: "HB 3-3", day: "Friday", coordinates: "9,10",
                            }, {
                                id: "6", start: "09:00 AM", end: "10:30 AM", course: {
                                    coursecode: "WTW285",
                                }, venue: "EMS 1-152", day: "Monday", coordinates: "11,12",
                            }, {
                                id: "7", start: "11:00 AM", end: "12:30 PM", course: {
                                    coursecode: "IMY 330",
                                }, venue: "SIT Labs", day: "Thursday", coordinates: "13,14",
                            }, {
                                id: "8", start: "10:00 AM", end: "11:30 AM", course: {
                                    coursecode: "COS314",
                                }, venue: "IT 4-4", day: "Friday", coordinates: "15,16",
                            }, {
                                id: "9", start: "03:00 PM", end: "04:30 PM", course: {
                                    coursecode: "COS201",
                                }, venue: "IT 2-27", day: "Wednesday", coordinates: "17,18",
                            }, {
                                id: "10", start: "09:30 AM", end: "11:00 AM", course: {
                                    coursecode: "INF 354",
                                }, venue: "Brown Lab", day: "Wednesday", coordinates: "19,20",
                            }],
                    },
                },
            },],
        }, timetable: {
            activityId: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"], // Use the IDs of the activities from above
        },
    });


    const useStudent = () => {
        const student = null; // You can also initialize with mock student data if needed
        const updateStudent = () => {
        };

        return {
            student, updateStudent,
        };
    };

    const [activities, setActivities] = useState([]);
    const [schedule, setSchedule] = useState(null);
    const {student, updateStudent} = useStudent();
    const [timetableLoaded, setTimetableLoaded] = useState(true);
    const [agendaKey, setAgendaKey] = useState(0);

    let param = route.params;
    var scheduleArray = {}


    useEffect(() => {
       fetchActivities()
;        navigation.setOptions({
            headerRight: () => (timetableLoaded && (<TouchableOpacity onPress={generatePdf} style={styles.downloadIcon}>
                        <Image source={downloadIcon} style={[styles.iconImage, {tintColor: '#e32f45'}]}/>
                    </TouchableOpacity>)),
        });
    }, [activities, timetableLoaded]);

    //function to take in a day, and give all dates of the year that a day occurs
    const getDatesForDayOfWeek = (dayOfWeek) => {
        const date = new Date();
        const year = date.getFullYear();
        const dayIndex = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",].indexOf(dayOfWeek);
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

    const fetchActivities = async () => {
        try {
            let stu = student;
            if (student === null || student.id === undefined) {
                if (param === null || param.id === undefined) {
                    // Use the mock getStudent function to get student data

                   if(global.flag === false)
                   {
                    stu = await getStudent();
                   }
                   else {
                    stu = await getStudent2();
                   }


                } else {
                    stu = param;
                    param = null;
                }

                updateStudent(stu);
            }

            if (stu === null || stu.studentTimetableId === null) {
                return;
            }

            // Extract activities from the mock data
            const act = stu.enrollments.items[0].course.activity.items;
            act.sort((a, b) => {
                if (a.start <= b.start) return -1; else return 1;
            });

            let changed = false;
            if (act.length === activities.length) {
                for (let i = 0; i < act.length; i++) {
                    if (act[i].id !== activities[i].id) {
                        changed = true;
                        break;
                    }
                }
            } else {
                changed = true;
            }
            if (changed === true) {
                setActivities(act);
                createScheduleArray(act);
            }
        } catch (e) {
            console.log(e);
        }
    };



    // Define your function
    const myFunction = () => {
        // Your function logic here.
        console.log('Function is running when the screen is focused.');
    };

    // Use the useFocusEffect hook to run your function when the screen is focused
    useFocusEffect(
        React.useCallback(() => {
           fetchActivities()}, [])
    );

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
        const cardStyle = module.isClash ? {
                backgroundColor: "white",
                borderColor: "#e32f45",
                borderWidth: 1,
                borderStyle: "dashed"
            } // Apply clash styling
            : {backgroundColor: "white"}; // Default styling

        const textStyle = module.isClash ? {fontStyle: "italic"} // Apply italic style for clashes
            : {}; // Default style

        return (<TouchableOpacity style={{marginRight: 20, marginTop: 30}}>
                <Card style={[cardStyle, {elevation: module.isClash ? 4 : 2}]}>
                    <Card.Content>
                        <View
                            style={{
                                flexDirection: "row", justifyContent: "space-between", alignItems: "center",
                            }}
                        >
                            <Text style={textStyle}>{module.code}</Text>
                            <Text style={textStyle}>{module.venue}</Text>
                            <Text style={textStyle}>{module.time}</Text>
                        </View>
                    </Card.Content>
                </Card>
            </TouchableOpacity>);
    };


    const renderEmptyDate = () => {
        return (<View
                style={{
                    flex: 1, justifyContent: "center", paddingBottom: "50%", alignItems: "center",
                }}
            >
                <Text
                    style={{
                        fontWeight: "bold", fontSize: 25, color: "#748c94",
                    }}
                    // #1E90FF
                >
                    No events today
                </Text>
            </View>);
    };

    const windowHeight = Dimensions.get("window").height;
    const windowWidth = Dimensions.get("window").width;
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();


    //functions for generating pdf


    const generatePdf = async () => {
        const pdfOptions = {
            html: html, base64: false,
        };

        const file = await printToFileAsync(pdfOptions);

        // Rename the file to 'ProntoTimetable.pdf'
        const renamedFileUri = `${FileSystem.cacheDirectory}ProntoTimetable.pdf`;

        await FileSystem.moveAsync({
            from: file.uri, to: renamedFileUri,
        });

        await shareAsync(renamedFileUri);
    };

    const generateTimetableRows = (modules) => {
        const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",];

        // Create a dictionary to store lecture data by day and time
        const timetableData = {};

        // Populate the timetableData dictionary with lecture data
        modules.forEach((module) => {
            const {day, start, end, course, venue} = module; // Include 'venue' here
            const dayIndex = daysOfWeek.indexOf(day);

            if (!timetableData[start]) {
                timetableData[start] = {};
            }

            if (!timetableData[start][dayIndex]) {
                timetableData[start][dayIndex] = [];
            }

            timetableData[start][dayIndex].push({
                courseCode: course.coursecode, start, end, venue, // Include 'venue' here
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
                        const {courseCode, start, end, venue} = lecture;
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


    return (<View style={{height: windowHeight, width: windowWidth}}>
            <Agenda
                key={agendaKey}
                items={schedule} // Use your schedule data here if needed
                selected={year + "-" + month + "-" + date}
                renderItem={renderItem}
                showOnlySelectedDayItems={true}
                renderEmptyData={renderEmptyDate}
                theme={{
                    todayTextColor: "#e32f45",
                    selectedDayBackgroundColor: "#e32f45",
                    dotColor: "#e32f45",
                    agendaDayTextColor: "#e32f45",
                    agendaDayNumColor: "#e32f45",
                    agendaTodayColor: "#e32f45",
                }}
            />
        </View>);
};

export default ScheduleTable;

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
    }, textInput: {
        alignSelf: "stretch", padding: 8, margin: 8
    }, iconImage: {
        width: 24, // Adjust the width and height to fit your design
        height: 24, marginRight: 30,
    },
});
