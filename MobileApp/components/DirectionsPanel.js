import React from 'react';
import { View, Text, StyleSheet, PanResponder } from 'react-native';

const DirectionsPanel = ({ instructions }) => {
    // Implement the PanResponder to handle dragging behavior
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gestureState) => {
            // Implement the logic to update the position of the panel during dragging
            // For example, you can use state to update the translateY value in the styles.
        },
        onPanResponderRelease: () => {
            // Implement the logic to handle any actions after releasing the panel
        },
    });

    return (
        <View style={styles.panelContainer} {...panResponder.panHandlers}>
            {/* Render the directions */}
            {instructions.map((instruction, index) => (
                <Text key={index} style={styles.directionText}>
                    {instruction}
                </Text>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    panelContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        padding: 16,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        elevation: 5,
    },
    directionText: {
        fontSize: 16,
        marginBottom: 8,
    },
});

export default DirectionsPanel;
