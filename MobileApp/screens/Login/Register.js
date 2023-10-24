import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ImageBackground,
  Dimensions,
  Alert,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import React, { useState, useEffect } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { listInstitutions } from "../../graphql/queries";
import { Auth, API, DataStore, Predicates } from "aws-amplify";
import institutionInfo from "../../assets/data/universityInfo.json";
import { createStudent } from "../../graphql/mutations";
import PasswordCriteriaMessage from "./PasswordCriteriaMessage";
import { Institution } from "../../models";

const { height } = Dimensions.get("window");

const Register = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [instituitions, setInstitutions] = useState([]);
  const [institutionList,setInstitutionList] =useState([]);;

  //validate email input sign up
  const [emailIsValid, setEmailIsValid] = useState(false);

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = regex.test(value);
    setEmailIsValid(isValidEmail);
  };
  const [isTypingEmail, setIsTypingEmail] = useState(false);

  //select instituition
  const [institutionId, setInstitutionId] = useState("");
  const[institution,setInstitution] =useState("");

  //Validate institutionId
  const [isInstitutionIdValid, setIsInstitutionIdValid] = useState(false);
  const validateInstitutionId = () => {
    setIsInstitutionIdValid(institutionId && institutionId !== "notSet");
  };

  //validate password on sign up
  const [passwordSignUpIsValid, setPasswordSignUpIsValid] = useState(false);
  const validateSignUpPassword = (value) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()?])[A-Za-z\d!@#$%^&*()?]{8,}$/;
    const isValidSignUpPassword = regex.test(value);

    setPasswordSignUpIsValid(isValidSignUpPassword);

    setPasswordCriteria({
      length: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      digit: /\d/.test(value),
      specialChar: /[!@#$%^&*()?]/.test(value),
    });
  };

  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    digit: false,
    specialChar: false,
  });

  const [isTypingPassword, setIsTypingPassword] = useState(false);

  //validate name and surname on sign up
  const [nameIsValid, setNameIsValid] = useState(false);
  const [surnameIsValid, setSurnameIsValid] = useState(false);
  const [isTypingName, setIsTypingName] = useState(false);
  const [isTypingSurname, setIsTypingSurname] = useState(false);

  const validateName = (value) => {
    const regex = /[a-zA-Z]+/;
    const isValidName = regex.test(value);
    setNameIsValid(isValidName);
  };

  const validateSurname = (value) => {
    const regex = /[a-zA-Z]+/;
    const isValidSurname = regex.test(value);
    setSurnameIsValid(isValidSurname);
  };

  const fetchInstitutions = async () => {

    try {
      let inst = await API.graphql({
        query: listInstitutions,
        variables: {},
        authMode: "API_KEY"
      });

      inst = inst.data.listInstitutions.items.filter((item) => item._deleted === null);
      setInstitutionList(inst);
      let institutionInfo = [];
      for (let j = 0; j < inst.length; j++) {
        let item = {
          key: inst[j].id,
          value: inst[j].name
        }
        institutionInfo.push(item);
      }
      ;
      setInstitutions(institutionInfo);
    } catch (error) {
      
    }
  }

  useEffect(() => {
    fetchInstitutions()
  }, [])

  const onSignUpPressed = async () => {
    if (loading) {
      return;
    }

    let errorMessage = "";

    if (!nameIsValid) {
      errorMessage += "Please enter a valid name.\n";
    }

    if (!surnameIsValid) {
      errorMessage += "Please enter a valid surname.\n";
    }

    if (!emailIsValid) {
      errorMessage += "Please enter a valid email address.\n";
    }

    if (!isInstitutionIdValid) {
      errorMessage += "Please select an institution.\n";
    }

    if (!passwordSignUpIsValid) {
      errorMessage +=
        "Please enter a password with at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character.\n";
    }

    if (!passwordMatch) {
      errorMessage += "Passwords do not match.\n";
    }

    if (errorMessage !== "") {
      Alert.alert("Error(s)", errorMessage);

      return;
    }

    setLoading(true);
    try {
      
      const studentName = name + "," + surname;
      const signUpObject = {
        username: email,
        password: password,
        attributes: {
          email: email,
          family_name: surname,
          name: name
        },
        clientMetadata: {
          role: "Student",
          institutionId: institutionId
        }
      }
      

      const u = await Auth.signUp(signUpObject);
      const id=u.userSub;
      let newStudent = {
          id: id,
              institutionId: institutionId,
              firstname: name,
              lastname: surname,
              userRole: "Student",
              email: email
      }

      let create = await API.graphql({
        query: createStudent,
        variables: { input: newStudent },
        authMode:"API_KEY"
      })
      
     navigation.navigate("ConfirmEmail", { email,institutionId });
    } catch (e) {
      console.log(e);
      Alert.alert("Sign up error", e.message);

    }
    setLoading(false);
  };

  //validating confirm password
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [isTypingPasswordMatch, setIsTypingPasswordMatch] = useState(false);

  const validateConfirmPassword = (value) => {
    setPasswordMatch(value === password);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <View style={styles.contentContainer}>
        <View style={styles.centered}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Create an account so you can explore all the features!
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Name"
            onFocus={() => setIsTypingName(true)}
            value={name}
            onChangeText={(value) => {
              setName(value);
              validateName(value);
            }}
            placeholderTextColor={"#666666"}
            style={styles.input}
          />

          {isTypingName && nameIsValid && (
            <View style={styles.iconContainer}>
              <Ionicons name="checkmark-circle" size={24} color="green" />
            </View>
          )}

          {isTypingName && !nameIsValid && (
            <View style={styles.iconContainer}>
              <MaterialIcons name="cancel" size={24} color="red" />
            </View>
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Surname"
            onFocus={() => setIsTypingSurname(true)}
            value={surname}
            onChangeText={(value) => {
              setSurname(value);
              validateSurname(value);
            }}
            placeholderTextColor={"#666666"}
            style={styles.input}
          />

          {isTypingSurname && surnameIsValid && (
            <View style={styles.iconContainer}>
              <Ionicons name="checkmark-circle" size={24} color="green" />
            </View>
          )}

          {isTypingSurname && !surnameIsValid && (
            <View style={styles.iconContainer}>
              <MaterialIcons name="cancel" size={24} color="red" />
            </View>
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            testID='email-input'
            placeholder="Email"
            autoCapitalize="none"
            placeholderTextColor={"#666666"}
            value={email}
            onChangeText={(value) => {
              setEmail(value);
              validateEmail(value);
            }}
            style={[styles.input]}
            onFocus={() => setIsTypingEmail(true)}
          />

          {isTypingEmail && emailIsValid && (
            <View style={styles.iconContainer}>
              <Ionicons name="checkmark-circle" size={24} color="green" />
            </View>
          )}

          {isTypingEmail && !emailIsValid && (
            <View style={styles.iconContainer}>
              <MaterialIcons name="cancel" size={24} color="red" testID='email-error-icon' />
            </View>
          )}
        </View>

        <View style={styles.inputContainer}>
          {/* Update the boxStyles prop for SelectList */}
          <SelectList
            setSelected={(institutionId) => setInstitutionId(institutionId)}
            data={instituitions}
            save="key"
            boxStyles={[
              styles.input,
              { paddingVertical: 16, backgroundColor: "#E7DADA", opacity: 0.7, textAlignVertical: "center" },
            ]}
            defaultOption={{ key: "notSet", value: "Select University" }}
            placeholder="Select University"
            searchPlaceholder="Search University"
            onSelect={(institutionId) => validateInstitutionId(institutionId)}
          />
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
              setPasswordSignUpIsValid(value);
              validateSignUpPassword(value);
            }}
            onFocus={() => setIsTypingPassword(true)}
            testID={"password-input"}
          />
          {isTypingPassword && passwordSignUpIsValid && (
            <View style={styles.iconContainer}>
              <Ionicons name="checkmark-circle" size={24} color="green" />
            </View>
          )}

          {isTypingPassword && !passwordSignUpIsValid && (
            <View style={styles.iconContainer}>
              <MaterialIcons name="cancel" size={24} color="red" />
            </View>
          )}

          {isTypingPassword && !passwordSignUpIsValid && (
            <PasswordCriteriaMessage criteria={passwordCriteria} />
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Confirm Password"
            autoCapitalize="none"
            placeholderTextColor={"#666666"}
            value={confirmPassword}
            secureTextEntry={true}
            onFocus={() => setIsTypingPasswordMatch(true)}
            style={styles.input}
            onChangeText={(value) => {
              setConfirmPassword(value);
              validateConfirmPassword(value);
            }}
            passwordMatch={passwordMatch}
          />

          {isTypingPasswordMatch && passwordMatch && (
            <View style={styles.iconContainer}>
              <Ionicons name="checkmark-circle" size={24} color="green" />
            </View>
          )}

          {isTypingPasswordMatch && !passwordMatch && (
            <View style={styles.iconContainer}>
              <MaterialIcons name="cancel" size={24} color="red" />
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.signUpButton} onPress={onSignUpPressed} testID='sign-up-button' disabled={loading}>
          <Text style={styles.signUpButtonText}>
            {" "}
            {loading ? "Signing up..." : "Sign up"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.haveAccountButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.haveAccountButtonText}>
            Already have an account?
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 20,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 15,
    maxWidth: "80%",
  },
  inputContainer: {
    position: "relative",
  },
  input: {
    fontSize: 15,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#E7DADA",
    opacity: 0.7,
    marginVertical: 10,
  },
  inputFocused: {
    borderWidth: 2,
    borderColor: "#e32f45",
    shadowOffset: { width: 4 },
    shadowColor: "#e32f45",
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  signUpButton: {
    padding: 20,
    backgroundColor: "#e32f45",
    marginVertical: 20,
    borderRadius: 10,
    shadowColor: "#e32f45",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
  },
  signUpButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  haveAccountButton: {
    padding: 10,
  },
  haveAccountButtonText: {
    color: "black",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  iconContainer: {
    position: "absolute",
    top: "50%",
    right: 10,
    transform: [{ translateY: -12 }],
  },
});

export default Register;
