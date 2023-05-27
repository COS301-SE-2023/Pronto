import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ImageBackground,
  Dimensions,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

const Login = ({ navigation }) => {
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
            placeholderTextColor={"#666666"}
            style={styles.input}
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor={"#666666"}
            secureTextEntry={true}
            style={styles.input}
          />
        </View>

        <View>
          <Text style={styles.forgotPassword}>Forgot your password?</Text>
        </View>

        <TouchableOpacity style={styles.signInButton}>
          <Text style={styles.signInButtonText}>Sign in</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.createAccountButton}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.createAccountButtonText}>Create new account</Text>
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
    marginVertical: 40,
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
});

export default Login;
