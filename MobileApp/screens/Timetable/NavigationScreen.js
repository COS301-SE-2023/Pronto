import React, { useEffect, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View, FlatList, Alert, TextInput} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StepByStepInstructions from '../../components/StepByStepInstructions';
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_API_KEY } from "@env";
import * as Location from 'expo-location';

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





    // this function will handle the data from the MapViewDirections component
    function handleOnReady(result) {
        // extract the step-by-step instructions from the result object
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
        //round the distance to 2 decimal places
        setDistance(result.distance.toFixed(2) + "km");
        setTravelTime(result.duration.toFixed(2) + " mins");

    }

    //Request access to the users location data
    //this function will be called from the useEffect hook to run when it is mounted
    const requestLocationPermission = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
            await getUserLocation() ;
        }
        else {
            // In future this else statement will return the user to the home page
            Alert.alert("Location permission not granted");
        }
    }

    // Function that will be called to gather the users location
    // NOTE: the function is called only AFTER the user has granted permission and this WILL NOT change.
    const getUserLocation = async () => {
        try {
            const location = await Location.getCurrentPositionAsync({});
            setOrigin(location.coords) ; // set the origin to the user's current location
        } catch (error) {
            console.error("Error getting user's location:", error);
        }
    };

    // useEffect hook to run the requestLocationPermission function when the component is mounted
    useEffect(() => {
        requestLocationPermission().then();
    }, []);

    //Below defines styling for the location textinput for the users current location
    //Green border will be for location gathered
    // Red border will be for location not gathered and display different text
    const greenStyle = {
        ...styles.input,
        borderWidth: 2,
        borderColor: '#70da63',
        color: 'black',
        borderRadius: 4,
        width: '80%',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    };


    const redStyle = {
        ...styles.input,
        borderWidth: 2,
        borderColor: '#b92323',
        color: 'black',
        borderRadius: 4,
        width: '80%',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    };

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
                        apikey={GOOGLE_API_KEY}
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
                    {/*if the origin has been set, the input is filled*/}
                    <TextInput
                        style={origin ? greenStyle : redStyle} // Apply green style if origin is set, red style otherwise
                        placeholder="Origin"
                        value={origin ? "Your Location" : "Getting Location..."}
                        editable={false}
                    />
                </View>

                <View style={styles.line} />

                {/* Input for the destination with icon */}
                <View style={styles.inputContainer}>
                    <Icon name="location-on" size={20} color="#e32f45" style={styles.inputIcon} />
                    <GooglePlacesAutocomplete
                        styles={styles.input}
                        placeholder="Destination"
                        query={{
                            key: GOOGLE_API_KEY,
                            language: 'en',
                        }}
                        fetchDetails={true}
                        onPress={(data, details = null) => {
                            setDestination({
                                latitude: details.geometry.location.lat,
                                longitude: details.geometry.location.lng,
                            });
                        }}
                    />
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setRoute(true);
                    }}
                >
                    <Text style={[styles.buttonText, { color: 'white', fontWeight: 600 }]}>Get Directions</Text>
                </TouchableOpacity>
                {travelTime && distance && (
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoText}>Distance: {distance}</Text>
                        <Text style={styles.infoText}>{travelTime}</Text>
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
        borderRadius: 4,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
    infoContainer: {
        marginTop: 16,
        alignItems: 'center',
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
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },

    // New style for the icon
    inputIcon: {
        marginHorizontal: 8,

    },
});


export default NavigationScreen;
