import React, { useRef } from 'react';
import { View, Image, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HelpScreen = () => {
  const manualImages = [
    require('../../assets/UserManualPages/UserManual-01.png'),
    require('../../assets/UserManualPages/UserManual-02.png'),
    require('../../assets/UserManualPages/UserManual-03.png'),
    require('../../assets/UserManualPages/UserManual-04.png'),
    require('../../assets/UserManualPages/UserManual-05.png'),
    require('../../assets/UserManualPages/UserManual-06.png'),
    require('../../assets/UserManualPages/UserManual-07.png'),
    require('../../assets/UserManualPages/UserManual-08.png'),
    require('../../assets/UserManualPages/UserManual-09.png'),
    require('../../assets/UserManualPages/UserManual-10.png'),
    require('../../assets/UserManualPages/UserManual-11.png'),
    require('../../assets/UserManualPages/UserManual-12.png'),
    require('../../assets/UserManualPages/UserManual-13.png'),
    require('../../assets/UserManualPages/UserManual-14.png'),
    require('../../assets/UserManualPages/UserManual-15.png'),
    require('../../assets/UserManualPages/UserManual-16.png'),
    require('../../assets/UserManualPages/UserManual-17.png'),
    require('../../assets/UserManualPages/UserManual-18.png'),
    require('../../assets/UserManualPages/UserManual-19.png'),
    // Add more images as needed
  ];

  const carouselRef = useRef(null); // Create a ref for the Carousel component

  const renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={item} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
      </View>
    );
  };

  const goToPreviousSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.snapToPrev(); // Use the snapToPrev method of the Carousel
    }
  };

  const goToNextSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.snapToNext(); // Use the snapToNext method of the Carousel
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        ref={carouselRef} // Attach the ref to the Carousel
        data={manualImages}
        renderItem={renderItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width * 0.8}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 100, marginBottom: 100 }}>
        <Icon.Button
          name="keyboard-arrow-left" // Material Icons name for left arrow
          size={40}
          backgroundColor="transparent" // Set background color to transparent
          underlayColor="transparent" // Set underlay color to transparent
          color="#e32f45"
          onPress={goToPreviousSlide} // Call the function to go to the previous slide
        />
        <Icon.Button
          name="keyboard-arrow-right" // Material Icons name for right arrow
          size={40}
          backgroundColor="transparent" // Set background color to transparent
          underlayColor="transparent" // Set underlay color to transparent
          color="#e32f45"
          onPress={goToNextSlide} // Call the function to go to the next slide
        />
      </View>
    </View>
  );
};

export default HelpScreen;