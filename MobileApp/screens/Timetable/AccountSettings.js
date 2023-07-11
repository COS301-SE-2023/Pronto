import React from "react";
import { View } from "react-native";
import SettingsComponent from "../../components/SettingsComponent";
import { useNavigation } from "@react-navigation/native";

const AccountSettings = () => {
  const navigation = useNavigation();

  const settingsOptions = [
    {
      title: "My profile",
      subTitle: "Edit your profile",
      onPress: () => {},
    },
    {
      title: "Notification Preferences",
      subTitle: "Change your notification preferences",
      onPress: () => navigation.navigate("Notification Preferences"),
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
