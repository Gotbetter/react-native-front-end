import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

function ContinueButton({name, onPress}) {
    return (
        <View style={styles.button_container}>
            <TouchableOpacity style={styles.continue_button} onPress={onPress}>
                <Text style={styles.button_text}>{name || "계속하기"}</Text>
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create(
    {
        button_container: {
            marginTop: 100,
            width: "40%",
        },
        continue_button: {
            backgroundColor: "black",
            borderRadius: 12,
            borderWidth: 1,
            height: 60,
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
