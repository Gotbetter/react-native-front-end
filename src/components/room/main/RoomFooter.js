import React from 'react';
import {StyleSheet, View} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import {AntDesign} from "@expo/vector-icons";

function RoomFooter({isReader, showHelp, showInfo, showInvite, showRank}) {

    const footerItems = [
        {
            id: "Help",
            icon: <AntDesign name="questioncircleo" size={32} onPress={showHelp}/>
        },
        {
            id: "Info",
            icon: <Feather name="info" size={35} onPress={showInfo}/>
        },
        {
            id: "Invite",
            icon: isReader ? <Feather name="user-plus" size={35} onPress={showInvite}/> : null
        },
        {
            id: "Rank",
            icon: <Entypo name="bar-graph" size={35} onPress={showRank}/>
        },

    ]

    return (
        <View style={styles.container}>
            {
                footerItems.map(item => (
                    <View key={item.id}>
                        {item.icon}
                    </View>
                ))
            }
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
