import React, { useState } from "react";
import { Alert, View, StyleSheet, Text } from "react-native";
import { List, Card, Avatar } from "react-native-paper";
import { ScrollView } from "react-native";

const NotificationList = () => {
  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [expanded3, setExpanded3] = useState(true);

  const handlePress1 = () => setExpanded1(!expanded1);
  const handlePress2 = () => setExpanded2(!expanded2);
  const handlePress3 = () => setExpanded3(!expanded3);

  const showFullMessage = () => {
    Alert.alert("Clicked");
  };

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
          <Card
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
          </Card>

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
          </Card>
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
          <Card
            style={{
              margin: 10,
              backgroundColor: "white",
            }}
            onPress={showFullMessage}
          >
            <Card.Content>
              <Text>COS216: Assignment due soon</Text>
            </Card.Content>
          </Card>
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
          <Card
            style={{
              margin: 10,
              backgroundColor: "white",
            }}
            onPress={showFullMessage}
          >
            <Card.Content>
              <Text>IMY310: Remeber your pens for the semester test</Text>
            </Card.Content>
          </Card>
        </List.Accordion>
      </List.Section>

      <Card.Content>
        <List.Section title="Recent Announcements">
          <View>
            <ScrollView style={{ height: 250 }}>
              <Card
                style={{
                  marginBottom: 10,
                  backgroundColor: "white",
                }}
                onPress={showFullMessage}
              >
                <Card.Content>
                  <Card.Title
                    title="COS301"
                    subtitle="Lecture venue changed from North Hall to IT 2-27"
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

              <Card
                style={{
                  marginBottom: 10,
                  backgroundColor: "white",
                }}
                onPress={showFullMessage}
              >
                <Card.Content>
                  <Card.Title
                    title="COS332"
                    subtitle="Change in Lecture Time"
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

              <Card
                style={{
                  marginBottom: 10,
                  backgroundColor: "white",
                }}
                onPress={showFullMessage}
              >
                <Card.Content>
                  <Card.Title
                    title="COS216"
                    subtitle="Assignment due soon"
                    left={(props) => (
                      <Avatar.Icon
                        {...props}
                        icon="clock"
                        color="#e32f45"
                        style={{ backgroundColor: "white" }}
                      />
                    )}
                  />
                </Card.Content>
              </Card>

              <Card
                style={{
                  marginBottom: 10,
                  backgroundColor: "white",
                }}
                onPress={showFullMessage}
              >
                <Card.Content>
                  <Card.Title
                    title="IMY310"
                    subtitle="Remember your pens for the test"
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
            </ScrollView>
          </View>
        </List.Section>
      </Card.Content>
    </View>
  );
};

export default NotificationList;
