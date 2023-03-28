import React, {useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

function RoomItem({room_id, title}) {

    const navigation = useNavigation();

    const onPress = useCallback(() => {
        navigation.navigate('home', {room_id});
    }, [room_id]);

    return (
        <TouchableOpacity style={styles.room}
                          onPress={onPress}>
            <Text style={styles.button_text}>{title}</Text>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create(
    {
        room: {
            backgroundColor: '#FFFFFF',
            width: wp(30),
            height: hp(16),
            borderRadius: 20,
            borderWidth: 5,
            margin: 16,
            borderColor: '#BFBFBF',
            justifyContent: 'center',
            alignItems: "center",
        },
        text: {
            fontSize: 16
        },
    }
);

export default RoomItem;
