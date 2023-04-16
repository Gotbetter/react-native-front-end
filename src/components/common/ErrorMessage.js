import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";

function ErrorMessage({message}) {
    return (
        <View style={styles.container}>
            <Text style={styles.error_text}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        container: {
            padding: wp(2),

        },
        error_text: {
            color: "#ff2e16",
        }
    }
);

export default ErrorMessage;
