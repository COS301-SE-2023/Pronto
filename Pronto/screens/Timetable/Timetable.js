import React from 'react';
import { Text, StyleSheet, SafeAreaView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScheduleTable from "./ScheduleTable";
export default function Timetable() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.welcomeText}>
                <Ionicons name="ios-menu" size={30} color="black" />
                    {' '}Timetable
                <Ionicons name="ios-notifications" size={28} color="black" style={styles.bell}/>
            </Text>
        <ScheduleTable />
        </SafeAreaView>
    )
        ;
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f7f7f7',
        width: '100%',
        top: 0,
        position: 'absolute',
        marginTop: 10,
        MarginBottom: 20,
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    bell: {
        position: 'absolute',
        padding: 10,
        right: 0,
    }
});