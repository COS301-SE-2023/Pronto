import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
  SafeAreaView,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { Card } from "react-native-paper";
import SearchFilter from "../../components/SearchFilter";

const { width } = Dimensions.get("window");

const EditTimetable = ({ onSearch }) => {
  const modules = [
    {
      id: 1,
      code: "COS301",
      name: "Software Engineering",
    },
    {
      id: 2,
      code: "COS332",
      name: "Computer Networks",
    },
    {
      id: 3,
      code: "COS341",
      name: "Compiler Construction",
    },
    { id: 4, code: "IMY310", name: "Human Computer Interaction" },
    { id: 5, code: "COS216", name: "Netcentric Computer Programming" },
  ];

  const [input, setInput] = useState("");

  return (
    <View>
      <View
        style={{
          padding: 10,
          margin: 10,
          flexDirection: "row",
          width: "95%",
          backgroundColor: "#d9dbda",
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Feather
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 1, marginRight: 4 }}
        />
        <TextInput
          value={input}
          onChangeText={(text) => setInput(text)}
          style={{ fontSize: 15 }}
          placeholder="Search for your modules"
        />
      </View>
      <SearchFilter data={modules} input={input} setInput={setInput} />
    </View>
  );
};

export default EditTimetable;
