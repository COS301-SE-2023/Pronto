import React, {useState} from 'react';
import {View, TouchableOpacity, Text, Dimensions} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {Card} from 'react-native-paper';
import modules from "../../assets/data/modules.json";

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
        items={modules}
        selected={year + '-' + month + '-' + date}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ScheduleTable;