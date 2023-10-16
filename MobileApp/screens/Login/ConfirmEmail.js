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
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Auth } from "aws-amplify";


const { height } = Dimensions.get("window");

const ConfirmEmail = ({ navigation }) => {
  const route = useRoute();
  let email = route.params.email;
  const [code, setCode] = useState("");

  const [loading, setLoading] = useState(false);

  const [loadingResend, setLoadingResend] = useState(false);

  const onVerifyPressed = async () => {
    if (loading) return;

    setLoading(true);
    try {
      response = await Auth.confirmSignUp(email, code, { clientMetadata: { role: "Student" } });

      //need to add user to a user group here?
      console.log(response);
      Alert.alert("Success", "Login to access your account.");
      navigation.navigate("Login");
    } catch (e) {
      Alert.alert("Error", e.message);
    }
    setLoading(false);
  };

  const onResendPressed = async () => {
    if (loadingResend) return;

    setLoadingResend(true);
    try {
      response = await Auth.resendSignUp(email);
      Alert.alert("Success", "Code was resent to: " + email);
    } catch (e) {
      Alert.alert("Error", e.message);
    }
    setLoadingResend(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.centered}>
          <Text style={styles.title}>Confirm Account</Text>
          <Text style={styles.subtitle}>
            Enter the code sent to your email to confirm your account.
          </Text>
          <ImageBackground
            resizeMode="contain"
            //attribution: <a href="https://storyset.com/education">Education illustrations by Storyset</a>
            source={require("../../assets/icons/ConfirmAccount.png")}
            style={styles.image}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Code"
            placeholderTextColor={"#666666"}
            style={styles.input}
            value={code}
            onChangeText={setCode}
          />
        </View>

        <TouchableOpacity style={styles.signInButton} onPress={onVerifyPressed} testID="verify-button" disabled={loading}>
          <Text style={styles.signInButtonText}>
            {loading ? "Verifying..." : "Verify Account"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resendButton} onPress={onResendPressed} testID="resend-button" disabled={loadingResend}>
          <Text style={styles.resendButtonText} >
            {" "}
            {loadingResend ? "Resending..." : "Resend Code"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.haveAccountButton}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.haveAccountButtonText}>
            {" "}
            &#x2190; Back to register
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
    marginVertical: 20,
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
  resendButton: {
    padding: 20,

    marginVertical: 20,
    borderWidth: 1,
    borderRadius: 10,
  },
  resendButtonText: {
    color: "black",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
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
  image: {
    width: 200, // Specify the desired width
    height: 200, // Specify the desired height
    alignSelf: "center",
  },
});

export default ConfirmEmail;
