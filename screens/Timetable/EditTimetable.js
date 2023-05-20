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
        style={styles.moduleList} // Set a specific height for FlatList
      />

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <IconButton
            icon="close"
            onPress={() => toggleModal(null)}
            style={styles.closeIcon}
            color="#000000"
          />

          <View style={styles.modalContent}>
            {selectedModule && (
              <View key={selectedModule.code}>
                <Text style={styles.moduleCode}>{selectedModule.code}</Text>
                <Text style={styles.moduleName}>{selectedModule.name}</Text>
                {/* Check if there are lectures */}
                {selectedModule.lectureActivity &&
                  selectedModule.lectureDays &&
                  selectedModule.lectureTimes &&
                  selectedModule.lectureVenues &&
                  selectedModule.lectureDays.map((day, index) => (
                    <DropdownComponent
                      key={index}
                      activity={"Lecture"}
                      moduleContent={selectedModule.lectureTimes[day].map(
                        (time, timeIndex) => ({
                          label: `${day}: ${time} (${selectedModule.lectureVenues[timeIndex]})`,
                          value: `${index + 1}`,
                        })
                      )}
                      activityNumber={index + 1}
                    />
                  ))}
                {/* Check if there are practicals */}
                {selectedModule.practicalActivity &&
                  selectedModule.practicalTimes &&
                  selectedModule.practicalVenues &&
                  selectedModule.practicalActivity.map(
                    (practicalActivity, index) => {
                      const practicalTimes = selectedModule.practicalTimes;
                      const practicalVenues = selectedModule.practicalVenues;

                      return (
                        <DropdownComponent
                          key={index}
                          activity={"Practical"}
                          activityNumber={index + 1}
                          moduleContent={practicalTimes.map(
                            (time, timeIndex) => ({
                              label: `${time[0]}: ${time[1]} (${practicalVenues[timeIndex]})`,
                              value: `${timeIndex + 1}`,
                            })
                          )}
                        />
                      );
                    }
                  )}

                {/* Check if there are tutorials */}
                {selectedModule.tutorialActivity &&
                  selectedModule.tutorialTimes &&
                  selectedModule.tutorialVenues &&
                  selectedModule.tutorialActivity.map(
                    (tutorialActivity, index) => {
                      const tutorialTimes = selectedModule.tutorialTimes;
                      const tutorialVenues = selectedModule.tutorialVenues;
                      return (
                        <DropdownComponent
                          key={index}
                          activity={"Tutorial"}
                          activityNumber={index + 1}
                          moduleContent={tutorialTimes.map(
                            (time, timeIndex) => ({
                              label: `${time[0]}: ${time[1]} (${tutorialVenues[timeIndex]})`,
                              value: `${timeIndex + 1}`,
                            })
                          )}
                        />
                      );
                    }
                  )}

                <Button
                  icon="check"
                  mode="contained"
                  style={{
                    backgroundColor: "#e32f45",
                    marginVertical: 10,
                    marginHorizontal: 20,
                  }}
                  outlined={true}
                  onPress={() => toggleModal(null)}
                  testID="save-button"
                >
                  Save
                </Button>
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
    borderRadius: "50",
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
  moduleList: {
    flex: 1, // Fill the available space
    marginBottom: 70,
  },
  container: {
    flex: 1,
  },
});

export default EditTimetable;
