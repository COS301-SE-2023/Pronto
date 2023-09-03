import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { Auth } from "aws-amplify";
import { useStudent } from "../../ContextProviders/StudentContext";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {student,updateStudent}=useStudent();
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      if(student===null){
        setIsLoading(true);
        const userInfo = await Auth.currentUserInfo();
        //setUser(userInfo);
        let studentEmail = userInfo.attributes.email; 
        let stu = await API.graphql({
          query: listStudents,
          variables: {
            filter: {
              email: {
                eq: studentEmail
              }
            }
          }
        })

        for (let i = 0; i < stu.data.listStudents.items.length; i++) {
          if (stu.data.listStudents.items[i].owner === user.attributes.sub) {
            stu = stu.data.listStudents.items[i];
            found = true;
            break;
          }
        }
        updateStudent(stu);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "#e32f45", fontSize: 24 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>User Information:</Text>
      <Text>These are the details that we have stored for you.</Text>
      <ImageBackground
        resizeMode="contain"
        //attribution: <a href="https://storyset.com/education">Education illustrations by Storyset</a>
        source={require("../../assets/icons/UserInfo.png")}
        style={styles.image}
      />

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.text}>{student?.firstname}</Text>

        <Text style={styles.label}>Surname:</Text>
        <Text style={styles.text}>{student?.lastname}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.text}>{student?.email}</Text>

        <Text style={styles.label}>Institution:</Text>
        <Text style={styles.text}>{student?.instituion?.name}</Text>

        <Text style={styles.label}>Phone number:</Text>
        <Text style={styles.text}>{user?.attributes?.email}</Text>
      </View>
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
  image: {
    width: 200, // Specify the desired width
    height: 200, // Specify the desired height
  },
  infoContainer: {
    borderWidth: 2,
    borderColor: "#e32f45",
    padding: 50,
    marginBottom: 20,
    textAlign: "center",
    borderRadius: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  heading: {
    fontSize: 25,
    color: "#e32f45",
    marginBottom: 20,
  },
});

export default ProfilePage;
