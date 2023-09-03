import React, { useState, useEffect } from "react";
import { Alert, View, StyleSheet, Text ,Button,RefreshControl} from "react-native";
import { List, Card, Avatar, Modal } from "react-native-paper";
import { ScrollView } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { listStudents,announcementsByDate, listAnnouncements } from "../graphql/queries";
import { Auth, API } from "aws-amplify"
import { useStudent } from "../ContextProviders/StudentContext";
import { useAnnouncement } from "../ContextProviders/AnnouncementContext";

const NotificationList = ({ navigation }) => {
  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [expanded3, setExpanded3] = useState(true);
  const {student,updateStudent} =useStudent();
  const {announcement,setAnnouncement,nextToken,setNextToken}=useAnnouncement();
 
  const handlePress1 = () => setExpanded1(!expanded1);
  const handlePress2 = () => setExpanded2(!expanded2);
  const handlePress3 = () => setExpanded3(!expanded3);
  const [loading, setLoading] = useState(false);
  const [refresh,setRefresh] =useState(false);
  const error = "There appear to be network issues. Please try again later";
  let limit=4;
  const showFullMessage = (key) => {
    Alert.alert(key.body);
  };

  const fetchAnnouncements = async () => {
   
    try {
      let stu=student;
      if(student===null){
        console.log("Student is null");
        setLoading(true);
        let user = await Auth.currentAuthenticatedUser()
        let studentEmail = user.attributes.email;

        let stu = await API.graphql({
          query: listStudents,
          variables: {
            filter: {
              email: {
                eq: studentEmail
              }
            }
          }
        })
      
        let found = false
        for (let i = 0; i < stu.data.listStudents.items.length; i++) {
          if (stu.data.listStudents.items[i].owner === user.attributes.sub) {
            stu = stu.data.listStudents.items[i]
            found = true
            break
          };
        };
        
        if(found===false){
          throw Error();
        }
      };

      if(announcement.length===0){
        console.log("No announcements");
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
        setNextToken(announcementList.data.listAnnouncements.nextToken);
        //setLoading(false);
      }
      setLoading(false);
    } catch (er) {
      console.log(er);
      Alert.alert(error)
      setLoading(false);
    }
  }

  const onRefresh = async()=>{
      try{
        setLoading(true);
        let stu=student;
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
       console.log(announcement); 
        setAnnouncement(announcementList.data.listAnnouncements.items);
        setNextToken(announcementList.data.listAnnouncements.nextToken);
        setLoading(false);
      }catch(e){
        console.log(e);
        Alert.alert(error)
      }

  }

  const loadMore =async()=>{
    try{

      let stu=student;
      let year=new Date().getFullYear();
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
        
      filter+=`] },"limit":"${limit}","sortDirection":"DESC","nextToken":"${nextToken}"}`;  
      let variables = JSON.parse(filter)
         
      let announcementList=await API.graphql({
            query:listAnnouncements,
            variables:variables
          });
        
      let a=announcementList.data.listAnnouncements.items;
      for(let i=0;i<a.length;i++){
        announcement.push(a[i]);
      }
      console.log(announcement);
      setNextToken(announcementList.data.listAnnouncements.nextToken);
      setAnnouncement(announcement)
    }catch(e){
      console.log(e)
      Alert.alert(error);
    }
  }

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     fetchAnnouncements()
  //   });
  //   return unsubscribe
  // }, [navigation])

  useEffect(()=>{
    fetchAnnouncements();
  },[])

  return (
    <View 
      style={{height:"100%"}}
      refr
    >
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
          {announcement.filter(item=>item.type==="Reminder").map((val, key) => (
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
          style={{ backgroundColor: "white" }}
        >
          {announcement.filter(item=>item.type==="Due Assignment").map((val, key) => (
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
          {/* <ScrollView> */}
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
              < ScrollView 
                style={{ height: "70%" }}
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
                        subtitle={val.title}
                        left={(props) => (
                          <Avatar.Icon
                            {...props}
                            icon="brain"
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
            marginBottom:"20%",
            marginLeft:"auto",
            marginRight:"auto"
          }}>
          { nextToken !==null ? 
              <Button 
                title="Load More"
                onPress={loadMore} 
                  >  
                </Button> 
              :  
              " "
            }
        </Text>
     
              </ScrollView>
            )}
            <Text style={{marginLeft:"auto",marginRight:"auto"}}>Swipe down to refresh &#x2193;</Text>
          </View>
          {/* </ScrollView> */}
          
        </List.Section>
       
      </Card.Content>
    </View >
  );
};

export default NotificationList;