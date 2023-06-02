import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./navigation/tabs";
import WelcomeScreen from "./screens/Login/Welcome";
import NotificationPreferences from "./screens/Notifications/NotificationPreferences";
import Register from "./screens/Login/Register";
import Login from "./screens/Login/Login";
import ResetPassword from "./screens/Login/ResetPassword";
import VerifyCode from "./screens/Login/VerifyCode";
import ConfirmEmail from "./screens/Login/ConfirmEmail";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, Alert } from "react-native";

import { Amplify } from "aws-amplify";
import { Auth } from "aws-amplify";
import config from "./src/aws-exports";

Amplify.configure(config);
Auth.configure(config);

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

  if (user == undefined) {
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator />
    </View>;
  }

  return (
    <NavigationContainer>
      {user ? (
        <Tabs />
      ) : (
        <>
          <Stack.Navigator>
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="ResetPassword"
              component={ResetPassword}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="VerifyCode"
              component={VerifyCode}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ConfirmEmail"
              component={ConfirmEmail}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>

    /* <NavigationContainer>
      <Tabs />

      <Stack.Screen
        name="NotificationPreferences"
        component={NotificationPreferences}
        options={{
          headerShown: false,
        }}
      />
    </NavigationContainer> */
  );
}
