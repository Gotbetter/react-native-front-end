import React from 'react';
import {StyleSheet, View} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import {AntDesign} from "@expo/vector-icons";

function RoomFooter({isLeader, showHelp, showInfo, showInvite, showRank}) {

    return (
        <View style={styles.container}>
            <AntDesign name="questioncircleo" size={32} onPress={showHelp}/>
            <Feather name="info" size={35} onPress={showInfo}/>
            {
                isLeader === true ? <Feather name="user-plus" size={35} onPress={showInvite}/> : null
            }
            <Entypo name="bar-graph" size={35} onPress={showRank}/>
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
        test: {
            borderWidth: 1
        },


    }
);

export default RoomFooter;
