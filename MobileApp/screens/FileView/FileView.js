import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { Card, IconButton } from "react-native-paper";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const FileView = () => {
  // Sample data for PDF files
  const pdfFiles = [
    { id: "1", name: "Document 1.pdf" },
    { id: "2", name: "Document 2.pdf" },
    { id: "3", name: "Document 3.pdf" },
    // Add more PDF file objects as needed
  ];

  const renderFileCard = ({ item }) => (
    <Card style={styles.card} onPress={() => handleFilePress(item)}>
      <Card.Title
        title={item.name}
        left={(props) => (
          <MaterialIcons name="folder" size={24} color="#e32f45" />
        )}
      />
    </Card>
  );

  const handleFilePress = (item) => {
    // Handle the logic to open the selected PDF file
    console.log("Open file:", item.name);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subTitle}>
        Click on the documents provided by your university to access them
      </Text>
      <FlatList
        data={pdfFiles}
        renderItem={renderFileCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  subTitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  listContainer: {
    flexGrow: 1,
  },
  card: {
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: "white",
  },
});

export default FileView;
