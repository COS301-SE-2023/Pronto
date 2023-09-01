import React, { useRef, useState } from 'react';
import { View, Image, Dimensions, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HelpScreen = () => {
  const manualImages = [
    require('../../assets/UserManualPages/UserManual-1.png'),
    require('../../assets/UserManualPages/UserManual-2.png'),
    require('../../assets/UserManualPages/UserManual-3.png'),
    require('../../assets/UserManualPages/UserManual-4.png'),
    require('../../assets/UserManualPages/UserManual-5.png'),
    require('../../assets/UserManualPages/UserManual-6.png'),
    require('../../assets/UserManualPages/UserManual-7.png'),
    require('../../assets/UserManualPages/UserManual-8.png'),
    require('../../assets/UserManualPages/UserManual-9.png'),
    // Add more images as needed
  ];

  const carouselRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => handleImagePress(index)}>
        <View style={styles.carouselItem}>
          <Image source={item} style={styles.image} />
        </View>
      </TouchableOpacity>
    );
  };

  const handleImagePress = (index) => {
    setSelectedImageIndex(index);
    setModalVisible(true);
  };

  const closeImageModal = () => {
    setModalVisible(false);
    setSelectedImageIndex(null);
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
      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <Image source={manualImages[selectedImageIndex]} style={styles.modalImage} />
          <Icon.Button
            name="close"
            size={40}
            backgroundColor="transparent"
            underlayColor="transparent"
            color="#fff"
            onPress={closeImageModal}
            style={styles.closeButton}
          />
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export default HelpScreen;
