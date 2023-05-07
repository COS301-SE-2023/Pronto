import {StyleSheet, View,} from 'react-native';
import Timetable from './screens/Timetable/Timetable';
import UniversityPage from "./screens/University_Page/University";


export default function App() {

   return (

    <View style={styles.container}>
       <Timetable/>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
