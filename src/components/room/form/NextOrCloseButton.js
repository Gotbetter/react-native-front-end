import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

function NextOrCloseButton({name, onPress}) {
    return (

        <TouchableOpacity style={styles.continue_button} onPress={onPress}>
            <Text style={styles.button_text}>{name || "계속하기"}</Text>
        </TouchableOpacity>


    );
}

const styles = StyleSheet.create(
    {
        continue_button: {
            height: "100%",
            width: "100%",
            backgroundColor: "black",
            borderRadius: 12,
            borderWidth: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        button_text: {
            fontSize: "25%",
            color: "white",
        }
    }
);

export default NextOrCloseButton;
