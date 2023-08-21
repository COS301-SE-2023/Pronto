import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { ScrollView } from "react-native";
import { Button, Modal, Portal, PaperProvider } from "react-native-paper";
import { Auth } from "aws-amplify";
import { NavigationContainer } from "@react-navigation/native";
import NotificationPreferences from "../screens/Notifications/NotificationPreferences";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


const SettingsComponent = ({ settingsOptions }) => {
  const navigation = useNavigation();

  const onLogoutPressed = () => {
    Auth.signOut();
  };

  const onHelpPressed = () => {
    navigation.navigate("Help");
  };

  const Stack = createNativeStackNavigator();

  return (
    <View style={{ height: "100%" }}>
      <ScrollView>
        {settingsOptions.map(({ title, subTitle, onPress }) => (
          <TouchableOpacity key={title} testID="option" onPress={onPress}>
            <View
              style={{
                paddingHorizontal: 20,
                paddingBottom: 20,
                paddingTop: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                }}
                testID="option-title"
              >
                {title}
              </Text>
              {subTitle && (
                <Text
                  style={{
                    fontSize: 14,
                    opacity: 0.5,
                    paddingTop: 5,
                  }}
                  testID="option-subtitle"
                >
                  {subTitle}
                </Text>
              )}
            </View>

            <View style={{ height: 0.5, backgroundColor: "grey" }} />
          </TouchableOpacity>
        ))}

        <View style={{ height: "100%" }}>

          <Button
            icon="logout"
            mode="contained"
            style={{
              backgroundColor: "#e32f45",
              marginVertical: 20,
              marginHorizontal: 20,
            }}
            outlined={true}
            onPress={onLogoutPressed}
            testID="logout-button"
          >
            Logout
          </Button>

          <TouchableOpacity
            style={{
              position: "absolute",
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 2,
              elevation: 3,
              borderRadius: 25, // Half of the width/height for a circular shape
              justifyContent: "center",
              alignItems: "center",
              top: "12%", // Adjust the top position as needed
              right: "8%", // Adjust the right position as needed
            }}
            onPress={onHelpPressed} // Implement the function for the help action
            testID="help-button"
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: "grey", marginRight: 5 }}>Need help</Text>
              <Icon name="help-circle-outline" size={50} color="grey" />
            </View>

          </TouchableOpacity>
        </View>
      </ScrollView >
    </View >
  );
};

export default SettingsComponent;
