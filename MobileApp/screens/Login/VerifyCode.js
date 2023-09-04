import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ImageBackground,
  Dimensions,
  Alert,
} from "react-native";
import React from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Auth } from "aws-amplify";

const { height } = Dimensions.get("window");

const VerifyCode = ({ navigation }) => {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  //validate password on sign up
  const [passwordSignUpIsValid, setPasswordSignUpIsValid] = useState(false);
  const validateSignUpPassword = (value) => {
    const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()?])[A-Za-z\d!@#$%^&*()?]{8,}$/;
    const isValidSignUpPassword = regex.test(value);

    setPasswordSignUpIsValid(isValidSignUpPassword);
  };
  const [isTypingPassword, setIsTypingPassword] = useState(false);

  //validating confirm password
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [isTypingPasswordMatch, setIsTypingPasswordMatch] = useState(false);

  const validateConfirmPassword = (value) => {
    setPasswordMatch(value === password);
  };

  const route = useRoute();
  let email = route.params.email;

  const onResetPasswordPressed = async () => {
    if (loading) return;

    if (confirmPassword !== password) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await Auth.forgotPasswordSubmit(email, code, password);
      Alert.alert("Success", "Password successfully changed!");
      navigation.navigate("Login");
    } catch (e) {
      Alert.alert("Error", e.message);
    }
    setLoading(false);
  };
  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.centered}>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>
              Enter the code sent to your email and pick a new password.
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
                placeholder="Code"
                placeholderTextColor={"#666666"}
                value={code}
                onChangeText={setCode}
                style={styles.input}
            />

            <View style={styles.inputContainer}>
              <TextInput
                  testID='new-password'
                  placeholder="New Password"
                  autoCapitalize="none"
                  placeholderTextColor="#666666"
                  secureTextEntry={true}
                  style={[styles.input]}
                  value={password}
                  onChangeText={(value) => {
                    setPassword(value);
                    setPasswordSignUpIsValid(value);
                    validateSignUpPassword(value);
                  }}
                  onFocus={() => setIsTypingPassword(true)}
              />
              {isTypingPassword && passwordSignUpIsValid && (
                  <View style={styles.iconContainer}>
                    <Ionicons name="checkmark-circle" size={24} color="green" />
                  </View>
              )}

              {isTypingPassword && !passwordSignUpIsValid && (
                  <View style={styles.iconContainer} testID='cancel'>
                    <MaterialIcons name="cancel" size={24} color="red" />
                  </View>
              )}
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                  testID='confirm-new-password'
                  placeholder="Confirm New Password"
                  autoCapitalize="none"
                  placeholderTextColor={"#666666"}
                  value={confirmPassword}
                  secureTextEntry={true}
                  onFocus={() => setIsTypingPasswordMatch(true)}
                  style={styles.input}
                  onChangeText={(value) => {
                    setConfirmPassword(value);
                    validateConfirmPassword(value);
                  }}
                  passwordMatch={passwordMatch}
              />

              {isTypingPasswordMatch && passwordMatch && (
                  <View style={styles.iconContainer}>
                    <Ionicons name="checkmark-circle" size={24} color="green" />
                  </View>
              )}

              {isTypingPasswordMatch && !passwordMatch && (
                  <View style={styles.iconContainer} testID='cancel'>
                    <MaterialIcons name="cancel" size={24} color="red"/>
                  </View>
              )}
            </View>
          </View>

          <TouchableOpacity
              testID='reset-button'
              style={styles.signInButton}
              onPress={onResetPasswordPressed}
          >
            <Text style={styles.signInButtonText}>
              {loading ? "Resetting..." : "Reset Password"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
              testID='back-to-sign-in'
              style={styles.haveAccountButton}
              onPress={() => navigation.navigate("Login")}

          >
            <Text style={styles.haveAccountButtonText}>
              {" "}
              &#x2190; Back to sign in
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  centered: {
    alignItems: "center",
  },
  title: {
    fontSize: 33,
    color: "#e32f45",
    fontWeight: "bold",
    marginTop: 20,
    opacity: 0.9,
    marginBottom: 10,
  },
  subtitle: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
    maxWidth: "70%",
  },
  inputContainer: {
    position: "relative",
  },
  input: {
    fontSize: 15,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#E7DADA",
    opacity: 0.7,
    marginVertical: 10,
  },
  forgotPassword: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#e32f45",
    alignSelf: "flex-end",
  },
  signInButton: {
    padding: 20,
    backgroundColor: "#e32f45",
    marginVertical: 20,
    borderRadius: 10,
    shadowColor: "#e32f45",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
  },
  signInButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  createAccountButton: {
    padding: 10,
  },
  createAccountButtonText: {
    color: "black",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  haveAccountButton: {
    padding: 10,
  },
  haveAccountButtonText: {
    color: "black",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  iconContainer: {
    position: "absolute",
    top: "50%",
    right: 10,
    transform: [{ translateY: -12 }],
  },
});

export default VerifyCode;
