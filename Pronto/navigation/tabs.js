import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ScheduleTable from "../screens/Timetable/ScheduleTable";
import EditTimetable from "../screens/Timetable/EditTimetable";
import AccountSettings from "../screens/Timetable/AccountSettings";
import Notifications from "../screens/Timetable/Notifications";
import NavigationScreen from "../screens/Timetable/NavigationScreen";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Schedule" component={ScheduleTable} />
      <Tab.Screen name="Navigation" component={NavigationScreen} />
      <Tab.Screen name="Search" component={EditTimetable} />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Account" component={AccountSettings} />
    </Tab.Navigator>
  );
};

export default Tabs;
