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

import PasswordCriteriaMessage from "./PasswordCriteriaMessage";

const { height } = Dimensions.get("window");

const Register = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //validate email input sign up
  const [emailIsValid, setEmailIsValid] = useState(false);

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = regex.test(value);
    setEmailIsValid(isValidEmail);
  };
  const [isTypingEmail, setIsTypingEmail] = useState(false);

  //validate password on sign up
  const [passwordSignUpIsValid, setPasswordSignUpIsValid] = useState(false);
  const validateSignUpPassword = (value) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isValidSignUpPassword = regex.test(value);

    setPasswordSignUpIsValid(isValidSignUpPassword);

    setPasswordCriteria({
      length: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      digit: /\d/.test(value),
      specialChar: /[@$!%*?&]/.test(value),
    });
  };

  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    digit: false,
    specialChar: false,
  });

  const [isTypingPassword, setIsTypingPassword] = useState(false);

  //validate name and surname on sign up
  const [nameIsValid, setNameIsValid] = useState(false);
  const [surnameIsValid, setSurnameIsValid] = useState(false);
  const [isTypingName, setIsTypingName] = useState(false);
  const [isTypingSurname, setIsTypingSurname] = useState(false);

  const validateName = (value) => {
    const regex = /[a-zA-Z]+/;
    const isValidName = regex.test(value);
    setNameIsValid(isValidName);
  };

  const validateSurname = (value) => {
    const regex = /[a-zA-Z]+/;
    const isValidSurname = regex.test(value);
    setSurnameIsValid(isValidSurname);
  };

  const onSignUpPressed = async () => {
    if (loading) {
      return;
    }

    if (confirmPassword !== password) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      navigation.navigate("ConfirmEmail", { email });
      await Auth.signUp({
        username: email,
        password,
        attributes: { email, family_name: surname, name },
        clientMetadata: { ROLES: "Student" },
      });

      navigation.navigate("ConfirmEmail", { email });
    } catch (e) {
      Alert.alert("Error", e.message);
    }
    setLoading(false);
  };

  //validating confirm password
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [isTypingPasswordMatch, setIsTypingPasswordMatch] = useState(false);

  const validateConfirmPassword = (value) => {
    setPasswordMatch(value === password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.centered}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Create an account so you can explore all the features!
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Name"
            onFocus={() => setIsTypingName(true)}
            value={name}
            onChangeText={(value) => {
              setName(value);
              validateName(value);
            }}
            placeholderTextColor={"#666666"}
            style={styles.input}
          />

          {isTypingName && nameIsValid && (
            <View style={styles.iconContainer}>
              <Ionicons name="checkmark-circle" size={24} color="green" />
            </View>
          )}

          {isTypingName && !nameIsValid && (
            <View style={styles.iconContainer}>
              <MaterialIcons name="cancel" size={24} color="red" />
            </View>
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Surname"
            onFocus={() => setIsTypingSurname(true)}
            value={surname}
            onChangeText={(value) => {
              setSurname(value);
              validateSurname(value);
            }}
            placeholderTextColor={"#666666"}
            style={styles.input}
          />

          {isTypingSurname && surnameIsValid && (
            <View style={styles.iconContainer}>
              <Ionicons name="checkmark-circle" size={24} color="green" />
            </View>
          )}

          {isTypingSurname && !surnameIsValid && (
            <View style={styles.iconContainer}>
              <MaterialIcons name="cancel" size={24} color="red" />
            </View>
          )}
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

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Password"
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
            <View style={styles.iconContainer}>
              <MaterialIcons name="cancel" size={24} color="red" />
            </View>
          )}

          {isTypingPassword && !passwordSignUpIsValid && (
            <PasswordCriteriaMessage criteria={passwordCriteria} />
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Confirm Password"
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
            <View style={styles.iconContainer}>
              <MaterialIcons name="cancel" size={24} color="red" />
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.signUpButton} onPress={onSignUpPressed}>
          <Text style={styles.signUpButtonText}>
            {" "}
            {loading ? "Signing up..." : "Sign up"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.haveAccountButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.haveAccountButtonText}>
            Already have an account?
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

export default Register;
