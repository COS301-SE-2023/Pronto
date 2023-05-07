import React, {useState} from "react";
import {StyleSheet, Text, View, Picker} from "react-native";
import {Ionicons} from "@expo/vector-icons";



export default function UniversityPage(){

        const [selectedValue, setSelectedValue] = useState('University of Pretoria'); // This is the state for the picker

        return (
            <View style={styles.container}>

                {/* Centered square box to hold the submission form */}
                <View style={styles.universityForm}>
                            <Ionicons name={'ios-school'} size={100} color={'black'} />
                            <Text style={{fontSize: 15}}>Which university would you like to attend?</Text>

                    {/* Picker for user to enter academic institution */}
                    <Picker
                        style={styles.dropdown}
                        selectedValue={selectedValue}
                        onValueChange={(itemValue) =>
                            setSelectedValue(itemValue)
                        }>
                        <Picker.Item label="University of Pretoria" value="option1" />
                        <Picker.Item label="University of Johannesburg" value="option2" />
                        <Picker.Item label="University of Witwatersrand" value="option3" />
                        <Picker.Item label="University of Stellenbosch" value="option3" />
                    </Picker>

                    {/* Button to be used in future to 'submit' the details */}
                    <View style={{marginTop: 20}}>
                      <Ionicons name={'ios-arrow-forward'} size={50} color={'black'} />
                    </View>

                </View>
            </View>
        )
}

const styles = StyleSheet.create({
    container: {
        width : '100%',
        height : '100%',
        backgroundColor: '#7e7c7c',
        alignItems: 'center',
        justifyContent: 'center',
    },
    universityForm: {
        width: 300,
        height: 300,
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 50,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#000000',
    },
    dropdown: {
        width: '65%',
        height: 40,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        borderRadius: 30,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#000000',
        marginTop: 20,
    },
})