import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/tabs";
import WelcomeScreen from "./screens/Login/Welcome";

export default function App() {
  return (
    <WelcomeScreen />

    // <NavigationContainer>
    //   <Tabs />
    // </NavigationContainer>
  );
}
