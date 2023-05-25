import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";

function LogoutButton({onPress}) {

    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>로그아웃</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 16,
        borderWidth: 2,
        borderCol우or: '#DBDBDB',
        width: "20%",
        height: "16%",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 16,
    },
});




export default LogoutButton;
