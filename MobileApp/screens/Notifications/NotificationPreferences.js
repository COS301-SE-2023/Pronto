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
    // Save the selectedOption to your storage or API
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
    // Add your logic to handle saving the notification preferences
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
    color: "#e32f45",
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
});

export default NotificationPreferences;
