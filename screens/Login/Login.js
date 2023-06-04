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
import { Ionicons } from "@expo/vector-icons";
import { Auth } from "aws-amplify";

const { height } = Dimensions.get("window");

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignInPressed = async (data) => {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      const response = await Auth.signIn(username, password);
      //  navigation.navigate("Timetable");
    } catch (e) {
      Alert.alert("Error...", e.message);
    }

    setLoading(false);
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
            placeholderTextColor={"#666666"}
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />

          <TextInput
            placeholder="Password"
            autoCapitalize="none"
            placeholderTextColor={"#666666"}
            secureTextEntry={true}
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
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
  inputContainer: {},
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
});

export default Login;
