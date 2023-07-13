import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Linking,
  Alert,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Card } from "react-native-paper";
import { Storage } from "aws-amplify";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { Amplify } from "aws-amplify";

let studentUniversity = "UniversityOfPretoria";

const BucketFilesScreen = () => {
  const [fileList, setFileList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchFileList();
  }, []);

  const fetchFileList = async () => {
    try {
      setIsRefreshing(true);
      setIsLoading(true);
      const response = await Storage.list(studentUniversity + "/", {
        pageSize: 1000,
      });
      const files = response.results;
      setFileList(files);
      setIsLoading(false);
      setIsRefreshing(false);
    } catch (error) {
      Alert.alert("Error fetching file list:", error);
      setIsLoading(false);
      setIsRefreshing(false);
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
    if (fileName === "") {
      return null; // Skip rendering the item if the file name is empty
    }
    return (
      <Card onPress={() => openFile(item.key)} style={styles.fileItem}>
        <Card.Content>
          <Text style={styles.fileName}>{fileName}</Text>
        </Card.Content>
      </Card>
    );
  };

  const handleRefresh = () => {
    fetchFileList();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <MaterialCommunityIcons
          name="file-document"
          size={24}
          color="#e32f45"
          style={styles.icon}
        />
        <Text style={styles.heading}>File List:</Text>
      </View>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#e32f45" />
          <Text style={styles.loadingText}>Loading files...</Text>
        </View>
      ) : (
        <FlatList
          data={fileList}
          renderItem={renderFileItem}
          keyExtractor={(item) => item.key}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={["#e32f45"]}
              tintColor="#e32f45"
            />
          }
        />
      )}
      <Text style={styles.swipeToRefresh}>Swipe down to refresh &#x2193;</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  headingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "center",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#e32f45",
    marginLeft: 10,
  },
  fileItem: {
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 5,
    elevation: 2,
    borderColor: "#e32f45",
  },
  fileName: {
    color: "#e32f45",
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#e32f45",
  },
  swipeToRefresh: {
    alignSelf: "center",
    marginBottom: 120,
  },
});

export default BucketFilesScreen;
