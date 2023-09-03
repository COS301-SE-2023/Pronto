import React, { useState, useEffect } from "react";
import { Alert, View, StyleSheet, Text ,Button} from "react-native";
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
  
  const showFullMessage = (key) => {
    Alert.alert(key.body);
  };

  const fetchAnnouncements = async () => {
    let error = "There appear to be network issues. Please try again later"
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
     
        filter+=`] },"limit":"1" ,"sortDirection":"DESC"}`;
        
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
        
      filter+=`] },"limit":"1","sortDirection":"DESC","nextToken":"${nextToken}"}`;  
      let variables = JSON.parse(filter)
         
      let announcementList=await API.graphql({
            query:listAnnouncements,
            variables:variables
          });
        
      let a=announcementList.data.listAnnouncements.items;
      for(let i=0;i<a.length;i++){
        announcement.push(a[i]);
      }
      setNextToken(announcementList.data.listAnnouncements.nextToken);
      setAnnouncements(announcement)
    }catch(e){
      console.log(e)
      Alert.alert(error);
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchAnnouncements()
    });
    return unsubscribe
  }, [navigation])

  return (
    <View>
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
                  {val.course.coursecode} {": "} {val.start}
                </Text>
              </Card.Content>
            </Card>
          ))}

          {/* <Card
            style={{
              margin: 10,
              backgroundColor: "white",
            }}
            onPress={showFullMessage}
          >
            <Card.Content>
              <Text>
                COS 301: Lecture venue changed from North Hall to IT 2-27
              </Text>
            </Card.Content>
          </Card> */}
          {/* 
          <Card
            style={{
              margin: 10,
              backgroundColor: "white",
            }}
            onPress={showFullMessage}
          >
            <Card.Content>
              <Text>COS 332: Change in lecture time</Text>
            </Card.Content>
          </Card> */}
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
          {announcement.filter(item=>item.type==="Due Date").map((val, key) => (
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
          {/* <Card
            style={{
              margin: 10,
              backgroundColor: "white",
            }}
            onPress={showFullMessage}
          >
            <Card.Content>
              <Text>COS216: Assignment due soon</Text>
            </Card.Content>
          </Card> */}
        </List.Accordion>

        <List.Accordion
          title="Unread"
          titleStyle={{ color: "black" }}
          left={(props) => (
            <List.Icon {...props} icon="inbox" color="#e32f45" />
          )}
          expanded={expanded3}
          onPress={handlePress3}
          style={{ backgroundColor: "white" }}
        >
          {/* <Card
            style={{
              margin: 10,
              backgroundColor: "white",
            }}
            onPress={showFullMessage}
          >
            <Card.Content>
              <Text>IMY310: Remeber your pens for the semester test</Text>
            </Card.Content>
          </Card> */}
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
              < ScrollView style={{ height: "70%" }}>
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
                 <Text>
          { nextToken !==null ? <Button title="Load More" onPress={loadMore}></Button> :  " "}
        </Text>
     

              </ScrollView>
            )}
            {/* <button onClick={loadMore}> </button> */}
            
          </View>
       
        </List.Section>
      </Card.Content>
    </View >
  );
};

export default NotificationList;