import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import {useNavigation} from "@react-navigation/native";

function RoomCreateHeader() {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Feather name="chevron-left" style={styles.close_icon} size={35} onPress={() => navigation.goBack()}/>
            <Text style={styles.title}>스터디룸 만들기</Text>
            <View style={styles.blank}/>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        container: {
            width: "100%",
            height: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        title: {
            fontSize: 18,
            fontWeight: "bold",
        },
        blank: {
            width: "10%",
        }
    }
);

export default RoomCreateHeader;
