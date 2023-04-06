import React from 'react';
import {StyleSheet, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {useNavigation} from "@react-navigation/native";

function HomeFooter() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Ionicons name="add-outline" size={40} onPress={() => navigation.navigate('room-create-title-form')}/>
            <FontAwesome5 name="search-plus" size={35} onPress={() => navigation.navigate('join')}/>
        </View> 
    );
}

const styles = StyleSheet.create(
    {
        container: {
            width: "100%",
            height: "8%",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",

        },

    }
);
export default HomeFooter;
