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

  const mockFiles = [
    {
      key: 's3://pronto-bucket101010-prod.s3.amazonaws.com/public/AndileNgwenya/StudentFiles/UP_MOD_XLS%20%281%29.pdf?AWSAccessKeyId=ASIA5KFUIW75CYGLKR5F&Expires=1695986371&Signature=BSYILom%2FohFetVV1JfZCkNKzMHA%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQDP8EqtVOkV1i3CYv0eyj8x5cNQFd2ueKh1z08ktDmhVQIgRBg0d4CcFlzD5AgCnqzMlgffaBOv3lsO%2F0iCQHqqTZIqzQQIvP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw5MTUyMDYwOTI3OTQiDE74sncKVqCTUdoCZSqhBLu0V4jI7XoiqoPovMUMeirNEKge1SY5KxSl0veLq4gL2TLIpjFjQbo1eMoKz6Pbprtgp%2BAI1nBGybMJpk7Pta84OSPs9DneDncgW7K26xRhMH6HNlR%2FhoLgFGOhOTC7GebT9IzDSMQ6FOp4%2FVyK9rzO%2BsPon%2BWCIjmkWe6MEArF2viyYcO6l%2BjjQlTSkt3Z5jAyFS0QvLrNLCEUNb2%2FlsWWnAlWR5XnzMEDqhyJbywVMcT6EqGN8lV4pEAXmY3h4xseIw88qCZDZ72DgQy3bkgGSySiPfg9%2FD5niR%2F8PKz%2F2LI3XdR4uKpH0KSxcZeYKbc4qZwNEt2VmojuG0rpA8wr%2BrTAGPIsSib4cKG5knEAPjjFqRnuCYfNxzaZ%2Fw%2FJO0fXZM4Rfwhl6xhwU8vIj8zvsZXDe2xAUBgu%2ByaFU8aOiylAQQmLSjMgbCk5pDITH2Myycx8LhzRhV9iFaDOjxSWVTME5Sk63qiGp6SRYkjn%2BSyHIdranXzkUUApI0eDBmvXl9Hgpwd%2F7Ox9Px9GiBtNfGNT6H2mPaD2zT5j%2Ft3y34l2AM5U%2Fq10bZhWJY0hHF3rSUOIQ%2F%2FNKfen1YBSYpVZ6yGq9YZJVgtJVohvgq2QWPbGAFFBg8WIR1DElV7P0VmgRHs35uw1gOJ2Ovan9tgHHN7A7tB0YvGVuYuN8mxZrbrwnszwJsN%2BsyWeg5xUZ9cr2j5fIO%2BjTHNlSnFPaUOgMJHi2qgGOoUC3Lh%2FtUkgSjQj1oM94U1PWawpJSsk9PfGSNrh5q131FTluUVQvnwyct6phqQiAqtBa9J9MX6514j2ddaA4zklDZKlSwTA%2F20UUL1E2C%2F4OXF07YuV6KsQn7B0Vx13rrb7lTRR4qKmezyFsjnFbfbn%2FU9IXedprzxXvfh3CsM2m1npV05BErpd4Ae5Qvmg0D7%2Bt9ntOP2hK2%2BmIiO%2F0FJuDoh4tAFSkpWQqZDcx50hOg95xSEEvXpRe0jpgWMGEholqqRGMgER5YIEMDgdo9W4j4h1Sxf8xgGxcv6NAiPX0s8Tasozex9Zd9NidsHzcG2dlgRNZ5hoaHDsKcsiiRkliAYzzFSL',
      url: 'https://pronto-bucket101010-prod.s3.amazonaws.com/public/AndileNgwenya/StudentFiles/UP_MOD_XLS%20%281%29.pdf?AWSAccessKeyId=ASIA5KFUIW75CYGLKR5F&Expires=1695986371&Signature=BSYILom%2FohFetVV1JfZCkNKzMHA%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQDP8EqtVOkV1i3CYv0eyj8x5cNQFd2ueKh1z08ktDmhVQIgRBg0d4CcFlzD5AgCnqzMlgffaBOv3lsO%2F0iCQHqqTZIqzQQIvP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw5MTUyMDYwOTI3OTQiDE74sncKVqCTUdoCZSqhBLu0V4jI7XoiqoPovMUMeirNEKge1SY5KxSl0veLq4gL2TLIpjFjQbo1eMoKz6Pbprtgp%2BAI1nBGybMJpk7Pta84OSPs9DneDncgW7K26xRhMH6HNlR%2FhoLgFGOhOTC7GebT9IzDSMQ6FOp4%2FVyK9rzO%2BsPon%2BWCIjmkWe6MEArF2viyYcO6l%2BjjQlTSkt3Z5jAyFS0QvLrNLCEUNb2%2FlsWWnAlWR5XnzMEDqhyJbywVMcT6EqGN8lV4pEAXmY3h4xseIw88qCZDZ72DgQy3bkgGSySiPfg9%2FD5niR%2F8PKz%2F2LI3XdR4uKpH0KSxcZeYKbc4qZwNEt2VmojuG0rpA8wr%2BrTAGPIsSib4cKG5knEAPjjFqRnuCYfNxzaZ%2Fw%2FJO0fXZM4Rfwhl6xhwU8vIj8zvsZXDe2xAUBgu%2ByaFU8aOiylAQQmLSjMgbCk5pDITH2Myycx8LhzRhV9iFaDOjxSWVTME5Sk63qiGp6SRYkjn%2BSyHIdranXzkUUApI0eDBmvXl9Hgpwd%2F7Ox9Px9GiBtNfGNT6H2mPaD2zT5j%2Ft3y34l2AM5U%2Fq10bZhWJY0hHF3rSUOIQ%2F%2FNKfen1YBSYpVZ6yGq9YZJVgtJVohvgq2QWPbGAFFBg8WIR1DElV7P0VmgRHs35uw1gOJ2Ovan9tgHHN7A7tB0YvGVuYuN8mxZrbrwnszwJsN%2BsyWeg5xUZ9cr2j5fIO%2BjTHNlSnFPaUOgMJHi2qgGOoUC3Lh%2FtUkgSjQj1oM94U1PWawpJSsk9PfGSNrh5q131FTluUVQvnwyct6phqQiAqtBa9J9MX6514j2ddaA4zklDZKlSwTA%2F20UUL1E2C%2F4OXF07YuV6KsQn7B0Vx13rrb7lTRR4qKmezyFsjnFbfbn%2FU9IXedprzxXvfh3CsM2m1npV05BErpd4Ae5Qvmg0D7%2Bt9ntOP2hK2%2BmIiO%2F0FJuDoh4tAFSkpWQqZDcx50hOg95xSEEvXpRe0jpgWMGEholqqRGMgER5YIEMDgdo9W4j4h1Sxf8xgGxcv6NAiPX0s8Tasozex9Zd9NidsHzcG2dlgRNZ5hoaHDsKcsiiRkliAYzzFSL',

    },
    {
      key: 's3://pronto-bucket101010-prod.s3.amazonaws.com/public/AndileNgwenya/StudentFiles/UP_MOD_XLS%20%281%29.pdf?AWSAccessKeyId=ASIA5KFUIW75OMOLVMVN&Expires=1695984226&Signature=AC7jcXD330md5tbH8alUe%2Fnyv0Y%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEML%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQCN0qU1ONCb5c1pzhva5hwsi7ebtR%2BCg2FqXsxP7d70JAIhAMCT%2B2gK9CuVQgwCBv3GGbwDlSYqkoL5ua0TuBuEtQmKKs0ECLv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMOTE1MjA2MDkyNzk0IgzQFwxD0ROZFSy6e9QqoQR0xRdvP2Z%2FbJY%2Fni9vqz6sxbaF2hZKzYm%2B1IWMLtyw9JOvVx%2FGOiyT9F7X11fXavLh6SLyigENmfBwBKmKtKr2rM1LYQYo1wt5xC2%2FdSS0S2D%2FnSJEUyteeodzlntVdJ%2BGBoVjzm6tMz4ZfhGxooS1cXAQO3%2FqL0aghTHgQH%2BcAzf7jlb4b2ne8032wNoJ24Y7Sjo%2F1InO6ZYFs5nmBxNGqfjngdlFD28naN3cG31tXzVYRjteH6RxrX0csSqHUGMZir8FOI6EeJZC9XhNd5T6%2FIaLtr4KMQD%2Bw%2BC1Eo82SRngt64d7GRox0I3MCKMXZECp9nYj%2FL%2FUin5Fbm2EGBM6q%2Bd%2B5i%2BHzyyC%2FFfCc0H8js8m%2FSi4THhjxoompMsjyRQnaBX0NKMZ3WYHZaUUox8YmdXgjkbgVN0XawX31ldEYJeC%2BLcvsKMNHaosBfY7pBxggyG%2F6B%2FoOH6cah%2BQAtD57fJOZ1Ax97O9S6NzkulvuhD8nXFWKj8LHlYV0A1e%2F%2BFP2iJlhO3cC46jdqacaMGhTnhXrxbvAYceMMGMDXc6xDb%2FyjV%2Ftp47M3n7bzDs%2FhuFYVLlJcwVjPEDMeoMm1usD178tYdTzNtZCPEqb3CXCUMpyZujWPLNy%2FJZYHBVvwIomByyp%2BJDlrAgmz1PzoaZzpYcgGUrrbIslkMRYRZsBD34v8koUt0mFXSmkAxqiGzfBDUupwBDLAb8bIkY83%2FSTDOutqoBjqEAiRBtlWCW7OzT2dDPNso2Vj%2Bt%2Fa53qStROf8jxAy7bvrexjQxcexZpSltCsZ0JoKMo7Pl%2FFJHSpzxD4tFw2iRWR5A0CsdyJlGWDHlF5n4rNsICo0bv2vQn4wUHh7KsVBb%2Brcd2kDZKNLIXUitDYQBM7HM7zTzkkg%2BCjQSKjyrkDEBDXWo0dsMjKeC07E5tU3gXAwDt0rKhVhyxPngB5R%2FmGlmPt7sCoxtlSgLr37%2FsvxmCrRlPRHhQRpVWsc3YBO%2FW5J5pXRf8kAnOicoxABseSDwY7Zx4x6GP5uU2Zo9P8UW8Fo3F3O7kQ0gNClgx8DDOjKaXjD0%2FGmXsQlJTLzdKAlOQ%2F1',
      url: 'https://pronto-bucket101010-prod.s3.amazonaws.com/public/AndileNgwenya/StudentFiles/UP_MOD_XLS%20%281%29.pdf?AWSAccessKeyId=ASIA5KFUIW75OMOLVMVN&Expires=1695984226&Signature=AC7jcXD330md5tbH8alUe%2Fnyv0Y%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEML%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQCN0qU1ONCb5c1pzhva5hwsi7ebtR%2BCg2FqXsxP7d70JAIhAMCT%2B2gK9CuVQgwCBv3GGbwDlSYqkoL5ua0TuBuEtQmKKs0ECLv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMOTE1MjA2MDkyNzk0IgzQFwxD0ROZFSy6e9QqoQR0xRdvP2Z%2FbJY%2Fni9vqz6sxbaF2hZKzYm%2B1IWMLtyw9JOvVx%2FGOiyT9F7X11fXavLh6SLyigENmfBwBKmKtKr2rM1LYQYo1wt5xC2%2FdSS0S2D%2FnSJEUyteeodzlntVdJ%2BGBoVjzm6tMz4ZfhGxooS1cXAQO3%2FqL0aghTHgQH%2BcAzf7jlb4b2ne8032wNoJ24Y7Sjo%2F1InO6ZYFs5nmBxNGqfjngdlFD28naN3cG31tXzVYRjteH6RxrX0csSqHUGMZir8FOI6EeJZC9XhNd5T6%2FIaLtr4KMQD%2Bw%2BC1Eo82SRngt64d7GRox0I3MCKMXZECp9nYj%2FL%2FUin5Fbm2EGBM6q%2Bd%2B5i%2BHzyyC%2FFfCc0H8js8m%2FSi4THhjxoompMsjyRQnaBX0NKMZ3WYHZaUUox8YmdXgjkbgVN0XawX31ldEYJeC%2BLcvsKMNHaosBfY7pBxggyG%2F6B%2FoOH6cah%2BQAtD57fJOZ1Ax97O9S6NzkulvuhD8nXFWKj8LHlYV0A1e%2F%2BFP2iJlhO3cC46jdqacaMGhTnhXrxbvAYceMMGMDXc6xDb%2FyjV%2Ftp47M3n7bzDs%2FhuFYVLlJcwVjPEDMeoMm1usD178tYdTzNtZCPEqb3CXCUMpyZujWPLNy%2FJZYHBVvwIomByyp%2BJDlrAgmz1PzoaZzpYcgGUrrbIslkMRYRZsBD34v8koUt0mFXSmkAxqiGzfBDUupwBDLAb8bIkY83%2FSTDOutqoBjqEAiRBtlWCW7OzT2dDPNso2Vj%2Bt%2Fa53qStROf8jxAy7bvrexjQxcexZpSltCsZ0JoKMo7Pl%2FFJHSpzxD4tFw2iRWR5A0CsdyJlGWDHlF5n4rNsICo0bv2vQn4wUHh7KsVBb%2Brcd2kDZKNLIXUitDYQBM7HM7zTzkkg%2BCjQSKjyrkDEBDXWo0dsMjKeC07E5tU3gXAwDt0rKhVhyxPngB5R%2FmGlmPt7sCoxtlSgLr37%2FsvxmCrRlPRHhQRpVWsc3YBO%2FW5J5pXRf8kAnOicoxABseSDwY7Zx4x6GP5uU2Zo9P8UW8Fo3F3O7kQ0gNClgx8DDOjKaXjD0%2FGmXsQlJTLzdKAlOQ%2F1',
    },
    // Add more mock files as needed
  ];


  useEffect(() => {
    //  setUniversityName();
    fetchFileList();
  }, []);

  const fetchFileList = async () => {
    try {
      setIsRefreshing(true);
      setIsLoading(true);

      // Replace this with the mockFiles array
      const files = mockFiles;

      setFileList(files);
      setIsLoading(false);
      setIsRefreshing(false);
    } catch (error) {
      Alert.alert('Error fetching file list:', error);
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
      const file = mockFiles.find((mockFile) => mockFile.key === fileKey);
      if (file) {
        Linking.openURL(file.url);
      } else {
        console.error('File not found:', fileKey);
      }
    } catch (error) {
      console.error('Error opening file:', error);
    }
  };

  const fileNames = ['CS Dept ProjectDay Invite', 'Pronto Demo4 SRS', 'UP_MOD_XLS (1)'];

  const renderFileItem = ({ item }) => {
    const fileName = item.key.replace("AndileNgwenya" + "/StudentFiles/", ""); // Extract file name
    if (fileName === "") {
      return null; // Skip rendering the item if the file name is empty
    }
    const fileNameIndex = mockFiles.findIndex((mockFile) => mockFile.key === item.key);
    const displayName = fileNameIndex !== -1 ? fileNames[fileNameIndex] : fileName;

    return (
      <Card onPress={() => openFile(item.key)} style={styles.fileItem}>
        <Card.Content>
          <Text style={styles.fileName}>{displayName}</Text>
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
