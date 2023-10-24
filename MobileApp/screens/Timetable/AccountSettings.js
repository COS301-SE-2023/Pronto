import React from "react";
import { View,ScrollView } from "react-native";
import SettingsComponent from "../../components/SettingsComponent";
import { useNavigation } from "@react-navigation/native";

const AccountSettings = () => {
  const navigation = useNavigation();

  const settingsOptions = [
    {
      title: "My profile",
      subTitle: "View your profile information",
      onPress: () => navigation.navigate("Profile Page"),
    },
    {
      title: "Security",
      subTitle: "Change your password",
      onPress: () => navigation.navigate("Reset Password"),
    },
    {
      title: "Reset",
      subTitle: "Delete your account and all of your information",
      onPress: () => navigation.navigate("Delete Account"),
    },
    {
      title: "Privacy Policy",
      subTitle: "Privacy Policy of the Pronto application",
      onPress: () => navigation.navigate("Privacy Policy"),
    },
    {
      title: "About",
      subTitle: "About the Pronto application",
      onPress: () => navigation.navigate("About"),
    }
  ];

  return (
    <View>
      <SettingsComponent settingsOptions={settingsOptions} />
    </View>
  );
};

export default AccountSettings;
