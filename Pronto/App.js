import HomeScreen from "./screens/HomeScreen";
import EditTimetable from "./screens/Timetable/EditTimetable";
import ScheduleTable from "./screens/Timetable/ScheduleTable";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/tabs";

export default function App() 
{
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}
