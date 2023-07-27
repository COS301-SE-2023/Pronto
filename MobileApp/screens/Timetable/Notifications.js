import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import NotificationList from "../../components/NotificationList";

const Notifications = ({navigation}) => {
  //console.log(navigation)
  return (
    <View>
      <NotificationList 
      navigation={navigation}/>
    </View>
  );
};

export default Notifications;
