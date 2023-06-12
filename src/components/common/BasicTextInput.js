import React from 'react';
import {StyleSheet, TextInput} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

function BasicTextInput({style,dark=false, placeholder, secure=false, name, value, onChangeText, onBlur=null}) {
    return (
        <TextInput style={[styles.container, {backgroundColor: dark ? "#EEEEEE" : "#FFFFFF"}, style]}
                   placeholder={placeholder} placeholderTextColor={"#BDBDBD"}
                   secureTextEntry={secure}
                   value={value}
                   onChange={(e) => onChangeText(e, name)}
                   onBlur={onBlur}
        />
    );
}

const styles = StyleSheet.create(
    {
        container: {
            borderRightWidth: 1,
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
