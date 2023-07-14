import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import { Auth } from "aws-amplify";

const DeleteAccountPage = () => {
  const handleDeleteAccount = async () => {
    try {
      await Auth.currentAuthenticatedUser().then((user) => {
        return Auth.deleteUser(user);
      });
      Alert.alert(
        "Account Deleted",
        "Your account has been successfully deleted."
      );
    } catch (error) {
      console.log("Error deleting account:", error);
      Alert.alert(
        "Error",
        "An error occurred while deleting your account. Please try again later."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delete Account</Text>
      <Text
        style={{
          textAlign: "center",
        }}
      >
        This will clear all of your app settings and delete all of your
        information.
      </Text>
      <ImageBackground
        resizeMode="contain"
        //attribution: <a href="https://storyset.com/education">Education illustrations by Storyset</a>
        source={require("../../assets/icons/DeleteAccount.png")}
        style={styles.image}
      />
      <Text style={styles.subtitle}>
        Are you sure you want to delete your account?
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleDeleteAccount}>
        <Text style={styles.buttonText}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#e32f45",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#e32f45",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  image: {
    width: 200, // Specify the desired width
    height: 200, // Specify the desired height
    alignSelf: "center",
  },
});

export default DeleteAccountPage;
