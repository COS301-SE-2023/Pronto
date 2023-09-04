import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import { Auth, API } from "aws-amplify";
import { listStudents } from "../../graphql/queries"
import { deleteStudent } from "../../graphql/mutations";
const DeleteAccountPage = () => {
  const handleDeleteAccount = async () => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to delete your account?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete Account",
          onPress: async () => {
            try {

              let user = await Auth.currentAuthenticatedUser()
              let studentEmail = user.attributes.email;
              let stu = await API.graphql({
                query: listStudents,
                variables: {
                  filter: {
                    email: {
                      eq: studentEmail
                    }
                  }
                },
                authMode: "AMAZON_COGNITO_USER_POOLS"
              })
              //stu=stu.data.listStudents.items[0]
              let found = false
              for (let i = 0; i < stu.data.listStudents.items.length; i++) {
                if (stu.data.listStudents.items[i].owner === user.attributes.sub) {
                  stu = stu.data.listStudents.items[i]
                  found = true
                  break
                }
              }
              if (found) {

                let del = await API.graphql({
                  query: deleteStudent,
                  variables: { input: { id: stu.id } },
                  authMode: "AMAZON_COGNITO_USER_POOLS"
                })
              }
              await Auth.currentAuthenticatedUser().then((user) => {
                return Auth.deleteUser(user);
              });

              Alert.alert(
                "Account Deleted",
                "Your account has been successfully deleted."
              );
            } catch (error) {

              Alert.alert("Error", "An error occurred while deleting your account. Please try again later."
              );
            }
          },
          style: "destructive", // This will display the button in red to indicate it's a destructive action
        },
      ]
    );
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
