import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Modal,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Card, Button, IconButton } from "react-native-paper";
import SearchFilter from "../../components/SearchFilter";
import { FlatList } from "react-native";
import DropdownComponent from "../../components/Dropdown";
import{API,Auth} from "aws-amplify"
import{searchCourses} from "../../graphql/queries"

const EditTimetable = ({ onSearch }) => {
  //Mock data
  //let modules = [
    // {
    //   id: 1,
    //   coursecode: "COS 301",
    //   // semester: "Y",
    //   activity:[ 
    //     {
    //       activityname:"Lecture",
    //       day:"Monday",
    //       start:"11:30",
    //       end:"12:20",
    //       venue:"HB 4-9",
    //       group:"G01"
    //     },
    //     {
    //         activityname:"Lecture",
    //         day:"Tuesday",
    //         start:"13:30",
    //         end:"14:30",
    //         venue:"North Hall",
    //         group:"G01"
    //     }
    //   ]
    // },
      
    // {
    //   id: 2,
    //   coursecode: "COS 332",
    //   // semester: "S1",
    //   activity:[ 
    //     {
    //       activityname:"Lecture",
    //       day:"Monday",
    //       start:"12:30",
    //       end:"13:20",
    //       venue:"IT 2-26",
    //       group:"G01"
    //     },
    //     {
    //         activityname:"Lecture",
    //         day:"Wednesday",
    //         start:"15:30",
    //         end:"16:30",
    //         venue:"IT 2-26",
    //         group:"G01"
    //     },
    //     {
    //         activityname:"Practical",
    //         day:"Tuesday",
    //         start:"15:30",
    //         end:"18:30",
    //         venue:"Green Lab",
    //         group:"G01"
    //     },
    //     {
    //         activityname:"Practical",
    //         day:"Friday",
    //         start:"08:30",
    //         end:"11:30",
    //         venue:"Green Lab",
    //         group:"G02"
    //     }
    //   ]
    // },
    
  //];

  const[modules,setModules]=useState([])
  const fecthCourses= async()=>{
    await setCourses[modules]
    //Alert.alert(courses[0].coursecode)
    try{ 
        // let search= await API.graphql({
        //             query:searchCourses,
        //             variables:  { 
        //                        filter : { 
        //                             coursecode: { 
        //                                  wildcard: "COS" 
        //                             } 
        //                         }
        //                     },
        //             authMode:"AMAZON_COGNITO_USER_POOLS"         
        //         })
        //         console.log(search)
    }catch(error){
      console.log(error)
    }

    //console.log()
  }

    useEffect(() => {
        fecthCourses();
    }, [])

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const[courses,setCourses]=useState([])
 
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

  const handleSearch = async(text)=>{
    console.log(text)
     //Alert.alert(courses[0].coursecode)
    try{ 
        // let search= await API.graphql({
        //             query:searchCourses,
        //             variables:  { 
        //                        filter : { 
        //                             coursecode: { 
        //                                  wildcard: text 
        //                             } 
        //                         }
        //                     },
        //             authMode:"AMAZON_COGNITO_USER_POOLS"         
        //         })
        //         console.log(search)
        //setCourses(search.data.searchCourses.items)
        let m=[
          {
      id: 1,
      coursecode: "COS 301",
      // semester: "Y",
      activity:[ 
        {
          activityname:"Lecture",
          day:"Monday",
          start:"11:30",
          end:"12:20",
          venue:"HB 4-9",
          group:"G01"
        },
        {
            activityname:"Lecture",
            day:"Tuesday",
            start:"13:30",
            end:"14:30",
            venue:"North Hall",
            group:"G01"
        }
      ]
    }
        ]
        setModules(m)
        setCourses(m)
    }catch(error){
      console.log(error)
    }

    setInput(text)
  }

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
              title={item.coursecode}
              titleStyle={{
                fontSize: 20,
                fontWeight: "bold",
                justifyContent: "center",
                textAlign: "center",
                marginLeft: 30,
              }}
             // subtitle={item.name}
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
          //onChangeText={(text) => setInput(text)}
          onChangeText={(text)=>handleSearch(text)}
          style={{ fontSize: 15, width: "100%" }}
          placeholder="Search for your modules"
        />
      </View>

      <SearchFilter
        data={courses}
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
              <View key={selectedModule.coursecode}>
                <Text style={styles.moduleCode}>{selectedModule.coursecode}</Text>
                {/* <Text style={styles.moduleName}>{selectedModule.name}</Text> */}
                {/* Check if there are lectures */}
                {/* {
                //  selectedModule.lectureActivity &&
                //   selectedModule.lectureDays &&
                //   selectedModule.lectureTimes &&
                //   selectedModule.lectureVenues && 
                  // selectedModule.filter((act)=>act.activityname==="Lecture").map((day,index)=> 
                  selectedModule.activity.filter((act)=>act.activityname==="Lecture").map((day, index) => (
                    <DropdownComponent
                      key={index}
                      activity={"Lecture"}
                      moduleContent={selectedModule.start}
                      //   .map(
                      //   (time, timeIndex) => ({
                      //     label: `${day}: ${time} (${selectedModule.lectureVenue[timeIndex]})`,
                      //     value: `${index + 1}`,
                      //   })
                      // )}

                      activityNumber={index + 1}
                    />
                  ))} */}
                {/* Check if there are practicals */}
                {/* {
                // selectedModule.practicalActivity &&
                //   selectedModule.practicalTimes &&
                //   selectedModule.practicalVenues &&
                  selectedModule.activity.filter((act)=>act.activityname==="Practical").map(
                    (prac, index) => {
                      const practicalTimes = prac.start;
                      const practicalVenues = prac.venue;

                      return (
                        <DropdownComponent
                          key={index}
                          activity={"Practical"}
                          activityNumber={index + 1}
                          moduleContent={practicalTimes}
                          //   .map(
                          //   (time, timeIndex) => ({
                          //     label: `${time[0]}: ${time[1]} (${practicalVenues[timeIndex]})`,
                          //     value: `${timeIndex + 1}`,
                          //   })
                          // )}
                        />
                      );
                    }
                  )} */}

                {/* Check if there are tutorials */}
                {/* {
                // selectedModule.tutorialActivity &&
                //   selectedModule.tutorialTimes &&
                //   selectedModule.tutorialVenues &&
                  selectedModule.activity.filter((act)=>act.activityname==="Tutorial").map(
                    (tut, index) => {
                      const tutorialTimes = tut.start;
                      const tutorialVenues = tut.venue;
                      return (
                        <DropdownComponent
                          key={index}
                          activity={"Tutorial"}
                          activityNumber={index + 1}
                          moduleContent={tutorialTimes}
                          //   .map(
                          //   (time, timeIndex) => ({
                          //     label: `${time[0]}: ${time[1]} (${tutorialVenues[timeIndex]})`,
                          //     value: `${timeIndex + 1}`,
                          //   })
                          // )}
                        />
                      );
                    }
                  )} */}

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


//Styles
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