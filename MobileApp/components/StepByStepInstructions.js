import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const StepByStepInstructions = ({ instructions }) => {
    const icon = <Icon name="directions-walk" size={20} color="#e32f45" />;

    const [expanded, setExpanded] = useState(true);

    const toggleInstructions = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleInstructions}>
                <View style={styles.iconContainer}>
                    {expanded ? (
                        <>
                            <Icon name="keyboard-arrow-down" size={24} color="#000" />
                            <Text style={styles.showDirectionsText}>Hide directions</Text>
                        </>
                    ) : (
                        <>
                            <Icon name="keyboard-arrow-up" size={24} color="#000" />
                            <Text style={styles.showDirectionsText}>Show directions</Text>
                        </>
                    )}
                </View>
            </TouchableOpacity>

            {expanded && (
                <View style={styles.expandedContainer}>
                    {instructions.map((instruction, index) => (
                        <View key={index} style={styles.instructionContainer}>
                            {icon}
                            <Text style={styles.instructionText}>{instruction}</Text>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: "20%", // Adjust this value to control the vertical position
        right: 10, // Adjust this value to control the horizontal position
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
        marginLeft: 30,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    expandedContainer: {
        marginTop: 10, // Add some space between the icon and the expanded directions
    },
    instructionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    instructionText: {
        fontSize: 16,
        marginLeft: 8,
    },
    showDirectionsText: {
        fontSize: 14,
        marginLeft: 4,
        marginBottom: 4,
        color: '#000',
        fontWeight: 'bold',
    },
});

export default StepByStepInstructions;
