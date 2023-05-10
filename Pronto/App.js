import {StyleSheet, View, SafeAreaView} from 'react-native';
import Timetable from './screens/Timetable/Timetable';
import EditTimetable from './screens/Timetable/EditTimetable';
import Reminder from './screens/Timetable/setReminder';
import ScheduleTable from './screens/Timetable/ScheduleTable';

export default function App() {

   return (

    <SafeAreaView>
    
    <ScheduleTable />
    
    </SafeAreaView>

  );
};
