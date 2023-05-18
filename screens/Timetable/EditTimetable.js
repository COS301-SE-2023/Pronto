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
import { Card, Button, IconButton } from "react-native-paper";
import SearchFilter from "../../components/SearchFilter";
import { FlatList } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const EditTimetable = ({ onSearch }) => {
  const modules = [
    {
      id: 1,
      code: "COS301",
      name: "Software Engineering",
      numLecturesPerWeek: 2,
    },
    {
      id: 2,
      code: "COS332",
      name: "Computer Networks",
      numLecturesPerWeek: 1,
    },
    {
      id: 3,
      code: "COS341",
      name: "Compiler Construction",
      numLecturesPerWeek: 1,
    },
    {
      id: 4,
      code: "IMY310",
      name: "Human Computer Interaction",
      numLecturesPerWeek: 1,
    },
    {
      id: 5,
      code: "COS216",
      name: "Netcentric Computer Programming",
      numLecturesPerWeek: 1,
    },
  ];

  const moduleTimes = [
    {
      id: 1,
      code: "COS301",
      name: "Software Engineering",
      days: ["Monday", "Tuesday"],
      times: [
        ["11:30-12:20", "14:30-15:20", "15:30-16:20", "16:30-17:20"], // Lecture 1 times
        ["11:30-12:20", "14:30-15:20", "15:30-16:20", "16:30-17:20"], // Lecture 2 times
      ],
    },
    {
      code: "COS332",
      name: "Computer Networks",
      days: ["Monday"],
      times: [
        ["11:30-12:20", "14:30-15:20", "15:30-16:20", "16:30-17:20"], // Lecture 1 times
      ],
    },
    {
      code: "COS341",
      name: "Compiler Construction",
      days: ["Thursday"],
      times: [
        ["11:30-12:20", "14:30-15:20", "15:30-16:20", "16:30-17:20"], // Lecture 1 times
      ],
    },
    {
      code: "IMY310",
      name: "Human Computer Interaction",
      days: ["Tuesday"],
      times: [
        ["11:30-12:20", "14:30-15:20", "15:30-16:20", "16:30-17:20"], // Lecture 1 times
      ],
    },
    {
      code: "COS216",
      name: "Netcentric Computer Programming",
      days: ["Monday"],
      times: [
        ["11:30-12:20", "14:30-15:20", "15:30-16:20", "16:30-17:20"], // Lecture 1 times
      ],
    },
  ];

  const [selectedModules, setSelectedModules] = useState([]);

  const [selectedTime, setSelectedTime] = useState(() => {
    const initialSelectedTime = {};
    selectedModules.forEach((module) => {
      initialSelectedTime[module.id] = Array.from(
        { length: module.numLecturesPerWeek },
        () => ""
      );
    });
    return initialSelectedTime;
  });

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

    const handleTimeSelection = (time, lectureIndex) => {
      setSelectedTime((prevSelectedTime) => {
        const updatedSelectedTime = { ...prevSelectedTime };
        if (!updatedSelectedTime[item.id]) {
          updatedSelectedTime[item.id] = Array.from(
            { length: item.numLecturesPerWeek },
            () => ""
          );
        }
        updatedSelectedTime[item.id][lectureIndex] = time;
        return updatedSelectedTime;
      });
    };

    return (
      <View style={{ margin: 20 }}>
        <TouchableWithoutFeedback onPress={() => addToModules(item)}>
          <Card
            style={{
              height: 200,
              backgroundColor: "white",
              justifyContent: "center",
            }}
          >
            <Card.Title
              title={item.code}
              titleStyle={{
                fontSize: 20,
                fontWeight: "bold",
                justifyContent: "center",
                textAlign: "center",
                marginLeft: 30,
              }}
              subtitle={item.name}
              subtitleStyle={{
                fontSize: 15,

                justifyContent: "center",
                textAlign: "center",
                marginBottom: 10,
                marginLeft: 30,
              }}
              right={(props) => (
                <IconButton {...props} icon="delete" onPress={handleDelete} />
              )}
            />
            <Card.Content>
              <View>
                {selectedModules.some((module) => module.id === item.id) && (
                  <>
                    {Array.from(
                      { length: item.numLecturesPerWeek },
                      (_, index) => (
                        <View
                          key={index}
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                              textAlign: "center",
                              justifyContent: "center",
                              alignItems: "center",
                              marginRight: 10,
                              marginBottom: 10,
                            }}
                          >
                            Lecture {index + 1}:{" "}
                          </Text>
                          <RNPickerSelect
                            value={
                              selectedTime[item.id]
                                ? selectedTime[item.id][index]
                                : ""
                            }
                            onValueChange={(value) =>
                              handleTimeSelection(value, index)
                            }
                            placeholder={{
                              label: "Select a time",
                              value: "",
                            }}
                            items={moduleTimes
                              .find((module) => module.code === item.code)
                              .times[index].map((time, index) => ({
                                label: time,
                                value: time,
                              }))}
                            style={pickerSelectStyles} // Apply the styles here
                            useNativeAndroidPickerStyle={false} // Required for Android to apply custom styles
                            Icon={() => {
                              return (
                                <Feather
                                  name="chevron-down"
                                  size={25}
                                  color="black"
                                  style={{ marginRight: 10 }}
                                />
                              );
                            }}
                          />
                        </View>
                      )
                    )}
                  </>
                )}
              </View>

              <Button
                onPress={handleDelete}
                style={{ marginLeft: "85%", marginTop: "35%" }}
              >
                <MaterialIcons name="delete" size={24} color="black" />
              </Button>
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

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 15,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 4,
    color: "black",
    paddingRight: 40,
    marginBottom: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderColor: "gray",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    borderColor: "gray",
  },
};
