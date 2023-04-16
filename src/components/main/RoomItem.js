import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

function RoomItem({roomInfo}) {

    const {room_id, title, week, current_week, entry_fee, max_user_num, current_user_num} = roomInfo;

    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate('home', {room_id});
    };

    return (
        <TouchableOpacity style={styles.room} onPress={onPress}>
            <View style={styles.title}>
                <Text style={styles.title_text} ellipsizeMode="tail" numberOfLines={1}>{title}</Text>
                <Text>{current_user_num}/{max_user_num}</Text>
            </View>
            <View style={styles.subInfo}>
                <Text>#{week}주짜리방</Text>
                <Text>#{current_week}주차</Text>
                <Text>#입장료 {entry_fee}원</Text>
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
            justifyContent: "space-between",
            width: "100%",
        },
        title_text: {
            width: "80%",
            fontSize: 18,
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
