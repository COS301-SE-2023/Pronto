
import React, { useState,useEffect } from "react";
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
import { Auth,API } from "aws-amplify";
import { useStudent } from "../../ContextProviders/StudentContext";
import { updateStudentInfo } from "../../graphql/mutations";

const NotificationPreferences = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isModalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const [isVerificationModalVisible, setVerificationModalVisible] =
      useState(false); // State to control the verification modal visibility
  const [enteredVerificationCode, setEnteredVerificationCode] = useState("");
  const [email, setEmail] = useState(null);
  const [isEmailModalVisible, setEmailModalVisible] = useState(false);
  const [isEmailVerificationModalVisible, setEmailVerificationModalVisible] =
      useState(false);
  const [enteredEmailVerificationCode, setEnteredEmailVerificationCode] =
    useState("");
  
  const{student,updateStudent}=useStudent(); 


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

  const fetchStudent =async()=>{
    try{
      if(student===null){
        let user =await Auth.currentAuthenticatedUser()
        let studentEmail=user.attributes.email;
        let stu = await API.graphql({
            query: listStudents,
            variables: {
              filter: {
                email: {
                  eq: studentEmail
                }
              }
            }
          })
      
        let found = false
        for (let i = 0; i < stu.data.listStudents.items.length; i++) {
          if (stu.data.listStudents.items[i].owner === user.attributes.sub) {
            stu = stu.data.listStudents.items[i]
            found = true
            break
          };
        };
        
        if(found===false){
          throw Error();
        }
        updateStudent(student);
      }
    }catch(e){
      console.log(e)
    }
  }
  const handleOptionSelect = async (option) => {
    setSelectedOption(option);
    if (option === "sms") {
      setModalVisible(true); // Show the phone number modal when "SMS" option is clicked
    } else if (option === "email") {
      // Fetch user's email from Cognito
      const userEmail = await fetchUserEmail();
      setEmail(userEmail); // Set the email state with the user's email
      setEmailModalVisible(true); // Show the "Email Modal"
    } else {
      setShowSaveButton(true);
      setPhoneNumber(""); // Reset phone number state
    }
  };

  const handleSavePreferences = async() => {
    
    try{

      let update=await API.graphql({
        query:updateStudentInfo,
        variables:{input :{id:student.id,preference:selectedOption}}
      }) 
     
      student.preference=selectedOption;
      updateStudent(student);
      Alert.alert(
        "Preferences Updated",
        `Preference successfully updated to ${selectedOption}`
      );
    }catch(e){
      Alert.alert("Failed to update preference");
    }

    setShowSaveButton(false);
  };

   useEffect(() => {
    fetchStudent();
  }, [])

  const closeModalAndDeselectOption = () => {
    setModalVisible(false);
    setSelectedOption(null); // Deselect the "SMS" option
    setShowSaveButton(false);
  };

  const openEmailVerificationModal = () => {
    setEmailVerificationModalVisible(true);
    setEmailModalVisible(false); // Close the email modal
  };

  const closeEmailModalAndClearOption = () => {
    setEmailModalVisible(false);
    setSelectedOption(null);
    setShowSaveButton(false);
  };

  const handleCancelEmailVerification = () => {
    setEmailVerificationModalVisible(false);
    setSelectedOption(null); // Clear the selected option
    setShowSaveButton(false); // Hide the save button
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
    // For this example, let's show an alert:
    Alert.alert(
        "Email Verification Successful",
        "Your email has been verified successfully."
    );

    // Close the email verification modal and show the Save button
    setEmailVerificationModalVisible(false);
    setShowSaveButton(true);
  };

  const handleVerificationCode = (code) => {
    // Implement your logic to verify the SMS code here

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
          This is how you will receive notifications from your lecturer. Your notification preference is currently set to <Text style={styles.optionText}>{student === null ? "" : student.preference===undefined?  "push" : student.preference===null?  " push" : student.preference  }</Text> 
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
{/* 
        {showSaveButton ? (

          <TouchableOpacity
              testID='email-option'
              style={[
                styles.option,
                selectedOption === "email" && styles.selectedOption,
              ]}
              onPress={() => handleOptionSelect("email")}
          >
            <Text style={styles.optionText}>Email</Text>
          </TouchableOpacity>

          <TouchableOpacity
              testID="sms-option"
              style={[
                styles.option,
                selectedOption === "sms" && styles.selectedOption,
              ]}
              onPress={() => handleOptionSelect("sms")}
          >
            <Text style={styles.optionText}>SMS</Text>
          </TouchableOpacity>

          <TouchableOpacity
              testID="push-option"
              style={[
                styles.option,
                selectedOption === "push" && styles.selectedOption,
              ]}
              onPress={() => handleOptionSelect("push")}
          >
            <Text style={styles.optionText}>Push Notifications</Text>
          </TouchableOpacity>
          
          ) } */}

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
                      onPress={() => {
                        setSelectedOption(null);
                        setShowSaveButton(false);
                        setVerificationModalVisible(false);
                      }}
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
                      onPress={() => {
                        setSelectedOption(null);
                        setShowSaveButton(false);
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
                        setShowSaveButton(false);
                        setEmailVerificationModalVisible(false);
                      }}
                  >
                    <Icon name="close" size={24} color="gray" />
                  </TouchableOpacity>

                  <Text style={styles.modalTitle}>Enter Verification Code</Text>

                  <TextInput
                      testID='verification-code'
                      style={styles.verificationInput}
                      placeholder="Verification Code"
                      keyboardType="numeric"
                      value={enteredEmailVerificationCode}
                      onChangeText={setEnteredEmailVerificationCode}
                  />

                  <TouchableOpacity
                      style={styles.modalNextButton}
                      onPress={() =>
                          handleEmailVerificationCode(enteredEmailVerificationCode)
                      }
                  >
                    <Text style={styles.saveButtonText}>Verify</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={styles.modalCancelButton}
                      onPress={handleCancelEmailVerification}
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
  currentEmailText: {
    textAlign: "center",
    padding: 20,
  },
});

export default NotificationPreferences;