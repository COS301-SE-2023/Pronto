import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import { Auth, API, DataStore } from "aws-amplify";
import { getStudent } from "../../graphql/queries"
import { deleteStudent } from "../../graphql/mutations";
import { useStudent } from "../../ContextProviders/StudentContext";
import { useNavigation } from "@react-navigation/native";
import { Student } from "../../models";

const DeleteAccountPage = () => {
  const { student, updateStudent } = useStudent();
  const [deleting, setDeleting] = useState(false);
  const navigation = useNavigation();

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

            setDeleting(true);
            try {

              let stu = student
              // if (student === null) {
              //   const user = await Auth.currentAuthenticatedUser()
              //   let studentEmail = user.attributes.email;
              //   let stu = await API.graphql({
              //     query: getStudent,
              //     variables: { id: user.attributes.sub },
              //   })
              //   stu = stu.data.getStudent
              // }

              // if (stu !== null) {
              //   // try {

              //   //   let del = await API.graphql({
              //   //     query: deleteStudent,
              //   //     variables: { input: { id: stu.id,_version:stu._version } }
              //   //   })
              //   // } catch (e) {
              //   //     console.log(e);
              //   // }
              //   updateStudent(null);
              //   navigation.navigate("Welcome");
              //   setDeleting(false);
              // }
              try {
                const user = await Auth.currentAuthenticatedUser();
                const id = user.attributes.sub;
                stu = await DataStore.query(Student, id);
                await DataStore.delete(stu);
                await DataStore.clear();
              } catch (error) {
                console.log(error);
              }
              await Auth.currentAuthenticatedUser().then((user) => {
                return Auth.deleteUser(user);
              });

              Alert.alert(
                "Account Deleted",
                "Your account has been successfully deleted."
              );
              // navigation.navigate("Welcome");
              setDeleting(false);
              //}
            } catch (error) {
              Alert.alert("Error", "An error occurred while deleting your account. Please try again later.");
              setDeleting(false);
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
      <TouchableOpacity style={styles.button} onPress={handleDeleteAccount} disabled={deleting}>
        <Text style={styles.buttonText}>{deleting ? "Deleting..." : "Delete Account"}</Text>
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
    borderRadius: 25,
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
