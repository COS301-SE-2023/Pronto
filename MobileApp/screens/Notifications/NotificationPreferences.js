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
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isModalVisible, setModalVisible] = useState(false); // State to control modal visibility

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    if (option === "sms") {
      // Show the modal when "SMS" option is clicked
      setModalVisible(true);
    } else {
      // For other options, show the save button
      setShowSaveButton(true);
      setPhoneNumber(""); // Reset phone number state
    }
  };

  const handleSavePreferences = () => {
    setShowSaveButton(false);
    Alert.alert(
      "Preferences Updated",
      `Preference successfully updated to ${selectedOption}`
    );

    if (selectedOption === "sms") {
      // Show the modal when "SMS" option is selected
      setModalVisible(true);
    } else {
      savePhoneNumber(phoneNumber);
    }
  };

  const closeModalAndDeselectOption = () => {
    setModalVisible(false);
    setSelectedOption(null); // Deselect the "SMS" option
  };

  const savePhoneNumber = (number) => {
    // Implement your logic to save the phone number here
    console.log("Phone number saved:", number);
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

        {selectedOption === "sms" && showSaveButton ? (
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

        {/* Modal for entering phone number */}
        <Modal visible={isModalVisible} transparent animationType="fade">
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalBackground}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Enter Your Phone Number</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                />
                <TouchableOpacity
                  style={styles.modalSaveButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalCancelButton}
                  onPress={closeModalAndDeselectOption} // Call the close function when canceling from the modal
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
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
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#e32f45",
    textAlign: "center",
  },
  modalInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 12,
    marginBottom: 12,
  },
  modalSaveButton: {
    backgroundColor: "#e32f45",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    width: "50%",
  },
});

export default NotificationPreferences;
