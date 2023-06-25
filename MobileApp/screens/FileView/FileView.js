import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
  Alert,
  StyleSheet,
} from "react-native";
import { Storage } from "aws-amplify";

let studentUniversity = "UniversityOfPretoria";

const BucketFilesScreen = () => {
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    fetchFileList();
  }, []);

  const fetchFileList = async () => {
    try {
      const response = await Storage.list(studentUniversity + "/", {
        pageSize: 1000,
      });
      const files = response.results;
      setFileList(files);
    } catch (error) {
      Alert.alert("Error fetching file list:", error);
    }
  };

  const openFile = async (fileKey) => {
    try {
      const fileURL = await Storage.get(fileKey);
      Linking.openURL(fileURL);
    } catch (error) {
      console.error("Error opening file:", error);
    }
  };

  const renderFileItem = ({ item }) => {
    const fileName = item.key.replace(studentUniversity + "/", ""); // Extract file name
    return (
      <TouchableOpacity
        onPress={() => openFile(item.key)}
        style={styles.fileItem}
      >
        <Text style={styles.fileName}>{fileName}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>File List:</Text>
      <FlatList
        data={fileList}
        renderItem={renderFileItem}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  fileItem: {
    backgroundColor: "white",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#e32f45",
  },
  fileName: {
    color: "#e32f45",
    fontSize: 16,
  },
});

export default BucketFilesScreen;
