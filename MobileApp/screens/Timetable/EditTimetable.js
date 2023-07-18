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
import{searchCourses,listTimetables,listStudents, enrollmentsByStudentId} from "../../graphql/queries"
import{createStudent, createTimetable,updateTimetable} from "../../graphql/mutations"

const EditTimetable = ({ onSearch }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const[courses,setCourses]=useState([])
  const[lectures,setLectures]=useState(["L01","L02","L03","L04","L05","L06","L07","L08","L09"])
  const[tutorials,setTutorials]=useState(["T01","T02","T03","T04","T05","T06","T07","T08","T09"])
  const[practicals,setPracticals]=useState(["P01","P02","P03","P04","P05","P06","P07","P08","P09"])
  const[timetable,setTimetable]=useState(null)
  const[activities,setActivities]=useState([])

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
    console.log("Adding to modules")
    console.log(selectedModules.length)
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
      activity:[ 
        {
          activityname:"L01",
          day:"Monday",
          start:"11:30",
          end:"12:20",
          venue:"HB 4-9",
          group:"G01"
        },
        {
          activityname:"L01",
          day:"Monday",
          start:"11:30",
          end:"12:20",
          venue:"Louw Hall",
          group:"G02"
        },
        {
            activityname:"L02",
            day:"Tuesday",
            start:"13:30",
            end:"14:30",
            venue:"North Hall",
            group:"G01"
        }
      ]
    }
        ]
        setCourses(m)
    }catch(error){
      console.log(error)
    }

    setInput(text)
  }
  
  const fetchCourses= async()=>{ 
    try{
      //Find Student
        let user=await Auth.currentAuthenticatedUser()
        let studentEmail=user.attributes.email;
        let student=await API.graphql({
              query:listStudents,
              variables:{input:{
                filter :{ 
                  email : { 
                    eq:studentEmail
                  }
                }
              } 
                               } ,
          authMode:"AMAZON_COGNITO_USER_POOLS"                
        })

        //Student does not exist so create them
        if(student.data.listStudents.items.length===0){
          let domain=studentEmail.split("@")[1]
          
          //Find Institution via domain
          let institution= await API.graphql({
            query:listInsitituions,
            variables:{input:{
              filter:{
                domains:{
                  contains: domain
                }
              }
            }},
            authMode:"AMAZON_COGNITO_USER_POOLS"
          })
          if(institution.data.listInsitituions.items.length===0)
            throw Error("Could not determine institution")
          
          institution=institution.data.listInsitituions.items[0]

          //Create student
          let newStudent={
            institutionId:institution.id,
            firstname:user.attributes.name,
            lastname:user.attributes.family_name,
            userRole:"Student",
            email:user.attributes.email
             
          }

          let create=await API.graphql({
            query:createStudent,
            variables:{input:newStudent},
            authMode:"AMAZON_COGNITO_USER_POOLS"
          })
        }
        else{
            student=student.data.listStudents.items[0]
            setSelectedModules(student.enrollments.items)
            setTimetable(student.timetable)
            if(student.timetable!==null){
              setActivities(student.timetable.activities.items)
            }
        }
    }catch(error){
      console.log(error)
    }
  }

  const oneModule = ({ item }) => {
    //console.log("In one module")
    //console.log(item.id)

    const handleDelete = () => {
      setSelectedModules((prevModules) =>
        prevModules.filter((module) => module.id !== item.id)
      );
      console.log("Deleting module")
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
                You have no Courses
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
                {lectures.map((lecture,i)=>(
                  selectedModule.activity.filter(item=>item.activityname==lecture).length>0 &&
                      <DropdownComponent
                          key={i}
                          activity={"Lecture"}
                          moduleContent={
                                  selectedModule.activity.filter(item=>item.activityname===lecture).map((act,index)=>(
                                    {
                                    label: `${act.day}: ${act.start} - ${act.end} (${act.venue})`,
                                  
                                  value: `${index + 1}`,}
                                    )
                                  )
                                }
                          activityNumber={i+1}
                          />
                ))}
                {tutorials.map((tutorial,i)=>(
                  selectedModule.activity.filter(item=>item.activityname==tutorial).length>0 &&
                      <DropdownComponent
                          key={i}
                          activity={"Tutorial"}
                          moduleContent={
                                  selectedModule.activity.filter(item=>item.activityname===tutorial).map((act,index)=>(
                                    {
                                    label: `${act.day}: ${act.start} - ${act.end} (${act.venue})`,
                                  
                                  value: `${index + 1}`,}
                                    )
                                  )
                                }
                          activityNumber={i+1}
                          />
                ))}

                {practicals.map((practical,i)=>(
                  selectedModule.activity.filter(item=>item.activityname==practical).length>0 &&
                      <DropdownComponent
                          key={i}
                          activity={"Practical"}
                          moduleContent={
                                  selectedModule.activity.filter(item=>item.activityname===practical).map((act,index)=>(
                                    {
                                    label: `${act.day}: ${act.start} - ${act.end} (${act.venue})`,
                                  
                                  value: `${index + 1}`,}
                                    )
                                  )
                                }
                          activityNumber={i+1}
                          />
                ))}
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