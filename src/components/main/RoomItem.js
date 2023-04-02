import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

function RoomItem({room_id, title}) {

    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate('home', {room_id});
    };

    return (
        <TouchableOpacity style={styles.room} onPress={onPress}>
            <View style={styles.title}>
                <Text style={styles.title_text} ellipsizeMode="tail" numberOfLines={1}>{title}</Text>
                <Text>5/6</Text>
            </View>
            <View style={styles.subInfo}>
                <Text>#{6}주짜리방</Text>
                <Text>#{4}주차</Text>
                <Text>#입장료 {10000}원</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create(
    {
        room: {
            backgroundColor: '#FFFFFF',
            width: wp(80),
            height: hp(10),
            borderRadius: 20,
            borderWidth: 3,
            margin: 12,
            padding: 12,
            borderColor: '#BFBFBF',
            justifyContent: 'center',
            alignItems: "center",
        },
        title: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
        },
        title_text: {
            fontSize: 18,
            marginRight: "2%",
            fontWeight: "bold",
        },
        subInfo: {
            flexDirection: "row",
            marginTop: "2%",
            justifyContent: "space-around",
            width: "100%",

        },
        text: {
            fontSize: 16
        },
    }
);

export default RoomItem;
