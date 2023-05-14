import React, { useState } from "react";
import { View, TextInput, Dimensions, Text, SafeAreaView } from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Card } from "react-native-paper";
import SearchFilter from "../../components/SearchFilter";
import { FlatList } from "react-native";

const { width } = Dimensions.get("window").width;
const { height } = Dimensions.get("window").height;

const EditTimetable = ({ onSearch }) => {
  const modules = [
    /* {
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
    { id: 5, code: "COS216", name: "Netcentric Computer Programming" }, */
  ];

  const [input, setInput] = useState("");

  const oneModule = ({ item }) => {
    return (
      <View style={{ margin: 20 }}>
        <Card
          style={{ height: 200, backgroundColor: "white" }}
          onPress={addToModules}
        >
          <Card.Content>
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {item.code} : {item.name}
              </Text>
              <Text
                style={{
                  height: 1,
                  marginTop: 5,
                }}
              ></Text>
            </View>
          </Card.Content>
        </Card>
      </View>
    );
  };

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

      <FlatList
        data={modules}
        renderItem={oneModule}
        ListEmptyComponent={
          <View
            style={{
              flexDirection: "row",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              You have no modules
            </Text>
          </View>
        }
      />
      <SearchFilter data={modules} input={input} setInput={setInput} />
    </View>
  );
};

export default EditTimetable;
