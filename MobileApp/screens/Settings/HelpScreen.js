import React, { useRef, useState } from 'react';
import { View, Image, Dimensions, StyleSheet, Text } from 'react-native';
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

  const carouselRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.carouselItem}>
        <Image source={item} style={styles.image} />
      </View>
    );
  };

  const goToPreviousSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.snapToPrev();
    }
  };

  const goToNextSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.snapToNext();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>How to Use Pronto</Text>
      <Text style={styles.subHeading}>
        Feeling uncertain about navigating Pronto? Let this guide be your compass to explore its features and functionalities.
      </Text>
      <Carousel
        ref={carouselRef}
        data={manualImages}
        renderItem={renderItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width * 0.8}
        onSnapToItem={(index) => setActiveSlide(index)}
      />
      <View style={styles.pagination}>
        <Text style={styles.paginationText}>
          {activeSlide + 1} / {manualImages.length}
        </Text>
      </View>
      <View style={styles.arrowContainer}>
        <Icon.Button
          name="keyboard-arrow-left"
          size={40}
          backgroundColor="transparent"
          underlayColor="transparent"
          color="#e32f45"
          onPress={goToPreviousSlide}
        />
        <Icon.Button
          name="keyboard-arrow-right"
          size={40}
          backgroundColor="transparent"
          underlayColor="transparent"
          color="#e32f45"
          onPress={goToNextSlide}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 10,
    color: '#e32f45',
  },
  subHeading: {
    fontSize: 18,
    marginHorizontal: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: '#555',
  },
  carouselItem: {
    borderRadius: 10, // Rounded edges
    overflow: 'hidden', // Clip content
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  pagination: {
    marginTop: 10,
  },
  paginationText: {
    fontSize: 18,
    color: '#555',
  },
  arrowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 100,
    marginBottom: 50,
  },
});

export default HelpScreen;