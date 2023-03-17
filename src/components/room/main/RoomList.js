import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

function RoomList({rooms, curRoomId, onPress}) {

    return (
        rooms.map(room => (
            <View>
                <TouchableOpacity
                    key={room.room_id}
                    style={room.room_id === curRoomId ? styles.current_room : styles.room}
                    onPress={() => onPress(room.room_id)}>
                    <Text
                        style={room.room_id === curRoomId ? styles.current_button_text : styles.button_text}>
                        {room.title}
                    </Text>
                </TouchableOpacity>
            </View>
        ))

    );
}

const styles = StyleSheet.create(
    {
        room: {
            justifyContent: "center",
            marginRight: 3,
            width: wp(30),
            height: "100%",
            backgroundColor: '#FFFFFF',
            borderRadius: 20,
            borderWidth: 5,
            borderColor: '#BFBFBF',
        },
        current_room: {
            justifyContent: "center",
            width: wp(30),
            marginRight: 3,
            backgroundColor: 'black',
            height: "100%",
            borderRadius: 20,
            borderWidth: 5,
            borderColor: '#BFBFBF',
        },
        current_button_text: {
            color: '#FFFFFF',
            textAlign: 'center',
            fontSize: 20,
        },
        button_text: {
            color: '#000000',
            textAlign: 'center',
            fontSize: 20,
        },

    }
);

export default RoomList;
