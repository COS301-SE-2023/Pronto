import React, { useState } from "react";
import { Alert, View, StyleSheet } from "react-native";
import { List, Card, Avatar } from "react-native-paper";
import { ScrollView } from "react-native";

const NotificationList = () => {
  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [expanded3, setExpanded3] = useState(false);

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
          left={(props) => <List.Icon {...props} icon="brain" />}
          expanded={expanded1}
          onPress={handlePress1}
        >
          <List.Item title="Reminder 1" onPress={showFullMessage} />
          <List.Item title="Reminder 2" />
        </List.Accordion>

        <List.Accordion
          title="Due Dates"
          left={(props) => <List.Icon {...props} icon="clock" />}
          expanded={expanded2}
          onPress={handlePress2}
        >
          <List.Item title="Due Date 1" onPress={showFullMessage} />
          <List.Item title="Due Date 2" />
        </List.Accordion>

        <List.Accordion
          title="Other"
          left={(props) => <List.Icon {...props} icon="menu" />}
          expanded={expanded3}
          onPress={handlePress3}
        >
          <List.Item title="Other 1" onPress={showFullMessage} />
          <List.Item title="Other 2" />
        </List.Accordion>
      </List.Section>

      <Card.Content>
        <List.Section title="Recent Announcements">
          <ScrollView>
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
                      icon="menu"
                      color="#e32f45"
                      style={{ backgroundColor: "white" }}
                    />
                  )}
                />
              </Card.Content>
            </Card>
          </ScrollView>
        </List.Section>
      </Card.Content>
    </View>
  );
};

export default NotificationList;
