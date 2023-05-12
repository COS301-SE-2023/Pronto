import React, {useState} from 'react';
import {View, TouchableOpacity, Text, Dimensions} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {Card} from 'react-native-paper';
import modules from "../../assets/data/mock/modules.json";

//function to take in a day, and give all dates of the year that a day occurs
function getDatesForDayOfWeek(dayOfWeek) {
  const date = new Date();
  const year = date.getFullYear();
  const dayIndex = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'Friday', 'saturday'].indexOf(dayOfWeek);
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
      const dateString = `${year}-${(month + 1).toString().padStart(2, '0')}-${dayOfMonth.toString().padStart(2, '0')}`;
      results.push(dateString);
      dayOfMonth += 7;
    }
  }

  return results;
}


function createScheduleArray(module) 
{
  const dates = getDatesForDayOfWeek(module.day);

  const scheduleArray = {};

  dates.forEach(date => {
    scheduleArray[date] = [{
      id: module.id,
      code: module.code,
      time: module.time,
      frequency: module.frequency,
      venue: module.venue,
      day: module.day,
      height: 50,
    }];
  });

  return scheduleArray;
}


for (const moduleKey in modules) 
{
 
  var scheduleArray = createScheduleArray(modules[moduleKey]);

}



const ScheduleTable = () => 
{
  const renderItem = (module) => 
  {
    return (
      <TouchableOpacity style={{marginRight: 20, marginTop: 30}}>
        <Card style={{backgroundColor: "white" }}>
          <Card.Content >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
              <Text>{module.code}</Text>
              <Text>{module.venue}</Text>
              <Text>{module.time}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };
  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
 

  
  return (
    <View style={{height: windowHeight, width: windowWidth}}>
      <Agenda
        items={scheduleArray}
        selected={year + '-' + month + '-' + date}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ScheduleTable;