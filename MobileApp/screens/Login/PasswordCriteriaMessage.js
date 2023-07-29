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
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";

const PasswordCriteriaMessage = ({ criteria }) => {
  const { length, uppercase, lowercase, digit, specialChar } = criteria;

  return (
    <View>
      <Text style={styles.criteriaMessage}>
        Password must meet the following criteria:
      </Text>
      <View style={styles.criteriaContainer}>
        <Text
          style={[
            styles.criteriaText,
            length ? styles.criteriaMet : styles.criteriaNotMet,
          ]}
        >
          - At least 8 characters{" "}
          {length && (
            <Ionicons name="checkmark-circle" size={16} color="green" />
          )}
        </Text>
        <Text
          style={[
            styles.criteriaText,
            uppercase ? styles.criteriaMet : styles.criteriaNotMet,
          ]}
        >
          - At least one uppercase letter{" "}
          {uppercase && (
            <Ionicons name="checkmark-circle" size={16} color="green" />
          )}
        </Text>
        <Text
          style={[
            styles.criteriaText,
            lowercase ? styles.criteriaMet : styles.criteriaNotMet,
          ]}
        >
          - At least one lowercase letter{" "}
          {lowercase && (
            <Ionicons name="checkmark-circle" size={16} color="green" />
          )}
        </Text>
        <Text
          style={[
            styles.criteriaText,
            digit ? styles.criteriaMet : styles.criteriaNotMet,
          ]}
        >
          - At least one digit{" "}
          {digit && (
            <Ionicons name="checkmark-circle" size={16} color="green" />
          )}
        </Text>
        <Text
          style={[
            styles.criteriaText,
            specialChar ? styles.criteriaMet : styles.criteriaNotMet,
          ]}
        >
          - At least one special character (!@#$%^&*()?){" "}
          {specialChar && (
            <Ionicons name="checkmark-circle" size={16} color="green" />
          )}
        </Text>
      </View>
    </View>
  );
};

export default PasswordCriteriaMessage;

const styles = StyleSheet.create({
  // ...

  criteriaMessage: {
    color: "red",
    marginTop: 5,
  },
  criteriaContainer: {
    marginTop: 5,
  },
  criteriaText: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  criteriaMet: {
    color: "green",
  },
  criteriaNotMet: {
    color: "red",
  },
});
