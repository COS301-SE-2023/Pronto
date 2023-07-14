import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Auth } from "aws-amplify";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userInfo = await Auth.currentUserInfo();
      setUser(userInfo);
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <Text style={styles.text}>{user?.attributes?.name}</Text>

      <Text style={styles.label}>Surname:</Text>
      <Text style={styles.text}>{user?.attributes?.family_name}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.text}>{user?.attributes?.email}</Text>
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
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default ProfilePage;
