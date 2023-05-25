import React from 'react';
import {StyleSheet, TextInput} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

function BasicTextInput({style, placeholder, secure=false, dark=false}) {
    return (
        <TextInput style={[styles.container, {backgroundColor: dark ? "#EEEEEE" : "#FFFFFF"}, style]}
                   placeholder={placeholder} placeholderTextColor={"#BDBDBD"}
                   secureTextEntry={secure}
        />
    );
}

const styles = StyleSheet.create(
    {
        container: {
            width: wp(90),
            height: hp(7),
            padding: 10,
            borderColor: "#EEEEEE",
            borderRadius: 10,
            borderWidth: 1,
        }
    }
);

export default BasicTextInput;
