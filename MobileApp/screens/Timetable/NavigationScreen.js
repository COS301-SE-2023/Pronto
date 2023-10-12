import React, { useEffect, useState, useRef } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, FlatList, Alert, TextInput, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StepByStepInstructions from '../../components/StepByStepInstructions';
import MapViewDirections from "react-native-maps-directions";
import { REACT_APP_GOOGLE_API_KEY } from "@env";
import * as Location from 'expo-location';
import { SelectList } from "react-native-dropdown-select-list";
import { useStudent } from "../../ContextProviders/StudentContext";
import { API, Auth,DataStore } from "aws-amplify";
import { getStudent } from "../../graphql/queries";
import { Student } from '../../models';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const initialRegion = {
    latitude: -25.7522,
    longitude: 28.2322,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
};

const NavigationScreen = ({ navigation, route }) => {

    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);
    const [mapRoute, setMapRoute] = useState(false);
    const [distance, setDistance] = useState("");
    const [travelTime, setTravelTime] = useState("");
    const [instructions, setInstructions] = useState([]);
    const [coordinates, setCoordinates] = useState([]);

    const [currentRegion, setCurrentRegion] = useState(initialRegion);
    const mapViewRef = useRef(null);

    const { student, updateStudent } = useStudent();
    // Function to handle the data from the MapViewDirections component
    function handleOnReady(result) {
        // Extract the step-by-step instructions from the result object
        const steps = result.legs[0].steps.map((step, index) => {
            // Remove the destination part from the last instruction
            const isLastStep = index === result.legs[0].steps.length - 1;
            const instruction = isLastStep
                ? step.html_instructions.split('<div')[0]
                : step.html_instructions;

            // Use a regular expression to remove HTML tags from the instructions
            let cleanInstructions = instruction.replace(/<[^>]*>/g, '');

            return cleanInstructions;
        });

        setInstructions(steps);
        // Round the distance to 2 decimal places
        setDistance(result.distance.toFixed(2) + "km");
        setTravelTime(result.duration.toFixed(0) + " mins");
    }

    // Request access to the user's location data
    // This function will be called from the useEffect hook to run when it is mounted
    const requestLocationPermission = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
            await getUserLocation();
        } else {
            // In the future, this else statement will return the user to the home page
            Alert.alert("Location permission not granted");
            ///navigation.navigate('ScheduleTable')
        }
    }

    // Function that will be called to gather the user's location
    // NOTE: the function is called only AFTER the user has granted permission and this WILL NOT change.
    const getUserLocation = async () => {
        try {
            if (origin === null) {
                const location = await Location.getCurrentPositionAsync({});
                setOrigin(location.coords); // Set the origin to the user's current location
                // Update the currentRegion state with the user's location
                const newRegion = {
                    ...currentRegion,
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                };
                setCurrentRegion(newRegion);
                // Use animateToRegion to zoom to the user's location
                mapViewRef.current.animateToRegion(newRegion, 1000); // You may adjust the duration (1000 ms) as needed
            }
        } catch (error) {
            Alert.alert("Please give access to your location to get directions");
        }
    };


    const fetchLocations = async () => {
        try {

            let stu = student;
            // if (student === null) {
            //     const user = await Auth.currentAuthenticatedUser();
            //     stu = await API.graphql({
            //         query: getStudent,
            //         variables: { id: user.attributes.sub }
            //     })

            //     stu = stu.data.getStudent;
            //     stu.enrollments.items=stu.enrollments.items.filter((items)=>items._deleted===null)
            //     if (stu === null || stu === undefined) {
            //         throw Error();
            //     }
            //     updateStudent(stu);
            // }

            const user = await Auth.currentAuthenticatedUser();
            const id=user.attributes.sub;
            stu = await DataStore.query(Student, id);
     
            const enrollment=await stu.enrollments.values;
     
            let c=[];
            let m=[];
            const studentTimetable= await stu.timetable;
            if(studentTimetable===null || studentTimetable===undefined)
                return;
            const activity=studentTimetable.activityId;
            const activityList=removeDuplicates(activity)
    
            for(let i=0;i<enrollment.length;i++){
                if(enrollment[i]._deleted===null){
                    const course=await enrollment[i].course;
                    const activity=await course.activity.values;
                    course.activity=activity;
                    m.push(course);
                    for(let j=0;j<activity.length;j++){
                        let saveActivity= activity[j];
                            saveActivity.course={
                                coursecode:course.coursecode
                            }
                        if(saveActivity._deleted===null && activityList.includes(saveActivity.id)){
                            c.push(saveActivity);
                        }
                    }
                }
            }
            stu.enrollments=enrollment.filter((e)=>e._deleted===null);
            stu.timetable=studentTimetable;
            updateStudent(stu);
            //setActivities(c);
            let act=c;
            
            let loc = [];
            let locationNames = new Map();
            //console.log(act.length);
            for (let i = 0; i < act.length; i++) {
                //console.log(act[i].coordinates);
                if (act[i].coordinates !== null) {
                    let location = act[i].coordinates.split(';');
                    if (locationNames.get(location[0]) === undefined && location[0] !== "") {
                        let coordinate = {
                            key: i,
                            name: location[0],
                            value: {
                                latitude: parseFloat(location[1]),
                                longitude: parseFloat(location[2])
                            }
                        }
                        loc.push(coordinate);
                        locationNames.set(location[0], "1");
                    }
                }
            }
            // let changed = false;
            // if (coordinates.length === loc.length) {
            //     for (let i = 0; i < coordinates.length - 1; i++) {
            //         if (coordinates[i].name !== loc[i].name) {
            //                 changed = true;
            //             }
            //         }
            //     }
            //     else {
            //         changed = true;
            //     }
                //if (changed) {
            setCoordinates(loc);
                //}

            //}

        } catch (e) {
            //Alert.alert(error);
            console.log(e);
        }
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

    // //    useEffect hook to run the requestLocationPermission function when the component is mounted
    useEffect(() => {
        requestLocationPermission();
        fetchLocations();
    }, []);


    // Below defines styling for the location text input for the user's current location
    // Green border will be for location gathered
    // Red border will be for location not gathered and display different text
    const greenStyle = {
        ...styles.input,
        borderWidth: 0,
        color: 'green',
        width: '80%',
        justifyContent: 'center',
        fontSize: 16,
        fontWeight: '400',
        paddingLeft: 19,

    };

    const redStyle = {
        ...styles.input,
        borderWidth: 0,
        color: '#e32f45',
        width: '80%',
        justifyContent: 'center',
        fontSize: 16,
        fontWeight: '400',
        paddingLeft: 19,
    };

    // Function to set the destination location, it is called when the user clicks the SelectedList component
    //We then traverse the locations and look for the selected location details
    const setDestinationLocation = (itemValue) => {
        setMapRoute(false);
        // const selectedItem = locationInfo.find(item => item.name === itemValue);

        const selectedItem = coordinates.find(item => item.name === itemValue);

        if (selectedItem) {
            const dest = {
                name: selectedItem.name,
                latitude: selectedItem.value.latitude, // Use the latitude from the selected venue
                longitude: selectedItem.value.longitude, // Use the longitude from the selected venue
            }
            setDestination(dest);

            // Zoom the map to the selected destination
            const newRegion = {
                ...currentRegion,
                latitude: selectedItem.value.latitude,
                longitude: selectedItem.value.longitude,
            };
            setCurrentRegion(newRegion);
            mapViewRef.current.animateToRegion(newRegion, 1000);
        }

    }


    return (
        <View style={styles.container}>
            <MapView
                style={styles.mapStyle}
                provider={PROVIDER_GOOGLE}
                initialRegion={currentRegion}
                ref={mapViewRef} // Set the ref to mapViewRef
            >

                {origin && <Marker coordinate={origin} title="Origin" />}
                {destination && <Marker coordinate={destination} title="Destination" />}
                {mapRoute && origin && destination && (
                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={REACT_APP_GOOGLE_API_KEY} // Use the imported GOOGLE_API_KEY directly
                        strokeColor="#e32f45" // Set the mapRoute color to #e32f45
                        strokeWidth={4}
                        mode="WALKING"
                        onReady={handleOnReady}
                    />

                )}
            </MapView>
            <View style={styles.searchContainer}>
                {/* Input for the origin with icon */}
                <View style={styles.inputContainer}>
                    <Icon name="location-on" size={20} color="#e32f45" style={styles.inputIcon} />
                    {/* If the origin has been set, the input is filled */}
                    <TextInput
                        style={origin ? greenStyle : redStyle} // Apply green style if origin is set, red style otherwise
                        placeholder="Origin"
                        value={origin ? "Your  Location" : "Getting Location..."}
                        editable={false}
                    />
                </View>

                <View style={styles.line} />

                {/* Input for the destination with icon */}

                <View style={styles.inputContainer}>
                    {/* Icon */}
                    <Icon name="location-on" size={20} color="#e32f45" style={styles.inputIcon} />

                    {/* Select List */}
                    <SelectList
                        data={coordinates.map(item => item.name)}
                        label="Locations"
                        save={"value"}
                        search={false}
                        placeholder={destination ? destination.name : "Select venue"}
                        // defaultOption={destination ? {key:'1',value:destination.name} : { key: '1', value: 'Select Venue'}}
                        inputStyles={{
                            color: 'grey', fontSize: 16
                        }}
                        boxStyles={{ borderWidth: 0, marginBottom: 8, width: 300 }}
                        dropdownTextStyles={{
                            fontSize: 16, color: 'grey'
                        }}
                        dropdownStyles={{
                            width: 300, marginBottom: 10, borderWidth: 0
                        }}
                        setSelected={setDestinationLocation}
                    //defaultOption={{ key: '1', value: 'Select Venue' }}

                    />
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        if (origin && destination) {
                            // Calculate the new region that encompasses both origin and destination
                            const coordinates = [origin, destination];
                            mapViewRef.current.fitToCoordinates(coordinates, {
                                edgePadding: { top: 330, bottom: 300 }, // Adjust padding as needed
                                animated: true, // Set to true for a smooth animation
                            });

                            // Set mapRoute to true and trigger the mapRoute calculation
                            setMapRoute(true);
                        } else {
                            // Handle case where origin or destination is not set
                            Alert.alert("Origin and destination must be set.");
                        }
                    }}
                >
                    <Text style={[styles.buttonText, { color: 'white', fontWeight: 600 }]}>Get Directions</Text>
                </TouchableOpacity>

                {travelTime && distance && (
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoText}>
                            <Text style={{ color: "#e32f45" }}>Distance: </Text> {distance}
                        </Text>
                        <Text style={styles.infoText}>
                            <Text style={{ color: "#e32f45" }}>Travel Time: </Text> {travelTime}
                        </Text>
                    </View>
                )}

            </View>
            {instructions.length > 0 && (
                <View style={styles.instructionsContainer}>
                    <StepByStepInstructions instructions={instructions} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    mapContainer: {
        flex: 1,
        position: 'relative',
    },
    mapStyle: {
        flex: 1,
    },
    searchContainer: {
        position: 'absolute',
        width: '90%',
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 4,
        padding: 16,
        borderRadius: 8,
        top: "3%",
        alignSelf: 'center',
    },
    instructionsContainer: {
        position: 'absolute',
        bottom: 0,
        width: '98%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 125,
        paddingLeft: 10,
    },
    input: {
        borderColor: '#888',
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 5,
        padding: 8,
    },
    button: {
        backgroundColor: '#e32f45',
        paddingVertical: 12,
        borderRadius: 20,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
    infoContainer: {
        marginTop: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoText: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    line: {
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginBottom: 8,
        marginHorizontal: 10,
    },
    inputContainer: {
        flexDirection: 'row', // Display icon and Select List side by side
        alignItems: 'center', // Vertically align them to the center
    },
    inputIcon: {
        marginRight: 8, // Adjust the margin to separate the icon from the Select List
    },

});

export default NavigationScreen;