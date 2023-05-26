import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ImageBackground,
  Dimensions,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

const Login = ({ navigation }) => {
  return (
    <SafeAreaView style={{}}>
      <View
        style={{
          padding: 24,
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 40,
              color: "#e32f45",
              fontWeight: "bold",
              marginTop: 20,
              opacity: 0.9,
            }}
          >
            Login here
          </Text>

          <ImageBackground
            style={{
              height: height / 5,
              width: "100%",
              alignSelf: "center",
            }}
            resizeMode="contain"
            source={require("../../assets/icons/ProntoLogo.png")}
          />

          <Text
            style={{
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 15,
            }}
          >
            Welcome back, sign in to access all your features!
          </Text>
        </View>

        <View
          style={{
            marginVertical: 40,
          }}
        >
          <TextInput
            placeholder="Email"
            placeholderTextColor={"#666666"}
            style={{
              fontSize: 20,
              padding: 20,
              borderRadius: 10,
              backgroundColor: "#d1d1d1",
              opacity: 0.5,
              marginVertical: 10,
            }}
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor={"#666666"}
            secureTextEntry={true}
            style={{
              fontSize: 20,
              padding: 20,
              borderRadius: 10,
              backgroundColor: "#d1d1d1",
              opacity: 0.5,
              marginVertical: 10,
            }}
          />
        </View>

        <View>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              color: "#e32f45",
              alignSelf: "flex-end",
            }}
          >
            Forgot your password?
          </Text>
        </View>

        <TouchableOpacity
          style={{
            padding: 20,
            backgroundColor: "#e32f45",
            marginVertical: 20,
            borderRadius: 10,
            shadowColor: "#e32f45",
            shadowOpacity: 0.3,
            shadowOffset: { width: 0, height: 10 },
            shadowRadius: 10,
          }}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Sign in
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            padding: 10,
          }}
          onPress={() => navigation.navigate("Register")}
        >
          <Text
            style={{
              color: "black",
              textAlign: "center",
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Create new account
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;
