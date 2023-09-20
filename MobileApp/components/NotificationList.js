import React, { useState, useEffect } from "react";
import { Alert, View, StyleSheet, Modal, Text, RefreshControl, IconButton, Pressable } from "react-native";
import { List, Card, Avatar, Button, Portal, PaperProvider } from "react-native-paper";
import { ScrollView } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { listStudents, getStudent, announcementsByDate, listAnnouncements } from "../graphql/queries";
import { Auth, API } from "aws-amplify"
import { useStudent } from "../ContextProviders/StudentContext";
import { useAnnouncement } from "../ContextProviders/AnnouncementContext";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const NotificationList = ({ navigation }) => {

  //if you need to use mock data for styling
  const mockAnnouncements = require('../assets/data/mock/mock-announcement.json');

  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const { student, updateStudent } = useStudent();
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { announcement, setAnnouncement, nextToken, setNextToken } = useAnnouncement();


  const handlePress1 = () => setExpanded1(!expanded1);
  const handlePress2 = () => setExpanded2(!expanded2);
  const [loading, setLoading] = useState(false);
  const error = "There appear to be network issues. Please try again later";
  let limit = 4;
  const showFullMessage = (key) => {
    setSelectedAnnouncement(key);
    //setIsModalVisible(true);
    //Alert.alert(key.body);
  };


  //mock data to fetch
  /* const fetchAnnouncements = async () => {
    try {
      setLoading(true);

      // Use the mockAnnouncements array as the source of announcements
      setAnnouncement(mockAnnouncements);
      setNextToken(null);

      setLoading(false);
    } catch (error) {
      Alert.alert(error);
      setLoading(false);
    }
  }; */

  //normal fetch announcement (NOT MOCK DATA)
  const fetchAnnouncements = async () => {
     
      try {
        let stu=student;
        if(student===null){
          
          setLoading(true);
          const user = await Auth.currentAuthenticatedUser()
          let studentEmail = user.attributes.email;
  
          let stu = await API.graphql({
            query: getStudent,
            variables: {id:user.attributes.sub}
          })
        
          stu=stu.data.getStudent;
                  
          if(stu===null || stu===undefined){
            throw Error();
          }
          updateStudent(stu);
  
        };
  
        if(announcement.length===0){
         
          setLoading(true);
          let courses=[];
          for(let i=0;i<stu.enrollments.items.length;i++){
            courses.push(stu.enrollments.items[i].courseId);
          }
           
          let filter=`{"filter" : { "or" : [`;
          for(let i=0;i<courses.length;i++){
            if(i===courses.length-1){
              filter+=`{"courseId":{"eq":"${courses[i]}" } }`;
            }
            else{
              filter+=`{"courseId":{"eq":"${courses[i]}" } },`;
            }
          }
       
          filter+=`] },"limit":"${limit}" ,"sortDirection":"DESC"}`;
          
          let variables = JSON.parse(filter)
      
          let announcementList=await API.graphql({
              query:listAnnouncements,
              variables:variables
            })
            ;
          
          setAnnouncement(announcementList.data.listAnnouncements.items);
          if(announcementList.data.listAnnouncements.items.length<limit){
            setNextToken(null)
          }
          else{
            setNextToken(announcementList.data.listAnnouncements.nextToken);
          }
        }
        setLoading(false);
      } catch (er) {
        
        Alert.alert(error)
        setLoading(false);
      }
    } 


  const onRefresh = async () => {
    try {
      setLoading(true);
      let stu = student;
      let courses = [];
      for (let i = 0; i < stu.enrollments.items.length; i++) {
        courses.push(stu.enrollments.items[i].courseId);
      }

      let filter = `{"filter" : { "or" : [`;
      for (let i = 0; i < courses.length; i++) {
        if (i === courses.length - 1) {
          filter += `{"courseId":{"eq":"${courses[i]}" } }`;
        }
        else {
          filter += `{"courseId":{"eq":"${courses[i]}" } },`;
        }
      }

      filter += `] },"limit":"${limit}" ,"sortDirection":"DESC"}`;

      let variables = JSON.parse(filter)

      let announcementList = await API.graphql({
        query: listAnnouncements,
        variables: variables
      })
        ;
      setAnnouncement(announcementList.data.listAnnouncements.items);
      if (announcementList.data.listAnnouncements.items.length < limit) {
        setNextToken(null);
      }
      else {
        setNextToken(announcementList.data.listAnnouncements.nextToken);
      }
      setLoading(false);
    } catch (e) {

      Alert.alert(error)
    }

  }

  const loadMore = async () => {
    try {

      let stu = student;
      let year = new Date().getFullYear();
      let courses = [];

      for (let i = 0; i < stu.enrollments.items.length; i++) {
        courses.push(stu.enrollments.items[i].courseId);
      }

      let filter = `{"filter" : { "or" : [`;
      for (let i = 0; i < courses.length; i++) {
        if (i === courses.length - 1) {
          filter += `{"courseId":{"eq":"${courses[i]}" } }`;
        }
        else {
          filter += `{"courseId":{"eq":"${courses[i]}" } },`;
        }
      }

      filter += `] },"limit":"${limit}","sortDirection":"DESC","nextToken":"${nextToken}"}`;
      let variables = JSON.parse(filter)

      let announcementList = await API.graphql({
        query: listAnnouncements,
        variables: variables
      });

      let a = announcementList.data.listAnnouncements.items;
      for (let i = 0; i < a.length; i++) {
        announcement.push(a[i]);
      }
      if (announcementList.data.listAnnouncements.items.length < limit) {
        setNextToken(null);
      }
      else {
        setNextToken(announcementList.data.listAnnouncements.nextToken);
      }
      setAnnouncement(announcement)
    } catch (e) {

      Alert.alert(error);
    }
  }

  useEffect(() => {
    fetchAnnouncements();
  }, [])

  return (
    <View >

      {selectedAnnouncement &&
        <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={() => {

            setSelectedAnnouncement(null)
          }}>

          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable
                style={styles.closeButton}
                onPress={() => setSelectedAnnouncement(null)}
              >
                <MaterialIcons name="close" size={24} color="black" />
              </Pressable>
              <Text style={styles.headerStyle}>{selectedAnnouncement.title}</Text>
              <Text style={styles.subheaderStyle}>{selectedAnnouncement.course.coursecode}</Text>
              <Text style={styles.textStyle}>{selectedAnnouncement.body}</Text>
            </View>
            <Button
              icon="check"
              mode="contained"
              style={{
                backgroundColor: "#e32f45",
                width: "70%",

                textAlign: "center",
                color: "white",
                marginBottom: 50,
              }}

              outlined={true}
              onPress={() => setSelectedAnnouncement(null)}
            >
              Okay
            </Button>
          </View>
        </Modal>
      }
      <List.Section title="Announcements" style={{ margin: 10 }}>
        <List.Accordion
          title="Reminders"
          titleStyle={{ color: "black" }}
          left={(props) => (
            <List.Icon {...props} icon="brain" color="#e32f45" />
          )}
          expanded={expanded1}
          onPress={handlePress1}
          style={{ backgroundColor: "white" }}
        >
          {announcement.filter(item => item.type === "Reminder").map((val, key) => (
            <Card
              key={key}
              style={{
                margin: 10,
                backgroundColor: "white",
              }}
              value={key}
              onPress={(e) => showFullMessage(val)}
            >
              <Card.Content>
                <Text>
                  {val.course.coursecode} {": "} {val.title}
                </Text>
              </Card.Content>
            </Card>
          ))}

        </List.Accordion>

        <List.Accordion
          title="Due Dates"
          titleStyle={{ color: "black" }}
          left={(props) => (
            <List.Icon {...props} icon="clock" color="#e32f45" />
          )}
          expanded={expanded2}
          onPress={handlePress2}
          style={{
            backgroundColor: "white"
          }}
        >
          {announcement.filter(item => item.type === "Due Assignment").map((val, key) => (
            <Card
              key={key}
              style={{
                margin: 10,
                backgroundColor: "white",
              }}
              value={key}
              onPress={(e) => showFullMessage(val)}
            >
              <Card.Content>
                <Text>
                  {val.course.coursecode} {": "} {val.title}
                </Text>
              </Card.Content>
            </Card>
          ))}

        </List.Accordion>
      </List.Section>

      <Card.Content>
        <List.Section title="Recent Announcements">
          <View>
            {loading ? (
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: 200,
                  color: "#e32f45",
                  textAlign: "center"
                }}
              >Loading announcements...</Text>
            ) : announcement.length === 0 ? (
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: 200,
                  color: "#e32f45",
                  textAlign: "center"
                }}
              >No recent announcements</Text>
            ) : (
              <View style={{ height: "80%" }}>
                <Text style={{
                  marginLeft: "auto", marginRight: "auto", marginBottom: "4%", color: "#808080"
                }}>Swipe down to refresh &#x2193;</Text>
                < ScrollView
                  refreshControl={
                    <RefreshControl
                      refreshing={loading}
                      onRefresh={onRefresh}
                    />
                  }
                >
                  {announcement.map((val, key) => (
                    <Card
                      key={key}
                      style={{
                        marginBottom: 10,
                        backgroundColor: "white",
                      }}
                      value={key}
                      onPress={(e) => showFullMessage(val)}
                    >
                      <Card.Content>
                        <Card.Title
                          key={key}
                          title={val.course.coursecode}
                          titleStyle={{ fontWeight: '500' }}
                          subtitle={val.title}
                          left={(props) => (
                            <Avatar.Icon
                              {...props}
                              icon={val.type === "Reminder" ? "brain" : "clock"}
                              color="#e32f45"
                              style={{ backgroundColor: "white" }}
                            />
                          )}
                        />
                      </Card.Content>
                    </Card>
                  ))}
                  <Text
                    style={{
                      marginBottom: "0%",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    {nextToken !== null ?
                      <Button
                        onPress={loadMore}
                        mode="contained"
                        icon="arrow-down"
                        outlined={true}
                        testID="load-more-button"
                        style={{
                          backgroundColor: "#e32f45",
                          marginRight: "auto",
                          marginLeft: "auto",
                          color: "white"
                        }}
                      >
                        Load More
                      </Button>
                      :
                      " "
                    }
                  </Text>

                </ScrollView>
              </View>

            )}

          </View>

        </List.Section>

      </Card.Content>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginVertical: 200,
    marginHorizontal: 10,
    borderRadius: 50,
    backgroundColor: "white",
    elevation: 5,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
  },
  modalView: {
    flex: 1,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    width: "80%",
    height: "50%",
    paddingBottom: "0%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: "5%",
  },
  headerStyle: {
    fontSize: 30,
    fontWeight: "400",
    textAlign: "center",
    marginBottom: "2.5%",
  },

  subheaderStyle: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: "5%",
    color: "#e32f45",
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  closeButton: {
    position: "absolute",
    top: 30,
    right: 5,
    zIndex: 1, // Ensures it's above other content
  },
});

export default NotificationList;