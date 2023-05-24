import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

function ActionButton({style, name}) {
    return (
        <TouchableOpacity style={[styles.container, style]}>
            <Text style={styles.button_text}>{name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create(
    {
        container: {
            justifyContent: "center",
            alignItems: "center",

            backgroundColor: "#263238",
            width: wp(90),
            height: hp(7),
            borderRadius: 10,
            borderWidth: 1,
        },
        button_text: {
            color: "white",
            fontWeight: "700",
        }
    }
);


export default ActionButton;
