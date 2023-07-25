import React, { useEffect, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import Constants from 'expo-constants';
import MapViewDirections from "react-native-maps-directions";

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

    function calculateTime(passedDistance, metric) {

        if (metric === "km") {

            //calculate the time to travel the route
            const averageSpeed = 30; // Average speed in km/h
            const time = (passedDistance * 1000) / (averageSpeed / 3.6); // Time in seconds
            const hours = Math.floor(time / 3600);
            const minutes = Math.floor((time % 3600) / 60);
            const formattedTime = `${hours}h ${minutes}m`;
            setTravelTime(formattedTime); // Update the duration state
        } else {

            //calculate the time to travel the route
            const averageSpeed = 1.5; // Average speed ratio
            const time = passedDistance / (averageSpeed / 3.6); // Time in seconds

            const hours = Math.floor(time / 3600);

            const minutes = Math.floor((time % 3600) / 60);
            const formattedTime = `Walking time: ${hours}h ${minutes}m`;
            setTravelTime(formattedTime); // Update the duration state
        }

    }

    const calculateDistance = () => {
        if (origin && destination) {
            const R = 6371; // Radius of the Earth in kilometers
            const lat1 = origin.latitude;
            const lon1 = origin.longitude;
            const lat2 = destination.latitude;
            const lon2 = destination.longitude;

            const dLat = ((lat2 - lat1) * Math.PI) / 180;
            const dLon = ((lon2 - lon1) * Math.PI) / 180;

            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos((lat1 * Math.PI) / 180) *
                Math.cos((lat2 * Math.PI) / 180) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            const distance = R * c * 1000; // Distance in meters
            if (distance >= 1000) {
                const newdistance = distance / 1000;
                //caluclate time
                calculateTime(newdistance, "km");
                setDistance(newdistance.toFixed(2).toString() + " kilometers"); // Update the distance state

                console.log("time is " + travelTime);
            } else {
                calculateTime(distance, "m");
                setDistance(distance.toFixed(2).toString() + " meters"); // Update the distance state
            }


        }
    };

    useEffect(() => {
        calculateDistance();
    }, [origin, destination]);

    // this function will handle the data from the MapViewDirections component
    function handleOnReady(result) {

        // extract the step-by-step instructions from the result object
        const steps = result.legs[0].steps.map((step, index) => {
            const instructions = step.html_instructions.replace(/<[^>]*>/g, '');
            console.log(instructions); // the variable we need to print the step by step instructions
        });

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
                        apikey={''}
                        strokeColor={'#395cda'}
                        strokeWidth={4}
                        onReady={handleOnReady}
                    />
                )}
            </MapView>
            <View style={styles.searchContainer}>
                <GooglePlacesAutocomplete
                    styles={styles.input}
                    placeholder="Your location"
                    query={{
                        key: '',
                        language: 'en',
                    }}
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                        setOrigin({
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng,
                        });
                    }}
                />
                <View style={styles.line} />
                <GooglePlacesAutocomplete
                    styles={styles.input}
                    placeholder="Destination"
                    query={{
                        key: '',
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
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setRoute(true);
                    }}
                >
                    <Text style={[styles.buttonText, { color: 'white', fontWeight: 600 }]}>Get Directions</Text>
                </TouchableOpacity>
                {route && (
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoText}>Distance: {distance}</Text>
                        <Text style={styles.infoText}>{travelTime}</Text>
                    </View>
                )}
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
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
        alignSelf: 'center', // Center the search container horizontally
    },
    input: {
        borderColor: '#888',
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 8,
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
        fontSize: 16,
        fontWeight: 'bold',
    },
    line: {
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginBottom: 8,
    },
});


export default NavigationScreen;
