import React, { useEffect, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, FlatList, Alert, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StepByStepInstructions from '../../components/StepByStepInstructions';
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_API_KEY } from "@env";
import * as Location from 'expo-location';
import locationInfo from "../../assets/data/locationInfo.json";
import { SelectList } from "react-native-dropdown-select-list";

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

const NavigationScreen = () => {

    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);
    const [route, setRoute] = useState(false);
    const [distance, setDistance] = useState("");
    const [travelTime, setTravelTime] = useState("");
    const [instructions, setInstructions] = useState([]);

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
        }
    }

    // Function that will be called to gather the user's location
    // NOTE: the function is called only AFTER the user has granted permission and this WILL NOT change.
    const getUserLocation = async () => {
        try {
            const location = await Location.getCurrentPositionAsync({});
            setOrigin(location.coords); // Set the origin to the user's current location
        } catch (error) {
            Alert.alert("Please give access to your location to get directions")

        }
    };

    // useEffect hook to run the requestLocationPermission function when the component is mounted
    useEffect(() => {
        requestLocationPermission().then();
    }, []);

    // Below defines styling for the location text input for the user's current location
    // Green border will be for location gathered
    // Red border will be for location not gathered and display different text
    const greenStyle = {
        ...styles.input,
        borderWidth: 0,
        color: 'grey',
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
    };

    // Function to set the destination location, it is called when the user clicks the SelectedList component
    //We then traverse the locations and look for the selected location details
    const setDestinationLocation = (itemValue) => {
        setDestination(null);
        setRoute(false);
        const selectedItem = locationInfo.find(item => item.name === itemValue);
        if (selectedItem) {
            const dest = {
                latitude: -25.7530,
                longitude: 28.2315,
            }
            setDestination(dest);

        }
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.mapStyle}
                provider={PROVIDER_GOOGLE}
                initialRegion={initialRegion}
            >
                {origin && <Marker coordinate={origin} title="Origin" />}
                {destination && <Marker coordinate={destination} title="Destination" />}
                {route && origin && destination && (
                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={process.env.GOOGLE_API_KEY}
                        strokeColor={'#395cda'}
                        strokeWidth={4}
                        mode={"WALKING"}
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
                        data={locationInfo.map(item => item.name)}
                        label="Locations"
                        save={"value"}
                        search={true}
                        searchPlaceholder='Search for venue'
                        notFoundText='Venue not found'
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
                        defaultOption={{ key: '1', value: 'Select Venue' }}

                    />
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setRoute(true);
                        getUserLocation().then();
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

