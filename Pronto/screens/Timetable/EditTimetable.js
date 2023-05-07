import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Dimensions, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <View style={styles.container}>
      <Text style = {styles.heading}>Edit your timetable</Text>

      <View style={styles.searchBox}>
        <TextInput
          style={styles.input}
          placeholder="Search for your module"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={handleSearch}>
          <MaterialIcons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
   
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    border: "2px solid black",
    borderRadius: 5,
    width: width - 20, // subtracting horizontal padding
    maxWidth: 600, // limiting to 600 width for tablet layouts
  },
  input: {
    flex: 1,
    height: 40,
    textAlign: 'center'
  },
  heading:
  {
    fontSize: 28,
    position: 'relative',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  }
});

export default SearchBar;
