import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ScheduleTable from "../screens/Timetable/ScheduleTable";
import EditTimetable from "../screens/Timetable/EditTimetable";
import AccountSettings from "../screens/Timetable/AccountSettings";
import Notifications from "../screens/Timetable/Notifications";
import NavigationScreen from "../screens/Timetable/NavigationScreen";
import FileView from "../screens/FileView/FileView";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Platform } from 'react-native';


const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarStyle: {
    position: "absolute",
    bottom: 25,
    left: 20,
    right: 20,
    backgroundColor: "white",
    borderRadius: 15,
    height: 90,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
};

const Tabs = ({ route }) => {
  const s = route.params;


  return (
    <Tab.Navigator {...{ screenOptions }} backBehavior="history">
      <Tab.Screen
        name="Timetable"
        testID="tabs"
        component={ScheduleTable}
        initialParams={s}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                ...(Platform.OS === 'ios' ? { top: 10 } : {}), // Conditionally add top: 10 for iOS
              }}
            >
              <Image
                source={require("../assets/icons/schedule.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#e32f45" : "#748c94",
                }}
              />
            </View>
          ),
          tabBarLabelStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        name="Navigation"
        component={NavigationScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                ...(Platform.OS === 'ios' ? { top: 10 } : {}), // Conditionally add top: 10 for iOS
              }}
            >
              <Image
                source={require("../assets/icons/map.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#e32f45" : "#748c94",
                }}
              />
            </View>
          ),
          tabBarLabelStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        name="Search"
        component={EditTimetable}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                ...(Platform.OS === 'ios' ? { top: 10 } : {}), // Conditionally add top: 10 for iOS
              }}
            >
              <Image
                source={require("../assets/icons/planning.png")}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? "#e32f45" : "#748c94",
                }}
              />
            </View>
          ),
          tabBarLabelStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                ...(Platform.OS === 'ios' ? { top: 10 } : {}), // Conditionally add top: 10 for iOS
              }}
            >
              <Image
                source={require("../assets/icons/bell.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#e32f45" : "#748c94",
                }}
              />
            </View>
          ),
          tabBarLabelStyle: { display: "none" },
        }}
      />

      <Tab.Screen
        name="Student Files"
        testID="tabs"
        component={FileView}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                ...(Platform.OS === 'ios' ? { top: 10 } : {}), // Conditionally add top: 10 for iOS
              }}
            >
              <Image
                source={require("../assets/icons/folder.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#e32f45" : "#748c94",
                }}
              />
            </View>
          ),
          tabBarLabelStyle: { display: "none" },
        }}
      />

      <Tab.Screen
        name="Account"
        component={AccountSettings}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                ...(Platform.OS === 'ios' ? { top: 10 } : {}), // Conditionally add top: 10 for iOS
              }}
            >
              <Image
                source={require("../assets/icons/user.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#e32f45" : "#748c94",
                }}
              />
            </View>
          ),
          tabBarLabelStyle: { display: "none" },
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
