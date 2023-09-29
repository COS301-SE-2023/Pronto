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
import { searchCourses, getStudent } from "../../graphql/queries"
import { createEnrollment, deleteEnrollment, updateStudentInfo, createTimetable, updateTimetable } from "../../graphql/mutations"
import { useStudent } from "../../ContextProviders/StudentContext";
import mockCourses from "../../assets/data/mock/mock-modules";
import mockData from "../../assets/data/mock/mock-modules";
import "../../assets/data/mock/global";



const EditTimetable = ({ navigation }) => {
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
        let stu = mockData.student ;
        console.log("Before module added" , stu.enrollments.items);
        const modules = selectedModules;
        // add modules to the end of the array
        modules.push(module);
        setSelectedModules(modules);
        mockData.student = stu ;
        console.log("After module added" , stu.enrollments.items);



    };


    const [input, setInput] = useState("");

    const handleSearch = (text) => {
        const mockData = mockCourses;
        setInput(text);

        if (text !== null) {
            try {
                // Replace the API call with code to filter modules from mock data
                const filteredModules = mockData.courses.filter((course) =>
                    course.coursecode.toLowerCase().includes(text.toLowerCase())
                );

                setCourses(filteredModules);
            } catch (e) {
                Alert.alert(error);
            }
        }
    };


    const fetchCourses = async () => {
       mockCourses.test = "test" ;
        const mockData = mockCourses;
        try {
            let stu = student;

            // Check if student data is already available, if not, use mock data
            if (student === null || student.id === undefined) {
                setIsLoading(true);
                // Replace with mock student data
                stu = mockData.student;
                updateStudent(stu);
            }

            // Extract courses and activities from mock data
            let matchedCourses = [];

// Loop through each enrollment
            stu.enrollments.items.forEach((enrollment) => {

                // Find a module that matches the courseId of the enrollment
                let matchedModule = mockData.courses.find((module) =>module.id === enrollment.courseId);

                //Check that the module does not already exist in the matchedCourses array
                if (!matchedCourses.includes(matchedModule) && matchedModule != null) {
                    // Add the module to the matchedCourses array
                    matchedCourses.push(matchedModule);

                }

            });

            setSelectedModule(null) ;
            setSelectedModules(matchedCourses);

            // Check if student has a timetable in mock data
            if (stu.timetable === null) {
                setActivities([]);
                setIsLoading(false);
                return;
            }

            // Extract activities from mock data based on activity IDs in the timetable
            const act = stu.timetable.activityId.map((activityId) =>
                mockData.activities.find((activity) => activity.id === activityId)
            );

            setActivities(act);
            setIsLoading(false); // Set loading state to false after courses are fetched
        } catch (e) {
            setIsLoading(false); // Set loading state to false if error
            console.log("From edit");
            console.log(e);
        }
    };


    useEffect(() => {
        fetchCourses();
        global.flag = true ;
    }, []);

    const handleSave = async (module) => {
        setIsSaving(true);
        const moduleContext = React.createContext(module);

        setIsSaving(false);

    };

    const addActivity = async (activity) => {
        let rows = [...mockData.activities];


        for (let i = 0; i < activities.length; i++) {
            if (mockData.activities[i].activityname === mockData.activities.activityname && mockData.activities[i].coursed === activity.courseId) {
                rows.splice(i, 1)
            }
        }

        rows.push(activity)
        //student.timetable.activities=rows;
        //updateStudent(student);
        //let s=await updateStudent(student);
        // student.timetable.activities=s.timetable.activities;
        setActivities(rows);
        console.log(rows);
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
                                            variables: { input: { id: student.enrollments.items[i].id } }
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
                                Alert.alert(error);
                            }
                        },
                    },
                ]
            );
        };




        return (
            <View style={{ margin: 20 }}>
                <TouchableWithoutFeedback onPress={() =>   addToModules(item)}>
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
                                        onPress={() => {toggleModal(item)}}
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
                                    selectedModule.activity.items.filter(item => item.activityname === lecture.length > 0) &&
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
                                        currentActivity={activities[0]}
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
                                        currentActivity={activities[0]}
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
                                        currentActivity={activities[0]}
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
                        onPress={async () => { await handleSave(module) }}
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