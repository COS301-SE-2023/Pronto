import React from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
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
      <Text style={styles.subtitle}>
        Are you sure you want to delete your account?
      </Text>
      <Button title="Delete Account" onPress={handleDeleteAccount} />
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
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
});

export default DeleteAccountPage;
