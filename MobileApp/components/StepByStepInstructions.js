import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const StepByStepInstructions = ({ instructions }) => {
    const icon = <Icon name="directions-walk" size={20} color="#000" />;

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
                <>
                    {instructions.map((instruction, index) => (
                        <View key={index} style={styles.instructionContainer}>
                            {icon}
                            <Text style={styles.instructionText}>{instruction}</Text>
                        </View>
                    ))}
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        marginTop: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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
        color: '#000',
    },
});

export default StepByStepInstructions;
