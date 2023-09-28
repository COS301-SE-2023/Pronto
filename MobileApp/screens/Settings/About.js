import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const AboutScreen = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>About Pronto</Text>
            <Text style={styles.text} testID={'intro'}>
                Pronto is a web/mobile application designed specifically for students to
                efficiently manage their academic tasks, schedules, and deadlines. With
                Pronto, you can stay organized and never miss an important assignment or
                exam again.
            </Text>
            <Text style={styles.text} testID={'mission'}>
                Our mission is to provide a single, consolidated platform for students
                and educational institutions to enhance the learning experience. We
                believe that by leveraging technology, students can optimize their time
                and focus on what truly matters - their education.
            </Text>
            <Text style={styles.subheading}>Key Features:</Text>
            <Text style={styles.listItem} testID={'keyFeatures1'}>
                1. Schedule Management: Load and track your lecture schedules,
                assignment due dates, test schedules, and examination dates all in one
                place.
            </Text>
            <Text style={styles.listItem} testID={'keyFeatures2'}>
                2. Reminders and Notifications: Set up personalized reminders for
                upcoming tasks and receive notifications to ensure you stay on top of
                your academic responsibilities.
            </Text>
            <Text style={styles.listItem} testID={"keyFeatures3"}>
                3. Campus Maps: Access campus maps to easily navigate your educational
                institution's facilities and find your way around.
            </Text>
            <Text style={styles.listItem} testID={'keyFeatures4'}>
                4. Institution Pages: Educational institutions can maintain their own
                page within the app to provide students with important information, such
                as class schedules, campus events, and announcements.
            </Text>
            <Text style={styles.listItem} testID={'keyFeatures5'}>
                5. User-Friendly Interface: Pronto offers an intuitive and user-friendly
                interface, making it easy for students of all levels to navigate and
                utilize the app effectively.
            </Text>
            <Text style={styles.text} testID={'message'}>
                We are committed to continuously improving and expanding our services to
                meet the needs of students and educational institutions. Your feedback
                is valuable to us, and we encourage you to reach out to us with any
                suggestions or concerns you may have.
            </Text>
            <Text style={styles.text}>
                Thank you for choosing Pronto as your academic companion!
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
    },
    subheading: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 10,
    },
    listItem: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default AboutScreen;

