import React, { useState } from "react";
import { View, TouchableOpacity, Text, Dimensions } from "react-native";
import { Agenda } from "react-native-calendars";
import { Card } from "react-native-paper";
import modules from "../../assets/data/mock/modules.json";

//function to take in a day, and give all dates of the year that a day occurs
function getDatesForDayOfWeek(dayOfWeek) {
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

  // Loop through each month of the year
  for (let month = 0; month < 12; month++) {
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

function createScheduleArray(modules) {
  const scheduleArray = {};
  for (const moduleKey in modules) {
    const dates = getDatesForDayOfWeek(modules[moduleKey].day);
    dates.forEach((date) => {
      if (!scheduleArray[date]) {
        scheduleArray[date] = [];
      }
      scheduleArray[date].push({
        id: modules[moduleKey].id,
        code: modules[moduleKey].code,
        time: modules[moduleKey].time,
        frequency: modules[moduleKey].frequency,
        venue: modules[moduleKey].venue,
        day: modules[moduleKey].day,
        height: 50,
      });
    });
  }
  return scheduleArray;
}

var scheduleArray = createScheduleArray(modules);

//scheduleArray.concat(createScheduleArray(modules["COS301"]));
//console.log(scheduleArray);

const ScheduleTable = () => {
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
        items={scheduleArray}
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
          //further styling options if needed
          //  textDisabledColor: "#e32f45",
          //   agendaTodayColor: "#e32f45", // today in list
          //   monthTextColor: "#e32f45", // name in calendar
          //    textDefaultColor: "#e32f45",
          // todayBackgroundColor: "#e32f45",
          // selectedDayTextColor: "#e32f45", // calendar sel date
          //  dayTextColor: "#e32f45", // calendar day
          //  textSectionTitleColor: "#e32f45",
        }}
      />
    </View>
  );
};

export default ScheduleTable;
