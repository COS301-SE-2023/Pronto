import {StyleSheet, View,} from 'react-native';
import Timetable from './screens/Timetable/Timetable';


export default function App() {

   return (

    <View style={styles.container}>
     <Timetable />

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
