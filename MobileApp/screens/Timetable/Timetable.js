import React, {useState} from 'react';
import {Text, StyleSheet, SafeAreaView, View, Animated, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScheduleTable from './ScheduleTable';

export default function Timetable() {

    {/* These are states for the side panel for the menu button
     It is used to open and close the side panel and check if it is open or not
     */}
    const [isSPanelOpen, setIsSPanelOpen] = useState(false);
    const [sidePanelAnim] = useState(new Animated.Value(-800));

    {/* These are states for the side panel for the notification button
     It is used to open and close the side panel and check if it is open or not
     */}
    const [isNPanelOpen, setIsNPanelOpen] = useState(false);
    const [nAnim] = useState(new Animated.Value(-800));

    {/* This function is used to open and close the side panel for the menu button*/}
    const handleMenuClick = () => {
        setIsSPanelOpen(!isSPanelOpen);
        // If the side panel is open, close it
        if (isSPanelOpen) {
            handleClose();
        }
        Animated.timing(sidePanelAnim, {
            toValue: isSPanelOpen ? -800 : 0,
            duration: 500,
            useNativeDriver: false,
        }).start();
    };

    const handleNotificationClick = () => {
       setIsNPanelOpen(!isNPanelOpen);
         // If the notification panel is open, close it
       if (isNPanelOpen) {
           handleClose();
       }
        Animated.timing(nAnim, {
            toValue: isNPanelOpen ? -800 : 0,
            duration: 500,
            useNativeDriver: false,
        }).start();
    };


    function handleClose() {
        // If the side panel is open, close it
        if(isSPanelOpen) {
            setIsSPanelOpen(false);
            Animated.timing(sidePanelAnim, {
                toValue: -800,
                duration: 500,
                useNativeDriver: false,
            }).start();
        }
        // If the notification panel is open, close it
        if(isNPanelOpen) {
            setIsNPanelOpen(false);
            Animated.timing(nAnim, {
                toValue: -800,
                duration: 500,
                useNativeDriver: false,
            }).start();
        }
    }


    return (
        <SafeAreaView style={styles.container}>


            <Text style={styles.welcomeText}>

                {/* This is the menu button */}
                <Ionicons testID={'menuButton'} name="ios-menu" size={30} color="black" onPress={handleMenuClick}/>{' '}

                Timetable

                {/* This is the notification button */}
                <Ionicons  testID={'notificationButton'} name="ios-notifications" size={30} color="black" style={styles.icon} onPress={handleNotificationClick} />

            </Text>

            {/* This is the timetable format. It returns the grid like layout */}
            <ScheduleTable/>

            {/* This is the side panel for the menu button */}
            <Animated.View
                style={{
                    position: 'absolute',
                    left: sidePanelAnim,
                    width: '45%',
                    height: '100%',
                    backgroundColor: '#fff',
                }}
                testID={'sidePanel'}
            >
                {/* These are the buttons the side panel */}
                <TouchableOpacity style={styles.navbarRow}>
                    <Text ><Ionicons name="ios-close" size={30} color="black" onPress={handleClose} style={styles.icon} /></Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.navbarRow}>
                    <View style={styles.pageName}>
                        <Text >Account Details</Text>
                        <Text >Notifications</Text>
                        <Text >Edit Timetable</Text>
                        <Text >Logout</Text>
                    </View>
                </TouchableOpacity>

            </Animated.View>


            {/* This is the side panel for the notification button */}
            <Animated.View
                style={{
                    position: 'absolute',
                    left: nAnim,
                    width: '45%',
                    height: '100%',
                    backgroundColor: '#fff',
                }}
                testID={'notificationPanel'}
            >
                <TouchableOpacity style={styles.navbarRow}>
                    <Text ><Ionicons name="ios-close" size={30} color="black" onPress={handleClose} style={styles.icon} /></Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.navbarRow}>
                    <View style={styles.pageName}>
                        <Text >Notifications</Text>
                    </View>
                </TouchableOpacity>

            </Animated.View>
        </SafeAreaView>
    );
}

// This is the styling for the page
const styles = StyleSheet.create({

    container: {
        backgroundColor: '#f7f7f7',
        width: '100%',
        height: '100%',
        top: 0,
        position: 'absolute',
        marginTop: 0,
        marginBottom: 20,
        padding: 20,

        /* Media query for smartphones */
        '@media (max-width: 600px)': {
            paddingTop: 20,
        },

        /* Media query for tablets */
        '@media (min-width: 600px) and (max-width: 1200px)': {
            paddingTop: 0,
        },

        /* Media query for desktops */
        '@media (min-width: 1200px)': {
            paddingTop: 0,
        }
    },
    welcomeText: {
        fontSize: 28,
        position: 'relative',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    icon: {
        position: 'absolute',
        right: 0,
    },
    navbarRow: 
    {
        width: '100%',
        flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: '#ffffff',
        marginTop: 10,
    },
    pageName: 
    {
        fontSize: 90,
        fontWeight: 'bolder',
        color: '#000000',
        padding: 30,
        borderRadius: 5,
        width: '100%',
        textAlign: 'center',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },

});
