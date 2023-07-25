// StepByStepInstructions.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StepByStepInstructions = ({ instructions }) => {
    return (
        <View style={styles.container}>
            {instructions.map((instruction, index) => (
                <Text key={index} style={styles.instructionText}>
                    {instruction}
                </Text>
            ))}
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
    instructionText: {
        fontSize: 16,
        marginBottom: 8,
    },
});

export default StepByStepInstructions;
