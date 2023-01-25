import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";

function ContinueButton({name, onPress}) {
    return (
        <TouchableOpacity style={styles.continue_button} onPress={onPress}>
            <Text style={styles.button_text}>{name || "계속하기"}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create(
    {
        continue_button: {
            marginTop: 100,
            backgroundColor: "black",
            width: "40%",
            borderRadius: 12,
            borderWidth: 1,
            height: "10%",
            justifyContent: "center",
            alignItems: "center",
        },
        button_text: {
            fontSize: 20,
            color: "white",
        }
    }
);

export default ContinueButton;
