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
  ImageBackground
} from "react-native";
import { Card } from "react-native-paper";
import { Storage } from "aws-amplify";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { Auth, API } from "aws-amplify"
import { listStudents, getStudent } from "../../graphql/queries";
import { useStudent } from "../../ContextProviders/StudentContext";

//graphQL call to get the university of the student, which will be used to get the file from that folder.
//let studentUniversity = "UniversityOfPretoria";

const BucketFilesScreen = () => {
  const [fileList, setFileList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [studentUniversity, setStudentUniversity] = useState("")
  const { student, updateStudent } = useStudent();

  useEffect(() => {
    //  setUniversityName();
    fetchFileList();
  }, []);

  const fetchFileList = async () => {
    try {
      setIsRefreshing(true);
      setIsLoading(true);
      let name = "AndileNgwenya";

      const response = await Storage.list(
        name + "/StudentFiles/",
        {
          pageSize: 1000,
        }
      );
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

  /* const setUniversityName = async () => {
 
     let error = "There appear to be network issues.Please try again later"
     try {
       let stu=student;
       if(student===null){
         const user = await Auth.currentAuthenticatedUser()
         let studentEmail = user.attributes.email; 
         stu = await API.graphql({
           query: getStudent,
           variables: {id:user.attributes.sub}
         })
         
         stu=stu.data.getStudent;
         if(stu===false || stu===undefined){
           throw Error();
         }
         updateStudent(stu);
       }
     
       sU = stu.institution.name
       const words = sU.split(/\s+/); // Split the name into words
       sU = words
         .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Convert each word to camel case
         .join(""); // Join the words without spaces
       await setStudentUniversity(sU)
       return sU
     } catch (e) {
       Alert.alert(error);
     }
   } */


  const openFile = async (fileKey) => {
    try {
      const fileURL = await Storage.get(fileKey);
      Linking.openURL(fileURL);
    } catch (error) {
      console.error("Error opening file:", error);
    }
  };

  const renderFileItem = ({ item }) => {
    const fileName = item.key.replace("AndileNgwenya" + "/StudentFiles/", ""); // Extract file name
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
    //setUniversityName()
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
        <Text style={styles.heading}>File List</Text>
      </View>
      <View style={{}}>
        <Text
          style={{
            textAlign: "center",
            fontWeight: "200",
            marginBottom: "2%",
          }}
        >
          Click the files from your unviersity to download and view them
        </Text>
        <ImageBackground
          resizeMode="contain"
          //attribution: <a href="https://storyset.com/education">Education illustrations by Storyset</a>
          source={require("../../assets/icons/files.png")}
          style={styles.image}
        />
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
  image: {
    width: 200, // Specify the desired width
    height: 200, // Specify the desired height
    alignSelf: "center",
  },
  heading: {
    fontSize: 25, // Adjust the font size as desired
    color: "#e32f45",
    marginLeft: 10,

  },

});

export default BucketFilesScreen;
