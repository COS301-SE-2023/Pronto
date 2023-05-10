import React, {useState} from 'react';
import {View, TouchableOpacity, Text, Dimensions} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {Card} from 'react-native-paper';


const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const ScheduleTable = () => 
{
  const [items, setItems] = useState({});
  const loadItems = (day) => 
  {

    for (let i = -5; i < 10; i++) {
      const time = new Date(day.timestamp + i * 24 * 60 * 60 * 1000);
      const year = time.getFullYear();
      const month = String(time.getMonth() + 1).padStart(2, '0');
      const dayOfMonth = String(time.getDate()).padStart(2, '0');
      const strTime = `${year}-${month}-${dayOfMonth}`;
      if (!items[strTime]) 
      {
        items[strTime] = [];
        for (let j = 0; j < 5; j++) 
        {
          items[strTime].push({
            name: "Module Code",
            venue: "Location",
            time: "Time"
          });
        }
      }
    }
  };
  

  const renderItem = (item) => 
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
              <Text>{item.name}</Text>
              <Text>{item.venue}</Text>
              <Text>{item.time}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  const windowHeight = Dimensions.get('window').height;
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  return (
    <View style={{height: windowHeight}}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={year + '-' + month + '-' + date}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ScheduleTable;