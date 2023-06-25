import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { Storage } from "aws-amplify";

const BucketFilesScreen = () => {
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    fetchFileList();
  }, []);

  const fetchFileList = async () => {
    try {
      const response = await Storage.list("UniversityOfPretoria/", {
        pageSize: 1000,
      });
      const files = response.results;
      setFileList(files);
      Alert.alert(JSON.stringify(files));
    } catch (error) {
      console.error("Error fetching file list:", error);
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
    const fileName = item.key.replace("UniversityOfPretoria/", ""); // Extract file name
    return (
      <TouchableOpacity onPress={() => openFile(item.key)}>
        <Text>{fileName}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Text>File List:</Text>
      <FlatList
        data={fileList}
        renderItem={renderFileItem}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};

export default BucketFilesScreen;
