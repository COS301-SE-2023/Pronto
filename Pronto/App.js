import HomeScreen from "./screens/HomeScreen";
import EditTimetable from "./screens/Timetable/EditTimetable";
import ScheduleTable from "./screens/Timetable/ScheduleTable";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="EditTimetable"
          component={EditTimetable}
          options={{ title: "Search for modules" }}
        />
        <Stack.Screen
          name="ScheduleTable"
          component={ScheduleTable}
          options={{ title: "Timetable" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
