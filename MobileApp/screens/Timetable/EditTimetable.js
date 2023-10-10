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
import { API, Auth } from "aws-amplify"
import { getStudent,listCourses} from "../../graphql/queries"
import { createEnrollment,deleteEnrollment,updateStudentInfo, createTimetable, updateTimetable } from "../../graphql/mutations"
import { useStudent } from "../../ContextProviders/StudentContext";

const EditTimetable = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const [courses, setCourses] = useState([])
  const lectures = ["L01", "L02", "L03", "L04", "L05", "L06", "L07", "L08", "L09"];
  const tutorials = ["T01", "T02", "T03", "T04", "T05", "T06", "T07", "T08", "T09"];
  const practicals = ["P01", "P02", "P03", "P04", "P05", "P06", "P07", "P08", "P09"];
  const [activities, setActivities] = useState([])

  const{student,updateStudent} = useStudent();
  const [isLoading, setIsLoading] = useState(true); // New state variable for loading state
  const [isSaving, setIsSaving] = useState(false);

  const error = "There appear to be network issues.Please try again later"
  
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

  const addToModules = async(module) => {
    if (!selectedModules.some((m) => m.id === module.id)) {
      setSelectedModules((prevModules) => [module, ...prevModules]);

    } else {
      Alert.alert("Module Already Added", "This module is already added to your selection.");
    }
    setInput("");
    setCourses([]);
  };


  const [input, setInput] = useState("");

  const handleSearch = async (text) => {
    setInput(text);

    if (text !== null) {
      try {
        let search = await API.graphql({
          query: listCourses,
          variables: {
            filter: {
              // and : [
              //         {
              //           coursecode: {
              //             beginsWith: text
              //           }
              //         } ,
              //         {
              //           institutionId:{
              //             eq:student.institutionId
              //           }
              //         }
              //       ]
              coursecode:{
                beginsWith: text
              }
              }
            }
          })
        
        setCourses(search.data.listCourses.items.filter((item)=>item._deleted===null && item.institutionId===student.institutionId));
      } catch (e) {
        Alert.alert(error);
        console.log(e);
      }
    }
  }

  const fetchCourses = async () =>{
    try {
      let stu=student;
      if(student===null || student.id===undefined){
        setIsLoading(true); // Set loading state to true during API call
        const user = await Auth.currentAuthenticatedUser();
        stu=await API.graphql({
          query:getStudent,
          variables:{id:user.attributes.sub}
        }) 
        stu=stu.data.getStudent;
        stu.enrollments.items=stu.enrollments.items.filter((items)=>items._deleted===null);
        if(stu===null){
          setIsLoading(false);
          return;
        }
        updateStudent(stu);
      }

      let c = [];
      let act= [];
        
      for (let i = 0; i < stu.enrollments.items.length; i++) {
        c.push(stu.enrollments.items[i].course);
      }
      setSelectedModules(c);
        
      if(stu.timetable===null){
        setActivities([]);
        setIsLoading(false);
        return;
      }

      for (let i = 0; i < stu.timetable.activityId.length; i++) {
        for (let j = 0; j < c.length; j++) {
          let index = c[j].activity.items.find(item => item.id === stu.timetable.activityId[i])
          if (index !== undefined) {
            act.push(index);
            break;
          }
        }
      }
        
      setActivities(act);
      setIsLoading(false); // Set loading state to false after courses are fetched
    } catch (e) {
      setIsLoading(false); // Set loading state to false if error
      //Alert.alert(error);
      console.log("From edit");  
      console.log(e); 

    }
  }

  useEffect(() => { 
    fetchCourses();
  },[]);

  const handleSave = async () => {
    try {
      //Create enrollment if it doesnt exist
      setIsSaving(true);
      let activityIds = [];

      //Extract activity Ids
      for (let i = 0; i < activities.length; i++) {
        if (activities[i] != undefined) {
          activityIds.push(activities[i].id);
        }
      }
        if ((selectedModule !== null && selectedModule !== undefined) && student.enrollments.items.filter((item) => item.courseId === selectedModule.id).length === 0) {
        let enroll = {
          courseId: selectedModule.id,
          studentId: student.id,
        };

        let newEnrollment = await API.graphql({
          query: createEnrollment,
          variables: { input: enroll }
        });
       
        let s = student;
      
        student.enrollments.items.push(newEnrollment.data.createEnrollment);
       
       updateStudent(student);
        
      }
      
      //Create a new timetable if it doesnt exist
      if (student.studentTimetableId === null) {
        let newTimetable = {
          studentId: student.id,
          activityId: activityIds,
        };

        let create = await API.graphql({
          query: createTimetable,
          variables: { input: newTimetable },
        })
        let a=await API.graphql({
          query:updateStudentInfo,
          variables:{input:{id:student.id,studentTimetableId:create.data.createTimetable.id,_version:student._version}}
        })

        let s = student
        s.timetable = create.data.createTimetable;
        s.studentTimetableId = s.timetable.id;
        student.timetable=create.data.createTimetable;
        student.studentTimetableId=create.data.createTimetable.id;
        student.timetable.activities=activities;
         updateStudent(student);
        
      }

      //Update existing timetable
      else {

        let newTimetable = {
          id: student.studentTimetableId,
          studentId: student.id,
          _version : student.timetable._version,
          activityId: activityIds
        }

        let update = await API.graphql({
          query: updateTimetable,
          variables: { input: newTimetable }
        })
        
        let s = student
        s.timetable = update.data.updateTimetable;
        student.timetable.activityId=newTimetable.activityId;
        student.timetable._version=update.data.updateTimetable._version;
        //student.timetable=update.data.updateTimetable;
        //student.timetable.activities=activities;
        updateStudent(student);
        // s= await updateStudent(student);
        // student.timetable.activities=s.timetable.activities;
      }
      setIsSaving(false);
      toggleModal(null);

    } catch (e) {
      console.log("From save");
      console.log(e);
      setIsSaving(false);
      Alert.alert(error);
    }
  }

  const addActivity = async (activity) => {
    let rows = [...activities]
    for (let i = 0; i < activities.length; i++) {
      if (activities[i].activityname === activity.activityname && activities[i].courseId === activity.courseId) {
        rows.splice(i, 1)
      }
    }
   
    rows.push(activity)
    //student.timetable.activities=rows;
    //updateStudent(student);
    //let s=await updateStudent(student);
   // student.timetable.activities=s.timetable.activities;
    setActivities(rows);
  }


  const oneModule = ({ item }) => {
    const handleDelete = async () => {
      Alert.alert(
        "Confirm Deletion",
        "Are you sure you want to remove this module?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            style: "destructive",
            onPress: async () => {
              let s = student;
              let del;
              let act = activities.filter(
                (activity) => activity.courseId !== item.id
              );
            
              let error = "Failed to remove course. Please try again later";

              try {
                for (let i = 0; i < student.enrollments.items.length; i++) {
                  if (student.enrollments.items[i].courseId === item.id) {
                    del = await API.graphql({
                      query: deleteEnrollment,
                      variables: { input: { id: student.enrollments.items[i].id ,_version:student.enrollments.items[i]._version} }
                    });

                    student.enrollments.items.splice(i, 1);
                    break;
                  }
                }
                await handleSave();
                //updateStudent(student);
                setSelectedModules((prevModules) =>
                  prevModules.filter((module) => module.id !== item.id)
                );
                setActivities(act);
                setSelectedModule(null);
              } catch (e) {
                console.log(e);
                Alert.alert(error);
              }
            },
          },
        ]
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
              title={item?.coursecode}
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
          onChangeText={(text) => handleSearch(text)}
          style={{ fontSize: 15, width: "100%" }}
          placeholder="Search for your courses"
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
          (isLoading && input !== '') ? ( // Display the "Fetching your modules..." text while loading and input is not empty
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
                  fontSize: 30,
                  fontWeight: 200,
                  color: "#e32f45",
                }}
              >
                Fetching your courses...
              </Text>
            </View>
          ) : ( // Display the "You have no modules" text after loading is completed and no courses are found
            input === '' && courses.length === 0 && !isLoading ? (
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
                    fontSize: 30,
                    fontWeight: 200,
                    color: "#e32f45",
                  }}
                >
                  You have no courses
                </Text>
              </View>
            ) : null
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

          <ScrollView contentContainerStyle={styles.modalContent}>
            {selectedModule && (
              <View key={selectedModule.id}>
                <Text style={styles.moduleCode}>{selectedModule?.coursecode}</Text>
                
                
                {/* Display lectures */}
                {lectures.map((lecture, i) => (
                  selectedModule.activity.items.filter(item => item.activityname == lecture).length > 0 &&
                  <DropdownComponent
                    key={i}
                    activity={"Lecture"}
                    moduleContent={
                      selectedModule.activity.items.filter(item => item.activityname === lecture).map((act, index) => (
                        {
                          label: `${act.day}: ${act.start} - ${act.end} (${act.venue})`,
                          act: act,
                          value: `${index + 1}`,
                        }
                      )
                      )
                    }
                    addActivity={addActivity}
                    activityNumber={i + 1}
                    currentActivity={activities.filter((a)=>a.courseId===selectedModule.id && a.activityname===lecture)[0]}
                  />
                ))}

                {/*Display tutorials*/}
                {tutorials.map((tutorial, i) => (
                  selectedModule.activity.items.filter(item => item.activityname == tutorial).length > 0 &&
                  <DropdownComponent
                    key={i}
                    activity={"Tutorial"}
                    moduleContent={
                      selectedModule.activity.items.filter(item => item.activityname === tutorial).map((act, index) => (
                        {
                          label: `${act.day}: ${act.start} - ${act.end} (${act.venue})`,
                          act: act,
                          value: `${index + 1}`,
                        }
                      )
                      )
                    }
                    addActivity={addActivity}
                    activityNumber={i + 1}
                    currentActivity={activities.filter((a)=>a.courseId===selectedModule.id && a.activityname===tutorial)[0]}
                  />
                ))}

                {/*Display practicals*/}
                {practicals.map((practical, i) => (
                  selectedModule.activity.items.filter(item => item.activityname === practical).length > 0 &&
                  <DropdownComponent
                    key={i}
                    activity={"Practical"}
                    moduleContent={
                      selectedModule.activity.items.filter(item => item.activityname === practical).map((act, index) => (
                        {
                          label: `${act.day}: ${act.start} - ${act.end} (${act.venue})`,
                          act: act,
                          value: `${index + 1}`,
                        }
                      )
                      )
                    }
                    addActivity={addActivity}
                    activityNumber={i + 1}
                    currentActivity={activities.filter((a)=>a.courseId===selectedModule.id && a.activityname===practical)[0]}
                  />
                ))}
              </View>
            )}
          </ScrollView>
          <Button
            icon="check"
            mode="contained"
            style={{
              backgroundColor: "#e32f45",
              width: "70%",
              margin: "5%",
              textAlign: "center",
              color: "white",
            }}

            outlined={true}
            disabled={isSaving}
            onPress={async() => { await handleSave()}}
            testID="save-button"
          >
            {isSaving ? (
              <Text style={{ color: "white" }}>Saving...</Text> // Set white color for "Saving..." text
            ) : (
              "Save"
            )}
          </Button>



        </View>
      </Modal>

    </SafeAreaView >
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
    borderRadius: 50,
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
    marginBottom: 100,
    width: "80%",
    paddingBottom: "10%"
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