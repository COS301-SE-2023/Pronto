import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ScheduleTable from "../screens/Timetable/ScheduleTable";
import EditTimetable from "../screens/Timetable/EditTimetable";
import AccountSettings from "../screens/Timetable/AccountSettings";
import Notifications from "../screens/Timetable/Notifications";
import NavigationScreen from "../screens/Timetable/NavigationScreen";
import FileView from "../screens/FileView/FileView";
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
    <Tab.Navigator {...{ screenOptions }}>
      <Tab.Screen
        name="Timetable"
        testID="tabs"
        component={ScheduleTable}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
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
                top: 10,
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
                top: 10,
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
                top: 10,
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
        name="FileView"
        testID="tabs"
        component={FileView}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
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
                top: 10,
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
