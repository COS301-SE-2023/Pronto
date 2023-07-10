import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";

const NotificationPreferences = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showSaveButton, setShowSaveButton] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowSaveButton(true);
  };

  const handleSavePreferences = () => {
    setShowSaveButton(false); // Hide the save button after saving
    Alert.alert(
      "Preferences Updated",
      `Preference successfully updated to ${selectedOption}`,
      [
        {
          text: "OK",
          onPress: () => console.log("OK Pressed"),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Notification Preferences</Text>

        <Text style={styles.instructions}>
          Select your preferred way of receiving notifications:
        </Text>

        <TouchableOpacity
          style={[
            styles.option,
            selectedOption === "email" && styles.selectedOption,
          ]}
          onPress={() => handleOptionSelect("email")}
        >
          <Text style={styles.optionText}>Email</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            selectedOption === "sms" && styles.selectedOption,
          ]}
          onPress={() => handleOptionSelect("sms")}
        >
          <Text style={styles.optionText}>SMS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            selectedOption === "push" && styles.selectedOption,
          ]}
          onPress={() => handleOptionSelect("push")}
        >
          <Text style={styles.optionText}>Push Notifications</Text>
        </TouchableOpacity>

        {showSaveButton && (
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSavePreferences}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  content: {
    width: "80%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#e32f45",
    textAlign: "center",
  },
  option: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 12,
    marginBottom: 12,
  },
  optionText: {
    color: "#e32f45",
  },
  selectedOption: {
    borderColor: "#e32f45",
  },
  saveButton: {
    backgroundColor: "#e32f45",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  instructions: {
    fontSize: 16,
    marginBottom: 12,
    textAlign: "center",
  },
});

export default NotificationPreferences;
