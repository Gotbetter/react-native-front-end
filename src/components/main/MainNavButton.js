import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";

function MainNavButton({name, path}) {

    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(path)}>
            <Text style={styles.button_text}>{name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create(
    {
        button: {
            width: "40%",
            height: '80%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderRadius: 20,
            borderWidth: 5,
            borderColor: '#DBDBDB'
        },
        button_text: {
            color: '#000000',
            textAlign: 'center',
            fontSize: 20,
        },
    }
);

export default MainNavButton;
