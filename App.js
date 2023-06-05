import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./navigation/tabs";
import WelcomeScreen from "./screens/Login/Welcome";
import Register from "./screens/Login/Register";
import Login from "./screens/Login/Login";
import ResetPassword from "./screens/Login/ResetPassword";
import VerifyCode from "./screens/Login/VerifyCode";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
      </Stack.Navigator>
    </NavigationContainer>

    // <NavigationContainer>
    //   <Tabs />
    // </NavigationContainer>
  );
}
