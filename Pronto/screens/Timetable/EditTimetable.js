import React, { useState } from "react";
import {
  View,
  TextInput,
  Dimensions,
  Text,
  SafeAreaView,
  Alert,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Card, Button } from "react-native-paper";
import SearchFilter from "../../components/SearchFilter";
import { FlatList } from "react-native";
import { Picker } from "@react-native-picker/picker";

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

  const [selectedModules, setSelectedModules] = useState([]);

  const addToModules = (module) => {
    if (!selectedModules.some((m) => m.id === module.id)) {
      setSelectedModules((prevModules) => [...prevModules, module]);
    }
    setInput("");
  };

  const [input, setInput] = useState("");

  const oneModule = ({ item }) => {
    const handleDelete = () => {
      setSelectedModules((prevModules) =>
        prevModules.filter((module) => module.id !== item.id)
      );
    };

    return (
      <View style={{ margin: 20 }}>
        <TouchableWithoutFeedback onPress={() => addToModules(item)}>
          <Card style={{ height: 200, backgroundColor: "white" }}>
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
                <Button
                  onPress={handleDelete}
                  style={{ marginLeft: "85%", marginTop: "35%" }}
                >
                  <MaterialIcons name="delete" size={24} color="black" />
                </Button>
              </View>
            </Card.Content>
          </Card>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  return (
    <SafeAreaView>
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
          style={{ fontSize: 15, width: "100%" }}
          placeholder="Search for your modules"
        />
      </View>

      <SearchFilter
        data={modules}
        input={input}
        setInput={setInput}
        addToModules={addToModules}
      />

      <FlatList
        data={selectedModules}
        renderItem={oneModule}
        ListEmptyComponent={
          !input &&
          selectedModules.length === 0 && ( // Render only when input is empty and no modules are selected
            <View
              style={{
                flexDirection: "row",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                You have no modules
              </Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
};

export default EditTimetable;
