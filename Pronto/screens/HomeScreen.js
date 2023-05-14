import { StyleSheet, View, SafeAreaView, Text, Button } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView>
      <Button
        title="Move to search module page"
        onPress={() => navigation.navigate("EditTimetable")}
      />

      <Button
        title="Move to timetable page"
        onPress={() => navigation.navigate("ScheduleTable")}
      />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
