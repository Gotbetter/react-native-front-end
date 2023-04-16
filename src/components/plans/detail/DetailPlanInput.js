import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";

function DetailPlanInput({onPress}) {

    return (
        <TouchableOpacity style={[styles.container, styles.shadow]} onPress={onPress}>
            <Text style={styles.text}>세부 계획 추가</Text>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create(
    {
        shadow: {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        container: {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#262A2D",
            borderRadius: wp(10),
            padding: wp(3),
        },
        text: {
            color: "#ffffff"
        },

    }
);

export default DetailPlanInput;
