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
      <Tab.Screen
        name="Schedule"
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
                source={require("../assets/icons/search.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#e32f45" : "#748c94",
                }}
              />
            </View>
          ),
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
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7f5df0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
