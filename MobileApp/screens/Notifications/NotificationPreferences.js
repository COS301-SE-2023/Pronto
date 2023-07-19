import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ImageBackground,
  TextInput,
  Modal, // Import Modal
  TouchableWithoutFeedback, // Import TouchableWithoutFeedback
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const NotificationPreferences = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(""); // State to store the phone number

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowSaveButton(true);
    if (option !== "sms") {
      // Reset phone number state when an option other than "SMS" is selected
      setPhoneNumber("");
    }
  };

  const handleSavePreferences = () => {
    setShowSaveButton(false); // Hide the save button after saving
    Alert.alert(
      "Preferences Updated",
      `Preference successfully updated to ${selectedOption}`
    );

    // Save the phone number if "SMS" option is selected
    if (selectedOption === "sms") {
      savePhoneNumber(phoneNumber);
    }
    //navigate to settings page
  };

  // Helper function to save the phone number (you can replace this with your own implementation)
  const savePhoneNumber = (number) => {
    // Implement your logic to save the phone number here
    console.log("Phone number saved:", number);
  };

  // Render input field for phone number when "SMS" option is selected
  const renderPhoneNumberInput = () => {
    if (selectedOption === "sms") {
      return (
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Notification Preferences</Text>
        <Text style={{ marginBottom: 20, textAlign: "center" }}>
          This is how you will receive notifications from your lecturer
        </Text>
        <ImageBackground
          resizeMode="contain"
          //attribution: <a href="https://storyset.com/education">Education illustrations by Storyset</a>
          source={require("../../assets/icons/NotificationPreference.png")}
          style={styles.image}
        />

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

        {/* Render phone number input when "SMS" option is selected */}
        {renderPhoneNumberInput()}

        {showSaveButton ? (
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSavePreferences}
          >
            <View style={styles.saveButtonContent}>
              <Text style={styles.saveButtonText}>Save</Text>
              <Icon
                name="check"
                size={20}
                color="#fff"
                style={styles.checkIcon}
              />
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.disabledSaveButton} disabled>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

// Remaining styles...

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
    fontSize: 24,
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
  saveButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  checkIcon: {
    marginLeft: 5,
  },
  image: {
    width: 200, // Specify the desired width
    height: 200, // Specify the desired height
    alignSelf: "center", // Center the image horizontally
    marginBottom: 20,
  },
});

export default NotificationPreferences;
