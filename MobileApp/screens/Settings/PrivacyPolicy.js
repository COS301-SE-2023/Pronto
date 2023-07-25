import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const PrivacyPolicyScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Privacy Policy</Text>
      <Text style={styles.text}>
        At Pronto, we take your privacy seriously. This Privacy Policy explains
        how we collect, use, and disclose your personal information when you use
        our application.
      </Text>
      <Text style={styles.subheading}>Information Collection and Use</Text>
      <Text style={styles.text}>
        Pronto collects and stores the following information: - Your name, email
        address, and other contact details you provide when creating an account.
        - Information related to your educational institution, such as your
        schedule, assignment deadlines, and test schedules. - Usage data,
        including interactions with the application and any content you upload.
      </Text>
      <Text style={styles.subheading}>Information Sharing</Text>
      <Text style={styles.text}>
        Pronto may share your personal information with your educational
        institution for the purpose of providing the services offered by the
        application. We may also share your information with third-party service
        providers who assist us in operating our app.
      </Text>
      <Text style={styles.subheading}>Data Security</Text>
      <Text style={styles.text}>
        We implement industry-standard security measures to protect your
        personal information. However, please note that no method of
        transmission or storage is 100% secure, and we cannot guarantee the
        absolute security of your data.
      </Text>
      <Text style={styles.subheading}>Changes to this Policy</Text>
      <Text style={styles.text}>
        Pronto may update this Privacy Policy from time to time. We will notify
        you of any significant changes by posting the new Privacy Policy on this
        page.
      </Text>
      <Text style={styles.text}>
        If you have any questions or concerns about our Privacy Policy, please
        contact us at agilearchitects@gmail.com.
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
  subheading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default PrivacyPolicyScreen;
