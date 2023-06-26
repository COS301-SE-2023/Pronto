import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Modal,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Card, Button, IconButton } from "react-native-paper";
import SearchFilter from "../../components/SearchFilter";
import { FlatList } from "react-native";
import DropdownComponent from "../../components/Dropdown";

const EditTimetable = ({ onSearch }) => {
  const modules = [
    {
      id: 1,
      code: "COS 301",
      name: "Software Engineering",
      value: "COS 301",
      semester: "Y",
      groups: ["G01"],
      lectureDays: ["Monday", "Tuesday"],
      lectureActivity: ["L1", "L2"],
      lectureTimes: {
        Monday: ["11:30-12:20"],
        Tuesday: ["14:30-15:20"],
      },
      lectureVenues: ["IT 2-27", "IT 2-27"],

      practicalActivity: null,
      practicalDays: null,
      practicalTimes: null,
      practicalVenues: null,

      tutorialActivity: null,
      tutorialDays: null,
      tutorialTimes: null,
      tutorialVenues: null,
    },
    {
      id: 2,
      code: "COS 332",
      name: "Computer Networks",
      value: "COS 332",
      semester: "S1",
      groups: ["G01"],

      lectureDays: ["Monday", "Wednesday"],
      lectureActivity: ["L1", "L2"],
      lectureTimes: {
        Monday: ["12:30-13:20"],
        Wednesday: ["14:30-15:20"],
      },
      lectureVenues: ["IT 2-26", "IT 2-26"],

      practicalActivity: ["P1"],
      practicalTimes: [
        ["Tuesday", "14:30-17:20"],
        ["Friday", "08:30-11:20"],
      ],
      practicalVenues: ["Green Lab", "Blue Lab"],

      tutorialActivity: null,
      tutorialDays: null,
      tutorialTimes: null,
      tutorialVenues: null,
    },
    {
      id: 3,
      code: "COS 341",
      name: "Compiler Construction",
      value: "COS 341",
      semester: "S1",
      groups: ["G01"],

      lectureDays: ["Monday", "Wednesday"],
      lectureActivity: ["L1", "L2"],
      lectureTimes: {
        Monday: ["12:30-13:20"],
        Wednesday: ["14:30-15:20"],
      },
      lectureVenues: ["IT 2-26", "IT 2-26"],

      practicalActivity: ["P1"],
      practicalTimes: [
        ["Tuesday", "14:30-17:20"],
        ["Friday", "08:30-11:20"],
      ],
      practicalVenues: ["Green Lab", "Blue Lab"],

      tutorialActivity: null,
      tutorialDays: null,
      tutorialTimes: null,
      tutorialVenues: null,
    },
    {
      id: 4,
      code: "IMY 310",
      name: "Human Computer Interaction",
      value: "IMY310",
      semester: "S1",
      groups: ["G01"],

      lectureDays: ["Monday", "Wednesday"],
      lectureActivity: ["L1", "L2"],
      lectureTimes: {
        Monday: ["12:30-13:20"],
        Wednesday: ["14:30-15:20"],
      },
      lectureVenues: ["IT 2-26", "IT 2-26"],

      practicalActivity: null,
      practicalTimes: null,
      practicalVenues: null,

      tutorialActivity: ["T1"],
      tutorialTimes: [["Friday", "14:30-17:20"]],
      tutorialVenues: ["SIT Lab"],
    },
    {
      id: 5,
      code: "COS 216",
      name: "Netcentric Computer Programming",
      value: "COS 216",
      semester: "S1",
      groups: ["G01"],

      lectureDays: ["Monday", "Wednesday"],
      lectureActivity: ["L1", "L2"],
      lectureTimes: {
        Monday: ["12:30-13:20"],
        Wednesday: ["14:30-15:20"],
      },
      lectureVenues: ["IT 2-26", "IT 2-26"],

      practicalActivity: ["P1"],
      practicalTimes: [
        ["Tuesday", "14:30-17:20"],
        ["Friday", "08:30-11:20"],
      ],
      practicalVenues: ["Green Lab", "Blue Lab"],

      tutorialActivity: null,
      tutorialDays: null,
      tutorialTimes: null,
      tutorialVenues: null,
    },
  ];

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);

  const toggleModal = (module) => {
    if (module) {
      setSelectedModule(module);
      setModalVisible(true);
    } else {
      setSelectedModule(null);
      setModalVisible(false);
    }
  };

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
            <Card
                style={{
                  height: 200,
                  backgroundColor: "white",
                  justifyContent: "center",
                }}
                testID={`module-card-${item.id}`}
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
                      <View style={{ flexDirection: "column" }}>
                        <IconButton
                            {...props}
                            icon="plus"
                            iconColor="#e32f45"
                            onPress={() => toggleModal(item)}
                            style={{ marginRight: 10 }}
                            testID={`add-module-button-${item.id}`}
                        />
                        <IconButton
                            {...props}
                            icon="delete"
                            onPress={handleDelete}
                            iconColor="#e32f45"
                            testID={`delete-module-button-${item.id}`}
                        />
                      </View>
                  )}
              />
              <Card.Content>
                <View></View>
              </Card.Content>
            </Card>
          </TouchableWithoutFeedback>
        </View>
    );
  };

  return (
      <SafeAreaView style={styles.container}>
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
              placeholder="Search"
              testID="search-input"
          />
        </View>

        <ScrollView>
          <FlatList
              data={modules.filter(
                  (item) =>
                      item.name.toLowerCase().includes(input.toLowerCase()) ||
                      item.code.toLowerCase().includes(input.toLowerCase())
              )}
              renderItem={oneModule}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
          />
        </ScrollView>

        <Modal visible={isModalVisible} animationType="slide">
          <View style={styles.modalContent}>
            {selectedModule && (
                <View style={{ alignItems: "center" }}>
                  <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                    {selectedModule.code}
                  </Text>
                  <Text>{selectedModule.name}</Text>
                </View>
            )}
            <Button
                mode="contained"
                onPress={() => toggleModal(null)}
                style={{ marginVertical: 20 }}
                testID="close-modal-button"
            >
              Close
            </Button>
          </View>
        </Modal>

        <View>
          <Text>Selected Modules:</Text>
          {selectedModules.map((module) => (
              <Text key={module.id}>{module.code}</Text>
          ))}
        </View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 150,
  },
});

export default EditTimetable;