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
import { ActivityIndicator, View, ImageBackground, Text } from "react-native";
import {AnnouncementProvider} from "./ContextProviders/AnnouncementContext"
import {StudentProvider,useStudent} from "./ContextProviders/StudentContext";
import { getStudent,listInstitutions } from "./graphql/queries";
import {createStudent} from "./graphql/mutations";
import {API} from "aws-amplify"
import { Amplify } from "aws-amplify";
import { Auth, Hub } from "aws-amplify";
import config from "./src/aws-exports";

Auth.configure(config);

Amplify.configure(config);

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(undefined);
  const [student,setStudent]=useState("")
  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      const email=authUser.attributes.email;
      let studentInfo = await API.graphql({
        query: getStudent,
        variables: {id:authUser.attributes.sub}
      });
      console.log("From app")
      studentInfo=studentInfo.data.getStudent
      console.log(studentInfo);
      setStudent(studentInfo);
      if(studentInfo===null){
        console.log("Creating new student")
        try{
          let domain = email.split("@")[1]
          let institution = await API.graphql({
            query: listInstitutions,
            variables: {
              filter: {
                domains: {
                  contains: domain
                }
              }
            }
          })

          
          institution = institution.data.listInstitutions.items[0]
          console.log(institution)
          //Create student
          let newStudent = {
            id:authUser.attributes.sub,
            institutionId: institution.id,
            firstname: authUser.attributes.name,
            lastname: authUser.attributes.family_name,
            preference:"push",
            userRole: "Student",
            email: email
          }
          let create = await API.graphql({
            query: createStudent,
            variables: { input: newStudent }
          })
         console.log(create);
         setStudent(create.data.createStudent)
        }catch(error){
          console.log(error)
          console.log("Error fetching student info");
        }
      }
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
      <StudentProvider>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >

        <ImageBackground
          resizeMode="contain"

          source={require("./assets/splash.gif")}
          style={{ width: 403, height: 508, alignSelf: "center" }}
        />

        <View style={{ display: "flex", flexDirection: "row" }}>
          <ActivityIndicator color={"#e32f45"} size={"small"} />
          <Text style={{ color: "#e32f45" }}> Checking account details...</Text>

        </View>


      </View>
      </StudentProvider>
    );
  }
  return (
    <StudentProvider>
      <AnnouncementProvider>
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
              name="Tabs"
              component={Tabs}
              initialParams={student}
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
    </AnnouncementProvider>
    </StudentProvider>
  );
}
