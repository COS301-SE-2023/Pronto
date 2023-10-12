import React, { useState, useEffect } from "react";
import { Alert, View, StyleSheet, Modal, Text, RefreshControl, IconButton, Pressable } from "react-native";
import { List, Card, Avatar, Button, Portal, PaperProvider } from "react-native-paper";
import { ScrollView } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { getStudent, listAnnouncements } from "../graphql/queries";
import { Auth, API, DataStore, Predicates } from "aws-amplify"
import { useStudent } from "../ContextProviders/StudentContext";
import { useAnnouncement } from "../ContextProviders/AnnouncementContext";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Student, Announcement } from "../models";
//import '@azure/core-asynciterator-polyfill';

const NotificationList = ({ navigation }) => {
    const [expanded1, setExpanded1] = useState(false);
    const [expanded2, setExpanded2] = useState(false);
    const { student, updateStudent } = useStudent();
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
    const { announcement, setAnnouncement, nextToken, setNextToken } = useAnnouncement();

    const handlePress1 = () => setExpanded1(!expanded1);
    const handlePress2 = () => setExpanded2(!expanded2);
    const [loading, setLoading] = useState(false);
    const error = "There appear to be network issues. Please try again later";
    let limit = 3;

    const showFullMessage = (key) => {
        setSelectedAnnouncement(key);
    };

    const fetchAnnouncements = async () => {
        try {
            let stu = student;
            //setLoading(true);
            const user = await Auth.currentAuthenticatedUser();
            const id = user.attributes.sub;
            stu = await DataStore.query(Student, id)
            //console.log(stu)
            //console.log(stu.enrollments);
            // if (student === null) {
            //     stu = await DataStore.query(Student, user.attributes.sub);
            //     if (stu === null || stu === undefined) {
            //         throw Error();
            //     }
            //     updateStudent(stu);
            // }
            const enrollment = await stu.enrollments.values;
            //console.log(enrollment);

            //let courses = stu.enrollments.items.map((items) => items._deleted === null);
            let courses = enrollment.filter((items) => items._deleted === null)

            let ids = [];
            for (let i = 0; i < courses.length; i++) {
                ids.push(courses[i].courseId);
            }
            if (courses.length === 0) {
                setLoading(false);
                setAnnouncement([]);
                return;
            } else {
                setLoading(true);
                let filter = {
                    or: courses.map((courseId) => ({ courseId: { eq: courseId } })),
                };

                //   let variables = { filter, limit, sortDirection: "DESC" };
                //      let announcementList = await DataStore.query(Announcement, Predicates.ALL, variables);
                //    console.log(announcementList);
                const announcementList = await Promise.all(ids.map(id => DataStore.query(Announcement, (a) => a.courseId.eq(id))))
                //console.log("Listing announcements");
                //console.log(announcementList);
                let a = [];
                for (let i = 0; i < announcementList.length; i++) {
                    for (let j = 0; j < announcementList[i].length; j++) {
                        if (announcementList[i][j]._deleted === null) {
                            let s = announcementList[i][j];
                            const code = await announcementList[i][j].course;
                            s.course = {
                                coursecode: code.coursecode,
                            }
                            a.push(s);
                        }
                    }
                }
                //console.log(a);
                setAnnouncement(a);
                // setAnnouncement(announcementList.filter((item) => item._deleted === null));
                // if (announcementList.length < limit) {
                //     setNextToken(null);
                // } else {
                //     setNextToken(announcementList[announcementList.length - 1].id);
                // }
                setLoading(false);
            }
            setLoading(false);
        } catch (er) {
            console.log(er);
            Alert.alert(error);
            setLoading(false);
        }
    };

    const loadMore = async () => {
        try {
            let stu = student;
            let year = new Date().getFullYear();
            let courses = stu.enrollments.items.map((items) => items._deleted === null);

            if (courses.length === 0) {
                setAnnouncement([]);
                return;
            } else {
                let filter = {
                    or: courses.map((courseId) => ({ courseId: { eq: courseId } })),
                    limit,
                    sortDirection: "DESC",
                    nextToken,
                };
                let variables = { filter, limit, sortDirection: "DESC", nextToken };
                console.log("start");
                let announcementList = await DataStore.query(Announcement, Predicates.ALL, variables);
                console.log(announcementList);
                announcement.push(...announcementList);
                if (announcementList.length < limit) {
                    setNextToken(null);
                } else {
                    setNextToken(announcementList[announcementList.length - 1].id);
                }
                setAnnouncement(announcement);
            }
        } catch (e) { console.log(e); }
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    return (<View>

        {selectedAnnouncement && <Modal
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
                        backgroundColor: "#e32f45", width: "70%",

                        textAlign: "center", color: "white", marginBottom: 50,
                    }}

                    outlined={true}
                    onPress={() => setSelectedAnnouncement(null)}
                >
                    Okay
                </Button>
            </View>
        </Modal>}
        <List.Section title="Announcements" style={{ margin: 10 }}>
            <List.Accordion
                title="Reminders"
                titleStyle={{ color: "black" }}
                left={(props) => (<List.Icon {...props} icon="brain" color="#e32f45" />)}
                expanded={expanded1}
                onPress={handlePress1}
                style={{ backgroundColor: "white" }}
            >
                {announcement.filter(item => item.type === "Reminder").map((val, key) => (<Card
                    key={key}
                    style={{
                        margin: 10, backgroundColor: "white",
                    }}
                    value={key}
                    onPress={(e) => showFullMessage(val)}
                >
                    <Card.Content>
                        <Text>
                            {val.course.coursecode} {": "} {val.title}
                        </Text>
                    </Card.Content>
                </Card>))}

            </List.Accordion>

            <List.Accordion
                title="Due Dates"
                titleStyle={{ color: "black" }}
                left={(props) => (<List.Icon {...props} icon="clock" color="#e32f45" />)}
                expanded={expanded2}
                onPress={handlePress2}
                style={{
                    backgroundColor: "white"
                }}
            >
                {announcement.filter(item => item.type === "Due Assignment").map((val, key) => (<Card
                    key={key}
                    style={{
                        margin: 10, backgroundColor: "white",
                    }}
                    value={key}
                    onPress={(e) => showFullMessage(val)}
                >
                    <Card.Content>
                        <Text>
                            {val.course.coursecode} {": "} {val.title}
                        </Text>
                    </Card.Content>
                </Card>))}

            </List.Accordion>
        </List.Section>

        <Card.Content>
            <List.Section title="Recent Announcements">
                <View
                    style={{
                        height: 400,
                    }}
                >
                    <ScrollView
                        refreshControl={<RefreshControl
                            refreshing={loading}
                            onRefresh={fetchAnnouncements}
                        />}
                    >
                        {loading ? (<Text
                            style={{
                                fontSize: 30, fontWeight: 200, color: "#e32f45", textAlign: "center"
                            }}
                        >Loading announcements...</Text>) : announcement.length === 0 ? (<Text
                            style={{
                                fontSize: 30, fontWeight: 200, color: "#e32f45", textAlign: "center"
                            }}
                        >No recent announcements</Text>) : (<View style={{ height: 450 }}>
                            <Text style={{
                                marginLeft: "auto", marginRight: "auto", marginBottom: 10, color: "#808080"
                            }}>Swipe down to refresh &#x2193;</Text>
                            < ScrollView
                            // refreshControl={<RefreshControl
                            //     refreshing={loading}
                            //     onRefresh={fetchAnnouncements}
                            // />}
                            >
                                {announcement.slice()
                                    .reverse().map((val, key) => (<Card
                                        key={key}
                                        style={{
                                            marginBottom: 10, backgroundColor: "white",
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
                                                left={(props) => (<Avatar.Icon
                                                    {...props}
                                                    icon={val.type === "Reminder" ? "brain" : "clock"}
                                                    color="#e32f45"
                                                    style={{ backgroundColor: "white" }}
                                                />)}
                                            />
                                        </Card.Content>
                                    </Card>))}
                                <Text
                                    style={{
                                        marginBottom: 0, marginLeft: "auto", marginRight: "auto",
                                    }}
                                >
                                    {/* {nextToken !== null ? <Button
                                    onPress={loadMore}
                                    mode="contained"
                                    icon="arrow-down"
                                    outlined={true}
                                    testID="load-more-button"
                                    style={{
                                        backgroundColor: "#e32f45",
                                        marginRight: "auto",
                                        marginLeft: "auto",
                                        marginBottom: "10vh",
                                        color: "white",
                                        height: "20px",
                                        alignItems: "center",
                                        justifyContent: "center",

                                    }}
                                >
                                    Load More
                                </Button> : " "} */}
                                </Text>

                            </ScrollView>
                        </View>

                        )}

                    </ScrollView>
                </View>

            </List.Section>

        </Card.Content>
    </View >);
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
            width: 0, height: 2,
        },
        shadowRadius: 4,
    }, modalView: {
        flex: 1, justifyContent: "center", // Center vertically
        alignItems: "center", // Center horizontally
        width: "80%", height: "50%", paddingBottom: "0%",
    }, button: {
        borderRadius: 20, padding: 10, elevation: 2,
    }, textStyle: {
        fontSize: 15, textAlign: "center", marginBottom: "5%",
    }, headerStyle: {
        fontSize: 30, fontWeight: "400", textAlign: "center", marginBottom: "2.5%",
    },

    subheaderStyle: {
        fontSize: 20, textAlign: "center", marginBottom: "5%", color: "#e32f45",
    }, modalText: {
        marginBottom: 15, textAlign: 'center',
    }, closeButton: {
        position: "absolute", top: 30, right: 5, zIndex: 1, // Ensures it's above other content
    },
});

export default NotificationList;