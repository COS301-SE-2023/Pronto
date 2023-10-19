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
import { ActivityIndicator, View, ImageBackground, Text,Alert } from "react-native";
import { AnnouncementProvider } from "./ContextProviders/AnnouncementContext"
import { StudentProvider } from "./ContextProviders/StudentContext";
import { getStudent, listInstitutions } from "./graphql/queries";
import { createStudent } from "./graphql/mutations";
import { API } from "aws-amplify"
import { Amplify,DataStore,Predicates } from "aws-amplify";
import { Auth, Hub} from "aws-amplify";
import config from "./src/aws-exports";
import { Student } from "./models";

Auth.configure(config);
Amplify.configure(config);

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(undefined);
  const [student, setStudent] = useState(null);
  const checkUser = async () => {
    //console.log(navigation)
    try {
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      // const group = authUser.signInUserSession.idToken.payload["cognito:groups"][0];
      // console.log(group)
      //  if(group!=="studentsUserGroup"){
      //     Alert.alert("Admins and Lecturers should use the Web App")
      //     await Auth.signOut()

      //     //Redirect user here
      //     throw Error("Admins and Lecturers should use the Web App")
      //  }
      // console.log({ authUser });
      // if (student === null) {
      //   const email = authUser.attributes.email;
      //   let studentInfo = await API.graphql({
      //     query: getStudent,
      //     variables: { id: authUser.attributes.sub }
      //   });

      //   studentInfo = studentInfo.data.getStudent;
      //   setStudent(studentInfo);
      //   if (studentInfo === null) {

      //     try {
      //       //Create student
      //       // let name = authUser.attributes.name.split(",")
      //       // let newStudent = {
      //       //   id: authUser.attributes.sub,
      //       //   institutionId: authUser.attributes.family_name,
      //       //   firstname: name[0],
      //       //   lastname: name[1],
      //       //   userRole: "Student",
      //       //   email: email
      //       // }

      //       // let create = await API.graphql({
      //       //   query: createStudent,
      //       //   variables: { input: newStudent }
      //       // })

      //       // setStudent(create.data.createStudent);

      //     } catch (error) {
      //       console.log(e);
      //     }
      //   }
      // }
       const id=authUser.attributes.sub;
      // console.log(id);
      // const email=authUser.attributes.email;
      // let stu =await DataStore.query(Student,(s) => s.email.eq(email));
      // console.log("Student",stu);
      // stu=stu.filter((s)=>s._deleted===null && s.owner===id);
      // let temp=stu;
      // for(let i=0;i<stu.length;i++){
      //   if(temp.createdAt>stu[i].createdAt){
      //     temp=stu[i]
      //   }
      // }
      // console.log("Final ",stu);
      // const institutionId=authUser.attributes.family_name;
       let studentInfo = await DataStore.query(Student, id);
       console.log(studentInfo);
      // const email = authUser.attributes.email;
      //   let stu = await API.graphql({
      //     query: getStudent,
      //     variables: { id: id }
      //   });
      //   console.log(stu.data.createStudent);
     // if (studentInfo === null || studentInfo===undefined) {

        //Create student
       // let name = authUser.attributes.name.split(",")
        
        //console.log(authUser.attributes);        
      //  const email=authUser.attributes.email;
       // console.log(institutionId);
       //const inst = await DataStore.query(Institution, institutionId);
        //console.log(inst);
        // let c = await DataStore.save(
        //   new Student({
        //     "id": id,
        //     "institutionId": institutionId,
        //     "firstname": name[0],
        //     "lastname": name[1],
        //     "userRole": "Student",
        //     "email": email,
        //     "institution": inst,
        //   })
        // );
        // console.log(c);
        // let newStudent = {
        //       id: id,
        //       institutionId: institutionId,
        //       firstname: name[0],
        //       lastname: name[1],
        //       userRole: "Student",
        //       email: email
        //     }

        //     let create = await API.graphql({
        //       query: createStudent,
        //       variables: { input: newStudent }
        //     })
        //     console.log(create.data.createStudent); 
       // throw Error("Information could not be found");    
        
     // }
      setUser(authUser);
    } catch (e) {
      setUser(null);
      //await DataStore.clear();
      //await DataStore.start();

      console.log(e);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const listener = (data) => {
      if (data.payload.event === "signIn" || data.payload.event === "signOut") {
        //console.log(data.payload.event);
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