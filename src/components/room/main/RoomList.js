import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import {useNavigation} from "@react-navigation/native";

function RoomList({rooms, curRoomId}) {
    const navigation = useNavigation();
    return (
        rooms &&
        (
            rooms.map(room => (
                    <View key={room.room_id} style={{flex: 1, alignItems: 'center'}}>
                        <View style={{flex: 1}}/>
                        <TouchableOpacity
                            style={room.room_id === curRoomId ? styles.current_room : styles.room}
                            onPress={() => navigation.navigate('home', {room_id: room.room_id})}>
                            <Text
                                style={room.room_id === curRoomId ? styles.current_button_text : styles.button_text}>
                                {room.title}
                            </Text>
                        </TouchableOpacity>
                        <View style={{flex: 1}}/>
                    </View>
                )
            )
        )
    );
}

const styles = StyleSheet.create(
    {
        room: {
            flex: 8,
            backgroundColor: '#FFFFFF',
            width: '90%',
            borderRadius: 20,
            borderWidth: 5,
            borderColor: '#BFBFBF',
            justifyContent: 'center',
        },
        current_room: {
            flex: 8,
            backgroundColor: '#000000',
            width: '90%',
            borderRadius: 20,
            borderWidth: 5,
            borderColor: '#BFBFBF',
            justifyContent: 'center',
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
