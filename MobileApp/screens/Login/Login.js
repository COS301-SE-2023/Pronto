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

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //validate email input for sign in and sign up
  const [emailIsValid, setEmailIsValid] = useState(false);

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = regex.test(value);
    setEmailIsValid(isValidEmail);
  };

  const [isTypingEmail, setIsTypingEmail] = useState(false);
  const [isTypingPassword, setIsTypingPassword] = useState(false);

  const onSignInPressed = async (data) => {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      const response = await Auth.signIn(username, password, {
        role: "Student",
      });
      //  navigation.navigate("Timetable");
    } catch (e) {
      Alert.alert("Sign in error", e.message);
    }

    setLoading(false);
  };

  //validate password on sign in
  const [passwordSignInIsValid, setPasswordSignInIsValid] = useState(false);
  const validateSignInPassword = (value) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isValidSignInPassword = regex.test(value);

    setPasswordSignInIsValid(isValidSignInPassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.centered}>
          <Text style={styles.title}>Login here</Text>
          <Text style={styles.subtitle}>
            Welcome back, sign in to access all your features!
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            placeholderTextColor="#666666"
            style={[styles.input]}
            value={username}
            onChangeText={(value) => {
              setUsername(value);
              validateEmail(value);
            }}
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
              setPasswordSignInIsValid(value);
              validateSignInPassword(value);
            }}
            onFocus={() => setIsTypingPassword(true)}
          />
          {isTypingPassword && passwordSignInIsValid && (
            <View style={styles.iconContainer}>
              <Ionicons name="checkmark-circle" size={24} color="green" />
            </View>
          )}

          {isTypingPassword && !passwordSignInIsValid && (
            <View style={styles.iconContainer}>
              <MaterialIcons name="cancel" size={24} color="red" />
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.signInButton} onPress={onSignInPressed}>
          <Text style={styles.signInButtonText}>
            {loading ? "Signing in..." : "Sign in"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("ResetPassword")}>
          <View>
            <Text style={styles.forgotPassword}>
              Forgot your password? &#x2192;
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.createAccountButton}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.createAccountButtonText}>
            Create new account &#x2192;
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
  inputContainer: { position: "relative" },

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
    marginBottom: 15,
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
    alignSelf: "flex-end",

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

export default Login;
