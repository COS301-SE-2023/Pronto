import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./navigation/tabs";
import WelcomeScreen from "./screens/Login/Welcome";
import NotificationPreferences from "./screens/Notifications/NotificationPreferences";
import Register from "./screens/Login/Register";
import Login from "./screens/Login/Login";
import ResetPassword from "./screens/Login/ResetPassword";
import VerifyCode from "./screens/Login/VerifyCode";
import AccountSettings from "./screens/Timetable/AccountSettings";
import ConfirmEmail from "./screens/Login/ConfirmEmail";
import PrivacyPolicyScreen from "./screens/Settings/PrivacyPolicy";
import ProfilePage from "./screens/Settings/Profile";
import AboutScreen from "./screens/Settings/About";
import HelpScreen from "./screens/Settings/HelpScreen";
import DeleteAccountPage from "./screens/Settings/DeleteAccount";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, Text } from "react-native";

import { Amplify } from "aws-amplify";
import { Auth, Hub } from "aws-amplify";
import config from "./src/aws-exports";

Auth.configure(config);

Amplify.configure(config);

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(undefined);

  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      setUser(authUser);
    } catch (e) {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const listener = (data) => {
      if (data.payload.event === "signIn" || data.payload.event === "signOut") {
        checkUser();
      }
    };
    Hub.listen("auth", listener);
    return () => Hub.remove("auth", listener);
  }, []);

  if (user === undefined) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "#e32f45",
            fontSize: 24,
            fontWeight: 200,
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          Loading...
        </Text>
        <ActivityIndicator color={"#e32f45"} size={"large"} />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
              name="Tabs"
              component={Tabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AccountSettings"
              component={AccountSettings}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Notification Preferences"
              component={NotificationPreferences}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="Privacy Policy"
              component={PrivacyPolicyScreen}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="Profile Page"
              component={ProfilePage}
              options={{ headerShown: true }}
            />

            <Stack.Screen
              name="Reset Password"
              component={ResetPassword}
              options={{ headerShown: true }}
            />

            <Stack.Screen
              name="Delete Account"
              component={DeleteAccountPage}
              options={{ headerShown: true }}
            />

            <Stack.Screen
              name="About"
              component={AboutScreen}
              options={{ headerShown: true }}
            />


            <Stack.Screen
              name="Help"
              component={HelpScreen}
              options={{ headerShown: true }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ResetPassword"
              component={ResetPassword}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="VerifyCode"
              component={VerifyCode}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ConfirmEmail"
              component={ConfirmEmail}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
