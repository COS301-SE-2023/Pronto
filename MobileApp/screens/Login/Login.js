import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ImageBackground,
  Dimensions,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
// import { SelectList } from "react-native-dropdown-select-list";
// import institutionInfo from "../../assets/data/universityInfo.json";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Auth, API, DataStore } from "aws-amplify";
import { getStudent } from "../../graphql/queries";
import { createStudent } from "../../graphql/mutations";
import { useStudent } from "../../ContextProviders/StudentContext";
import { Student,Institution } from "../../models";
const { height } = Dimensions.get("window");

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { student, updateStudent } = useStudent();

  //validate email input for sign in and sign up
  const [emailIsValid, setEmailIsValid] = useState(false);

  //select instituition
  // const [institutionId, setInstitutionId] = useState("");
  // const [instituions, setInstitutions] = useState([]);

  //Validate institutionId
  // const [isInstitutionIdValid, setIsInstitutionIdValid] = useState(false);
  // const validateInstitutionId = () => {
  //   setIsInstitutionIdValid(institutionId && institutionId !== "notSet");
  // };

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = regex.test(value);
    setEmailIsValid(isValidEmail);
  };

  const [isTypingEmail, setIsTypingEmail] = useState(false);


  const onSignInPressed = async (data) => {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      const signInObject = {
        username: username,
        password: password,
        validationData: {
          role: "Student",
        }
      }

      const user = await Auth.signIn(signInObject);
      
      let studentInfo = student;
     // if (student === null) {
        const email = user.attributes.email;
        const id=user.attributes.sub;
        // studentInfo = await API.graphql({
        //   query: getStudent,
        //   variables: { id: user.attributes.sub }
        // });
        // studentInfo = studentInfo.data.getStudent;
        //updateStudent(studentInfo);

        studentInfo=await DataStore.query(Student,id);
        console.log(studentInfo);
        if (studentInfo === null) {

          //Create student
          let name = user.attributes.name.split(",")
          const institutionId=user.attributes.family_name;
          
          // let newStudent = {
          //   id: user.attributes.sub,
          //   institutionId: user.attributes.family_name,
          //   firstname: name[0],
          //   lastname: name[1],
          //   userRole: "Student",
          //   email: email
          // }
          const inst=await DataStore.query(Institution,institutionId);
          let c=await DataStore.save(
              new Student({
                "id":id,
		            "institutionId": institutionId,
		            "firstname": name[0],
		            "lastname": name[1],
		            "userRole": "Student",
		            "email": email,
		            "institution": inst,
	          })
          );
          console.log(inst);

          // let create = await API.graphql({
          //   query: createStudent,
          //   variables: { input: newStudent }
          // })

          //studentInfo = create.data.createStudent;
         // console.log(create);
         // updateStudent(create.data.createStudent);
       // }
      }
      navigation.navigate("Tabs", studentInfo);
    } catch (e) {
      console.log(e);
      Alert.alert("Sign in error", e.message);
      setLoading(false);
    }

  };

  //validate password on sign in


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.centered}>
          <Text style={styles.title}>Login here</Text>
          <Text style={styles.subtitle}>
            Welcome back, sign in to access all your features!
          </Text>

          <ImageBackground
            resizeMode="contain"
            //attribution: <a href="https://storyset.com/education">Education illustrations by Storyset</a>
            source={require("../../assets/icons/login.png")}
            style={styles.image}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            placeholderTextColor="#666666"
            style={[styles.input]}
            value={username}
            onChangeText={(value) => {
              setUsername(value);
              validateEmail(value);
            }}
            onFocus={() => setIsTypingEmail(true)}
          />
          {isTypingEmail && emailIsValid && (
            <View style={styles.iconContainer}>
              <Ionicons name="checkmark-circle" size={24} color="green" />
            </View>
          )}

          {isTypingEmail && !emailIsValid && (
            <View style={styles.iconContainer}>
              <MaterialIcons name="cancel" size={24} color="red" />
            </View>
          )}
        </View>
        <View style={styles.inputContainer}>
          {/* Update the boxStyles prop for SelectList */}

        </View>


        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Password"
            autoCapitalize="none"
            placeholderTextColor="#666666"
            secureTextEntry={true}
            style={[styles.input]}
            value={password}
            onChangeText={(value) => {
              setPassword(value);
            }}

          />

        </View>

        <TouchableOpacity style={styles.signInButton} onPress={onSignInPressed}>
          <Text style={styles.signInButtonText}>
            {loading ? "Signing in..." : "Sign in"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("ResetPassword")}>
          <View>
            <Text style={styles.forgotPassword}>
              Forgot your password? &#x2192;
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.createAccountButton}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.createAccountButtonText}>
            Create new account &#x2192;
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  centered: {
    alignItems: "center",
  },
  title: {
    fontSize: 33,
    color: "#e32f45",
    fontWeight: "bold",
    marginTop: 20,
    opacity: 0.9,
    marginBottom: 10,
  },
  subtitle: {
    fontWeight: "600",
    textAlign: "center",
    fontSize: 15,
    maxWidth: "70%",
  },
  inputContainer: { position: "relative" },

  input: {
    fontSize: 15,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#E7DADA",
    opacity: 0.7,
    marginVertical: 10,
  },
  forgotPassword: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#e32f45",
    alignSelf: "flex-end",
    marginBottom: 15,
  },
  signInButton: {
    padding: 20,
    backgroundColor: "#e32f45",
    marginVertical: 20,
    borderRadius: 10,
    shadowColor: "#e32f45",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
  },
  signInButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    elevation: 5,
  },
  createAccountButton: {
    padding: 10,
  },
  createAccountButtonText: {
    color: "black",
    alignSelf: "flex-end",

    fontSize: 15,
    fontWeight: "bold",
  },
  iconContainer: {
    position: "absolute",
    top: "50%",
    right: 10,
    transform: [{ translateY: -12 }],
  },
  image: {
    width: 200, // Specify the desired width
    height: 200, // Specify the desired height
    alignSelf: "center",
  },
});

export default Login;
