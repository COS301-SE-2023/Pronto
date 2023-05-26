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

const { height } = Dimensions.get("window");

const WelcomeScreen = () => {
  return (
    <SafeAreaView>
      <ImageBackground
        style={{
          height: height / 2.5,
        }}
        resizeMode="contain"
        source={require("../../assets/icons/ProntoLogo.png")}
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
          paddingVertical: 50,
          paddingHorizontal: 10,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#e32f45",
            paddingVertical: 15,
            paddingHorizontal: 10,
            width: "48%",
            borderRadius: 10,
          }}
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
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({});
