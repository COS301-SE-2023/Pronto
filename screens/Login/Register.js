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

const Register = ({ navigation }) => {
  const [focusedEmail, setFocusedEmail] = useState(false);
  const [focusedPassword, setFocusedPassword] = useState(false);
  const [focusedConfirm, setFocusedConfirm] = useState(false);
  const [focusedName, setFocusedName] = useState(false);
  const [focusedSurname, setFocusedSurname] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  var address = "";

  const onSignUpPressed = async () => {
    try {
      navigation.navigate("ConfirmEmail", { email });
      await Auth.signUp({
        username: email,
        password,
        attributes: { address, email, family_name: surname, name },
      });

      navigation.navigate("ConfirmEmail", { email });
    } catch (e) {
      Alert.alert("Error", e.message);
    }
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
            onFocus={() => setFocusedName(true)}
            onBlur={() => setFocusedName(false)}
            value={name}
            onChangeText={setName}
            placeholderTextColor={"#666666"}
            style={[styles.input, focusedName && styles.inputFocused]}
          />

          <TextInput
            placeholder="Surname"
            onFocus={() => setFocusedSurname(true)}
            onBlur={() => setFocusedSurname(false)}
            value={surname}
            onChangeText={setSurname}
            placeholderTextColor={"#666666"}
            style={[styles.input, focusedSurname && styles.inputFocused]}
          />

          <TextInput
            placeholder="Email"
            onFocus={() => setFocusedEmail(true)}
            onBlur={() => setFocusedEmail(false)}
            placeholderTextColor={"#666666"}
            value={email}
            onChangeText={setEmail}
            style={[styles.input, focusedEmail && styles.inputFocused]}
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor={"#666666"}
            secureTextEntry={true}
            onFocus={() => setFocusedPassword(true)}
            onBlur={() => setFocusedPassword(false)}
            value={password}
            onChangeText={setPassword}
            style={[styles.input, focusedPassword && styles.inputFocused]}
          />

          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor={"#666666"}
            secureTextEntry={true}
            onFocus={() => setFocusedConfirm(true)}
            onBlur={() => setFocusedConfirm(false)}
            style={[styles.input, focusedConfirm && styles.inputFocused]}
          />
        </View>

        <TouchableOpacity style={styles.signUpButton} onPress={onSignUpPressed}>
          <Text style={styles.signUpButtonText}>Sign up</Text>
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
});

export default Register;
