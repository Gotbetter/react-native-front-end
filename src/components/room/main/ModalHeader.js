import React from 'react';
import HeaderTemplate from "../../common/HeaderTemplate";
import Feather from "react-native-vector-icons/Feather";
import {StyleSheet, Text, View} from "react-native";

function ModalHeader({title, onPress}) {
    return (
        <HeaderTemplate>
            <Feather name="chevron-down" style={styles.close_icon} size={35} onPress={onPress}/>
            <Text style={styles.title_text}>{title}</Text>
            <View style={{width: 40}}/>
        </HeaderTemplate>
    );
}

const styles = StyleSheet.create(
    {
        close_icon: {
            marginLeft: "2%",

        },
        title_text:{
            fontSize: 20,
            fontWeight: "bold",
        }
    }
);


export default ModalHeader;
