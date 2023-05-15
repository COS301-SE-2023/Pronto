import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ScheduleTable from "../screens/Timetable/ScheduleTable";
import EditTimetable from "../screens/Timetable/EditTimetable";
import AccountSettings from "../screens/Timetable/AccountSettings";
import Notifications from "../screens/Timetable/Notifications";
import NavigationScreen from "../screens/Timetable/NavigationScreen";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarStyle: {
    position: "absolute",
    bottom: 25,
    left: 20,
    right: 20,
    elevation: 0,
    backgroundColor: "white",
    borderRadius: 15,
    height: 90,
  },
};

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
      }}
      {...{ screenOptions }}
    >
      <Tab.Screen name="Schedule" component={ScheduleTable} />
      <Tab.Screen name="Navigation" component={NavigationScreen} />
      <Tab.Screen name="Search" component={EditTimetable} />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Account" component={AccountSettings} />
    </Tab.Navigator>
  );
};

export default Tabs;
