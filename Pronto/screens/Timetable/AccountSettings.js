import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import SettingsComponent from "../../components/SettingsComponent";

const AccountSettings = () => {
  const settingsOptions = [
        {
          title : "My profile",
          subTitle: "Edit your profile",
        },
        {
          title : "Notification Preferences",
          subTitle: "Change your notification preferences",
        }
        ,
        {
          title : "My profile",
          subTitle: "Edit your profile",
        }
  ]

  return (
    <View>
      <SettingsComponent />
    </View>
  );
};

export default AccountSettings;
