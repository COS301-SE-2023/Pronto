import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

const NotificationPreferences = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Notification Preferences</Text>

      <TouchableOpacity
        style={[
          styles.option,
          selectedOption === "email" && styles.selectedOption,
        ]}
        onPress={() => handleOptionSelect("email")}
      >
        <Text>Email</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.option,
          selectedOption === "sms" && styles.selectedOption,
        ]}
        onPress={() => handleOptionSelect("sms")}
      >
        <Text>SMS</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.option,
          selectedOption === "push" && styles.selectedOption,
        ]}
        onPress={() => handleOptionSelect("push")}
      >
        <Text>Push Notifications</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  option: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 12,
    marginBottom: 12,
  },
  selectedOption: {
    backgroundColor: "#ccc",
  },
});

export default NotificationPreferences;
