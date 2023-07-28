import React, { useState,useEffect } from "react";
import { Alert, View, StyleSheet, Text } from "react-native";
import { List, Card, Avatar, Modal } from "react-native-paper";
import { ScrollView } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { listStudents,listInstitutions,createStudent} from "../graphql/queries";
import{Auth,API} from "aws-amplify"

const NotificationList = ({navigation}) => {
  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [expanded3, setExpanded3] = useState(true);
  const[student,setStudent]=useState(null)
  const[announcements,setAnnouncements]=useState([])
  const[reminders,setReminders]=useState([])
  const[dueDates,setDueDates]=useState([])
  const handlePress1 = () => setExpanded1(!expanded1);
  const handlePress2 = () => setExpanded2(!expanded2);
  const handlePress3 = () => setExpanded3(!expanded3);

  const showFullMessage = (key) => {
    Alert.alert(key.description);
  };
  
  const fetchAnnouncements = async() => {
    let error="There appear to be network issues.Please try again later"  
    try{
        let user=await Auth.currentAuthenticatedUser()
        let studentEmail=user.attributes.email;
      
          let stu=await API.graphql({
                query:listStudents,
                variables:{
                    filter :{ 
                      email : { 
                          eq:studentEmail
                      }
                    }
                               } ,
          authMode:"API_KEY"                
        })
      
        let found=false
        for(let i=0;i<stu.data.listStudents.items.length;i++){
           if(stu.data.listStudents.items[i].owner===user.attributes.sub){
              stu=stu.data.listStudents.items[i]
              found=true
              break
           }
        }
        
       //Student does not exist so create them
        if(found===false){
          let domain=studentEmail.split("@")[1]
          
          //Find Institution via domain
          let institution=await API.graphql({
                    query:listInstitutions,
                    variables:{ 
                        filter :{ 
                          domains :{ 
                            contains:domain
                          }
                        }
                      },
                      authMode:"API_KEY",
                })
      
          if(institution.data.listInstitutions.items.length===0){
            error="Could not determine institution"
            throw Error("")
          }
    
          institution=institution.data.listInstitutions.items[0]
        

          //Create student
          let newStudent={
            institutionId:institution.id,
            firstname: user.attributes.name,
            lastname: user.attributes.family_name,
            userRole: "Student",
            email: studentEmail   
          }
          let create=await API.graphql({
            query:createStudent,
            variables:{input:newStudent},
            authMode:"AMAZON_COGNITO_USER_POOLS"
          })
         }
        
        //Student  found
        else{
              //stu=stu.data.listStudents.items[0]
              setStudent(stu)
              let a=[]
              let r=[]
              let d=[]
              for(let i=0;i<stu.enrollments.items.length;i++){
                for(let j=0;j<stu.enrollments.items[i].course.announcents.items.length;j++){
                  a.push(stu.enrollments.items[i].course.announcents.items[j])
                  if(j%2===1){
                    r.push(stu.enrollments.items[i].course.announcents.items[j])
                  }
                  else{
                    d.push(stu.enrollments.items[i].course.announcents.items[j])
                  }
                }
              }
              setAnnouncements(a)
              setReminders(r)
              setDueDates(d)
            
            }
      }catch(er){
        Alert.alert(error)
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
          {reminders.map((val,key)=>(
                  <Card
                    key={key}
                    style={{
                    marginBottom: 10,
                    backgroundColor: "white",
                  }}
                  value={key}
                  onPress={(e)=>showFullMessage(val)}
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
             {dueDates.map((val,key)=>(
                  <Card
                    key={key}
                    style={{
                    marginBottom: 10,
                    backgroundColor: "white",
                  }}
                  value={key}
                  onPress={(e)=>showFullMessage(val)}
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
            <ScrollView style={{ height: 250 }}>
              {announcements.map((val,key)=>(
                  <Card
                    key={key}
                    style={{
                    marginBottom: 10,
                    backgroundColor: "white",
                  }}
                  value={key}
                  onPress={(e)=>showFullMessage(val)}
                >
                <Card.Content>
                  <Card.Title
                    key={key}
                    title={val.course.coursecode}
                    subtitle={val.start}
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
              
            </ScrollView>
          </View>
        </List.Section>
      </Card.Content>
    </View>
  );
};

export default NotificationList;
