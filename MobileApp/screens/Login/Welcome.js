import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { ImageBackground } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { height } = Dimensions.get("window");

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <ImageBackground
        testID="image-background"
        style={{
          height: height / 2.5,
        }}
        resizeMode="contain"
        //attribution: <a href="https://storyset.com/education">Education illustrations by Storyset</a>
        source={require("../../assets/icons/Welcome.png")}
      />
      <View
        style={{
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            textAlign: "center",
            color: "#e32f45",
            fontWeight: "bold",
            paddingBottom: 15,
          }}
        >
          Make your first step into university easier
        </Text>

        <Text
          style={{
            fontSize: 15,
            textAlign: "center",
          }}
        >
          Create customised timetables, find your way around campus and get
          notified of upcoming events
        </Text>
      </View>

      <View
        style={{
          paddingTop: 70,
          paddingHorizontal: 20,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#e32f45",
            paddingVertical: 15,
            paddingHorizontal: 10,
            width: "48%",
            borderRadius: 10,
            marginRight: "4%",
            shadowColor: "#e32f45",
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.25,
            shadowRadius: 8,
          }}
          onPress={() => navigation.navigate("Login")}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 18,
              textAlign: "center",
            }}
          >
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            paddingVertical: 15,
            paddingHorizontal: 10,
            width: "48%",
            borderWidth: 1,
            borderRadius: 10,
          }}
          onPress={() => navigation.navigate("Register")}
        >
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: 18,
              textAlign: "center",
            }}
          >
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({});
