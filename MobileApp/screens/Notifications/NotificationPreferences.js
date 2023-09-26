import React, { useState, useEffect } from "react";
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

import { Auth, API } from "aws-amplify";
import { getStudent } from "../../graphql/queries";
import { useStudent } from "../../ContextProviders/StudentContext";
import { updateStudentInfo, updateNotificationPreferance, createNotificationPreferance } from "../../graphql/mutations";

const NotificationPreferences = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const [isVerificationModalVisible, setVerificationModalVisible] =
    useState(false); // State to control the verification modal visibility
  const [enteredVerificationCode, setEnteredVerificationCode] = useState("");
  const [email, setEmail] = useState(null);
  const [isEmailModalVisible, setEmailModalVisible] = useState(false);
  const [isEmailVerificationModalVisible, setEmailVerificationModalVisible] = useState(false);

  const [enteredEmailVerificationCode, setEnteredEmailVerificationCode] = useState("");

  const { student, updateStudent } = useStudent();

  const fetchUserEmail = async () => {
    try {
      // Replace "currentUser" with the method that retrieves the authenticated user from Cognito
      // For example, if you are using AWS Amplify, you can use Auth.currentAuthenticatedUser()
      // let email=""
      // if(student===null){
      //   const currentUser = await Auth.currentAuthenticatedUser();
      //   //const email = currentUser.attributes.email; // Assuming that "email" is the attribute name for the email in Cognito
      //   email=currentUser.attributes.email;
      // }
      // else{ 
      //   email=student.email;
      // }
      return student.email;
    } catch (error) {
      console.error("Error fetching user email:", error);
      return null;
    }
  };


  const fetchStudent = async () => {
    try {
      if (student === null) {
        const user = await Auth.currentAuthenticatedUser()
        let studentEmail = user.attributes.email;
        let stu = await API.graphql({
          query: getStudent,
          variables: { id: user.attributes.sub }
        })

        stu = stu.data.getStudent;
        if (stu === null) {
          throw Error();
        }
        updateStudent(student);
      }
    } catch (e) {
    }
  }
  const handleOptionSelect = async (option) => {
    setSelectedOption(option);
    if (option === "email") {
      // Fetch user's email from Cognito
      // const userEmail = await fetchUserEmail();
      //const email=student.email;
      setEmail(student.email); // Set the email state with the user's email
      setEmailModalVisible(true); // Show the "Email Modal"
    }
  };

  const handleSavePreferences = async () => {

    try {

      if (student.preference === null) {

        let pref = await API.graphql({
          query: createNotificationPreferance,
          variables: { input: { studentId: student.id, type: selectedOption.toUpperCase() } }
        })

        student.preference = pref.data.createNotificationPreferance;
        student.studentPreferenceId = pref.data.createNotificationPreferance.id
      }
      else {
        let pref = await API.graphql({
          query: updateNotificationPreferance,
          variables: { input: { id: student.studentPreferenceId, type: selectedOption.toUpperCase() } }
        })

        student.preference = pref.data.updateNotificationPreferance;
        student.studentPreferenceId = pref.data.updateNotificationPreferance.id
      }
      updateStudent(student);
      Alert.alert(
        "Preferences Updated",
        `Preference successfully updated to ${selectedOption}`
      );
    } catch (e) {
      Alert.alert("Failed to update preference");

    }
  };

  useEffect(() => {
    fetchStudent();
  }, [])


  const openEmailVerificationModal = () => {
    setEmailVerificationModalVisible(true);
    setEmailModalVisible(false); // Close the email modal
  };

  const closeEmailModalAndClearOption = () => {
    setEmailModalVisible(false);
    setSelectedOption(null);

  };

  const handleEmailConfirm = () => {
    // Perform any necessary actions before opening the email verification modal
    // For example, you might want to send the verification code to the user's email before opening the modal
    // After sending the verification code, open the email verification modal:
    openEmailVerificationModal();
  };

  const handleEmailVerificationCode = (code) => {
    // Implement your logic to verify the email code here

    // After successful verification, you can do any required action
    // For example, show a success message or navigate to the next step in the app


    // Close the email verification modal and show the Save button
    setEmailVerificationModalVisible(false);
    Alert.alert("Preference Updated", "Your preference has been set to email");
  };



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Notification Preferences</Text>
        <Text style={{ marginBottom: 20, textAlign: "center" }}>
          This is how you will receive notifications from your lecturer. Your notification preference is currently set to
          <Text style={styles.optionText}>{student === null ? "" : student.preference === null ? " email" : " " + student.preference.type.toLowerCase()}</Text>
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
            styles.verificationInput,
            selectedOption === "email" || student.preference === null
              ? styles.selectedOption
              : styles.option,
          ]}
          onPress={() => handleOptionSelect("email")}
        >
          <Text style={styles.optionText}>Email</Text>
        </TouchableOpacity>

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
                  onPress={() => {
                    setSelectedOption(null);
                    setVerificationModalVisible(false);
                  }}
                >
                  <Icon name="close" size={24} color="gray" />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Confirm your email</Text>

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
                  onPress={() => {
                    setSelectedOption(null);

                    setVerificationModalVisible(false);
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <Modal visible={isEmailModalVisible} transparent animationType="fade">
          <TouchableWithoutFeedback onPress={closeEmailModalAndClearOption}>
            <View style={styles.modalBackground}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  style={styles.closeModalIcon}
                  onPress={closeEmailModalAndClearOption}
                >
                  <Icon name="close" size={24} color="gray" />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Your Current Email</Text>
                <Text style={styles.currentEmailText}>
                  {email
                    ? `Your current email is set to: ${email}`
                    : "Email not available"}
                </Text>
                <TouchableOpacity
                  style={styles.modalNextButton}
                  onPress={handleEmailConfirm}
                >
                  <Text style={styles.saveButtonText}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <Modal
          visible={isEmailVerificationModalVisible}
          transparent
          animationType="fade"
        >
          <TouchableWithoutFeedback
            onPress={() => setEmailVerificationModalVisible(false)}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  style={styles.closeModalIcon}
                  onPress={() => {
                    setSelectedOption(null);

                    setEmailVerificationModalVisible(false);
                  }}
                >
                  <Icon name="close" size={24} color="gray" />
                </TouchableOpacity>

                <Text style={styles.modalTitle}>Confirm subscription</Text>
                <Text style={styles.subText}>An email was sent to you with a link to confirm your email subscription to notifcations.</Text>


                <TouchableOpacity
                  style={styles.modalNextButton}
                  onPress={() =>
                    handleEmailVerificationCode(enteredEmailVerificationCode)
                  }
                >
                  <Text style={styles.saveButtonText}>Okay</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </SafeAreaView >
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
    alignItems: "center"
  },
  optionText: {
    color: "#e32f45",
  },
  selectedOption: {
    borderColor: "#e32f45",
    alignItems: "center"
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
  currentEmailText: {
    textAlign: "center",
    padding: 20,
  },
  subText: {
    marginBottom: 20
  }
});

export default NotificationPreferences;