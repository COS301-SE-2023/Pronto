import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import SettingsComponent from "../../components/SettingsComponent";

const AccountSettings = ({ navigation }) => {
  const settingsOptions = [
    {
      title: "My profile",
      subTitle: "Edit your profile",
      onPress: () => {},
    },
    {
      title: "Notification Preferences",
      subTitle: "Change your notification preferences",
      onPress: () => navigation.navigate("NotificationPreferences"),
    },
    {
      title: "Security",
      subTitle: "Change your password",
      onPress: () => {},
    },
    {
      title: "Reset",
      subTitle: "Reset all of your app information",
      onPress: () => {},
    },
    {
      title: "Privacy Policy",
      subTitle: "Privacy Policy of the Pronto application",
      onPress: () => {},
    },
    {
      title: "About",
      subTitle: null,
      onPress: () => {},
    },
  ];

  return (
    <View>
      <SettingsComponent settingsOptions={settingsOptions} />
    </View>
  );
};

export default AccountSettings;
