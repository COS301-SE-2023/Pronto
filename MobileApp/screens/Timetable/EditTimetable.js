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
import { Feather} from "@expo/vector-icons";
import { Card, Button, IconButton } from "react-native-paper";
import SearchFilter from "../../components/SearchFilter";
import { FlatList } from "react-native";
import DropdownComponent from "../../components/Dropdown";
import { Auth, DataStore, Predicates } from "aws-amplify"
import { useStudent } from "../../ContextProviders/StudentContext";
import { Student, Course, Enrollment, Timetable } from "../../models";

const EditTimetable = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const [courses, setCourses] = useState([])
  const lectures = ["L01", "L02", "L03", "L04", "L05", "L06", "L07", "L08", "L09"];
  const tutorials = ["T01", "T02", "T03", "T04", "T05", "T06", "T07", "T08", "T09"];
  const practicals = ["P01", "P02", "P03", "P04", "P05", "P06", "P07", "P08", "P09"];
  const [activities, setActivities] = useState([])

  const { student, updateStudent } = useStudent();
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

  const addToModules = async (module) => {
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

    
      if(text===null || text==="" || text===undefined){
        return;
      }
      try {

        if(student===null || student===undefined){
          await fetchCourses();
          return;
        }
        
        let search = await DataStore.query(Course, (c) => c.coursecode.contains(text.toUpperCase()));

        for (let i = 0; i < search.length; i++) {
          search[i].activity = await search[i].activity.values
        }
        setCourses(search.filter((item) => item._deleted === null && item.institutionId === student.institutionId));

      } catch (e) {
        Alert.alert(error);
       
      }
    //}
  }

  const fetchCourses = async () => {
    try {
      let stu = student;
      


      
      setIsLoading(true);
      const user = await Auth.currentAuthenticatedUser();
      
      const id = user.attributes.sub;
      stu = await DataStore.query(Student, id);
    
      if(stu===undefined)
       return;
      const enrollment = await stu.enrollments.values;

      let c = [];
      let m = [];
      setCourses([]);
      const studentTimetable = await stu.timetable;
      let activityList=[]
      if(studentTimetable!==undefined){
        const activity = studentTimetable.activityId;
        activityList = removeDuplicates(activity);
      }
      if(enrollment!==undefined){
        for (let i = 0; i < enrollment.length; i++) {
          if (enrollment[i]._deleted === null) {
            const course = await enrollment[i].course;
            if(course._deleted===null){
              const activity = await course.activity.values;
              course.activity = activity;
              m.push(course);
              for (let j = 0; j < activity.length; j++) {
                let saveActivity = activity[j];
                saveActivity.course = {
                  coursecode: course.coursecode
                }
              if (saveActivity._deleted === null && activityList.includes(saveActivity.id)) {
                c.push(saveActivity);
              }
            }
          }
        }
      }
      
      stu.enrollments = enrollment.filter((e) => e._deleted === null);
    
      stu.timetable = studentTimetable;
      updateStudent(stu);

      setActivities(c);
      }
      setSelectedModules(m);
      updateStudent(stu);
      setIsLoading(false);

    } catch (e) {
      setIsLoading(false); // Set loading state to false if error
   

    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

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
      if ((selectedModule !== null && selectedModule !== undefined)  && student.enrollments.filter((item) => item.courseId === selectedModule.id && item._deleted !== null).length === 0) {
        
        let newEnrollment = await DataStore.save(
          new Enrollment({
            "studentId": student.id,
            "courseId": selectedModule.id,
            "year": new Date().getFullYear(),
            "student": student,
            "course": selectedModule,
          })
        );
        
        student.enrollments.push(newEnrollment);
        updateStudent(student);

      }

      //Create a new timetable if it doesnt exist
      if (student.timetable === undefined || student.timetable===null || student.studentTimetableId===null) {
       
        let newTimetable = await DataStore.save(
          new Timetable({
            "studentId": student.id,
            "activityId": activityIds,
            "student": student,
            "activities": []
          })
        );
        
        student.timetable = newTimetable;
        student.studentTimetableId = newTimetable.id;

        let updatingStudent = await DataStore.save(Student.copyOf(student, updated => {
          updated.timetable = newTimetable,
            updated.studentTimetableId = newTimetable.id
        }));

       

        let s = student
    
        updateStudent(student);

      }

      //Update existing timetable
      else {

        

        let updatedTimetable = await DataStore.save(Timetable.copyOf(student.timetable, updated => {
          updated.activityId = activityIds
        }));
        let updatingStudent=await DataStore.save(Student.copyOf(student, updated => {
            updated.timetable=updatedTimetable,
            updated.studentTimetableId=updatedTimetable.id  
        }));

        
        student.timetable = updatedTimetable;
        
        updateStudent(student);
     
      }
      setIsSaving(false);
      toggleModal(null);

    } catch (e) {
   
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

    setActivities(rows);
  }

  function removeDuplicates(arr) {
    let unique = [];
    arr.forEach(element => {
      if (!unique.includes(element)) {
        unique.push(element);
      }
    });
    return unique;
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
                for (let i = 0; i < student.enrollments.length; i++) {
                  if (student.enrollments[i].courseId === item.id) {
                    // del = await API.graphql({
                    //   query: deleteEnrollment,
                    //   variables: { input: { id: student.enrollments.items[i].id ,_version:student.enrollments.items[i]._version} }
                    // });
                   
                    //console.log(student.enrollments[i]);
                    let s = await DataStore.query(Enrollment, student.enrollments[i].id);
                    
                    let del = await DataStore.delete(s);
                   
                    student.enrollments.splice(i, 1);
                    
                    break;
                  }
                }
                let updatedActs=[]
                for(let i=0;i<act.length;i++){
                  updatedActs.push(act[i].id);
                }
                 let updatedTimetable = await DataStore.save(Timetable.copyOf(student.timetable, updated => {
                    updated.activityId = updatedActs
                }));
                
                setSelectedModules((prevModules) =>
                  prevModules.filter((module) => module.id !== item.id)
                );
                setActivities(act);
                setSelectedModule(null);
              } catch (e) {
                
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
                  selectedModule.activity.filter(item => item.activityname == lecture).length > 0 &&
                  <DropdownComponent
                    key={i}
                    activity={"Lecture"}
                    moduleContent={
                      selectedModule.activity.filter(item => item.activityname === lecture).map((act, index) => (
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
                    currentActivity={activities.filter((a) => a.courseId === selectedModule.id && a.activityname === lecture)[0]}
                  />
                ))}

                {/*Display tutorials*/}
                {tutorials.map((tutorial, i) => (
                  selectedModule.activity.filter(item => item.activityname == tutorial).length > 0 &&
                  <DropdownComponent
                    key={i}
                    activity={"Tutorial"}
                    moduleContent={
                      selectedModule.activity.filter(item => item.activityname === tutorial).map((act, index) => (
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
                    currentActivity={activities.filter((a) => a.courseId === selectedModule.id && a.activityname === tutorial)[0]}
                  />
                ))}

                {/*Display practicals*/}
                {practicals.map((practical, i) => (
                  selectedModule.activity.filter(item => item.activityname === practical).length > 0 &&
                  <DropdownComponent
                    key={i}
                    activity={"Practical"}
                    moduleContent={
                      selectedModule.activity.filter(item => item.activityname === practical).map((act, index) => (
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
                    currentActivity={activities.filter((a) => a.courseId === selectedModule.id && a.activityname === practical)[0]}
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
            onPress={async () => { await handleSave() }}
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