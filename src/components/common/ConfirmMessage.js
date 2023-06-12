import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {RFValue} from "react-native-responsive-fontsize";

function ConfirmMessage({message, visible}) {
    return (
        visible ?
            <View style={styles.container}>
                <Text style={styles.error_text}>{message}</Text>
            </View>
            : null
    );
}

const styles = StyleSheet.create(
    {
        container: {
            paddingLeft: 5,
        },
        error_text: {
            fontSize: RFValue(10),
            color: "#64B5F6",
        }
    }
);


export default ConfirmMessage;
