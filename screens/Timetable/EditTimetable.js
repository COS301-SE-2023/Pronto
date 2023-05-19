import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Modal,
  StyleSheet,
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

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);

  const toggleModal = (module) => {
    if (module) {
      setSelectedModule(module);
      setModalVisible(!isModalVisible);
    }
  };

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
                <View style={{ flexDirection: "column" }}>
                  <IconButton
                    {...props}
                    icon="plus"
                    iconColor="#e32f45"
                    onPress={() => toggleModal(item)}
                    style={{ marginRight: 10 }}
                  />
                  <IconButton
                    {...props}
                    icon="delete"
                    onPress={handleDelete}
                    iconColor="#e32f45"
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
          selectedModules.length === 0 && (
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

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <IconButton
            icon="close"
            onPress={toggleModal}
            style={styles.closeIcon}
            color="#000000"
          />

          <View style={styles.modalContent}>
            {selectedModule && (
              <View key={selectedModule.code}>
                <Text style={styles.moduleCode}>{selectedModule.code}</Text>
                <Text style={styles.moduleName}>{selectedModule.name}</Text>
                <DropdownComponent />
              </View>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginVertical: 200,
    marginHorizontal: 10,
    borderRadius: "50%",
    backgroundColor: "white",
    elevation: 5,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
  },
  modalContent: {
    alignItems: "center",
    marginTop: 50,
    marginBottom: 20,
    width: "80%",
  },
  moduleCode: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  moduleName: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 10,
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
});

export default EditTimetable;
