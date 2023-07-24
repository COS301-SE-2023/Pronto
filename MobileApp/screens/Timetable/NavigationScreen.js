import React, { useState, useEffect } from 'react';
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
  const [distance, setDistance] = useState(0);
  const [travelTime, setTravelTime] = useState(0);

  const [directions, setDirections] = useState([]);







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
                  apikey={'AIzaSyCF9fZydgCIVlaCUco2xBTKXeQlcKKTTQc'}
                  strokeColor={'#395cda'}
                  strokeWidth={4}
                  onReady={(result) => {

                      //This variable contains the step-by step-instructions for the route
                     let  html_instructions =result.legs[0].steps.map((step) => step.html_instructions);

                   setDistance(result.distance);
                   if(result.duration > 60){
                        result.duration = result.duration / 60;
                        setTravelTime(result.duration);
                   }
                   else {
                     setTravelTime(result.duration);
                   }
                  }
                  }
              />
          )}
        </MapView>
        <View style={styles.searchContainer}>
          <GooglePlacesAutocomplete
              styles={{ textInput: styles.input }}
              placeholder="Origin"
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
          <GooglePlacesAutocomplete
              styles={{ textInput: styles.input }}
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
            <Text style={styles.buttonText}>Trace Route</Text>
          </TouchableOpacity>


              <Text style={styles.distanceText}>Distance: {distance} kilometer</Text>


         <Text style={styles.distanceText}>{travelTime.toFixed(2)}</Text>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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
    padding: 8,
    borderRadius: 8,
    top: Constants.statusBarHeight + 8,
  },
  input: {
    borderColor: '#888',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#bbb',
    paddingVertical: 12,
    marginTop: 16,
    borderRadius: 4,
  },
  buttonText: {
    textAlign: 'center',
  },
  distanceText: {
    marginTop: 8,
    textAlign: 'center',
  },
});

export default NavigationScreen;
