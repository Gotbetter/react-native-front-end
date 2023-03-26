import React, {useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {logout} from "../../module/auth";
import {useDispatch} from "react-redux";
import {useNavigation} from "@react-navigation/native";

function LogoutButton() {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const onPress = useCallback(() => {
        AsyncStorage.getAllKeys()
            .then(keys => AsyncStorage.multiRemove(keys))
            .catch(err => err)
            .then(() => {
                dispatch(logout());
                navigation.navigate('login');
            })
            .catch(err => err);
    });


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
        borderColor: '#DBDBDB',
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
