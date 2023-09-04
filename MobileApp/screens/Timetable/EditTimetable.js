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
import { searchCourses, listStudents ,listInstitutions} from "../../graphql/queries"
import { createEnrollment,createStudent,deleteEnrollment,updateStudentInfo, createTimetable, updateTimetable } from "../../graphql/mutations"
import { useStudent } from "../../ContextProviders/StudentContext";

const EditTimetable = ({ onSearch }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const [courses, setCourses] = useState([])
  const [lectures, setLectures] = useState(["L01", "L02", "L03", "L04", "L05", "L06", "L07", "L08", "L09"])
  const [tutorials, setTutorials] = useState(["T01", "T02", "T03", "T04", "T05", "T06", "T07", "T08", "T09"])
  const [practicals, setPracticals] = useState(["P01", "P02", "P03", "P04", "P05", "P06", "P07", "P08", "P09"])
 // const [timetable, setTimetable] = useState(null)
  const [activities, setActivities] = useState([])

  const{student,updateStudent} = useStudent();
  const [isLoading, setIsLoading] = useState(true); // New state variable for loading state
  const [isSaving, setIsSaving] = useState(false);

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
      setSelectedModules((prevModules) => [module, ...prevModules]);
    } else {
      Alert.alert("Module Already Added", "This module is already added to your selection.");
    }
    setInput("");
  };


  const [input, setInput] = useState("");

  const handleSearch = async (text) => {
    setInput(text)
    let error = "There appear to be network issues. Please try again later"

    if (text !== null) {
      try {
        let search = await API.graphql({
          query: searchCourses,
          variables: {
            filter: {
              coursecode: {
                matchPhrasePrefix: text
              }
            }
          }
        })
        setCourses(search.data.searchCourses.items)
      } catch (e) {
        Alert.alert(error)
      }
    }
  }

  const fetchCourses = async () => {
    let error = "There appear to be network issues.Please try again later"
    try {
      let stu=student
      if(student===null){
        setIsLoading(true); // Set loading state to true during API call
        let user = await Auth.currentAuthenticatedUser()
        let studentEmail = user.attributes.email;
        let act = []
         stu = await API.graphql({
          query: listStudents,
          variables: {
            filter: {
              email: {
                eq: studentEmail
              }
            }
          }
        })

        let found = false
        for (let i = 0; i < stu.data.listStudents.items.length; i++) {
          if (stu.data.listStudents.items[i].owner === user.attributes.sub) {
            stu = stu.data.listStudents.items[i];
            found = true;
            break;
          }
        }

     if(found===false){
          let domain = studentEmail.split("@")[1]

      //   //Find Institution via domain
        let institution = await API.graphql({
          query: listInstitutions,
          variables: {
            filter: {
              domains: {
                contains: domain
              }
            }
          },
         
        })

        //Institution not found
        if (institution.data.listInstitutions.items.length === 0) {
          error = "Could not determine institution"
          throw Error()
        }

        institution = institution.data.listInstitutions.items[0]

        //Create student
        let newStudent = {
          institutionId: institution.id,
          firstname: user.attributes.name,
          lastname: user.attributes.family_name,
          userRole: "Student",
          email: studentEmail
        }

        let create = await API.graphql({
          query: createStudent,
          variables: { input: newStudent },
        })
        stu = create.data.createStudent
      
        updateStudent(stu);
     }else if(stu.enrollments!==undefined){
        let c = [];
        for (let i = 0; i < stu.enrollments.items.length; i++) {
          c.push(stu.enrollments.items[i].course);
        }
        setSelectedModules(c)
        if (stu.timetable !== null && stu.timetable.activityId!==undefined) {
          for (let i = 0; i < stu.timetable.activityId.length; i++) {
            for (let j = 0; j < c.length; j++) {
              let index = c[j].activity.items.find(item => item.id === stu.timetable.activityId[i])
              if (index !== undefined) {
                act.push(index)
                break;
              }
            }
          }
          if(stu.enrollments===undefined){
            stu.enrollments={
              items:[]
            }
          }
          setActivities(act)
        }
        updateStudent(stu)
        setIsLoading(false); // Set loading state to false after courses are fetched
     }
    }else{
        let c=[]
        for (let i = 0; i < student.enrollments.items.length; i++) {
          c.push(student.enrollments.items[i].course);
        }
        setSelectedModules(c);
        setActivities(student.timetable.activities);
      }
      // console.log(stu);
    } catch (e) {
      setIsLoading(false); // Set loading state to false if error
      Alert.alert(error);
      console.log("From edit");  
      console.log(e); 

    }
  }

  useEffect(() => {
    fetchCourses();
  }, [])

  const handleSave = async () => {

    let error = "There appear to be network issues.Please try again later"
    try {
      //Create enrollment if it doesnt exist
      setIsSaving(true);
      let activityIds = []

      for (let i = 0; i < activities.length; i++) {
        if (activities[i] != undefined) {
          activityIds.push(activities[i].id)
        }
      }
      if (student === null) {
        throw Error()
      }
      if ((selectedModule !== null && selectedModule !== undefined) && student.enrollments.items.filter((item) => item.courseId === selectedModule.id).length === 0) {
        enroll = {
          courseId: selectedModule.id,
          studentId: student.id,
        }
        let newEnrollment = await API.graphql({
          query: createEnrollment,
          variables: { input: enroll }
        })
        // console.log(newEnrollment);
        let s = student;
        student.enrollments.items.push(newEnrollment.data.createEnrollment);
        updateStudent(student);
      }
      if (student.studentTimetableId === null) {
        // console.log("New timetable");
        let newTimetable = {
          studentId: student.id,
          activityId: activityIds,
        }

        let create = await API.graphql({
          query: createTimetable,
          variables: { input: newTimetable },
        })
        let a=await API.graphql({
          query:updateStudentInfo,
          variables:{input:{id:student.id,studentTimetableId:create.data.createTimetable.id}}
        })

        let s = student
        s.timetable = create.data.createTimetable
        s.studentTimetableId = s.timetable.id
        console.log(s);
        updateStudent(s);
      }
      else {

        if (student === null) {
          throw Error()
        }
        let newTimetable = {
          id: student.studentTimetableId,
          studentId: student.id,
          activityId: activityIds
        }
        let update = await API.graphql({
          query: updateTimetable,
          variables: { input: newTimetable }
        })
        
        let s = student
        s.timetable = update.data.updateTimetable;
       //console.log(update.data.updateTimetable);       
        updateStudent(s);
      }
      setIsSaving(false);
      toggleModal(null)
    } catch (e) {
      console.log("From save");
      console.log(e);
      //setIsSaving(false);
      Alert.alert(error);
      
    }
  }

  const addActivity = (activity) => {
    let rows = [...activities]
    for (let i = 0; i < activities.length; i++) {
      if (activities[i].activityname === activity.activityname && activities[i].courseId === activity.courseId) {
        rows.splice(i, 1)
      }
    }
    rows.push(activity)
    setActivities(rows)
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
              //console.log(act);
              let error = "Failed to remove course. Please try again later";

              try {
                for (let i = 0; i < student.enrollments.items.length; i++) {
                  if (student.enrollments.items[i].courseId === item.id) {
                    del = await API.graphql({
                      query: deleteEnrollment,
                      variables: { input: { id: student.enrollments.items[i].id } }
                    });

                    student.enrollments.items.splice(i, 1);
                    updateStudent(student);
                    break;
                  }
                }
                await handleSave();
                updateStudent(student);
                setSelectedModules((prevModules) =>
                  prevModules.filter((module) => module.id !== item.id)
                );
                setActivities(act);
                setSelectedModule(null);
              } catch (e) {
                console.log("From delete")
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
                Fetching your modules...
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
                  You have no modules
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
                {/* <Text style={styles.moduleName}>{selectedModule.name}</Text>
                
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
                  />
                ))}

                {/*Display practicals*/}
                {practicals.map((practical, i) => (
                  selectedModule.activity.items.filter(item => item.activityname == practical).length > 0 &&
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
            onPress={() => handleSave()}
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