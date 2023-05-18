import React, { useState } from 'react';
import { View, Text, TextInput, Picker, Switch, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const Reminder = () => {
  const [reminderType, setReminderType] = useState('');
  const [reminderText, setReminderText] = useState('');
  const [sendDateTime, setSendDateTime] = useState(null);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);

  const handleReminderType = (value) => {
    setReminderType(value);
  };

  const handleReminderText = (text) => {
    setReminderText(text);
  };

  const handleDateTimeChange = (event, dateTime) => {
    setShowDateTimePicker(false);
    if (dateTime) {
      setSendDateTime(dateTime);
    }
  };

  const handleDateTimeButtonPress = () => {
    setShowDateTimePicker(true);
  };

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
        Send/Schedule Reminders
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontSize: 16, marginTop: 10 }}>Reminder Type: </Text>
        <Picker
          selectedValue={reminderType}
          onValueChange={(value) => handleReminderType(value)}
        >
          <Picker.Item label="Select Reminder Type" value="" />
          <Picker.Item label="Test" value="Test" />
          <Picker.Item label="Exam" value="Exam" />
          <Picker.Item label="Deadline" value="Deadline" />
          <Picker.Item label="Other Important Announcement" value="Other" />
        </Picker>
      </View>
      <View>
        <Text style={{ fontSize: 16, marginTop: 10 }}>Reminder Text: </Text>
        <TextInput
          style={{ borderWidth: 1, borderColor: 'gray', height: 100 }}
          multiline={true}
          onChangeText={(text) => handleReminderText(text)}
          value={reminderText}
        />
        <Text style={{ fontSize: 16, marginTop: 10 }}>Live Preview: </Text>
        <Text>{reminderType}: {reminderText}</Text>
      </View>
      <View>
        <Text style={{ fontSize: 16, marginTop: 10 }}>Send Date and Time: </Text>
        <Button title={sendDateTime ? sendDateTime.toLocaleString() : 'Select Date and Time'} onPress={handleDateTimeButtonPress} />
        {showDateTimePicker && (
          <DateTimePicker
            value={sendDateTime || new Date()}
            minimumDate={new Date()}
            mode="datetime"
            display="default"
            onChange={handleDateTimeChange}
          />
        )}
      </View>
      <View style={{ marginTop: 20 }}>
        <Button title="Send Reminder" disabled={!reminderType || !reminderText || !sendDateTime} onPress={() => console.log('Reminder Sent!')} />
      </View>
    </View>
  );
};

export default Reminder;
