import React from 'react';
import {StyleSheet, View} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import {AntDesign} from "@expo/vector-icons";

function RoomFooter({isReader}) {

    return (
        <View style={styles.container}>
            <AntDesign name="questioncircleo" size={32}/>
            <Feather name="info" size={35}/>
            {
                isReader ? <Feather name="user-plus" size={35}/> : null
            }
            <Entypo name="bar-graph" size={35}/>

        </View>
    );
}

const styles = StyleSheet.create(
    {
        container: {
            width: "100%",
            height: "10%",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: "#ffffff"

        },

    }
);

export default RoomFooter;
