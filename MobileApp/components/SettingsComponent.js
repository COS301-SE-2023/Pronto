import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { ScrollView } from "react-native";
import { Button, Modal, Portal, PaperProvider } from "react-native-paper";
import { Auth } from "aws-amplify";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const SettingsComponent = ({ settingsOptions }) => {
  const onLogoutPressed = () => {
    Auth.signOut();
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
              marginVertical: 40,
              marginHorizontal: 20,
            }}
            outlined={true}
            onPress={onLogoutPressed}
            testID="logout-button"
          >
            Logout
          </Button>
        </View>
      </ScrollView>

      <Stack.Navigator>
        <Stack.Screen
          name="NotificationPreferences"
          component={NotificationPreferences}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </View>
  );
};

export default SettingsComponent;
