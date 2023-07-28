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
import React, { useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Auth } from "aws-amplify";

const { height } = Dimensions.get("window");

const ResetPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  //validate email input sign up
  const [emailIsValid, setEmailIsValid] = useState(false);

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = regex.test(value);
    setEmailIsValid(isValidEmail);
  };
  const [isTypingEmail, setIsTypingEmail] = useState(false);

  const onResetPasswordPressed = async () => {

    if (!emailIsValid) {
      Alert.alert("Error", "Please enter a valid email");
      return;
    }

    if (loading) return;

    setLoading(true);
    try {
      await Auth.forgotPassword(email);
      navigation.navigate("VerifyCode", { email });
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
            Forgot your password? No problem, just reset it here!
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            placeholderTextColor={"#666666"}
            value={email}
            onChangeText={(value) => {
              setEmail(value);
              validateEmail(value);
            }}
            style={[styles.input]}
            onFocus={() => setIsTypingEmail(true)}
          />

          {isTypingEmail && emailIsValid && (
            <View style={styles.iconContainer}>
              <Ionicons name="checkmark-circle" size={24} color="green" />
            </View>
          )}

          {isTypingEmail && !emailIsValid && (
            <View style={styles.iconContainer}>
              <MaterialIcons name="cancel" size={24} color="red" />
            </View>
          )}
        </View>

        <TouchableOpacity
          style={styles.signUpButton}
          onPress={onResetPasswordPressed}
        >
          <Text style={styles.signUpButtonText}>
            {loading ? "Sending..." : "Send code"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
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
    marginBottom: 20,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 15,
    maxWidth: "80%",
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
  inputFocused: {
    borderWidth: 2,
    borderColor: "#e32f45",
    shadowOffset: { width: 4 },
    shadowColor: "#e32f45",
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  signUpButton: {
    padding: 20,
    backgroundColor: "#e32f45",
    marginVertical: 20,
    borderRadius: 10,
    shadowColor: "#e32f45",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
  },
  signUpButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
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

export default ResetPassword;
