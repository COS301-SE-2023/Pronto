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
  Modal,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
const NotificationPreferences = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isModalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const [isVerificationModalVisible, setVerificationModalVisible] =
    useState(false); // State to control the verification modal visibility
  const [enteredVerificationCode, setEnteredVerificationCode] = useState("");

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    if (option === "sms") {
      setModalVisible(true); // Show the phone number modal when "SMS" option is clicked
    } else {
      setShowSaveButton(true);
      setPhoneNumber(""); // Reset phone number state
    }
  };

  const handleSavePreferences = () => {
    Alert.alert(
      "Preferences Updated",
      `Preference successfully updated to ${selectedOption}`
    );
  };

  const closeModalAndDeselectOption = () => {
    setModalVisible(false);
    setSelectedOption(null); // Deselect the "SMS" option
    setShowSaveButton(false);
  };

  const savePhoneNumber = (number) => {
    // Regular expression to match valid South African phone numbers
    const saPhoneNumberRegex = /^(?:\+27|0)(?:\d\s?){9}$/;

    if (!saPhoneNumberRegex.test(number)) {
      // Display an error message for invalid phone numbers
      Alert.alert(
        "Invalid Phone Number",
        "Please enter a valid South African phone number."
      );
      return;
    }

    //if successful, move on to next step, verify phone number
    if (saPhoneNumberRegex.test(number)) {
      setVerificationModalVisible(true);
      setModalVisible(false); // Close the phone number modal
    }
  };

  const handleVerificationCode = (code) => {
    // Implement your logic to verify the SMS code here
    console.log("Verification code entered:", code);

    // After successful verification, you can do any required action
    // For example, show a success message or navigate to the next step in the app
    // For this example, let's show an alert:
    Alert.alert(
      "Verification Successful",
      "Your phone number has been verified successfully."
    );

    setVerificationModalVisible(false);
    setShowSaveButton(true);
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

        {/* Modal for entering phone number */}
        <Modal visible={isModalVisible} transparent animationType="fade">
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalBackground}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  style={styles.closeModalIcon}
                  onPress={closeModalAndDeselectOption}
                >
                  <Icon name="close" size={24} color="gray" />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Enter Your Phone Number</Text>

                {/* South African flag and number format */}
                <View style={styles.phoneNumberInputContainer}>
                  <Image
                    source={require("../../assets/icons/SouthAfricaFlag.png")}
                    style={styles.flagIcon}
                  />
                  <Text style={styles.phoneNumberPrefix}>+27</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                  />
                </View>

                <TouchableOpacity
                  style={styles.modalNextButton}
                  onPress={() => savePhoneNumber(phoneNumber)}
                >
                  <Text style={styles.saveButtonText}>Next</Text>
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

        <Modal
          visible={isVerificationModalVisible}
          transparent
          animationType="fade"
        >
          <TouchableWithoutFeedback
            onPress={() => setVerificationModalVisible(false)}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  style={styles.closeModalIcon}
                  onPress={() => setVerificationModalVisible(false)}
                >
                  <Icon name="close" size={24} color="gray" />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Enter Verification Code</Text>

                <TextInput
                  style={styles.verificationInput}
                  placeholder="Verification Code"
                  keyboardType="numeric"
                  value={enteredVerificationCode}
                  onChangeText={setEnteredVerificationCode}
                />

                <TouchableOpacity
                  style={styles.modalNextButton}
                  onPress={() =>
                    handleVerificationCode(enteredVerificationCode)
                  }
                >
                  <Text style={styles.saveButtonText}>Verify</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalCancelButton}
                  onPress={() => setVerificationModalVisible(false)}
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
    width: "85%",
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
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 12,
  },
  verificationInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 12,
    marginBottom: 12,
  },
  modalNextButton: {
    backgroundColor: "#e32f45",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    width: "50%",
  },
  modalCancelButton: {
    backgroundColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    width: "50%",
    marginTop: 10,
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  closeModalIcon: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 1,
  },
  phoneNumberInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  flagIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  phoneNumberPrefix: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
});

export default NotificationPreferences;
