import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

function UserIcon({img, name, color}) {
    return (
        <View style={styles.user_icon_container}>
            <View style={styles.user_image}></View>
            <Text style={[styles.user_name, {color}]}>{name}</Text>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        user_icon_container: {

            justifyContent: "center",
            alignItems: "center",
            width: wp(25),
            height: hp(10),
        },
        user_image: {
            backgroundColor: "white",
            width: 50,
            height: 50,
            borderRadius: 25,
            marginBottom: "10%",

            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        user_name: {
            fontWeight: "bold",
        },
    }
);

export default UserIcon;
