import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Dimensions, Text, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';

const { width } = Dimensions.get('window');

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const [modules, setModules] = useState([
    { code: 'COS301', name: 'Software Engineering' },
    { code: 'IMY310', name: 'Multimedia' },
    { code: 'COS332', name: 'Computer Networking' },
  ]);

  const handleSearch = () => {
    onSearch(searchText);
  };

  const handleDelete = (index) => {
    const newModules = [...modules];
    newModules.splice(index, 1);
    setModules(newModules);
  };

  const handleDots = () => { 
    //bring up option to edit timetable
  };

  return (

    
    <SafeAreaView style={styles.container}>
      <Text style = {styles.heading}>Edit your timetable</Text>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.input}
          placeholder="Search for your modules"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={handleSearch}>
          <MaterialIcons name="search" size={24} color="black" />
        </TouchableOpacity>
        
      </View>
      <ScrollView>
      {modules.map((module, index) => (
        <TouchableOpacity style={styles.moduleBox} key={module.code}>
          <View style={styles.moduleInfo}>
            <Text style={styles.moduleCode}>{module.code}</Text>
            <Text style={styles.moduleName}>{module.name}</Text>
          </View>
          <View style={styles.moduleActions}>
            <TouchableOpacity onPress={() => handleDelete(index)}>
              <MaterialIcons name="delete" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons name="more-vert" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
      </ScrollView>
    </SafeAreaView>
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
    borderRadius: 5,
    width: width - 20, // subtracting horizontal padding
    maxWidth: 600, // limiting to 600 width for tablet layouts
    borderWidth: 2,
    borderRadius: "50%",
    marginBottom: 15,
    paddingRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    textAlign: 'center',
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

  },
  moduleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 5,
    width: width - 20, // subtracting horizontal padding
    maxWidth: 600, // limiting to 600 width for tablet layouts
  },
  moduleInfo: {},
  moduleCode: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  moduleName: {
    fontSize: 14,
    color: '#555',
  },
  moduleActions: 
  {
    flexDirection: 'row',
  },
});

export default SearchBar;
